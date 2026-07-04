import * as THREE from 'three';
import { CHUNK_SIZE, CHUNK_HEIGHT, SEA_LEVEL } from './terrain.js';
import * as B from './blocks.js';
import { getCityInfo } from './city.js';

function mat(c) { return new THREE.MeshLambertMaterial({ color: c }); }
function box(w, h, d, m) { return new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); }
function srng(seed) {
  let s = (seed * 1664525 + 1013904223) >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 0xffffffff; };
}

// ── Animal mesh builders ──────────────────────────────────────────────────────
// All builders return { g (Group), legFL, legFR, legBL, legBR, head, [extras] }
// Legs are positioned at their centre Y so rotation.x creates a walking arc.

function makeSheep(r) {
  const g = new THREE.Group();
  const woolM = mat('#f2f2ee'); const skinM = mat('#aaa');
  const bW=0.72, bH=0.52, bD=0.44, lW=0.14, lH=0.38;
  const body = box(bW, bH, bD, woolM); body.position.set(0, lH + bH/2, 0); g.add(body);
  // Wool poof on top
  const poof = box(bW*0.9, bH*0.35, bD*0.85, woolM); poof.position.set(0, lH + bH + bH*0.15, 0); g.add(poof);
  function leg(sx, sz) { const l = box(lW, lH, lW, skinM); l.position.set(sx, lH/2, sz); g.add(l); return l; }
  const sx=bW*0.3, sz=bD*0.28;
  const legFL=leg(-sx,-sz), legFR=leg(sx,-sz), legBL=leg(-sx,sz), legBR=leg(sx,sz);
  const head = box(0.32, 0.28, 0.30, skinM); head.position.set(0, lH+bH*0.75, -bD/2-0.1); g.add(head);
  // Tiny ears
  const earM = mat('#999');
  const earL = box(0.06, 0.14, 0.05, earM); earL.position.set(-0.16, lH+bH+0.03, -bD/2-0.05); earL.rotation.z = 0.4; g.add(earL);
  const earR = box(0.06, 0.14, 0.05, earM); earR.position.set( 0.16, lH+bH+0.03, -bD/2-0.05); earR.rotation.z =-0.4; g.add(earR);
  return { g, legFL, legFR, legBL, legBR, head };
}

function makeCow(r) {
  const g = new THREE.Group();
  const bodyC = r() > 0.5 ? '#5c3a1a' : '#222'; // brown or black
  const bM = mat(bodyC); const spotM = mat('#f0f0f0'); const skinM = mat('#d4a070');
  const bW=0.94, bH=0.60, bD=0.52, lW=0.22, lH=0.52;
  const body = box(bW, bH, bD, bM); body.position.set(0, lH+bH/2, 0); g.add(body);
  // White spots
  const spot = box(bW*0.5, bH*0.6, 0.03, spotM); spot.position.set(0.12, lH+bH/2, bD/2+0.01); g.add(spot);
  function leg(sx, sz) { const l = box(lW, lH, lW, bM); l.position.set(sx, lH/2, sz); g.add(l); return l; }
  const sx=bW*0.31, sz=bD*0.30;
  const legFL=leg(-sx,-sz), legFR=leg(sx,-sz), legBL=leg(-sx,sz), legBR=leg(sx,sz);
  const headG = new THREE.Group(); headG.position.set(0, lH+bH*0.72, -bD/2);
  const skull = box(0.44, 0.38, 0.36, bM); skull.position.set(0, 0, -0.14); headG.add(skull);
  const snout = box(0.30, 0.24, 0.18, skinM); snout.position.set(0, -0.05, -0.32); headG.add(snout);
  g.add(headG);
  // Udder
  const udder = box(0.32, 0.12, 0.22, mat('#f0c0b0')); udder.position.set(0, lH+0.08, bD*0.2); g.add(udder);
  return { g, legFL, legFR, legBL, legBR, head: headG };
}

