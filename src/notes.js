export const SOLFEGE = [
  "do",
  "do#",
  "re",
  "re#",
  "mi",
  "fa",
  "fa#",
  "sol",
  "sol#",
  "la",
  "la#",
  "si",
];
const SOLFEGE_INV = [].concat(SOLFEGE).reverse();

function assignPartition(clavier, current, index) {
    const prev = clavier.find(n => n.pos === index - 1);
    if (current.diez) {
        current.partitionLine = prev.partitionLine;
    } else {
        current.partitionLine = prev.partitionLine + 1;
    }
}
function assignLeftPartition(clavier, current, index) {
    const next = clavier.find(n => n.pos === index + 1);
    if (next.diez) {
        current.partitionLine = next.partitionLine;
    } else {
        current.partitionLine = next.partitionLine - 1;
    }
}
export function getClavier(len = 72) {
  const CLAVIER = [
    {
        pos: 0,
        diez: false,
        solfegeName: 'do',
        partitionLine: 0,
      }
  ];
  for (let index = 1; index <= len/2; index++) {
    const nextIndex = index % SOLFEGE.length;
    let solfegeName = SOLFEGE[nextIndex];
    let current = {
        pos: index,
        diez: solfegeName.endsWith("#"),
        solfegeName,
    };
    CLAVIER.push(current);
    assignPartition(CLAVIER, current, index);
    solfegeName = SOLFEGE_INV[nextIndex];
    current = {
        pos: -index,
        diez: solfegeName.endsWith("#"),
        solfegeName,
    };
    CLAVIER.unshift(current);
    assignLeftPartition(CLAVIER, current, -index);
  }
  return CLAVIER;
}

export const CLAVIER = getClavier();
