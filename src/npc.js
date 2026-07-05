import * as THREE from 'three';
import {
  PLANKS, STONE, COBBLESTONE, GLASS, CONCRETE, TORCH, CHEST, BED,
  TOOL_PICKAXE, TOOL_AXE, TOOL_SHOVEL, TOOL_SWORD, TOOL_HOE,
  TOOL_PICKAXE_GOLD, TOOL_AXE_GOLD, TOOL_SWORD_GOLD,
  TOOL_PICKAXE_DIAMOND, TOOL_SWORD_DIAMOND,
  STICK, COAL, WOOL, GOLD_INGOT, DIAMOND, LANTERN, LADDER, FENCE,
  MEAT, RAW_FISH, FUR, FISHING_ROD,
} from './blocks.js';
import { getTreeForRole } from './dialogue.js';

// ── Outfits ───────────────────────────────────────────────────────────────────

const OUTFITS = {
  merchant: [
    { shirt:'#92400e', pants:'#1c1917', skin:'#f0c898', hair:'#1a0a00', hat:null },
    { shirt:'#78350f', pants:'#292524', skin:'#d4a070', hair:'#111',    hat:null },
    { shirt:'#b45309', pants:'#1c1917', skin:'#8b6248', hair:'#222',    hat:null },
    { shirt:'#d97706', pants:'#1c1917', skin:'#fbd0b8', hair:'#333',    hat:null },
  ],
  citizen: [
    { shirt:'#3b82f6', pants:'#1e3a5f', skin:'#f0c898', hair:'#3b1f00', hat:null },
    { shirt:'#ef4444', pants:'#1e1e2e', skin:'#d4a070', hair:'#1a0a00', hat:null },
    { shirt:'#10b981', pants:'#374151', skin:'#f0c898', hair:'#222',    hat:null },
    { shirt:'#8b5cf6', pants:'#1f1f2e', skin:'#d4a070', hair:'#333',    hat:null },
    { shirt:'#ec4899', pants:'#1e1e2e', skin:'#fbd0b8', hair:'#1a1a1a', hat:null },
    { shirt:'#f97316', pants:'#292524', skin:'#f0c898', hair:'#6b3d00', hat:null },
  ],
  builder: [
    { shirt:'#f59e0b', pants:'#78350f', skin:'#f0c898', hair:'#111', hat:'#f59e0b' },
    { shirt:'#d97706', pants:'#451a03', skin:'#d4a070', hair:'#222', hat:'#d97706' },
    { shirt:'#fbbf24', pants:'#292524', skin:'#8b6248', hair:'#333', hat:'#fbbf24' },
  ],
  police: [
    { shirt:'#1e3a5f', pants:'#172554', skin:'#f0c898', hair:'#1a0a00', hat:'#1e3a5f' },
    { shirt:'#1d4ed8', pants:'#1e3a5f', skin:'#d4a070', hair:'#111',    hat:'#1d4ed8' },
    { shirt:'#1e40af', pants:'#172554', skin:'#8b6248', hair:'#222',    hat:'#1e40af' },
  ],
  businessperson: [
    { shirt:'#4b5563', pants:'#1f2937', skin:'#f0c898', hair:'#1a0a00', hat:null },
    { shirt:'#6b7280', pants:'#111827', skin:'#d4a070', hair:'#333',    hat:null },
    { shirt:'#374151', pants:'#1f2937', skin:'#8b6248', hair:'#111',    hat:null },
    { shirt:'#9ca3af', pants:'#1f2937', skin:'#fbd0b8', hair:'#555',    hat:null },
  ],
  tourist: [
    { shirt:'#f472b6', pants:'#fef3c7', skin:'#f0c898', hair:'#b45309', hat:'#fde68a' },
    { shirt:'#34d399', pants:'#ecfdf5', skin:'#d4a070', hair:'#111',    hat:'#6ee7b7' },
    { shirt:'#60a5fa', pants:'#eff6ff', skin:'#fbd0b8', hair:'#92400e', hat:'#bfdbfe' },
    { shirt:'#fb923c', pants:'#fff7ed', skin:'#8b6248', hair:'#1a0a00', hat:'#fed7aa' },
  ],
  shopkeeper: [
    { shirt:'#6d28d9', pants:'#1f2937', skin:'#f0c898', hair:'#3b1f00', hat:null },
    { shirt:'#7c3aed', pants:'#111827', skin:'#d4a070', hair:'#1a0a00', hat:null },
    { shirt:'#5b21b6', pants:'#1f2937', skin:'#8b6248', hair:'#222',    hat:null },
    { shirt:'#4c1d95', pants:'#0f172a', skin:'#fbd0b8', hair:'#555',    hat:null },
  ],
  spider_hero: [
    { shirt:'#e53e3e', pants:'#1d4ed8', skin:'#f0c898', hair:'#1a0a00', hat:null },
    { shirt:'#dc2626', pants:'#1e40af', skin:'#fbd0b8', hair:'#111',    hat:null },
  ],
  shadow_knight: [
    { shirt:'#1a1a1a', pants:'#111111', skin:'#d4a070', hair:'#0d0d0d', hat:null },
    { shirt:'#0d0d0d', pants:'#1a1a1a', skin:'#8b6248', hair:'#111',    hat:null },
  ],
  kid_hero: [
    { shirt:'#e53e3e', pants:'#1a5c3a', skin:'#f0c898', hair:'#8b6248', hat:null },
    { shirt:'#dc2626', pants:'#166534', skin:'#fbd0b8', hair:'#92400e', hat:null },
  ],
  brute: [
    { shirt:'#22c55e', pants:'#9333ea', skin:'#22c55e', hair:'#15803d', hat:null },
    { shirt:'#16a34a', pants:'#7e22ce', skin:'#16a34a', hair:'#166534', hat:null },
  ],
  scrap_knight: [
    { shirt:'#dc2626', pants:'#d97706', skin:'#f0c898', hair:'#111',    hat:null },
    { shirt:'#b91c1c', pants:'#b45309', skin:'#d4a070', hair:'#1a0a00', hat:null },
  ],
};