function makeHorse(r) {
  const g = new THREE.Group();
  const cols = ['#7a3a10','#3a2010','#888','#c8a060'][Math.floor(r()*4)];
  const bM = mat(cols); const maneM = mat('#2a1808'); const darkM = mat('#2a1808');
  const bW=1.0, bH=0.64, bD=0.48, lW=0.20, lH=0.72;
  const body = box(bW, bH, bD, bM); body.position.set(0, lH+bH/2, 0); g.add(body);
  function leg(sx, sz) { const l = box(lW, lH, lW, darkM); l.position.set(sx, lH/2, sz); g.add(l); return l; }
  const sx=bW*0.30, sz=bD*0.30;
  const legFL=leg(-sx,-sz), legFR=leg(sx,-sz), legBL=leg(-sx,sz), legBR=leg(sx,sz);
  // Neck
  const neck = box(0.28, 0.40, 0.24, bM); neck.position.set(0, lH+bH*0.8, -bD/2-0.06); neck.rotation.x = -0.3; g.add(neck);
  const head = box(0.28, 0.30, 0.40, bM); head.position.set(0, lH+bH*0.85+0.28, -bD/2-0.32); g.add(head);
  // Mane
  const mane = box(0.14, 0.40, 0.18, maneM); mane.position.set(0, lH+bH*0.85+0.30, -bD/2-0.10); g.add(mane);
  // Tail
  const tail = box(0.14, 0.38, 0.10, maneM); tail.position.set(0, lH+bH*0.72, bD/2+0.05); tail.rotation.x = 0.5; g.add(tail);
  return { g, legFL, legFR, legBL, legBR, head };
}

function makeDog(r) {
  const g = new THREE.Group();
  const coatColors = ['#c8820a','#8B5020','#f0d090','#222'][Math.floor(r()*4)];
  const bM = mat(coatColors); const skinM = mat(coatColors);
  const bW=0.60, bH=0.40, bD=0.38, lW=0.14, lH=0.36;
  const body = box(bW, bH, bD, bM); body.position.set(0, lH+bH/2, 0); g.add(body);
  function leg(sx, sz) { const l = box(lW, lH, lW, bM); l.position.set(sx, lH/2, sz); g.add(l); return l; }
  const sx=bW*0.30, sz=bD*0.28;
  const legFL=leg(-sx,-sz), legFR=leg(sx,-sz), legBL=leg(-sx,sz), legBR=leg(sx,sz);
  const head = box(0.30, 0.28, 0.28, bM); head.position.set(0, lH+bH*0.72, -bD/2-0.08); g.add(head);
  const snout = box(0.18, 0.14, 0.16, mat('#8B5020')); snout.position.set(0, lH+bH*0.56, -bD/2-0.20); g.add(snout);
  // Floppy ears
  const earM = mat('#7a4010');
  const earL = box(0.08, 0.18, 0.10, earM); earL.position.set(-0.18, lH+bH*0.72-0.06, -bD/2-0.04); earL.rotation.z = 0.3; g.add(earL);
  const earR = box(0.08, 0.18, 0.10, earM); earR.position.set( 0.18, lH+bH*0.72-0.06, -bD/2-0.04); earR.rotation.z =-0.3; g.add(earR);
  // Upright tail
  const tail = box(0.08, 0.26, 0.08, bM); tail.position.set(0, lH+bH*0.72, bD/2+0.04); tail.rotation.x = -0.6; g.add(tail);
  return { g, legFL, legFR, legBL, legBR, head };
}

function makeWolf(r) {
  const g = new THREE.Group();
  const bM = mat('#777'); const darkM = mat('#444');
  const bW=0.72, bH=0.48, bD=0.44, lW=0.16, lH=0.42;
  const body = box(bW, bH, bD, bM); body.position.set(0, lH+bH/2, 0); g.add(body);
  // Darker back saddle marking
  const saddle = box(bW*0.7, bH*0.4, bD*0.7, darkM); saddle.position.set(0, lH+bH*0.78, bD*0.04); g.add(saddle);
  function leg(sx, sz) { const l = box(lW, lH, lW, darkM); l.position.set(sx, lH/2, sz); g.add(l); return l; }
  const sx=bW*0.30, sz=bD*0.28;
  const legFL=leg(-sx,-sz), legFR=leg(sx,-sz), legBL=leg(-sx,sz), legBR=leg(sx,sz);
  const head = box(0.36, 0.32, 0.36, bM); head.position.set(0, lH+bH*0.76, -bD/2-0.10); g.add(head);
  const snout = box(0.22, 0.16, 0.22, darkM); snout.position.set(0, lH+bH*0.58, -bD/2-0.24); g.add(snout);
  // Pointy ears
  const earM = mat('#555');
  const earL = box(0.10, 0.16, 0.06, earM); earL.position.set(-0.14, lH+bH+0.12, -bD/2-0.06); g.add(earL);
  const earR = box(0.10, 0.16, 0.06, earM); earR.position.set( 0.14, lH+bH+0.12, -bD/2-0.06); g.add(earR);
  // Bushy tail
  const tail = box(0.16, 0.30, 0.14, bM); tail.position.set(0, lH+bH*0.72, bD/2+0.06); tail.rotation.x = 0.7; g.add(tail);
  return { g, legFL, legFR, legBL, legBR, head };
}

