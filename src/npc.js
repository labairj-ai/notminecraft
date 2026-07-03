import * as THREE from 'three';
import {
  PLANKS, STONE, COBBLESTONE, GLASS, CONCRETE, TORCH, CHEST, BED,
  TOOL_PICKAXE, TOOL_AXE, TOOL_SHOVEL, TOOL_SWORD, TOOL_HOE,
  STICK, COAL, WOOL,
} from './blocks.js';

// ── Data ──────────────────────────────────────────────────────────────────────

const OUTFITS = [
  { shirt:'#3b82f6', pants:'#1e3a5f', skin:'#f0c898', hair:'#3b1f00' },
  { shirt:'#ef4444', pants:'#1e1e2e', skin:'#d4a070', hair:'#1a0a00' },
  { shirt:'#10b981', pants:'#374151', skin:'#f0c898', hair:'#222' },
  { shirt:'#f59e0b', pants:'#1e3a5f', skin:'#8b6248', hair:'#111' },
  { shirt:'#8b5cf6', pants:'#1f1f2e', skin:'#d4a070', hair:'#333' },
  { shirt:'#e2e8f0', pants:'#475569', skin:'#c8a070', hair:'#555' },
  { shirt:'#f97316', pants:'#292524', skin:'#f0c898', hair:'#6b3d00' },
  { shirt:'#ec4899', pants:'#1e1e2e', skin:'#fbd0b8', hair:'#1a1a1a' },
];

const FIRST_NAMES = ['Alex','Sam','Jordan','Taylor','Morgan','Casey','Riley',
                     'Drew','Blake','Quinn','Lee','Skyler','Avery','Reese'];
const LAST_NAMES  = ['Smith','Chen','Garcia','Kumar','Wilson','Park','Martinez',
                     'Brown','Lee','Patel','Okafor','Nguyen','Rossi','Müller'];
const SHOP_NAMES  = ["City Hardware","Tools & More","Urban Supply Co.",
                     "Builder's Paradise","The General Store","Metro Goods"];

const CITIZEN_LINES = [
  "City life is hectic but I love every second of it.",
  "Have you seen the new skyscrapers? They're massive.",
  "There's wilderness beyond the city limits if you're brave enough.",
  "Welcome to the city! I hope you find what you're looking for.",
  "The market district has the best deals in town.",
  "I've been here for years — still discover new streets every day.",
  "Watch out around construction sites — falling blocks hurt!",
  "The underground tunnels below the city go on forever.",
  "It rained last night. The streets smell amazing.",
  "Don't forget — merchants will sell you supplies if you need them.",
];

const BUILDER_LINES = [
  "Solid concrete and glass — that's how you build a real city.",
  "These towers took months. Worth every swing of the pickaxe.",
  "We use the best materials: concrete, stone, glass.",
  "I'm on my lunch break, but happy to chat.",
  "The city keeps growing. We can barely keep up.",
  "If you need supplies, find one of the merchants nearby.",
  "Good foundations are everything. Don't skimp underground.",
];

// ── Merchant inventories ──────────────────────────────────────────────────────
// Each entry: { id, price, count, label }
export const SHOP_INVENTORIES = {
  hardware: [
    { id: PLANKS,      price:  3, count: 4,  label: 'Oak Planks ×4'    },
    { id: COBBLESTONE, price:  1, count: 8,  label: 'Cobblestone ×8'   },
    { id: STONE,       price:  2, count: 4,  label: 'Stone ×4'         },
    { id: GLASS,       price:  5, count: 2,  label: 'Glass ×2'         },
    { id: CONCRETE,    price:  4, count: 4,  label: 'Concrete ×4'      },
    { id: TORCH,       price:  2, count: 4,  label: 'Torch ×4'         },
    { id: CHEST,       price: 18, count: 1,  label: 'Chest'            },
    { id: WOOL,        price:  3, count: 4,  label: 'Wool ×4'          },
    { id: BED,         price: 14, count: 1,  label: 'Bed'              },
  ],
  tools: [
    { id: TOOL_PICKAXE, price: 20, count: 1, label: 'Pickaxe'          },
    { id: TOOL_AXE,     price: 18, count: 1, label: 'Axe'              },
    { id: TOOL_SHOVEL,  price: 14, count: 1, label: 'Shovel'           },
    { id: TOOL_SWORD,   price: 24, count: 1, label: 'Sword'            },
    { id: TOOL_HOE,     price: 12, count: 1, label: 'Hoe'              },
    { id: TORCH,        price:  2, count: 4, label: 'Torch ×4'         },
    { id: STICK,        price:  1, count: 8, label: 'Sticks ×8'        },
  ],
  general: [
    { id: COAL,        price:  3, count: 2,  label: 'Coal ×2'          },
    { id: STICK,       price:  1, count: 8,  label: 'Sticks ×8'        },
    { id: WOOL,        price:  3, count: 2,  label: 'Wool ×2'          },
    { id: PLANKS,      price:  2, count: 4,  label: 'Planks ×4'        },
    { id: COBBLESTONE, price:  1, count: 8,  label: 'Cobblestone ×8'   },
    { id: TORCH,       price:  2, count: 4,  label: 'Torch ×4'         },
    { id: GLASS,       price:  4, count: 2,  label: 'Glass ×2'         },
  ],
};

// ── NPC meshes ────────────────────────────────────────────────────────────────

function mat(color) {
  return new THREE.MeshLambertMaterial({ color });
}

function box(w, h, d, m) {
  return new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
}

function srng(seed) {
  let s = ((seed * 1664525 + 1013904223) >>> 0);
  return () => { s = ((s * 1664525 + 1013904223) >>> 0); return s / 0xffffffff; };
}