// ── Dialogue ──────────────────────────────────────────────────────────────────

const DIALOGUE = {
  merchant: [
    "Welcome! Best prices in the city, guaranteed.",
    "Everything you need to build your empire.",
    "I've been in this spot for years — loyal customers only.",
    "Gold coins accepted, barter considered.",
    "Fresh stock just came in from the mines.",
    "You look like someone who needs a good pickaxe.",
  ],
  citizen: [
    "City life is hectic but I love every second of it.",
    "Have you seen the new skyscrapers going up north?",
    "There's wilderness beyond the city limits if you're brave.",
    "Welcome! I hope you find what you're looking for.",
    "I've been here for years — still discover new streets.",
    "Watch out around construction sites — falling blocks hurt!",
    "The underground tunnels below go on forever, they say.",
    "Don't forget — merchants sell supplies if you need them.",
    "I heard someone found diamonds under the old district.",
    "The fog rolls in at night. Stay close to the lights.",
  ],
  builder: [
    "Solid concrete and glass — that's how you build a real city.",
    "These towers took months. Worth every swing of the pickaxe.",
    "I'm on my lunch break, but happy to chat.",
    "The city keeps growing. We can barely keep up.",
    "Good foundations are everything. Don't skimp underground.",
    "We're pouring a new floor in the east wing tomorrow.",
    "The view from the top floor is incredible. Worth the climb.",
    "Steel scaffolding would be better, but concrete does the job.",
  ],
  police: [
    "Keep it moving, citizen.",
    "Stay safe out there — it's rough beyond the city limits.",
    "I've patrolled this block for years. Know every face.",
    "Report any suspicious block-breaking to the station.",
    "We had a griefer last week. Not on my watch again.",
    "The underground? You did NOT hear that from me.",
    "Eyes open at all times. That's the job.",
    "Had a call about a creeper sighting near the east wall.",
    "The mayor's pushing for better street lighting. About time.",
    "Nothing gets past me on this corner.",
  ],
  businessperson: [
    "Productivity is up 40% since we moved to this district.",
    "I'm late for a meeting on the 8th floor. Can't stop.",
    "Concrete prices are astronomical right now.",
    "Work hard, mine harder. That's my motto.",
    "The quarterly numbers don't lie — this city is booming.",
    "Have you visited the trading district? Best deals in town.",
    "Always carry gold coins — you never know when you'll need them.",
    "My firm handles imports from the outer biomes.",
    "Expansion plans are on the table. Big things coming.",
    "Time is gold. Literally, out here.",
  ],
  tourist: [
    "This city is incredible! Where did it all come from?",
    "I walked for days just to get here. Worth every step.",
    "Do you know the way to the trading district?",
    "Back home we only had dirt huts. This is paradise!",
    "How tall do these buildings go? I can barely see the top!",
    "I heard there are merchants who sell pickaxes here somewhere.",
    "The architecture is stunning. Especially those glass windows.",
    "I'm trying to visit every city before the fog closes in.",
    "Can you take my photo in front of that building?",
    "I've never seen asphalt before. Very smooth underfoot!",
  ],
  spider_hero: [
    "Just finished a rooftop sweep. Three biomes visible from up there.",
    "Watch out for griefers — I've been keeping this block clean.",
    "Need anything? I'm between patrols right now.",
    "Stay lit underground. Lava shows up fast past Y=10.",
    "The city looks best from above. Find a rooftop sometime.",
    "I sent three griefers packing this week. City's looking better.",
  ],
  shadow_knight: [
    "...",
    "Move along. Nothing to see here.",
    "I'm watching. Always watching.",
    "Stay in the light at night. Seriously.",
    "I've had my eye on this block all evening.",
    "Name's not important. The work is.",
  ],
  kid_hero: [
    "ON PATROL! Well — training patrol. But still!",
    "I found FOUR merchants today. Six more to go!",
    "My mentor says I need more patience. I say I need more missions.",
    "Did you know escalators are in the building corners? Super useful!",
    "Operation: Very Important Mission is going GREAT.",
    "I can climb almost to the third floor! Getting closer!",
  ],
  brute: [
    "...",
    "Brute patrol this sector.",
    "Today quiet. Good.",
    "You walk into Brute. Be more careful.",
    "Brute protect city. Is job now.",
    "Purple pants ripped again. Very frustrating.",
  ],
  scrap_knight: [
    "Mark VII is coming along. Most of the sparks are planned.",
    "Ignore the smoke — it's atmospheric. I've decided.",
    "Have you seen any spare iron ingots? Asking for a project.",
    "The snack dispenser will work eventually. I have full confidence.",
    "Four seconds of lava stability. That's enough for a snack.",
    "The hop is more of a controlled ballistic arc. There's a difference.",
  ],
};

