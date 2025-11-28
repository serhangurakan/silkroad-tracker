export const uniqueGroups = {
  GARDEN: 'Garden Uniques',
  NORMAL: 'Normal Uniques',
  TITAN: 'Titan Uniques',
  ELEMENT: 'Element Uniques'
};

export const uniques = [
  // Garden Uniques
  { id: 'kidemonas', displayName: 'Kidemonas', group: uniqueGroups.GARDEN },
  { id: 'thief_boss_kalia', displayName: 'Thief Boss Kalia', group: uniqueGroups.GARDEN },
  { id: 'ultimate_lautatune', displayName: 'Ultimate Lautatune', group: uniqueGroups.GARDEN },

  // Normal Uniques
  { id: 'tiger_girl', displayName: 'Tiger Girl', group: uniqueGroups.NORMAL },
  { id: 'cerberus', displayName: 'Cerberus', group: uniqueGroups.NORMAL },
  { id: 'captain_ivy', displayName: 'Captain Ivy', group: uniqueGroups.NORMAL },
  { id: 'uruchi', displayName: 'Uruchi', group: uniqueGroups.NORMAL },
  { id: 'isyutaru', displayName: 'Isyutaru', group: uniqueGroups.NORMAL },
  { id: 'lord_yarkan', displayName: 'Lord Yarkan', group: uniqueGroups.NORMAL },
  { id: 'demon_shaitan', displayName: 'Demon Shaitan', group: uniqueGroups.NORMAL },

  // Titan Uniques
  { id: 'tiger_girl_titan', displayName: 'Tiger Girl (Titan)', group: uniqueGroups.TITAN },
  { id: 'cerberus_titan', displayName: 'Cerberus (Titan)', group: uniqueGroups.TITAN },
  { id: 'captain_ivy_titan', displayName: 'Captain Ivy (Titan)', group: uniqueGroups.TITAN },
  { id: 'uruchi_titan', displayName: 'Uruchi (Titan)', group: uniqueGroups.TITAN },
  { id: 'isyutaru_titan', displayName: 'Isyutaru (Titan)', group: uniqueGroups.TITAN },
  { id: 'lord_yarkan_titan', displayName: 'Lord Yarkan (Titan)', group: uniqueGroups.TITAN },
  { id: 'demon_shaitan_titan', displayName: 'Demon Shaitan (Titan)', group: uniqueGroups.TITAN },

  // Element Uniques
  { id: 'legion_water_spirit', displayName: 'Legion Water Spirit', group: uniqueGroups.ELEMENT },
  { id: 'legion_fire_spirit', displayName: 'Legion Fire Spirit', group: uniqueGroups.ELEMENT },
  { id: 'legion_air_spirit', displayName: 'Legion Air Spirit', group: uniqueGroups.ELEMENT },
  { id: 'legion_earth_spirit', displayName: 'Legion Earth Spirit', group: uniqueGroups.ELEMENT }
];

// Spawn point image paths - Gerçek PNG dosyalarına göre güncellenmiş
export const spawnImages = {
  // Normal Uniques
  'tiger_girl': '/images/Tiger Girl Spawn Point.png',
  'cerberus': '/images/Cerberus Spawn Point.png',
  'captain_ivy': '/images/Captain Ivy Spawn Points.png',
  'uruchi': '/images/Uruchi Spawn Points.png',
  'isyutaru': '/images/Isyutaru Spawn Points.png',
  'lord_yarkan': '/images/Lord Yarkan Spawn Points.png',
  'demon_shaitan': '/images/Demon Shaitan Spawn Points.png',

  // Titan Uniques
  'tiger_girl_titan': '/images/Tiger Girl (Titan) Spawn Points.png',
  'cerberus_titan': '/images/Cereberus (Titan) Spawn Points.png',
  'captain_ivy_titan': '/images/Captain Ivy (Titan).png',
  'uruchi_titan': '/images/Uruchi (Titan).png',
  'isyutaru_titan': '/images/Isyutaru (Titan).png',
  'lord_yarkan_titan': '/images/Lord Yarkan (Titan).png',
  'demon_shaitan_titan': '/images/Demon Shaitan (Titan).png',

  // Element Uniques
  'legion_water_spirit': '/images/Legion Water (Fire) Spawn Points.png',
  'legion_fire_spirit': '/images/Legion Fire (Water) Spawn Points.png',
  'legion_air_spirit': '/images/Legion Air (Earth) Spawn Points.png',
  'legion_earth_spirit': '/images/Legion Earth (Air) Spawn Points.png'
};

export const getUniquesByGroup = (group) => {
  return uniques.filter(u => u.group === group);
};
