import * as THREE from 'three';
import { CITY_BASE_Y } from './city.js';

const _ironMat = new THREE.MeshLambertMaterial({ color: 0x1a1a1a });
const _lampMat = new THREE.MeshLambertMaterial({ color: 0xffe066, emissive: 0xffaa00, emissiveIntensity: 0.9 });

// Classic lamp-post: tall pole, horizontal arm, hanging amber lamp.
// `angle` rotates the whole group around Y so the arm faces the road.
function makeStreetlightMesh(angle) {
  const root = new THREE.Group();

  // Pole
  const pole = new THREE.Mesh(new THREE.BoxGeometry(0.13, 5.0, 0.13), _ironMat);
  pole.position.set(0, 2.5, 0);
  root.add(pole);

  // Pole cap (slightly wider)
  const cap = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.12, 0.22), _ironMat);
  cap.position.set(0, 5.06, 0);
  root.add(cap);

  // Horizontal arm extending in +Z
  const arm = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 1.05), _ironMat);
  arm.position.set(0, 5.08, 0.47);
  root.add(arm);

  // Short vertical drop at arm tip
  const drop = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.28, 0.1), _ironMat);
  drop.position.set(0, 4.96, 0.95);
  root.add(drop);

  // Lamp housing — amber, emissive
  const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.2, 0.3), _lampMat);
  lamp.position.set(0, 4.78, 0.95);
  root.add(lamp);

  root.rotation.y = angle;
  return root;
}

export class StreetlightManager {
  constructor(scene) {
    this._scene  = scene;
    this._chunks = new Map(); // chunkKey → THREE.Group[]
  }

  spawnForChunk(chunkKey, spawns) {
    if (this._chunks.has(chunkKey)) return;
    const meshes = [];
    for (const { wx, wz, angle } of spawns) {
      const g = makeStreetlightMesh(angle ?? 0);
      g.position.set(wx, CITY_BASE_Y + 1, wz);
      this._scene.add(g);
      meshes.push(g);
    }
    this._chunks.set(chunkKey, meshes);
  }

  despawnChunk(chunkKey) {
    const meshes = this._chunks.get(chunkKey);
    if (!meshes) return;
    for (const g of meshes) {
      this._scene.remove(g);
      g.traverse(child => {
        if (child.isMesh) {
          child.geometry.dispose();
        }
      });
    }
    this._chunks.delete(chunkKey);
  }
}