// ── Shop inventories ──────────────────────────────────────────────────────────

export const SHOP_INVENTORIES = {
  hardware: [
    { id: PLANKS,      price:  3, count: 4,  label: 'Oak Planks ×4'    },
    { id: COBBLESTONE, price:  1, count: 8,  label: 'Cobblestone ×8'   },
    { id: STONE,       price:  2, count: 4,  label: 'Stone ×4'         },
    { id: GLASS,       price:  5, count: 2,  label: 'Glass ×2'         },
    { id: CONCRETE,    price:  4, count: 4,  label: 'Concrete ×4'      },
    { id: TORCH,       price:  2, count: 4,  label: 'Torch ×4'         },
    { id: LANTERN,     price:  8, count: 1,  label: 'Lantern'          },
    { id: CHEST,       price: 18, count: 1,  label: 'Chest'            },
    { id: WOOL,        price:  3, count: 4,  label: 'Wool ×4'          },
    { id: BED,         price: 14, count: 1,  label: 'Bed'              },
    { id: LADDER,      price:  2, count: 3,  label: 'Ladder ×3'        },
    { id: FENCE,       price:  2, count: 4,  label: 'Fence ×4'         },
  ],
  tools: [
    { id: TOOL_PICKAXE,         price: 20, count: 1, label: 'Stone Pickaxe'   },
    { id: TOOL_AXE,             price: 18, count: 1, label: 'Stone Axe'       },
    { id: TOOL_SHOVEL,          price: 14, count: 1, label: 'Stone Shovel'    },
    { id: TOOL_SWORD,           price: 24, count: 1, label: 'Stone Sword'     },
    { id: TOOL_HOE,             price: 12, count: 1, label: 'Hoe'             },
    { id: TOOL_PICKAXE_GOLD,    price: 45, count: 1, label: 'Gold Pickaxe'    },
    { id: TOOL_AXE_GOLD,        price: 40, count: 1, label: 'Gold Axe'        },
    { id: TOOL_SWORD_GOLD,      price: 55, count: 1, label: 'Gold Sword'      },
    { id: TOOL_PICKAXE_DIAMOND, price: 90, count: 1, label: 'Diamond Pickaxe' },
    { id: TOOL_SWORD_DIAMOND,   price:110, count: 1, label: 'Diamond Sword'   },
    { id: TORCH,                price:  2, count: 4, label: 'Torch ×4'        },
    { id: STICK,                price:  1, count: 8, label: 'Sticks ×8'       },
  ],
  food: [
    { id: MEAT,        price:  5, count: 2,  label: 'Meat ×2'          },
    { id: RAW_FISH,    price:  3, count: 2,  label: 'Raw Fish ×2'      },
    { id: FUR,         price:  4, count: 2,  label: 'Fur ×2'           },
    { id: FISHING_ROD, price: 18, count: 1,  label: 'Fishing Rod'      },
  ],
  general: [
    { id: COAL,        price:  3, count: 2,  label: 'Coal ×2'          },
    { id: STICK,       price:  1, count: 8,  label: 'Sticks ×8'        },
    { id: WOOL,        price:  3, count: 2,  label: 'Wool ×2'          },
    { id: PLANKS,      price:  2, count: 4,  label: 'Planks ×4'        },
    { id: COBBLESTONE, price:  1, count: 8,  label: 'Cobblestone ×8'   },
    { id: TORCH,       price:  2, count: 4,  label: 'Torch ×4'         },
    { id: GLASS,       price:  4, count: 2,  label: 'Glass ×2'         },
    { id: GOLD_INGOT,  price: 20, count: 1,  label: 'Gold Ingot'       },
    { id: DIAMOND,     price: 40, count: 1,  label: 'Diamond'          },
  ],
};

