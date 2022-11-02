
const MAX_DEX_ID = 1000;

export const getRandomLegoId: (notThisOne?: number[]) => number = (
  notThisOne
) => {
  const pokedexNumber = Math.floor(Math.random() * MAX_DEX_ID) + 1;

  if (!notThisOne?.includes(pokedexNumber)) return pokedexNumber;
  return getRandomLegoId(notThisOne);
};

export const getOptionsToChoose = () => {
  const firstId = getRandomLegoId();
  const secondId = getRandomLegoId([firstId]);
  const thirdId = getRandomLegoId([firstId, secondId]);
  ("0" + 4).slice(-2);
  return [
    ("00000" + firstId).slice(-6),
    ("00000" + secondId).slice(-6),
    ("00000" + thirdId).slice(-6),
  ];
};