function makeGoat(r) {
  const g = new THREE.Group();
  const light = r() > 0.5;
  const bM = mat(light ? '#ddd' : '#aaa'); const hornM = mat('#c8a060');
  const bW=0.66, bH=0.46, bD=0.40, lW=0.14, lH=0.40;
  const body = box(bW, bH, bD, bM); body.position.set(0, lH+bH/2, 0); g.add(body);
  function leg(sx, sz) { const l = box(lW, lH, lW, bM); l.position.set(sx, lH/2, sz); g.add(l); return l; }
  const sx=bW*0.30, sz=bD*0.28;
  const legFL=leg(-sx,-sz), legFR=leg(sx,-sz), legBL=leg(-sx,sz), legBR=leg(sx,sz);
  const head = box(0.30, 0.28, 0.30, bM); head.position.set(0, lH+bH*0.76, -bD/2-0.08); g.add(head);
  // Horns
  const hornL = box(0.06, 0.18, 0.06, hornM); hornL.position.set(-0.12, lH+bH+0.16, -bD/2-0.04); hornL.rotation.z = 0.2; g.add(hornL);
  const hornR = box(0.06, 0.18, 0.06, hornM); hornR.position.set( 0.12, lH+bH+0.16, -bD/2-0.04); hornR.rotation.z =-0.2; g.add(hornR);
  // Beard
  const beard = box(0.08, 0.14, 0.06, mat('#ccc')); beard.position.set(0, lH+bH*0.42, -bD/2-0.14); g.add(beard);
  return { g, legFL, legFR, legBL, legBR, head };
}

function makeRabbit(r) {
  const g = new THREE.Group();
  const col = r() > 0.4 ? '#f0f0ee' : '#c8b090';
  const bM = mat(col); const earM = mat(col); const noseM = mat('#f070a0');
  const bW=0.30, bH=0.32, bD=0.26, lW=0.10, lH=0.22;
  const body = box(bW, bH, bD, bM); body.position.set(0, lH+bH/2+0.06, 0); g.add(body);
  // Big back haunches
  const haunches = box(bW*0.9, bH*0.6, bD*0.7, bM); haunches.position.set(0, lH+0.14, bD*0.2); g.add(haunches);
  function leg(sx, sz) { const l = box(lW, lH, lW, bM); l.position.set(sx, lH/2, sz); g.add(l); return l; }
  const legFL=leg(-bW*0.28,-bD*0.22), legFR=leg(bW*0.28,-bD*0.22);
  const legBL=leg(-bW*0.26,bD*0.24), legBR=leg(bW*0.26,bD*0.24);
  const head = box(0.24, 0.22, 0.22, bM); head.position.set(0, lH+bH+0.08, -bD/2-0.02); g.add(head);
  // Long ears
  const earL = box(0.06, 0.28, 0.06, earM); earL.position.set(-0.08, lH+bH+0.30, -bD/2+0.02); g.add(earL);
  const earR = box(0.06, 0.28, 0.06, earM); earR.position.set( 0.08, lH+bH+0.30, -bD/2+0.02); g.add(earR);
  const nose = box(0.06, 0.06, 0.02, noseM); nose.position.set(0, lH+bH+0.06, -bD/2-0.12); g.add(nose);
  return { g, legFL, legFR, legBL, legBR, head };
}

