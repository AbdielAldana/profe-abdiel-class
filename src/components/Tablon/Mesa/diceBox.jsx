// diceBox.jsx (BIEN)
import DiceBox from "@3d-dice/dice-box";

export const createDiceBox = (selector) => {
  return new DiceBox(selector, {
    assetPath: "/assets/",
    spinForce: 10,
    throwForce: 12,
    scale: 7,
  });
};