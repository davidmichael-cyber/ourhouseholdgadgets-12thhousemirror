import { tarotDeck, type TarotCardData } from "./tarotData";

export function getRandomCard(): TarotCardData {
  return tarotDeck[Math.floor(Math.random() * tarotDeck.length)];
}

export function getCardById(id: string): TarotCardData | undefined {
  return tarotDeck.find((card) => card.id === id);
}
