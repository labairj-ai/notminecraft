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

  // ── FRIENDLY: Web-Walker (Spider-Man inspired) ──────────────────────────────
  spider_hero: {
    mood: 'friendly',
    start: 'greeting',
    nodes: {
      greeting: {
        text: "Oh hey! Just did a sweep of the rooftops. You can see three biomes from up there — really useful for navigation.",
        options: [
          { text: "Three biomes?", next: 'biomes' },
          { text: "What do you do up there?", next: 'patrol' },
          { text: "Any tips for getting around?", next: 'tips' },
          { text: "Goodbye!", next: 'farewell' },
        ],
      },
      biomes: {
        text: "Forest north — great for wood and coal near the surface. Desert east — sand for glass. Ocean somewhere west. Fog past that, but the world keeps going.",
        options: [
          { text: "Any dangers out there?", next: 'danger' },
          { text: "Very useful, thanks!", next: 'farewell' },
        ],
      },
      patrol: {
        text: "Keep watch, mostly. The city looks after itself better when someone's looking. Griefers show up sometimes — sent a few packing last week.",
        options: [
          { text: "Any dangerous spots?", next: 'danger' },
          { text: "That's admirable.", next: 'farewell' },
        ],
      },
      danger: {
        text: "Deep caves are the real hazard — lava from Y=10 down. Always bring torches, never sprint near drop-offs. The city itself is safe if you stay lit.",
        options: [
          { text: "More tips?", next: 'tips' },
          { text: "I'll be careful.", next: 'farewell' },
        ],
      },
      tips: {
        text: "Buildings have escalators — find the corner tiles. Bus stops fast-travel between cities. Merchants in every commercial building. And iron: always keep iron on you.",
        options: [
          { text: "What about crafting?", next: 'crafting' },
          { text: "Excellent tips!", next: 'farewell' },
        ],
      },
      crafting: {
        text: "Pickaxe first — always. Iron's around Y=15 underground. Four steel plus two iron plus one glass at a 3×3 crafting table gives you a deployable vehicle frame.",
        options: [
          { text: "I'll try that!", next: 'farewell' },
        ],
      },
      farewell: {
        text: "Take care out there. The city never runs out of things to keep you busy. Trust me — I've tried.",
        options: [
          { text: "Goodbye!", action: 'close' },
        ],
      },
    },
  },

  // ── GRIM: Shadow Knight (Batman inspired) ───────────────────────────────────
  shadow_knight: {
    mood: 'grim',
    start: 'intro',
    nodes: {
      intro: {
        text: "*steps from shadow* ...You actually saw me. That's either impressive or a problem.",
        options: [
          { text: "A problem?", next: 'problem' },
          { text: "What are you guarding?", next: 'guarding' },
          { text: "Any survival advice?", next: 'safety' },
        ],
      },
      problem: {
        text: "If you can see me, so can the wrong people. I'm still deciding which category you fall into.",
        options: [
          { text: "I'm just exploring.", next: 'explorer' },
          { text: "I'll look the other way.", next: 'farewell' },
        ],
      },
      explorer: {
        text: "Explorers are fine. Griefers are not. You don't look like a griefer.",
        options: [
          { text: "What does a griefer look like?", next: 'griefer' },
          { text: "What should I know about this city?", next: 'safety' },
        ],
      },
      griefer: {
        text: "Hurried movement. Swings at walls that aren't theirs. Runs when approached. Know the signs.",
        options: [
          { text: "I'll remember that.", next: 'safety' },
          { text: "Good to know.", next: 'farewell' },
        ],
      },
      guarding: {
        text: "Everything. The structures people built, the effort behind every block. Some people forget what it took to make this city.",
        options: [
          { text: "Why do you work alone?", next: 'alone' },
          { text: "That's admirable.", next: 'farewell' },
        ],
      },
      alone: {
        text: "Partners ask too many questions. *pause* Like you are doing.",
        options: [
          { text: "Fair enough.", next: 'safety' },
          { text: "Sorry.", next: 'safety' },
        ],
      },
      safety: {
        text: "Mark your path underground. Torch every ten blocks or you won't find your way back. Carry a pickaxe — always. Know which buildings are empty before you enter.",
        options: [
          { text: "Any threats above ground?", next: 'above' },
          { text: "Good advice.", next: 'farewell' },
        ],
      },
      above: {
        text: "Stay near lights at night. The fog past the city edge gets thick. Not dangerous on its own, but disorienting — and things live in the dark.",
        options: [
          { text: "Any good landmarks?", next: 'landmarks' },
          { text: "Noted.", next: 'farewell' },
        ],
      },
      landmarks: {
        text: "Rooftops if you can climb them. The minimap helps orient you. Bus stops appear at city edges — use them. Past that, trust your compass.",
        options: [
          { text: "Thank you.", next: 'farewell' },
        ],
      },
      farewell: {
        text: "Stay safe. And next time you think you see something in a shadow... you probably do.",
        options: [
          { text: "...", action: 'close' },
        ],
      },
    },
  },

  // ── ENTHUSIASTIC: Kid Crusader (Robin inspired) ──────────────────────────────
  kid_hero: {
    mood: 'enthusiastic',
    start: 'greeting',
    nodes: {
      greeting: {
        text: "OH HI! I'm on a training patrol! Well — I'm cataloguing merchant prices, but I told my mentor it's a 'field reconnaissance operation.'",
        options: [
          { text: "Your mentor?", next: 'mentor' },
          { text: "What can you do?", next: 'abilities' },
          { text: "Any crafting tips?", next: 'crafting' },
          { text: "Goodbye!", next: 'farewell' },
        ],
      },
      mentor: {
        text: "Can't say the name! Secret identity — very important rule. But they're VERY serious, have a VERY cool vehicle, and sighed at me twice already today.",
        options: [
          { text: "Two sighs? Why?", next: 'sighs' },
          { text: "Sounds intense.", next: 'intense' },
        ],
      },
      sighs: {
        text: "Once when I did a cartwheel near the fountain. And once when I told an officer our mission codename.",
        options: [
          { text: "What was the codename?", next: 'codename' },
        ],
      },
      codename: {
        text: "'Operation: Very Important Mission.' In my defence, it IS very important.",
        options: [
          { text: "Flawless.", next: 'farewell' },
        ],
      },
      intense: {
        text: "I'm learning! The sighing is positive feedback. It means I'm doing something interesting.",
        options: [
          { text: "That's... optimistic.", next: 'farewell' },
          { text: "What's your training like?", next: 'abilities' },
        ],
      },
      abilities: {
        text: "Running: very fast. Climbing: almost three floors without escalator. Grappling hook: functional 70% of the time. Cartwheel: perfect. My résumé is basically complete.",
        options: [
          { text: "Which 30% fails?", next: 'grapple_fail' },
          { text: "Impressive résumé!", next: 'farewell' },
        ],
      },
      grapple_fail: {
        text: "Rainy days mostly. And once near the police station, which I will not discuss further.",
        options: [
          { text: "Fair enough.", next: 'farewell' },
        ],
      },
      crafting: {
        text: "Always make a pickaxe first! Iron from underground around Y=15. Coal too. Four steel plus two iron plus glass at a 3×3 table makes a vehicle frame — my mentor has a limo, I'm NOT allowed to touch it.",
        options: [
          { text: "More tips?", next: 'moretips' },
          { text: "Thanks!", next: 'farewell' },
        ],
      },
      moretips: {
        text: "Every commercial building has a merchant or shopkeeper — prices vary, check them all! Escalators are in the building corners. My mentor says 'efficient routes matter.' I say 'explore everything.'",
        options: [
          { text: "Both seem right.", next: 'farewell' },
        ],
      },
      farewell: {
        text: "Okay! Six more merchants to catalogue! Come find me if you need backup on anything — I am VERY available!",
        options: [
          { text: "Good luck!", action: 'close' },
        ],
      },
    },
  },

  // ── GRUFF: The Brute (Hulk inspired) ────────────────────────────────────────
  brute: {
    mood: 'gruff',
    start: 'intro',
    nodes: {
      intro: {
        text: "...",
        options: [
          { text: "*wait*", next: 'pause' },
          { text: "Are you okay?", next: 'okay' },
          { text: "You're not going to smash me, are you?", next: 'smash' },
        ],
      },
      pause: {
        text: "Why you still here.",
        options: [
          { text: "I wanted to talk.", next: 'talk' },
          { text: "Sorry, I'll go.", next: 'farewell' },
        ],
      },
      smash: {
        text: "Brute does not smash people who ask nicely. Is rule.",
        options: [
          { text: "That's reassuring.", next: 'okay' },
          { text: "Good rule.", next: 'okay' },
        ],
      },
      okay: {
        text: "Today okay. City quiet. No griefers. Brute like quiet days.",
        options: [
          { text: "What makes a bad day?", next: 'badday' },
          { text: "What do you do here?", next: 'job' },
        ],
      },
      badday: {
        text: "Loud noises. Griefers. Being called 'thing' instead of Brute. Running out of purple cloth for pants. Purple pants keep ripping. Is very frustrating.",
        options: [
          { text: "Why purple specifically?", next: 'purple' },
          { text: "I'll use your name.", next: 'remember' },
        ],
      },
      purple: {
        text: "Scientists say purple is calming color. Brute do own research. Also only color that match eyes. Is practical.",
        options: [
          { text: "That makes sense.", next: 'farewell' },
          { text: "Any advice for exploring?", next: 'advice' },
        ],
      },
      remember: {
        text: "...Thank you. Not many people bother.",
        options: [
          { text: "Of course.", next: 'advice' },
        ],
      },
      job: {
        text: "Patrol. Watch. Fix blocks that griefers break. Is satisfying work. Brute good at fixing. Also breaking, but mostly fixing now.",
        options: [
          { text: "You protect the city?", next: 'protect' },
          { text: "Do you enjoy it?", next: 'enjoy' },
        ],
      },
      protect: {
        text: "Nobody ask Brute to. Just... someone has to. Brute is very hard to hurt. Makes sense.",
        options: [
          { text: "That's admirable.", next: 'farewell' },
          { text: "Any advice for the rest of us?", next: 'advice' },
        ],
      },
      enjoy: {
        text: "...Yes. Not many people ask Brute that. Yes. Is good work.",
        options: [
          { text: "That's great.", next: 'advice' },
          { text: "I'm glad.", next: 'farewell' },
        ],
      },
      talk: {
        text: "...Okay. What you want.",
        options: [
          { text: "Advice for surviving.", next: 'advice' },
          { text: "Tell me about the city.", next: 'city' },
        ],
      },
      city: {
        text: "Brute know every street. Every building. Every merchant. Three sell purple cloth — none reliable. City is good place. People build hard things. Worth protecting.",
        options: [
          { text: "Any dangerous areas?", next: 'danger' },
          { text: "That's dedication.", next: 'farewell' },
        ],
      },
      danger: {
        text: "Underground worst. Lava everywhere below Y=10. Brute once fall in lava. Was bad experience. Now Brute always carry torches. Recommend you do same.",
        options: [
          { text: "Good tip. More advice?", next: 'advice' },
          { text: "That sounds terrible.", next: 'farewell' },
        ],
      },
      advice: {
        text: "Always have pickaxe. Always know way back to surface. Eat before long trip. Iron most important material — get lots. And do not run near lava. Ever.",
        options: [
          { text: "Thank you, Brute.", next: 'farewell' },
        ],
      },
      farewell: {
        text: "...Stay safe. City is big. World bigger. Brute will be here.",
        options: [
          { text: "*nod*", action: 'close' },
        ],
      },
    },
  },

  // ── INVENTIVE: Scrap Knight (Iron Man inspired) ──────────────────────────────
  scrap_knight: {
    mood: 'inventive',
    start: 'greeting',
    nodes: {
      greeting: {
        text: "Ah, a visitor! Excellent timing — I was just recalibrating the thermal regulators. Ignore the sparks. Most of them are intentional.",
        options: [
          { text: "What are you building?", next: 'building' },
          { text: "Are you an inventor?", next: 'inventor' },
          { text: "Is it safe here?", next: 'safe' },
          { text: "Goodbye!", next: 'farewell' },
        ],
      },
      building: {
        text: "Mark VII improvements to the suit. Mark VI had a fatal flaw: it glowed bright orange in direct sunlight. Unacceptable for stealth. Mark VII is... less orange.",
        options: [
          { text: "What does the suit do?", next: 'function' },
          { text: "How do you make it?", next: 'crafting' },
          { text: "How many marks until it works?", next: 'marks' },
        ],
      },
      marks: {
        text: "'Working' is subjective. It does everything I designed. Some of those things are just different from what I expected.",
        options: [
          { text: "That's honest.", next: 'function' },
        ],
      },
      function: {
        text: "Defensive plating — very effective. Enhanced strength — functional. Flight — it hops. A very impressive, high-arc hop. The jet calculations need more work.",
        options: [
          { text: "A hopping suit of armor.", next: 'hop' },
          { text: "I still want one.", next: 'crafting' },
        ],
      },
      hop: {
        text: "I prefer 'controlled ballistic arc.' But yes. The hop is — technically — flight if you're generous with definitions.",
        options: [
          { text: "I admire the honesty.", next: 'crafting' },
          { text: "I believe in you.", next: 'farewell' },
        ],
      },
      inventor: {
        text: "That depends on whether you're a creditor. For non-creditors: yes, absolutely. I invent things. Some fully work. Most partially work. All are interesting.",
        options: [
          { text: "What have you made?", next: 'inventions' },
          { text: "No creditors here.", next: 'inventions' },
        ],
      },
      inventions: {
        text: "The suit — ongoing. A portable ore scanner — broken. A vehicle with heated seats — seats work, nothing else does. A snack dispenser that works perfectly but I've misplaced the power source.",
        options: [
          { text: "The snack dispenser sounds critical.", next: 'snack' },
          { text: "Quite a portfolio.", next: 'farewell' },
        ],
      },
      snack: {
        text: "The MOST critical! I have the housing, I have the snacks, I just need stable power. Currently testing lava — it holds for about four seconds. Enough to retrieve the snack if you're quick.",
        options: [
          { text: "Try a different power source?", next: 'power' },
          { text: "Please be careful.", next: 'farewell' },
        ],
      },
      power: {
        text: "I've tried coal — too slow. Gold ore — too melty. I'm circling back to lava with thicker gloves.",
        options: [
          { text: "I trust your process.", next: 'farewell' },
          { text: "Any crafting tips instead?", next: 'crafting' },
        ],
      },
      crafting: {
        text: "Steel for structure — smelt iron with coal. Four steel, two iron, one glass at a 3×3 crafting table makes a vehicle frame. Right-click on asphalt, press E to enter. Works every time.",
        options: [
          { text: "Other crafting tips?", next: 'tips' },
          { text: "I'll try that!", next: 'farewell' },
        ],
      },
      tips: {
        text: "Iron first — everything useful needs it. Coal for smelting. Pickaxe before anything else. Torches: make hundreds. Underground is very dark and also has lava, which I've mentioned.",
        options: [
          { text: "Lava is clearly on your mind.", next: 'farewell' },
          { text: "Excellent fundamentals.", next: 'farewell' },
        ],
      },
      safe: {
        text: "Definitively uncertain! The sparks are planned. The smoke was not, but I've decided it's atmospheric. The crackling sound is under investigation.",
        options: [
          { text: "What are you working on?", next: 'building' },
          { text: "I'll stand at a safe distance.", next: 'farewell' },
        ],
      },
      farewell: {
        text: "Come back anytime! If you find spare iron ingots, leave them in the corner. I'm running low, and the Mark VIII won't build itself. Actually — that's project VIII-B.",
        options: [
          { text: "Goodbye!", action: 'close' },
        ],
      },
    },
  },

};

export function getTreeForRole(role) {
  return TREES[role] || null;
}
