// Seeded RNG shared by all spawn/placement code.
//
// The seed is bit-mixed (splitmix32-style) before driving the LCG. A raw LCG's
// first outputs are linear in the seed, so neighbouring chunk seeds (which
// differ by a constant) produced slowly-ramping "random" values — entire
// regions rolled the same spawn counts (e.g. zero cars city-wide on some
// world seeds).
export function srng(seed) {
  let s = (seed * 2654435769) >>> 0; // fold float seeds into 32 bits
  s = Math.imul(s ^ (s >>> 16), 0x21f0aaad) >>> 0;
  s = Math.imul(s ^ (s >>> 15), 0x735a2d97) >>> 0;
  s = (s ^ (s >>> 15)) >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    s = Math.imul(s ^ (s >>> 16), 0x21f0aaad) >>> 0;
    s = (s ^ (s >>> 15)) >>> 0;
    return s / 0x100000000;
  };
}