const SHOP_NAMES = [
  "City Hardware", "Tools & More", "Urban Supply Co.",
  "Builder's Paradise", "The General Store", "Metro Goods",
  "East Side Hardware", "Corner Supply", "Downtown Depot",
];

// Sell prices (what NPCs pay for player items): roughly half buy price
export const SELL_PRICES = {};
for (const inv of Object.values(SHOP_INVENTORIES)) {
  for (const item of inv) {
    if (!SELL_PRICES[item.id]) SELL_PRICES[item.id] = Math.max(1, Math.floor(item.price / 2));
  }
}
// Raw mined materials
SELL_PRICES[COAL]        = 1;
SELL_PRICES[STONE]       = 1;
SELL_PRICES[COBBLESTONE] = 1;
SELL_PRICES[PLANKS]      = 1;
SELL_PRICES[GLASS]       = 2;
SELL_PRICES[CONCRETE]    = 1;
SELL_PRICES[WOOL]        = 1;
SELL_PRICES[BED]         = 6;
SELL_PRICES[CHEST]       = 8;
SELL_PRICES[MEAT]        = 3;
SELL_PRICES[RAW_FISH]    = 2;
SELL_PRICES[FUR]         = 3;

const HERO_NAMES = {
  spider_hero:  ['Web-Walker', 'The Arachnid', 'Spider-Scout'],
  shadow_knight:['The Shadow Knight', 'Night Sentinel', 'The Dark Guardian'],
  kid_hero:     ['Kid Crusader', 'Junior Hero', 'The Sidekick'],
  brute:        ['The Brute', 'Big Green', 'The Green Guardian'],
  scrap_knight: ['The Iron Inventor', 'Scrap Knight', 'The Tinkerer'],
};

const CHEF_NAMES = ['Chef Romano','Chef Lin','Chef Okafor','Chef Santos','Chef Müller'];
const RESEARCHER_NAMES = [
  'Dr. Chen','Dr. Patel','Dr. Nguyen','Dr. Andersen','Prof. Rivera',
];

const FIRST_NAMES = ['Alex','Sam','Jordan','Taylor','Morgan','Casey','Riley',
                     'Drew','Blake','Quinn','Lee','Skyler','Avery','Reese',
                     'Jamie','Cameron','Sage','River','Finley','Emery'];
const LAST_NAMES  = ['Smith','Chen','Garcia','Kumar','Wilson','Park','Martinez',
                     'Brown','Lee','Patel','Okafor','Nguyen','Rossi','Müller',
                     'Santos','Kim','Andersen','Johansson','Ivanova','Nakamura'];

// ── Mesh helpers ──────────────────────────────────────────────────────────────

function mat(color) { return new THREE.MeshLambertMaterial({ color }); }
function box(w, h, d, m) { return new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); }

function srng(seed) {
  let s = ((seed * 1664525 + 1013904223) >>> 0);
  return () => { s = ((s * 1664525 + 1013904223) >>> 0); return s / 0xffffffff; };
}

const HP_TABLE = {
  merchant: 3, citizen: 3, builder: 4, police: 6, businessperson: 3, tourist: 2, shopkeeper: 3,
  spider_hero: 8, shadow_knight: 10, kid_hero: 5, brute: 20, scrap_knight: 12,
};