function makeDeer(r) {
  const g = new THREE.Group();
  const bM = mat('#9a5a20'); const darkM = mat('#6a3a10'); const antlerM = mat('#7a5030');
  const bW=0.78, bH=0.56, bD=0.46, lW=0.15, lH=0.68;
  const body = box(bW, bH, bD, bM); body.position.set(0, lH+bH/2, 0); g.add(body);
  // White belly
  const belly = box(bW*0.6, bH*0.4, 0.04, mat('#f0e8d0')); belly.position.set(0, lH+bH*0.35, bD/2+0.01); g.add(belly);
  function leg(sx, sz) { const l = box(lW, lH, lW, darkM); l.position.set(sx, lH/2, sz); g.add(l); return l; }
  const sx=bW*0.30, sz=bD*0.28;
  const legFL=leg(-sx,-sz), legFR=leg(sx,-sz), legBL=leg(-sx,sz), legBR=leg(sx,sz);
  const head = box(0.26, 0.30, 0.30, bM); head.position.set(0, lH+bH*0.82, -bD/2-0.08); g.add(head);
  const snout = box(0.18, 0.16, 0.16, mat('#c09060')); snout.position.set(0, lH+bH*0.66, -bD/2-0.20); g.add(snout);
  // Antlers (only on larger deer, ~60%)
  if (r() > 0.4) {
    const aL = box(0.04, 0.28, 0.04, antlerM); aL.position.set(-0.10, lH+bH+0.24, -bD/2-0.04); aL.rotation.z = 0.15; g.add(aL);
    const aR = box(0.04, 0.28, 0.04, antlerM); aR.position.set( 0.10, lH+bH+0.24, -bD/2-0.04); aR.rotation.z =-0.15; g.add(aR);
    // Branch
    const bL = box(0.14, 0.04, 0.04, antlerM); bL.position.set(-0.14, lH+bH+0.32, -bD/2-0.04); g.add(bL);
    const bR = box(0.14, 0.04, 0.04, antlerM); bR.position.set( 0.14, lH+bH+0.32, -bD/2-0.04); g.add(bR);
  }
  return { g, legFL, legFR, legBL, legBR, head };
}

function makeFrog(r) {
  const g = new THREE.Group();
  const greenC = r() > 0.5 ? '#3a9a30' : '#5ab040';
  const bM = mat(greenC); const bellyM = mat('#c0e090'); const eyeM = mat('#f8f800');
  const bW=0.48, bH=0.20, bD=0.42;
  const body = box(bW, bH, bD, bM); body.position.set(0, bH/2+0.06, 0); g.add(body);
  // Belly
  const belly = box(bW*0.7, bH*0.5, 0.03, bellyM); belly.position.set(0, bH*0.4, bD/2+0.01); g.add(belly);
  // Front legs (small)
  const flL = box(0.20, 0.08, 0.08, bM); flL.position.set(-bW*0.52, 0.10, -bD*0.3); g.add(flL);
  const flR = box(0.20, 0.08, 0.08, bM); flR.position.set( bW*0.52, 0.10, -bD*0.3); g.add(flR);
  // Back legs (wide bent)
  const blL = box(0.12, 0.10, 0.28, bM); blL.position.set(-bW*0.52, 0.10, bD*0.28); blL.rotation.y =-0.7; g.add(blL);
  const blR = box(0.12, 0.10, 0.28, bM); blR.position.set( bW*0.52, 0.10, bD*0.28); blR.rotation.y = 0.7; g.add(blR);
  // Head / big eyes
  const head = box(bW*0.88, bH*0.80, 0.22, bM); head.position.set(0, bH*0.7, -bD/2+0.02); g.add(head);
  const eyeL = box(0.12, 0.12, 0.10, eyeM); eyeL.position.set(-0.16, bH+0.08, -bD/2+0.04); g.add(eyeL);
  const eyeR = box(0.12, 0.12, 0.10, eyeM); eyeR.position.set( 0.16, bH+0.08, -bD/2+0.04); g.add(eyeR);
  const pupilL = box(0.06, 0.06, 0.04, mat('#000')); pupilL.position.set(-0.16, bH+0.08, -bD/2); g.add(pupilL);
  const pupilR = box(0.06, 0.06, 0.04, mat('#000')); pupilR.position.set( 0.16, bH+0.08, -bD/2); g.add(pupilR);
  return { g, legFL: flL, legFR: flR, legBL: blL, legBR: blR, head };
}

