export const TYPE_COLORS = {
  normal:'#A8A878',fire:'#F08030',water:'#6890F0',electric:'#F8D030',
  grass:'#78C850',ice:'#98D8D8',fighting:'#C03028',poison:'#A040A0',
  ground:'#E0C068',flying:'#A890F0',psychic:'#F85888',bug:'#A8B820',
  rock:'#B8A038',ghost:'#705898',dragon:'#7038F8',dark:'#705848',
  steel:'#B8B8D0',fairy:'#EE99AC'
};

export const STAT_COLORS = {
  hp:'#FF5959',attack:'#F5AC78',defense:'#FAE078','special-attack':'#9DB7F5',
  'special-defense':'#A7DB8D',speed:'#FA92B2'
};

export const GEN_RANGES = {
  0:[1,1025],1:[1,151],2:[152,251],3:[252,386],
  4:[387,493],5:[494,649],6:[650,721],
  7:[722,809],8:[810,905],9:[906,1025]
};

const cache = {};

export async function apiFetch(url) {
  if (cache[url]) return cache[url];
  const r = await fetch(url);
  if (!r.ok) throw new Error('Failed to fetch');
  const d = await r.json();
  cache[url] = d;
  return d;
}