// ── NPC class ─────────────────────────────────────────────────────────────────

class NPC {
  constructor(scene, world, { wx, wy, wz, type, role, seed, wander = false }) {
    this.homePos = new THREE.Vector3(wx, wy, wz);
    this.pos     = new THREE.Vector3(wx, wy, wz); // tracks rendered position
    this.type    = type;
    this.role    = role || null;
    this.wander  = wander && type !== 'merchant' && type !== 'shopkeeper';
    this._world  = world;
    this.hp      = HP_TABLE[type] ?? 3;
    this._hitFlash   = 0;
    this._dying      = false;
    this._deathTimer = 0;

    const r = srng(seed);
    const pool   = OUTFITS[type] || OUTFITS.citizen;
    const outfit = pool[Math.floor(r() * pool.length)];
    const first  = FIRST_NAMES[Math.floor(r() * FIRST_NAMES.length)];
    const last   = LAST_NAMES [Math.floor(r() * LAST_NAMES.length)];

    if (type === 'merchant') {
      this.name     = SHOP_NAMES[Math.floor(r() * SHOP_NAMES.length)];
      const types   = Object.keys(SHOP_INVENTORIES);
      this.shopType = types[Math.floor(r() * types.length)];
      this.wares    = SHOP_INVENTORIES[this.shopType];
    } else if (type === 'shopkeeper') {
      // Dedicated building worker with branching conversation tree
      this.conversationTree = getTreeForRole(role);
      if (role === 'chef') {
        this.name = CHEF_NAMES[Math.floor(r() * CHEF_NAMES.length)];
        // Chefs can sell via their tough conversation path
        const types = Object.keys(SHOP_INVENTORIES);
        this.shopType = types[Math.floor(r() * types.length)];
        this.wares    = SHOP_INVENTORIES[this.shopType];
      } else if (role === 'office_worker') {
        this.name = `${first} ${last}`;
      } else if (role === 'researcher') {
        this.name = RESEARCHER_NAMES[Math.floor(r() * RESEARCHER_NAMES.length)];
      } else {
        // Default shopkeeper
        this.name = SHOP_NAMES[Math.floor(r() * SHOP_NAMES.length)];
        const types = Object.keys(SHOP_INVENTORIES);
        this.shopType = types[Math.floor(r() * types.length)];
        this.wares    = SHOP_INVENTORIES[this.shopType];
      }
    } else if (type === 'police') {
      this.name = `Officer ${last}`;
    } else if (type === 'builder') {
      this.name = `${first} (Builder)`;
    } else if (type === 'businessperson') {
      this.name = `${first} ${last}`;
    } else if (type === 'tourist') {
      this.name = `${first} (Visitor)`;
    } else if (HERO_NAMES[type]) {
      const pool = HERO_NAMES[type];
      this.name = pool[Math.floor(r() * pool.length)];
    } else {
      this.name = `${first} ${last}`;
    }

    // Any type with a matching tree gets one (heroes, shopkeepers via role, etc.)
    this.conversationTree = this.conversationTree || getTreeForRole(role || type) || null;

    this.dialog  = DIALOGUE[type] || DIALOGUE.citizen;
    this._dlgIdx = Math.floor(r() * this.dialog.length);
    this._phase  = r() * Math.PI * 2;

    // Wander state
    this._wanderTarget = this.homePos.clone();
    this._wanderTimer  = r() * 3; // stagger initial wander
    this._moving       = false;
    this._walkPhase    = 0;

    // ── Build mesh ────────────────────────────────────────────────────────
    const g = new THREE.Group();

    const skinM  = mat(outfit.skin);
    const shirtM = mat(outfit.shirt);
    const pantsM = mat(outfit.pants);
    const hairM  = mat(outfit.hair);

    // Legs
    const legL = box(0.24, 0.76, 0.28, pantsM);
    legL.position.set(-0.13, 0.38, 0);
    const legR = box(0.24, 0.76, 0.28, pantsM);
    legR.position.set( 0.13, 0.38, 0);
    this._legL = legL; this._legR = legR;
    g.add(legL, legR);

    // Torso
    const torso = box(0.54, 0.74, 0.3, shirtM);
    torso.position.set(0, 1.13, 0);
    g.add(torso);

    // Arms
    const armL = box(0.22, 0.66, 0.26, shirtM);
    armL.position.set(-0.38, 1.10, 0);
    const armR = box(0.22, 0.66, 0.26, shirtM);
    armR.position.set( 0.38, 1.10, 0);
    this._armL = armL; this._armR = armR;
    g.add(armL, armR);

    // Head
    const head = box(0.5, 0.5, 0.5, skinM);
    head.position.set(0, 1.76, 0);
    this._head = head;
    g.add(head);

    // Hair
    const hair = box(0.52, 0.16, 0.52, hairM);
    hair.position.set(0, 2.06, 0);
    g.add(hair);

    // Hat (builder hard hat / police cap)
    if (outfit.hat) {
      const hatM  = mat(outfit.hat);
      const brim  = box(0.64, 0.06, 0.64, hatM);
      brim.position.set(0, 2.00, 0);
      const top   = box(0.44, 0.22, 0.44, hatM);
      top.position.set(0, 2.16, 0);
      g.add(brim, top);

      // Police badge: small gold square on chest
      if (type === 'police') {
        const badge = box(0.10, 0.10, 0.02, mat('#fbbf24'));
        badge.position.set(-0.16, 1.22, 0.16);
        g.add(badge);
      }
    }

    // Business tie
    if (type === 'businessperson') {
      const tie = box(0.07, 0.40, 0.02, mat('#dc2626'));
      tie.position.set(0, 1.05, 0.16);
      g.add(tie);
    }

    // Tourist camera
    if (type === 'tourist') {
      const cam = box(0.14, 0.10, 0.08, mat('#1f2937'));
      cam.position.set(0.28, 1.22, 0.16);
      g.add(cam);
    }

    // Web-Walker: full-face mask, blue eye patches, chest symbol, wrist shooter
    if (type === 'spider_hero') {
      const redM  = mat(outfit.shirt);
      const blueM = mat(outfit.pants);
      const grayM = mat('#6b7280');
      const maskM = mat(outfit.shirt);
      const faceMask = box(0.50, 0.48, 0.02, maskM); faceMask.position.set(0, 1.76, 0.27); g.add(faceMask);
      const eyeL = box(0.14, 0.09, 0.03, blueM); eyeL.position.set(-0.12, 1.82, 0.28); g.add(eyeL);
      const eyeR = box(0.14, 0.09, 0.03, blueM); eyeR.position.set( 0.12, 1.82, 0.28); g.add(eyeR);
      const web  = box(0.20, 0.20, 0.02, blueM); web.position.set(0, 1.20, 0.16);       g.add(web);
      const ws   = box(0.18, 0.10, 0.20, grayM); ws.position.set(0.38, 0.78, 0);        g.add(ws);
    }

    // Shadow Knight: cowl, bat ears, glowing eye slits, cape, utility belt
    if (type === 'shadow_knight') {
      const blackM  = mat('#0d0d0d');
      const whiteM  = mat('#e2e8f0');
      const yellowM = mat('#fbbf24');
      const cowl = box(0.54, 0.54, 0.54, blackM); cowl.position.set(0, 1.76, 0); g.add(cowl);
      const earL = box(0.08, 0.22, 0.06, blackM); earL.position.set(-0.15, 2.14, 0); g.add(earL);
      const earR = box(0.08, 0.22, 0.06, blackM); earR.position.set( 0.15, 2.14, 0); g.add(earR);
      const eyeL = box(0.13, 0.05, 0.03, whiteM); eyeL.position.set(-0.12, 1.80, 0.28); g.add(eyeL);
      const eyeR = box(0.13, 0.05, 0.03, whiteM); eyeR.position.set( 0.12, 1.80, 0.28); g.add(eyeR);
      const cape = box(0.54, 1.00, 0.02, blackM); cape.position.set(0, 1.06, -0.18);    g.add(cape);
      const belt = box(0.54, 0.07, 0.05, yellowM); belt.position.set(0, 0.80, 0.16);    g.add(belt);
    }

    // Kid Crusader: eye mask, yellow cape, chest emblem
    if (type === 'kid_hero') {
      const blackM  = mat('#0d0d0d');
      const yellowM = mat('#fbbf24');
      const whiteM  = mat('#f8fafc');
      const mask = box(0.40, 0.08, 0.03, blackM);  mask.position.set(0, 1.80, 0.27);    g.add(mask);
      const cape = box(0.52, 0.60, 0.02, yellowM); cape.position.set(0, 1.18, -0.18);   g.add(cape);
      const embl = box(0.13, 0.18, 0.02, whiteM);  embl.position.set(0, 1.22, 0.16);    g.add(embl);
    }

    // The Brute: furrowed brow, torn shirt tears, belt
    if (type === 'brute') {
      const darkM   = mat('#15803d');
      const purpleM = mat(outfit.pants);
      const browL = box(0.16, 0.06, 0.03, darkM);   browL.position.set(-0.12, 1.88, 0.27); g.add(browL);
      const browR = box(0.16, 0.06, 0.03, darkM);   browR.position.set( 0.12, 1.88, 0.27); g.add(browR);
      const tearL = box(0.10, 0.30, 0.03, darkM);   tearL.position.set(-0.26, 1.10, 0.16); g.add(tearL);
      const tearR = box(0.10, 0.30, 0.03, darkM);   tearR.position.set( 0.26, 1.10, 0.16); g.add(tearR);
      const belt  = box(0.54, 0.08, 0.04, purpleM); belt.position.set(0, 0.80, 0.16);      g.add(belt);
    }

    // Scrap Knight: gold faceplate, glowing eye slits, shoulder pauldrons, arc reactor
    if (type === 'scrap_knight') {
      const goldM = mat('#d97706');
      const glowM = mat('#7dd3fc');
      const redM  = mat(outfit.shirt);
      const plate = box(0.50, 0.28, 0.03, goldM); plate.position.set(0, 1.68, 0.27);      g.add(plate);
      const eyeL  = box(0.13, 0.05, 0.04, glowM); eyeL.position.set(-0.10, 1.78, 0.28);  g.add(eyeL);
      const eyeR  = box(0.13, 0.05, 0.04, glowM); eyeR.position.set( 0.10, 1.78, 0.28);  g.add(eyeR);
      const pauL  = box(0.28, 0.14, 0.30, redM);  pauL.position.set(-0.45, 1.42, 0);     g.add(pauL);
      const pauR  = box(0.28, 0.14, 0.30, redM);  pauR.position.set( 0.45, 1.42, 0);     g.add(pauR);
      const arc   = box(0.14, 0.14, 0.03, glowM); arc.position.set(0, 1.22, 0.16);        g.add(arc);
    }

    g.position.copy(this.homePos);
    scene.add(g);
    this._group = g;
  }

