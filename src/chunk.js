import * as THREE from 'three';
import * as B from './blocks.js';
import { getAtlasUV } from './textures.js';
import { CHUNK_SIZE, CHUNK_HEIGHT, blockIndex, generateChunkData } from './terrain.js';

// Face definitions: [dir, vertices[4], faceSlot]
// Vertices follow BoxGeometry convention for correct CCW winding
const FACES = [
  { dir:[0,1,0],  v:[[0,1,1],[1,1,1],[1,1,0],[0,1,0]], slot:'top'    },
  { dir:[0,-1,0], v:[[0,0,0],[1,0,0],[1,0,1],[0,0,1]], slot:'bottom' },
  { dir:[0,0,1],  v:[[0,0,1],[1,0,1],[1,1,1],[0,1,1]], slot:'side'   },
  { dir:[0,0,-1], v:[[1,0,0],[0,0,0],[0,1,0],[1,1,0]], slot:'side'   },
  { dir:[1,0,0],  v:[[1,0,1],[1,0,0],[1,1,0],[1,1,1]], slot:'side'   },
  { dir:[-1,0,0], v:[[0,0,0],[0,0,1],[0,1,1],[0,1,0]], slot:'side'   },
];

// Directional shading (like Minecraft's per-face ambient occlusion approximation)
const FACE_SHADE = [1.0, 0.5, 0.8, 0.8, 0.6, 0.6];

export class Chunk {
  constructor(cx, cz, world) {
    this.cx = cx;
    this.cz = cz;
    this.world = world;
    this.worldX = cx * CHUNK_SIZE;
    this.worldZ = cz * CHUNK_SIZE;
    this.key = `${cx},${cz}`;

    this.data = null;
    this.solidMesh = null;
    this.transMesh = null;
    this.dirty = true;
  }

  generate(noise2D, noise3D) {
    this.data = generateChunkData(this.cx, this.cz, noise2D, noise3D, this.world.seed);
    this.dirty = true;
  }

  getLocal(x, y, z) {
    if (x < 0 || x >= CHUNK_SIZE || z < 0 || z >= CHUNK_SIZE || y < 0 || y >= CHUNK_HEIGHT) return B.AIR;
    return this.data[blockIndex(x, y, z)];
  }

  setLocal(x, y, z, id) {
    if (x < 0 || x >= CHUNK_SIZE || z < 0 || z >= CHUNK_SIZE || y < 0 || y >= CHUNK_HEIGHT) return;
    this.data[blockIndex(x, y, z)] = id;
    this.dirty = true;
  }

  _neighborBlock(x, y, z) {
    // handles cross-chunk lookups
    if (x >= 0 && x < CHUNK_SIZE && z >= 0 && z < CHUNK_SIZE) {
      return this.getLocal(x, y, z);
    }
    return this.world.getBlock(this.worldX + x, y, this.worldZ + z);
  }

  buildMesh(material, transMaterial) {
    this.disposeMeshes();

    const solid = { pos:[], norm:[], uv:[], color:[], idx:[] };
    const trans = { pos:[], norm:[], uv:[], color:[], idx:[] };
    let si = 0, ti = 0;

    for (let y = 0; y < CHUNK_HEIGHT; y++) {
      for (let z = 0; z < CHUNK_SIZE; z++) {
        for (let x = 0; x < CHUNK_SIZE; x++) {
          const id = this.getLocal(x, y, z);
          if (id === B.AIR) continue;

          const isT = B.isTransparent(id);
          const buf = isT ? trans : solid;
          let vi = isT ? ti : si;

          for (let fi = 0; fi < FACES.length; fi++) {
            const face = FACES[fi];
            const nx = x + face.dir[0];
            const ny = y + face.dir[1];
            const nz = z + face.dir[2];
            const nb = this._neighborBlock(nx, ny, nz);

            // Skip face if neighbor hides it
            if (!B.isTransparent(nb)) continue;
            // For transparent blocks: also skip if same type neighbour
            if (isT && nb === id) continue;

            const [tc, tr] = B.getTexCoord(id, face.slot);
            const { u0, u1, v0, v1 } = getAtlasUV(tc, tr);
            const shade = FACE_SHADE[fi];

            for (const [vx, vy, vz] of face.v) {
              buf.pos.push(this.worldX + x + vx, y + vy, this.worldZ + z + vz);
              buf.norm.push(...face.dir);
              buf.color.push(shade, shade, shade);
            }
            // UVs: v0,v1 correspond to atlasBottom,atlasTop for correct orientation
            buf.uv.push(u0,v1, u1,v1, u1,v0, u0,v0);
            buf.idx.push(vi, vi+1, vi+2, vi, vi+2, vi+3);
            vi += 4;
            if (isT) ti = vi; else si = vi;
          }
        }
      }
    }

    if (solid.idx.length > 0) {
      this.solidMesh = this._buildThreeMesh(solid, material);
      this.world.scene.add(this.solidMesh);
    }
    if (trans.idx.length > 0) {
      this.transMesh = this._buildThreeMesh(trans, transMaterial);
      this.world.scene.add(this.transMesh);
    }

    this.dirty = false;
  }

  _buildThreeMesh({ pos, norm, uv, color, idx }, mat) {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute('normal',   new THREE.Float32BufferAttribute(norm, 3));
    geo.setAttribute('uv',       new THREE.Float32BufferAttribute(uv, 2));
    geo.setAttribute('color',    new THREE.Float32BufferAttribute(color, 3));
    geo.setIndex(idx);
    geo.computeBoundingSphere();
    return new THREE.Mesh(geo, mat);
  }

  disposeMeshes() {
    if (this.solidMesh) {
      this.world.scene.remove(this.solidMesh);
      this.solidMesh.geometry.dispose();
      this.solidMesh = null;
    }
    if (this.transMesh) {
      this.world.scene.remove(this.transMesh);
      this.transMesh.geometry.dispose();
      this.transMesh = null;
    }
  }

  dispose() {
    this.disposeMeshes();
    this.data = null;
  }
}