// ── NPC class ─────────────────────────────────────────────────────────────────

class NPC {
  constructor(scene, { wx, wy, wz, type, seed }) {
    this.pos  = new THREE.Vector3(wx, wy, wz);
    this.type = type;

    const r = srng(seed);
    const outfit = OUTFITS[Math.floor(r() * OUTFITS.length)];
    const first  = FIRST_NAMES[Math.floor(r() * FIRST_NAMES.length)];
    const last   = LAST_NAMES[Math.floor(r() * LAST_NAMES.length)];

    if (type === 'merchant') {
      this.name = SHOP_NAMES[Math.floor(r() * SHOP_NAMES.length)];
      const types = Object.keys(SHOP_INVENTORIES);
      this.shopType  = types[Math.floor(r() * types.length)];
      this.wares     = SHOP_INVENTORIES[this.shopType];
      this.dialog    = ["Welcome! I've got the best deals in town.",
                        "Everything you need to build your empire!",
                        "Take a look at what I'm selling."];
    } else if (type === 'builder') {
      this.name   = `${first} (Builder)`;
      this.dialog = BUILDER_LINES;
    } else {
      this.name   = `${first} ${last}`;
      this.dialog = CITIZEN_LINES;
    }

    this._dlgIdx = Math.floor(r() * this.dialog.length);
    this._phase  = r() * Math.PI * 2; // idle animation phase

    // ── Build mesh (blocky humanoid) ──────────────────────────────────────
    const g = new THREE.Group();

    const skinM  = mat(outfit.skin);
    const shirtM = mat(outfit.shirt);
    const pantsM = mat(outfit.pants);
    const hairM  = mat(outfit.hair);

    // Legs
    const legL = box(0.23, 0.75, 0.28, pantsM);
    legL.position.set(-0.13, 0.375, 0);
    const legR = box(0.23, 0.75, 0.28, pantsM);
    legR.position.set( 0.13, 0.375, 0);
    this._legL = legL;
    this._legR = legR;
    g.add(legL, legR);

    // Torso
    const torso = box(0.52, 0.72, 0.3, shirtM);
    torso.position.set(0, 1.11, 0);
    g.add(torso);

    // Arms
    const armL = box(0.2, 0.65, 0.25, shirtM);
    armL.position.set(-0.37, 1.08, 0);
    const armR = box(0.2, 0.65, 0.25, shirtM);
    armR.position.set( 0.37, 1.08, 0);
    this._armL = armL;
    this._armR = armR;
    g.add(armL, armR);

    // Head
    const head = box(0.5, 0.5, 0.5, skinM);
    head.position.set(0, 1.73, 0);
    this._head = head;
    g.add(head);

    // Hair (cap on head)
    const hair = box(0.52, 0.18, 0.52, hairM);
    hair.position.set(0, 2.02, 0);
    g.add(hair);

    g.position.copy(this.pos);
    scene.add(g);
    this._group = g;
  }

  update(dt, playerPos) {
    this._phase += dt * 1.1;

    // Face player slowly
    if (playerPos) {
      const tx = Math.atan2(playerPos.x - this.pos.x, playerPos.z - this.pos.z);
      const dy = tx - this._group.rotation.y;
      this._group.rotation.y += Math.sin(dy) * Math.min(1, dt * 3);
    }

    // Gentle idle bob
    const bob = Math.sin(this._phase) * 0.03;
    this._group.position.y = this.pos.y + bob;

    // Arm swing (idle)
    this._armL.rotation.x =  Math.sin(this._phase * 0.7) * 0.15;
    this._armR.rotation.x = -Math.sin(this._phase * 0.7) * 0.15;

    // Head look (left/right)
    this._head.rotation.y = Math.sin(this._phase * 0.35) * 0.25;
  }

  // Return next dialog line (cycling)
  nextLine() {
    const line = this.dialog[this._dlgIdx];
    this._dlgIdx = (this._dlgIdx + 1) % this.dialog.length;
    return line;
  }

  dispose() {
    this._group.parent?.remove(this._group);
    this._group.traverse(o => {
      if (o.isMesh) { o.geometry.dispose(); o.material.dispose(); }
    });
  }
}

// ── NPCManager ────────────────────────────────────────────────────────────────

export class NPCManager {
  constructor(scene) {
    this._scene  = scene;
    this._npcs   = new Map(); // posKey → NPC
    this._chunks = new Map(); // chunkKey → Set<posKey>
  }

  spawnForChunk(chunkKey, spawns) {
    if (this._chunks.has(chunkKey)) return;
    const keys = new Set();
    for (const s of spawns) {
      const k = `${s.wx.toFixed(0)},${s.wz.toFixed(0)}`;
      if (!this._npcs.has(k)) {
        this._npcs.set(k, new NPC(this._scene, s));
      }
      keys.add(k);
    }
    this._chunks.set(chunkKey, keys);
  }

  despawnChunk(chunkKey) {
    const keys = this._chunks.get(chunkKey);
    if (!keys) return;
    for (const k of keys) {
      this._npcs.get(k)?.dispose();
      this._npcs.delete(k);
    }
    this._chunks.delete(chunkKey);
  }

  // Returns closest NPC within maxDist, or null
  getNearest(playerPos, maxDist = 4) {
    let best = null, bd = maxDist * maxDist;
    for (const npc of this._npcs.values()) {
      const dx = playerPos.x - npc.pos.x;
      const dz = playerPos.z - npc.pos.z;
      const d2 = dx * dx + dz * dz;
      if (d2 < bd) { bd = d2; best = npc; }
    }
    return best;
  }

  update(dt, playerPos) {
    for (const npc of this._npcs.values()) npc.update(dt, playerPos);
  }
}
