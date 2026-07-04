import * as THREE from 'three';
import { createNoise2D, createNoise3D } from 'simplex-noise';
import { Chunk } from './chunk.js';
import { createAtlas } from './textures.js';
import { CHUNK_SIZE, CHUNK_HEIGHT, SEA_LEVEL } from './terrain.js';
import { getCityInfo, getChunkNPCSpawns, getChunkCarSpawns, getChunkShopkeeperSpawns } from './city.js';
import { NPCManager } from './npc.js';
import { CarManager } from './car.js';
import { TrafficManager, getChunkTrafficSpawns } from './traffic.js';
import * as B from './blocks.js';

const RENDER_DIST = 7;

export class World {
  constructor(scene, seed = Math.random() * 10000) {
    this.scene  = scene;
    this.chunks = new Map();
    this.seed   = seed;

    const alea = (s) => { let n = s; return () => { n = (n * 1664525 + 1013904223) >>> 0; return n / 0x100000000; }; };
    const rng = alea(seed);
    this.noise2D = createNoise2D(rng);
    this.noise3D = createNoise3D(alea(seed + 1));

    // Texture atlas
    const atlasCanvas = createAtlas();
    this.atlasTexture = new THREE.CanvasTexture(atlasCanvas);
    this.atlasTexture.flipY = false;
    this.atlasTexture.magFilter = THREE.NearestFilter;
    this.atlasTexture.minFilter = THREE.NearestFilter;

    this.solidMat = new THREE.MeshLambertMaterial({
      map: this.atlasTexture,
      vertexColors: true,
    });
    this.transMat = new THREE.MeshLambertMaterial({
      map: this.atlasTexture,
      vertexColors: true,
      transparent: true,
      alphaTest: 0.1,
      side: THREE.DoubleSide,
    });

    this._pendingBuilds = [];
    this.npcs    = new NPCManager(scene, this);
    this.cars    = new CarManager(scene);
    this.traffic = new TrafficManager(scene);
  }

  cityInfo(wx, wz) { return getCityInfo(wx, wz, this.seed); }

  key(cx, cz) { return `${cx},${cz}`; }

  getChunk(cx, cz) {
    return this.chunks.get(this.key(cx, cz)) || null;
  }

  getBlock(wx, wy, wz) {
    if (wy < 0 || wy >= CHUNK_HEIGHT) return B.AIR;
    const cx = Math.floor(wx / CHUNK_SIZE);
    const cz = Math.floor(wz / CHUNK_SIZE);
    const chunk = this.getChunk(cx, cz);
    if (!chunk || !chunk.data) return B.AIR;
    const lx = ((wx % CHUNK_SIZE) + CHUNK_SIZE) % CHUNK_SIZE;
    const lz = ((wz % CHUNK_SIZE) + CHUNK_SIZE) % CHUNK_SIZE;
    return chunk.getLocal(lx, wy, lz);
  }

  setBlock(wx, wy, wz, id) {
    if (wy < 0 || wy >= CHUNK_HEIGHT) return;
    const cx = Math.floor(wx / CHUNK_SIZE);
    const cz = Math.floor(wz / CHUNK_SIZE);
    const chunk = this.getChunk(cx, cz);
    if (!chunk || !chunk.data) return;
    const lx = ((wx % CHUNK_SIZE) + CHUNK_SIZE) % CHUNK_SIZE;
    const lz = ((wz % CHUNK_SIZE) + CHUNK_SIZE) % CHUNK_SIZE;
    chunk.setLocal(lx, wy, lz, id);

    // Also rebuild neighbours if on border
    const neighbors = [];
    if (lx === 0)              neighbors.push(this.getChunk(cx-1, cz));
    if (lx === CHUNK_SIZE - 1) neighbors.push(this.getChunk(cx+1, cz));
    if (lz === 0)              neighbors.push(this.getChunk(cx, cz-1));
    if (lz === CHUNK_SIZE - 1) neighbors.push(this.getChunk(cx, cz+1));
    for (const n of neighbors) if (n) n.dirty = true;

    this._scheduleBuild(chunk);
    for (const n of neighbors) if (n) this._scheduleBuild(n);
  }

  isSolid(wx, wy, wz) { return B.isSolid(this.getBlock(wx, wy, wz)); }

  _scheduleBuild(chunk) {
    if (!this._pendingBuilds.includes(chunk)) {
      this._pendingBuilds.push(chunk);
    }
  }