function makeTurtle(r) {
  const g = new THREE.Group();
  const shellM = mat('#6a4a20'); const shellTopM = mat('#7a8a30'); const skinM = mat('#4a7a30');
  const sW=0.68, sH=0.20, sD=0.58, lW=0.16, lH=0.12;
  // Shell base
  const shellBase = box(sW, sH, sD, shellM); shellBase.position.set(0, lH+sH/2, 0); g.add(shellBase);
  // Shell dome (slightly smaller, on top)
  const shellDome = box(sW*0.86, sH*1.1, sD*0.86, shellTopM); shellDome.position.set(0, lH+sH+sH*0.4, 0); g.add(shellDome);
  // Shell pattern lines
  const lineH = box(sW*0.82, 0.03, 0.04, mat('#5a6a20')); lineH.position.set(0, lH+sH+sH*0.5, 0); g.add(lineH);
  // Short stubby legs
  function leg(sx, sz) { const l = box(lW, lH, lW*1.5, skinM); l.position.set(sx, lH/2, sz); g.add(l); return l; }
  const legFL=leg(-sW*0.38,-sD*0.28), legFR=leg(sW*0.38,-sD*0.28);
  const legBL=leg(-sW*0.38,sD*0.28),  legBR=leg(sW*0.38,sD*0.28);
  // Head
  const head = box(0.22, 0.18, 0.24, skinM); head.position.set(0, lH+sH*0.5, -sD/2-0.06); g.add(head);
  return { g, legFL, legFR, legBL, legBR, head };
}

function makeFish(r) {
  const g = new THREE.Group();
  const fishColors = ['#f06020','#2060f0','#f0c020','#20c060','#c040c0'][Math.floor(r()*5)];
  const bM = mat(fishColors); const finM = mat(fishColors); const eyeM = mat('#fff');
  const bW=0.54, bH=0.22, bD=0.28;
  // Main body (tapered = multiple boxes)
  const bodyMid = box(bW, bH, bD, bM); bodyMid.position.set(0, 0, 0); g.add(bodyMid);
  const bodyHead = box(bW*0.7, bH*0.85, bD*0.6, bM); bodyHead.position.set(0, 0, -bD*0.7); g.add(bodyHead);
  const bodyTailBase = box(bW*0.5, bH*0.65, bD*0.55, bM); bodyTailBase.position.set(0, 0, bD*0.72); g.add(bodyTailBase);
  // Tail fin
  const tail = box(bW*0.6, bH*1.2, 0.06, finM); tail.position.set(0, 0, bD+0.08); g.add(tail);
  // Dorsal fin
  const dorsal = box(bW*0.5, bH*0.7, 0.06, finM); dorsal.position.set(0, bH*0.86, 0); dorsal.rotation.x = Math.PI/2; g.add(dorsal);
  // Side fins
  const finL = box(0.14, 0.05, 0.18, finM); finL.position.set(-bW/2-0.04, 0, -bD*0.1); finL.rotation.z = 0.4; g.add(finL);
  const finR = box(0.14, 0.05, 0.18, finM); finR.position.set( bW/2+0.04, 0, -bD*0.1); finR.rotation.z =-0.4; g.add(finR);
  // Eye
  const eye = box(0.08, 0.08, 0.04, eyeM); eye.position.set(-bW*0.36, 0.04, -bD*0.6-0.08); g.add(eye);
  return { g, tail };
}

// ── Per-type config ───────────────────────────────────────────────────────────
const ANIMAL_CFG = {
  sheep:  { speed: 1.2, flee: true,  fleeR: 5,  legsPhase: 8 },
  cow:    { speed: 1.4, flee: true,  fleeR: 4,  legsPhase: 7 },
  horse:  { speed: 3.5, flee: true,  fleeR: 7,  legsPhase: 12 },
  dog:    { speed: 2.2, flee: false, fleeR: 0,  legsPhase: 10 },
  wolf:   { speed: 2.4, flee: false, fleeR: 0,  legsPhase: 11 },
  goat:   { speed: 1.8, flee: true,  fleeR: 5,  legsPhase: 9 },
  rabbit: { speed: 3.2, flee: true,  fleeR: 6,  legsPhase: 16, hop: true },
  deer:   { speed: 2.8, flee: true,  fleeR: 8,  legsPhase: 13 },
  frog:   { speed: 0.9, flee: true,  fleeR: 4,  legsPhase: 8,  hop: true },
  turtle: { speed: 0.4, flee: true,  fleeR: 3,  legsPhase: 4 },
  fish:   { speed: 1.6, flee: false, fleeR: 0,  legsPhase: 8,  swim: true },
};

const BUILDERS = { sheep:makeSheep, cow:makeCow, horse:makeHorse, dog:makeDog,
  wolf:makeWolf, goat:makeGoat, rabbit:makeRabbit, deer:makeDeer,
  frog:makeFrog, turtle:makeTurtle, fish:makeFish };

