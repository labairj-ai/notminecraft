// Branching conversation trees
// node: { text, options: [{text, next?, action?}] }
// action: 'buy' | 'sell' | 'close'

export const TREES = {

  // ── EASY: welcoming shopkeeper ──────────────────────────────────────────────
  shopkeeper: {
    mood: 'easy',
    start: 'welcome',
    nodes: {
      welcome: {
        text: "Welcome in! Best prices in the district. What can I do for you?",
        options: [
          { text: "I'd like to buy something.", next: 'offer_buy' },
          { text: "I have things to sell.", next: 'offer_sell' },
          { text: "What do you sell here?", next: 'describe_wares' },
          { text: "Just browsing, thanks.", next: 'just_looking' },
        ],
      },
      offer_buy: {
        text: "Great choice! Take a look at my stock.",
        options: [
          { text: "Open the shop.", action: 'buy' },
          { text: "Actually, one question first.", next: 'city_question' },
          { text: "Never mind.", next: 'farewell' },
        ],
      },
      offer_sell: {
        text: "I'm always looking for raw materials. What've you got?",
        options: [
          { text: "Let me sell some items.", action: 'sell' },
          { text: "Changed my mind.", next: 'farewell' },
        ],
      },
      describe_wares: {
        text: "Building materials, tools, everyday supplies. Been stocking this place for years.",
        options: [
          { text: "Sounds useful — let me browse.", next: 'offer_buy' },
          { text: "What's your best item?", next: 'best_item' },
          { text: "Thanks, maybe later.", next: 'farewell' },
        ],
      },
      best_item: {
        text: "Honestly? The pickaxe. Can't mine without one. Glass is popular with builders too.",
        options: [
          { text: "I'll take a look.", next: 'offer_buy' },
          { text: "Good to know.", next: 'farewell' },
        ],
      },
      city_question: {
        text: "Sure, ask away. I've been here a while — know the district well.",
        options: [
          { text: "Where can I find iron ore?", next: 'iron_tip' },
          { text: "Are there other shops nearby?", next: 'other_shops' },
          { text: "How do I craft a vehicle?", next: 'vehicle_tip' },
          { text: "Never mind.", next: 'farewell' },
        ],
      },
      iron_tip: {
        text: "Head past the city edge and dig down. Iron is around Y=15–20. Bring a pickaxe.",
        options: [
          { text: "Thanks, that's helpful!", next: 'farewell' },
          { text: "One more question.", next: 'city_question' },
        ],
      },
      other_shops: {
        text: "Check the commercial buildings nearby — each has its own stock. Some carry specialty items.",
        options: [
          { text: "Good to know.", next: 'farewell' },
        ],
      },
      vehicle_tip: {
        text: "Four steel ingots, two iron ingots, and a glass block at a crafting table. Then right-click it onto asphalt.",
        options: [
          { text: "I'll try that!", next: 'farewell' },
        ],
      },
      just_looking: {
        text: "Of course! No pressure. Shout if you need anything.",
        options: [
          { text: "Actually, can I buy something?", next: 'offer_buy' },
          { text: "Thanks.", next: 'farewell' },
        ],
      },
      farewell: {
        text: "Come back anytime — I'll always have stock for a good customer!",
        options: [
          { text: "Goodbye.", action: 'close' },
        ],
      },
    },
  },

  // ── TOUGH: grumpy restaurant chef ──────────────────────────────────────────
  chef: {
    mood: 'tough',
    start: 'intro',
    nodes: {
      intro: {
        text: "We're closed for prep. Can't you read the sign?",
        options: [
          { text: "I just need one quick thing.", next: 'pushback' },
          { text: "When do you open?", next: 'hours' },
          { text: "Sorry to bother you.", next: 'dismissed' },
        ],
      },
      pushback: {
        text: "One quick thing. They ALL say that. Then you're touching the mise en place and asking questions.",
        options: [
          { text: "I promise just one — I'll buy something.", next: 'reluctant' },
          { text: "What's mise en place?", next: 'explain_mise' },
          { text: "Fine, I'll come back later.", next: 'dismissed' },
        ],
      },
      explain_mise: {
        text: "French. 'Everything in its place.' Which is where I NEED everything right now. Prep starts in ten.",
        options: [
          { text: "I respect the dedication. I'll come back.", next: 'dismissed' },
        ],
      },
      reluctant: {
        text: "...Fine. ONE item. And don't touch anything on the counter.",
        options: [
          { text: "Deal. Open the shop.", action: 'buy' },
          { text: "Thank you so much!", next: 'thanks_warning' },
        ],
      },
      thanks_warning: {
        text: "Don't thank me, just be quick.",
        options: [
          { text: "Open the shop.", action: 'buy' },
        ],
      },
      hours: {
        text: "Dinner service at six. Breakfast? Missed it. This is a restaurant, not a canteen.",
        options: [
          { text: "I'll be back at six.", next: 'dismissed' },
          { text: "Could I get something now anyway?", next: 'pushback' },
        ],
      },
      dismissed: {
        text: "Right. Goodbye. Close the door on your way out.",
        options: [
          { text: "...", action: 'close' },
        ],
      },
    },
  },

  // ── DEAD END: busy office worker ───────────────────────────────────────────
  office_worker: {
    mood: 'deadend',
    start: 'intro',
    nodes: {
      intro: {
        text: "...What? I'm in the middle of something.",
        options: [
          { text: "Just a quick question.", next: 'no_time' },
          { text: "Is the manager around?", next: 'manager' },
          { text: "Sorry, wrong person.", next: 'dismissed' },
        ],
      },
      no_time: {
        text: "A quick question. Sure. You have five seconds.",
        options: [
          { text: "What does this company do?", next: 'company' },
          { text: "How do I get to the upper floors?", next: 'directions' },
          { text: "Actually, never mind.", next: 'dismissed' },
        ],
      },
      company: {
        text: "Material logistics. Cobblestone to glass, ore to ingot. Very exciting. Done?",
        options: [
          { text: "One more thing —", next: 'cut_off' },
          { text: "Fascinating, thanks.", next: 'dismissed' },
        ],
      },
      cut_off: {
        text: "No. We're done. I have a report due.",
        options: [
          { text: "Okay. I'm going.", next: 'dismissed' },
        ],
      },
      directions: {
        text: "Escalator in the lobby corner. Unless maintenance broke it again. In which case, walk.",
        options: [
          { text: "Thanks.", next: 'dismissed' },
        ],
      },
      manager: {
        text: "She's on the upper floors. No walk-ins. You'd need an appointment. Which I can't make for you.",
        options: [
          { text: "Okay then.", action: 'close' },
        ],
      },
      dismissed: {
        text: "*already back to work*",
        options: [
          { text: "Goodbye.", action: 'close' },
        ],
      },
    },
  },

  // ── INFORMATIVE: knowledgeable city guide ───────────────────────────────────
  researcher: {
    mood: 'informative',
    start: 'greeting',
    nodes: {
      greeting: {
        text: "Ah, a visitor! I've spent years studying these lands. Ask me anything.",
        options: [
          { text: "Tell me about the biomes.", next: 'biomes' },
          { text: "What's underground?", next: 'underground' },
          { text: "Tell me about the city.", next: 'city_history' },
          { text: "How do I craft a vehicle?", next: 'vehicle' },
        ],
      },
      biomes: {
        text: "Deserts: hot, sandy, no trees. Snowy tundra: white and harsh. Forests: thick wood and coal. Climate follows temperature and rainfall gradients.",
        options: [
          { text: "Which biome is best for resources?", next: 'biome_resources' },
          { text: "What else can you tell me?", next: 'greeting' },
          { text: "Thank you.", next: 'farewell' },
        ],
      },
      biome_resources: {
        text: "Forests have surface coal. Deserts give sand for glass. Underground everywhere: iron, gold, diamond. Depth determines rarity — diamonds only below Y=10.",
        options: [
          { text: "Tell me about underground.", next: 'underground' },
          { text: "Good to know.", next: 'farewell' },
        ],
      },
      underground: {
        text: "Coal near Y=17. Iron between Y=5–20. Gold Y=10–20. Diamonds below Y=10. Caves connect everything — but lava lurks. Bring torches.",
        options: [
          { text: "What about bedrock?", next: 'bedrock' },
          { text: "How do I get iron ingots?", next: 'iron_info' },
          { text: "Very useful, thank you.", next: 'farewell' },
        ],
      },
      bedrock: {
        text: "Bedrock at Y=0. Unbreakable by any tool. The absolute floor of the world. Expeditions that dug below it didn't come back with answers.",
        options: [
          { text: "Intriguing...", next: 'greeting' },
          { text: "That's unsettling.", next: 'farewell' },
        ],
      },
      iron_info: {
        text: "Mine iron ore with a pickaxe. Craft it into iron ingots. Two ingots plus coal make steel ingots — useful for vehicles and advanced crafting.",
        options: [
          { text: "How do I craft a vehicle?", next: 'vehicle' },
          { text: "Got it, thanks!", next: 'farewell' },
        ],
      },
      city_history: {
        text: "This city emerged from procedural forces — concrete, glass, steel on a precise 26-block grid: 6-block road, 3-block sidewalks, 14-block building footprint.",
        options: [
          { text: "How far does the city extend?", next: 'city_edge' },
          { text: "Are there other cities?", next: 'other_cities' },
          { text: "Interesting.", next: 'farewell' },
        ],
      },
      city_edge: {
        text: "Roughly 220 blocks from the center you hit wilderness. Beyond: plains, forests, deserts. Cities are islands of civilization in a very large world.",
        options: [
          { text: "How many cities are there?", next: 'other_cities' },
          { text: "Good to know.", next: 'farewell' },
        ],
      },
      other_cities: {
        text: "Cities are spaced roughly 600 blocks apart. Far enough to feel distant, close enough for trade. Dozens, maybe hundreds in the world.",
        options: [
          { text: "Remarkable.", next: 'greeting' },
          { text: "Thank you.", next: 'farewell' },
        ],
      },
      vehicle: {
        text: "Four steel ingots, two iron ingots, and one glass block at a 3×3 crafting table. Then right-click the item onto any asphalt block to deploy it. Press E to enter.",
        options: [
          { text: "I'll try that!", next: 'farewell' },
          { text: "What else can you tell me?", next: 'greeting' },
        ],
      },
      farewell: {
        text: "Knowledge is the greatest resource. Come back anytime — I have much more to share.",
        options: [
          { text: "Goodbye.", action: 'close' },
        ],
      },
    },
  },
};

export function getTreeForRole(role) {
  return TREES[role] || null;
}
