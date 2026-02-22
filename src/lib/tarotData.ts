export interface TarotCardData {
  id: string;
  name: string;
  arcana: "Major" | "Minor";
  suit: "Cups" | "Wands" | "Swords" | "Pentacles" | null;
  number: number;
  imagePath: string;
  keywords: string[];
  interpretations: {
    theMirror: string;
    theShadow: string;
    reflectionPrompts: string[];
  };
  layers?: {
    bg?: string;
    mid?: string;
    fg?: string;
  };
  landscapePath?: string;
}

export const tarotDeck: TarotCardData[] = [
  {
    id: "major-00-fool",
    name: "The Fool",
    arcana: "Major",
    suit: null,
    number: 0,
    imagePath: "/assets/cards/major-00-fool.png",
    keywords: ["beginnings", "innocence", "leap of faith", "unknowing"],
    interpretations: {
      theMirror:
        "A reminder that every journey begins with a single, unburdened step. You are standing at the edge of a new cycle. The mirror reflects a need to release preconceived notions and trust your raw intuition.",
      theShadow:
        "Are you acting out of genuine trust, or avoiding responsibility through recklessness? The shadow asks you to examine where naivety might be masking fear of commitment.",
      reflectionPrompts: [
        "Where in my life am I being called to start over?",
        "What baggage do I need to drop before taking my next step?",
        "Am I leaping with trust, or running from something?",
      ],
    },
    landscapePath: "/assets/landscapes/fool.png",
  },
  {
    id: "major-19-sun",
    name: "The Sun",
    arcana: "Major",
    suit: null,
    number: 19,
    imagePath: "/assets/cards/major-19-sun.png",
    keywords: ["clarity", "vitality", "joy", "truth revealed"],
    interpretations: {
      theMirror:
        "The Sun illuminates what has been hidden. This card reflects a moment of radiant clarity — the truth of who you are shining without apology. Bask in this energy and let it burn away doubt.",
      theShadow:
        "Is your optimism authentic, or are you performing joy to avoid sitting with discomfort? The shadow asks whether you are truly in the light or merely afraid of the dark.",
      reflectionPrompts: [
        "What truth about myself am I finally ready to see clearly?",
        "Where am I performing happiness instead of feeling it?",
        "What would I do if I trusted my own radiance?",
      ],
    },
    layers: {
      bg: "/assets/layers/sun-bg.png",
      mid: "/assets/layers/sun-mid.png",
      fg: "/assets/layers/sun-fg.png",
    },
    landscapePath: "/assets/landscapes/sun.png",
  },
  {
    id: "major-18-moon",
    name: "The Moon",
    arcana: "Major",
    suit: null,
    number: 18,
    imagePath: "/assets/cards/major-18-moon.png",
    keywords: ["illusion", "intuition", "the subconscious", "dreams"],
    interpretations: {
      theMirror:
        "The Moon reflects the landscape of your inner world — the dreams, fears, and instincts that operate beneath conscious thought. Trust the feelings that surface even when they defy logic.",
      theShadow:
        "Are you being guided by intuition or consumed by anxiety? The shadow warns that not every whisper from the subconscious is wisdom. Discern between true knowing and projection.",
      reflectionPrompts: [
        "What recurring dream or feeling am I ignoring?",
        "Where in my life am I confusing intuition with fear?",
        "What truth is hiding just below the surface?",
      ],
    },
    landscapePath: "/assets/landscapes/moon.png",
  },
  {
    id: "major-20-judgement",
    name: "Judgement",
    arcana: "Major",
    suit: null,
    number: 20,
    imagePath: "/assets/cards/major-20-judgement.png",
    keywords: ["reckoning", "rebirth", "calling", "absolution"],
    interpretations: {
      theMirror:
        "Judgement calls you to rise from the ashes of your former self. This is a moment of profound self-evaluation — not punishment, but an honest accounting. You are being asked to answer a call that only you can hear.",
      theShadow:
        "Are you judging yourself with compassion or cruelty? The shadow asks whether you are using self-reflection as a tool for growth or a weapon of self-destruction.",
      reflectionPrompts: [
        "What version of myself am I ready to release?",
        "What calling have I been ignoring?",
        "Can I evaluate my past with honesty and without shame?",
      ],
    },
    landscapePath: "/assets/landscapes/judgement.png",
  },
  {
    id: "minor-cups-03",
    name: "Three of Cups",
    arcana: "Minor",
    suit: "Cups",
    number: 3,
    imagePath: "/assets/cards/minor-cups-03.png",
    keywords: ["community", "celebration", "shared emotion", "support"],
    interpretations: {
      theMirror:
        "This card reflects the energy of connection and shared joy. It is a call to lean into your community and find nourishment in the presence of those who truly see you.",
      theShadow:
        "Are you losing your individuality within a group? Or perhaps over-indulging to numb a deeper sense of isolation? Examine where your social energy drains rather than fulfills you.",
      reflectionPrompts: [
        "Who in my circle makes me feel most like my authentic self?",
        "Am I celebrating my current stage, or rushing to the next milestone?",
        "Where am I using socializing to avoid being alone with my thoughts?",
      ],
    },
    landscapePath: "/assets/landscapes/cups-03.png",
  },
  {
    id: "minor-swords-10",
    name: "Ten of Swords",
    arcana: "Minor",
    suit: "Swords",
    number: 10,
    imagePath: "/assets/cards/minor-swords-10.png",
    keywords: ["ending", "release", "rock bottom", "dawn"],
    interpretations: {
      theMirror:
        "The Ten of Swords marks the definitive end of a cycle of mental anguish. The worst is behind you. This mirror shows not defeat, but the precise moment before renewal — the darkest hour that precedes the dawn.",
      theShadow:
        "Are you clinging to victimhood? The shadow asks if you are truly at the end, or if you are dramatizing pain to avoid the vulnerability of starting over.",
      reflectionPrompts: [
        "What mental pattern or belief has finally run its course?",
        "Am I holding onto pain because it feels safer than the unknown?",
        "What does the dawn look like from here?",
      ],
    },
    landscapePath: "/assets/landscapes/swords-10.png",
  },
];

export const majorArcana = tarotDeck.filter((c) => c.arcana === "Major");
export const minorArcana = tarotDeck.filter((c) => c.arcana === "Minor");

export function getCardsBySuit(suit: string): TarotCardData[] {
  return tarotDeck.filter((c) => c.suit === suit);
}