// ── Animal class ──────────────────────────────────────────────────────────────
class Animal {
  constructor(scene, world, { wx, wy, wz, type, seed }) {
    this.pos      = new THREE.Vector3(wx, wy, wz);
    this.homePos  = new THREE.Vector3(wx, wy, wz);
    this.type     = type;
    this._world   = world;
    this._phase   = 0;
    this._walkPh  = 0;
    this._moving  = false;
    this._fleeing = false;
    this._hopTimer  = 0;
    this._hopVelY   = 0;
    this._hopOffY   = 0;
    this._velY      = 0;  // vertical velocity for gravity

    const r = srng(seed);
    this._stagger = r() * Math.PI * 2; // stagger phase so animals aren't in sync

    // Wander state
    this._wanderTarget = this.pos.clone();
    this._wanderTimer  = r() * 4;

    // Build mesh
    const builder = BUILDERS[type] || makeSheep;
    const parts = builder(r);
    this._group = parts.g;
    this._parts = parts;
    this._group.position.copy(this.pos);
    scene.add(this._group);
  }

  _isBlocked(nx, nz) {
    const by = Math.floor(this.homePos.y) + 1;
    for (const [ox, oz] of [[0,0],[1,0],[0,1],[1,1]]) {
      const cx = Math.floor(nx + (ox - 0.5) * 0.25);
      const cz = Math.floor(nz + (oz - 0.5) * 0.25);
      if (B.isSolid(this._world.getBlock(cx, by, cz))) return true;
    }
    return false;
  }