  update(playerX, playerZ) {
    const pcx = Math.floor(playerX / CHUNK_SIZE);
    const pcz = Math.floor(playerZ / CHUNK_SIZE);

    // Load chunks in range
    for (let dx = -RENDER_DIST; dx <= RENDER_DIST; dx++) {
      for (let dz = -RENDER_DIST; dz <= RENDER_DIST; dz++) {
        if (dx*dx + dz*dz > RENDER_DIST*RENDER_DIST) continue;
        const cx = pcx + dx;
        const cz = pcz + dz;
        const k  = this.key(cx, cz);
        if (!this.chunks.has(k)) {
          const c = new Chunk(cx, cz, this);
          c.generate(this.noise2D, this.noise3D);
          this.chunks.set(k, c);
          this._scheduleBuild(c);
          // Spawn NPCs and cars for this chunk
          const spawns = getChunkNPCSpawns(cx, cz, this.seed,
            (wx, wz) => this.cityInfo(wx, wz));
          this.npcs.spawnForChunk(k, spawns);
          const carSpawns = getChunkCarSpawns(cx, cz, this.seed,
            (wx, wz) => this.cityInfo(wx, wz));
          this.cars.spawnForChunk(k, carSpawns);
          const trafficSpawns = getChunkTrafficSpawns(cx, cz, this.seed,
            (wx, wz) => this.cityInfo(wx, wz));
          this.traffic.spawnForChunk(k, trafficSpawns);
          const shopSpawns = getChunkShopkeeperSpawns(cx, cz, this.seed,
            (wx, wz) => this.cityInfo(wx, wz));
          this.npcs.spawnForChunk(k + ':shop', shopSpawns);
        }
      }
    }

    // Unload far chunks
    for (const [k, chunk] of this.chunks) {
      const dx = chunk.cx - pcx;
      const dz = chunk.cz - pcz;
      if (dx*dx + dz*dz > (RENDER_DIST + 2) * (RENDER_DIST + 2)) {
        this.npcs.despawnChunk(k);
        this.npcs.despawnChunk(k + ':shop');
        this.cars.despawnChunk(k);
        this.traffic.despawnChunk(k);
        chunk.dispose();
        this.chunks.delete(k);
      }
    }

    // Build one dirty chunk per frame (up to 3)
    let built = 0;
    while (this._pendingBuilds.length > 0 && built < 3) {
      const c = this._pendingBuilds.shift();
      if (c && c.data && c.dirty) {
        c.buildMesh(this.solidMat, this.transMat);
        built++;
      }
    }
  }

  // DDA voxel raycast — returns { wx, wy, wz, face } or null
  raycast(origin, direction, maxDist = 5) {
    let x = Math.floor(origin.x);
    let y = Math.floor(origin.y);
    let z = Math.floor(origin.z);

    const dx = direction.x, dy = direction.y, dz = direction.z;
    const sx = Math.sign(dx), sy = Math.sign(dy), sz = Math.sign(dz);

    const tDX = Math.abs(1/dx), tDY = Math.abs(1/dy), tDZ = Math.abs(1/dz);
    let tMX = dx > 0 ? (Math.ceil(origin.x) - origin.x) * tDX : (origin.x - Math.floor(origin.x)) * tDX;
    let tMY = dy > 0 ? (Math.ceil(origin.y) - origin.y) * tDY : (origin.y - Math.floor(origin.y)) * tDY;
    let tMZ = dz > 0 ? (Math.ceil(origin.z) - origin.z) * tDZ : (origin.z - Math.floor(origin.z)) * tDZ;

    let face = null;
    let dist = 0;

    while (dist < maxDist) {
      const b = this.getBlock(x, y, z);
      // Also detect DOOR_OPEN so players can right-click to close it
      if (b !== B.AIR && (B.isSolid(b) || b === B.DOOR_OPEN)) {
        return { wx: x, wy: y, wz: z, face };
      }

      if (tMX < tMY) {
        if (tMX < tMZ) { dist = tMX; x += sx; tMX += tDX; face = sx > 0 ? [-1,0,0] : [1,0,0]; }
        else           { dist = tMZ; z += sz; tMZ += tDZ; face = sz > 0 ? [0,0,-1] : [0,0,1]; }
      } else {
        if (tMY < tMZ) { dist = tMY; y += sy; tMY += tDY; face = sy > 0 ? [0,-1,0] : [0,1,0]; }
        else           { dist = tMZ; z += sz; tMZ += tDZ; face = sz > 0 ? [0,0,-1] : [0,0,1]; }
      }
      if (dist > maxDist) break;
    }
    return null;
  }

  // Searches outward from (8,8) in 4-block steps until it finds a surface block
  // that sits above SEA_LEVEL (i.e. dry land).  Returns null if no loaded chunk
  // has land yet — caller retries next frame.
  findLandSpawn() {
    for (let r = 0; r <= 12; r++) {
      for (let dx = -r; dx <= r; dx++) {
        for (let dz = -r; dz <= r; dz++) {
          if (Math.abs(dx) !== r && Math.abs(dz) !== r) continue; // only the shell
          const wx = 8 + dx * 4;
          const wz = 8 + dz * 4;
          const cx = Math.floor(wx / CHUNK_SIZE);
          const cz = Math.floor(wz / CHUNK_SIZE);
          if (!this.chunks.has(this.key(cx, cz))) continue;
          // Scan downward from just above sea level — any solid block here is land
          for (let y = CHUNK_HEIGHT - 1; y > SEA_LEVEL; y--) {
            if (B.isSolid(this.getBlock(wx, y, wz))) {
              return { x: wx + 0.5, y: y + 2, z: wz + 0.5 };
            }
          }
        }
      }
    }
    return null; // no land found in loaded chunks yet
  }
}