  _isBlocked(nx, nz) {
    if (!this._world) return false;
    const by = Math.floor(this.homePos.y);
    for (const [ox, oz] of [[0,0],[1,0],[0,1],[1,1]]) {
      const cx = Math.floor(nx + (ox - 0.5) * 0.35);
      const cz = Math.floor(nz + (oz - 0.5) * 0.35);
      if (this._world.isSolid(cx, by, cz)) return true;
      if (this._world.isSolid(cx, by + 1, cz)) return true;
      if (!this._world.isSolid(cx, by - 1, cz)) return true; // no floor → don't float
    }
    return false;
  }

  takeDamage(amount) {
    if (this._dying) return;
    this.hp -= amount;
    this._hitFlash = 0.25;
    if (this.hp <= 0) this._dying = true;
  }

  _setEmissive(hex) {
    this._group.traverse(o => {
      if (o.isMesh && o.material.emissive) o.material.emissive.setHex(hex);
    });
  }

  update(dt, playerPos) {
    // ── Death animation ────────────────────────────────────────────────────
    if (this._dying) {
      this._deathTimer += dt;
      const t = Math.min(this._deathTimer / 0.7, 1);
      this._group.rotation.z = t * Math.PI / 2;
      this._group.position.y = this.homePos.y - t * 0.6;
      if (t >= 1) {
        // Fade out
        const fade = Math.max(0, 1 - (this._deathTimer - 0.7) / 0.4);
        this._group.traverse(o => {
          if (o.isMesh) { o.material.transparent = true; o.material.opacity = fade; }
        });
        if (this._deathTimer > 1.1) {
          this.dispose();
          return true; // signal removal
        }
      }
      return false;
    }

    this._phase += dt * 1.1;

    // Hit flash
    if (this._hitFlash > 0) {
      this._hitFlash -= dt;
      this._setEmissive(this._hitFlash > 0 ? 0x661111 : 0x000000);
    }

    // ── Wandering ─────────────────────────────────────────────────────────
    if (this.talking) {
      // Stop in place and face the player while in conversation
      this._moving = false;
      this._legL.rotation.x *= 0.8;
      this._legR.rotation.x *= 0.8;
      this._armL.rotation.x *= 0.8;
      this._armR.rotation.x *= 0.8;
      if (playerPos) {
        const tx = Math.atan2(playerPos.x - this.pos.x, playerPos.z - this.pos.z);
        const dy = tx - this._group.rotation.y;
        this._group.rotation.y += Math.sin(dy) * Math.min(1, dt * 6);
      }
    } else if (this.wander) {
      this._wanderTimer -= dt;
      if (this._wanderTimer <= 0) {
        const r = srng(Math.floor(Date.now() / 4000) ^ (this.homePos.x * 31 + this.homePos.z));
        const angle = r() * Math.PI * 2;
        const dist  = 3 + r() * 9;
        this._wanderTarget.set(
          this.homePos.x + Math.cos(angle) * dist,
          this.homePos.y,
          this.homePos.z + Math.sin(angle) * dist,
        );
        this._wanderTimer = 4 + r() * 6;
      }

      const dx = this._wanderTarget.x - this._group.position.x;
      const dz = this._wanderTarget.z - this._group.position.z;
      const d2 = dx * dx + dz * dz;
      this._moving = d2 > 0.04;

      if (this._moving) {
        const spd = 1.8 * dt;
        const mag = Math.sqrt(d2);
        const step = Math.min(spd, mag);
        const nx = this._group.position.x + (dx / mag) * step;
        const nz = this._group.position.z + (dz / mag) * step;

        if (!this._isBlocked(nx, nz)) {
          this._group.position.x = nx;
          this._group.position.z = nz;
        } else {
          // Collision — pick a new wander direction
          this._wanderTarget.copy(this._group.position);
          this._wanderTimer = 0;
        }
        this._group.position.y = this.homePos.y;

        // Face movement direction
        this._group.rotation.y = Math.atan2(dx, dz);
        this._walkPhase += dt * 7;

        // Walk animation
        const sw = Math.sin(this._walkPhase) * 0.45;
        this._legL.rotation.x =  sw;
        this._legR.rotation.x = -sw;
        this._armL.rotation.x = -sw * 0.7;
        this._armR.rotation.x =  sw * 0.7;
      } else {
        // Return limbs to rest
        this._legL.rotation.x *= 0.85;
        this._legR.rotation.x *= 0.85;
        this._armL.rotation.x *= 0.85;
        this._armR.rotation.x *= 0.85;
      }

      // Update pos to current rendered position for getNearest
      this.pos.copy(this._group.position);

    } else {
      // Stationary idle
      if (playerPos) {
        const tx = Math.atan2(playerPos.x - this.pos.x, playerPos.z - this.pos.z);
        const dy = tx - this._group.rotation.y;
        this._group.rotation.y += Math.sin(dy) * Math.min(1, dt * 3);
      }

      // Idle sway
      this._group.position.y = this.homePos.y + Math.sin(this._phase) * 0.025;

      // Gentle idle arm/head movement
      this._armL.rotation.x =  Math.sin(this._phase * 0.7) * 0.12;
      this._armR.rotation.x = -Math.sin(this._phase * 0.7) * 0.12;
    }

    // Head look (both idle and wandering)
    if (!this._moving) {
      this._head.rotation.y = Math.sin(this._phase * 0.4) * 0.28;
    } else {
      this._head.rotation.y *= 0.9;
    }

    return false; // alive
  }

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
  constructor(scene, world) {
    this._scene  = scene;
    this._world  = world;
    this._npcs   = new Map(); // key → NPC
    this._chunks = new Map(); // chunkKey → Set<key>
  }

  spawnForChunk(chunkKey, spawns) {
    if (this._chunks.has(chunkKey)) return;
    const keys = new Set();
    for (const s of spawns) {
      const k = `${s.wx.toFixed(1)},${s.wz.toFixed(1)},${s.type}`;
      if (!this._npcs.has(k)) {
        this._npcs.set(k, new NPC(this._scene, this._world, s));
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

  getNearest(playerPos, maxDist = 4) {
    let best = null, bd = maxDist * maxDist;
    for (const npc of this._npcs.values()) {
      const cp = npc.pos; // updated each frame for wanderers
      const dx = playerPos.x - cp.x;
      const dz = playerPos.z - cp.z;
      const d2 = dx * dx + dz * dz;
      if (d2 < bd) { bd = d2; best = npc; }
    }
    return best;
  }

  update(dt, playerPos) {
    for (const [k, npc] of this._npcs) {
      const dead = npc.update(dt, playerPos);
      if (dead) {
        this._npcs.delete(k);
        for (const keys of this._chunks.values()) keys.delete(k);
      }
    }
  }
}