  update(dt, playerPos) {
    const cfg = ANIMAL_CFG[this.type] || ANIMAL_CFG.sheep;
    this._phase += dt;

    // ── Fish: special swimming update ────────────────────────────────────────
    if (cfg.swim) {
      this._walkPh += dt * cfg.legsPhase;
      // Gentle side-to-side body rock
      this._group.rotation.z = Math.sin(this._walkPh * 0.5) * 0.12;
      // Tail wiggle
      if (this._parts.tail) this._parts.tail.rotation.y = Math.sin(this._walkPh) * 0.5;

      this._wanderTimer -= dt;
      if (this._wanderTimer <= 0) {
        const angle = Math.random() * Math.PI * 2;
        const dist  = 3 + Math.random() * 8;
        this._wanderTarget.set(
          this.homePos.x + Math.cos(angle) * dist,
          this.homePos.y,
          this.homePos.z + Math.sin(angle) * dist,
        );
        this._wanderTimer = 3 + Math.random() * 5;
      }
      const dx = this._wanderTarget.x - this._group.position.x;
      const dz = this._wanderTarget.z - this._group.position.z;
      const d2 = dx*dx + dz*dz;
      if (d2 > 0.1) {
        const mag = Math.sqrt(d2);
        const spd = cfg.speed * dt;
        this._group.position.x += (dx/mag) * Math.min(spd, mag);
        this._group.position.z += (dz/mag) * Math.min(spd, mag);
        this._group.rotation.y = Math.atan2(dx, dz);
      }
      this.pos.copy(this._group.position);
      return false;
    }

    // ── Flee from player ──────────────────────────────────────────────────────
    let speed = cfg.speed;
    this._fleeing = false;
    if (cfg.flee && playerPos) {
      const dx = this._group.position.x - playerPos.x;
      const dz = this._group.position.z - playerPos.z;
      const d2 = dx*dx + dz*dz;
      if (d2 < cfg.fleeR * cfg.fleeR) {
        const mag = Math.sqrt(d2) || 1;
        const fleeX = this._group.position.x + (dx/mag) * 12;
        const fleeZ = this._group.position.z + (dz/mag) * 12;
        this._wanderTarget.set(fleeX, this.homePos.y, fleeZ);
        this._wanderTimer = 2;
        speed = cfg.speed * 2.4;
        this._fleeing = true;
      }
    }

    // ── Wander ────────────────────────────────────────────────────────────────
    this._wanderTimer -= dt;
    if (this._wanderTimer <= 0) {
      const angle = (this._stagger + this._phase * 0.3 + Math.random() * Math.PI * 2);
      const dist  = 4 + Math.random() * 10;
      this._wanderTarget.set(
        this.homePos.x + Math.cos(angle) * dist,
        this.homePos.y,
        this.homePos.z + Math.sin(angle) * dist,
      );
      this._wanderTimer = 3 + Math.random() * 6;
    }

    const dx = this._wanderTarget.x - this._group.position.x;
    const dz = this._wanderTarget.z - this._group.position.z;
    const d2 = dx*dx + dz*dz;
    this._moving = d2 > 0.05;

    // ── Horizontal movement ───────────────────────────────────────────────────
    if (this._moving) {
      const mag = Math.sqrt(d2);
      const step = Math.min(speed * dt, mag);
      const nx = this._group.position.x + (dx/mag) * step;
      const nz = this._group.position.z + (dz/mag) * step;
      if (!this._isBlocked(nx, nz)) {
        this._group.position.x = nx;
        this._group.position.z = nz;
      } else {
        this._wanderTarget.copy(this._group.position);
        this._wanderTimer = 0;
      }
      this._group.rotation.y = Math.atan2(dx, dz);
      this._walkPh += dt * cfg.legsPhase;
    } else {
      this._walkPh *= 0.92;
    }

    // ── Ground tracking (land animals) ───────────────────────────────────────
    if (!cfg.swim) {
      const gx = Math.floor(this._group.position.x);
      const gz = Math.floor(this._group.position.z);
      const fromY = Math.floor(this._group.position.y);
      for (let dy = 0; dy <= 16; dy++) {
        if (fromY - dy < 0) break;
        if (this._world.isSolid(gx, fromY - dy, gz)) {
          this.homePos.y = (fromY - dy) + 0.5;
          break;
        }
      }
    }

    // ── Gravity (non-hop, non-swim land animals) ──────────────────────────────
    if (!cfg.swim && !cfg.hop) {
      this._velY -= 22 * dt;
      if (this._velY < -20) this._velY = -20;
      const rawY = this._group.position.y + this._velY * dt;
      if (rawY <= this.homePos.y) {
        this._group.position.y = this.homePos.y;
        this._velY = 0;
      } else {
        this._group.position.y = rawY;
      }
    }

    // ── Hop (rabbit / frog) ───────────────────────────────────────────────────
    if (cfg.hop) {
      this._hopTimer -= dt;
      if (this._moving && this._hopTimer <= 0 && this._hopOffY <= 0.01) {
        this._hopVelY = this.type === 'rabbit' ? 4.5 : 2.8;
        this._hopTimer = this.type === 'rabbit' ? 0.35 : 0.8;
      }
      this._hopVelY -= 18 * dt;
      this._hopOffY = Math.max(0, this._hopOffY + this._hopVelY * dt);
    }

    // ── Walk animation ────────────────────────────────────────────────────────
    const p = this._parts;
    if (p.legFL && p.legBR) {
      const sw = Math.sin(this._walkPh) * 0.55;
      p.legFL.rotation.x =  sw;
      p.legBR.rotation.x =  sw;
      p.legFR.rotation.x = -sw;
      p.legBL.rotation.x = -sw;
    }

    // Head bob (when moving)
    if (p.head && this._moving) {
      p.head.rotation.x = Math.sin(this._walkPh * 2) * 0.06;
    } else if (p.head) {
      p.head.rotation.x *= 0.9;
      p.head.rotation.y = Math.sin(this._phase * this._stagger * 0.1 + 0.5) * 0.2;
    }

    // ── Final Y position ──────────────────────────────────────────────────────
    if (cfg.hop) {
      this._group.position.y = this.homePos.y + this._hopOffY;
    } else if (!cfg.swim && this._velY === 0 && !this._moving) {
      // Idle body sway only when grounded and still
      this._group.position.y = this.homePos.y + Math.sin(this._phase * 0.8 + this._stagger) * 0.012;
    }
    // else: gravity code already set group.position.y

    this.pos.copy(this._group.position);
    return false;
  }

  dispose() {
    this._group.parent?.remove(this._group);
    this._group.traverse(o => {
      if (o.isMesh) { o.geometry.dispose(); o.material.dispose(); }
    });
  }
}

// ── AnimalManager ─────────────────────────────────────────────────────────────
export class AnimalManager {
  constructor(scene, world) {
    this._scene   = scene;
    this._world   = world;
    this._animals = new Map();
    this._chunks  = new Map();
  }

  spawnForChunk(chunkKey, spawns) {
    if (this._chunks.has(chunkKey)) return;
    const keys = new Set();
    for (const s of spawns) {
      const k = `animal:${s.wx.toFixed(1)},${s.wz.toFixed(1)},${s.type}`;
      if (!this._animals.has(k)) {
        this._animals.set(k, new Animal(this._scene, this._world, s));
      }
      keys.add(k);
    }
    this._chunks.set(chunkKey, keys);
  }

  despawnChunk(chunkKey) {
    const keys = this._chunks.get(chunkKey);
    if (!keys) return;
    for (const k of keys) {
      this._animals.get(k)?.dispose();
      this._animals.delete(k);
    }
    this._chunks.delete(chunkKey);
  }

  update(dt, playerPos) {
    for (const [k, animal] of this._animals) {
      animal.update(dt, playerPos);
    }
  }

  get _npcs() { return this._animals; } // expose same interface for minimap
}

// ── Chunk spawn logic ─────────────────────────────────────────────────────────
const GRASS_POOL  = ['sheep','sheep','sheep','cow','cow','horse','dog','dog','rabbit','rabbit','deer','deer','goat'];
const SNOW_POOL   = ['wolf','wolf','rabbit','rabbit','deer'];
const WATER_POOL  = ['fish','fish','fish','turtle'];
const SAND_POOL   = ['frog','frog','turtle'];
const FOREST_POOL = ['deer','deer','wolf','rabbit','rabbit','frog'];

export function getChunkAnimalSpawns(chunk, worldSeed, cityInfoFn) {
  const cx = chunk.cx, cz = chunk.cz;
  const r  = srng(cx * 73856093 ^ cz * 19349663 ^ (worldSeed | 0));

  // ~35% of chunks get animals
  if (r() > 0.35) return [];

  // Skip city chunks
  const centerWX = cx * CHUNK_SIZE + 8;
  const centerWZ = cz * CHUNK_SIZE + 8;
  if (cityInfoFn && cityInfoFn(centerWX, centerWZ)) return [];

  if (!chunk.data) return [];

  // Sample multiple points in the chunk to understand the terrain
  const samplePoints = [[4,4],[4,12],[12,4],[12,12],[8,8]];
  let surfBlock = 0, surfY = -1, waterCount = 0;

  for (const [lx, lz] of samplePoints) {
    for (let y = CHUNK_HEIGHT - 1; y >= 0; y--) {
      const b = chunk.data[lx + lz * CHUNK_SIZE + y * CHUNK_SIZE * CHUNK_SIZE];
      if (b !== 0) {
        if (surfY < 0) { surfY = y; surfBlock = b; }
        if (b === B.WATER) waterCount++;
        break;
      }
    }
  }

  if (surfY < 0) return [];

  // Pick animal pool based on biome
  let pool;
  if (surfBlock === B.WATER || waterCount >= 3) {
    pool = WATER_POOL;
  } else if (surfBlock === B.SNOW_BLOCK) {
    pool = SNOW_POOL;
  } else if (surfBlock === B.SAND) {
    pool = SAND_POOL;
  } else if (surfBlock === B.GRASS) {
    // Forest vs open grassland based on tree density (checked via humidity-like noise)
    const treeSeed = r();
    pool = treeSeed > 0.55 ? FOREST_POOL : GRASS_POOL;
  } else {
    return []; // stone/bedrock/etc — no animals
  }

  const isWater = (pool === WATER_POOL);
  const count = 1 + Math.floor(r() * (isWater ? 2 : 3));
  const spawns = [];

  for (let i = 0; i < count; i++) {
    const type  = pool[Math.floor(r() * pool.length)];
    const lx    = 1 + Math.floor(r() * 14);
    const lz    = 1 + Math.floor(r() * 14);
    const wx    = cx * CHUNK_SIZE + lx;
    const wz    = cz * CHUNK_SIZE + lz;

    // Find surface at this specific column
    let sy = -1;
    for (let y = CHUNK_HEIGHT - 1; y >= 0; y--) {
      const b = chunk.data[lx + lz * CHUNK_SIZE + y * CHUNK_SIZE * CHUNK_SIZE];
      if (b !== 0) { sy = y; break; }
    }
    if (sy < 0) continue;

    let wy;
    if (isWater) {
      // Fish & turtles spawn at water surface
      wy = SEA_LEVEL - 0.5;
    } else {
      if (sy <= SEA_LEVEL) continue; // skip underwater land
      wy = sy + 0.5;
    }

    spawns.push({ wx: wx + 0.5, wy, wz: wz + 0.5, type, seed: (r() * 1e9) | 0 });
  }

  return spawns;
}
