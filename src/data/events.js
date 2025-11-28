export const systemEvents = [
  {
    id: 'dancing_clown',
    name: 'Dancing Clown',
    type: 'daily',
    times: ['01:00', '05:00', '15:00', '21:00'],
    category: 'Event',
    enabled: true
  },
  {
    id: 'ctf_registration',
    name: 'Capture the Flag - Registration',
    type: 'daily',
    times: ['01:00', '02:00', '05:00', '12:00', '14:12', '18:00'],
    category: 'PVP',
    enabled: true
  },
  {
    id: 'ctf_start',
    name: 'Capture the Flag - Start',
    type: 'daily',
    times: ['01:10', '02:10', '05:10', '12:10', '14:22', '18:10'],
    category: 'PVP',
    enabled: true
  },
  {
    id: 'tower_defense_registration',
    name: 'Tower Defense Event - Registration',
    type: 'daily',
    times: ['02:00', '21:00'],
    category: 'Event',
    enabled: true
  },
  {
    id: 'tower_defense_start',
    name: 'Tower Defense Event - Start',
    type: 'daily',
    times: ['02:10', '21:10'],
    category: 'Event',
    enabled: true
  },
  {
    id: 'isis_anubis',
    name: 'Isis & Anubis',
    type: 'daily',
    times: ['02:30', '08:30', '14:30', '20:30'],
    category: 'Unique',
    enabled: true
  },
  {
    id: 'selket_neith',
    name: 'Selket & Neith',
    type: 'daily',
    times: ['04:30', '12:30', '16:30'],
    category: 'Unique',
    enabled: true
  },
  {
    id: 'neith_selket_gates',
    name: 'Neith & Selket Gates Open',
    type: 'daily',
    times: ['04:00', '15:30', '16:30'],
    category: 'Unique',
    enabled: true
  },
  {
    id: 'titan_unique_invasion',
    name: 'Titan Unique Invasion',
    type: 'daily',
    times: ['02:00', '05:00', '10:00', '14:00', '18:00', '22:00'],
    category: 'Unique',
    enabled: true
  },
  {
    id: 'haroeris',
    name: 'Haroeris',
    type: 'daily',
    times: ['05:00', '12:00', '17:00', '23:00'],
    category: 'Unique',
    enabled: true
  },
  {
    id: 'deathmatch_registration',
    name: 'Deathmatch - Registration',
    type: 'daily',
    times: ['04:00', '14:00', '20:00', '00:00'],
    category: 'PVP',
    enabled: true
  },
  {
    id: 'deathmatch_start',
    name: 'Deathmatch - Start',
    type: 'daily',
    times: ['04:10', '14:10', '20:10', '00:10'],
    category: 'PVP',
    enabled: true
  },
  {
    id: 'zombie_invasion',
    name: 'ZOMBIE Invasion',
    type: 'range',
    startTimes: ['20:00'],
    endTimes: ['21:00'],
    category: 'Event',
    enabled: true
  },
  {
    id: 'job_arena_registration',
    name: 'Job Arena - Registration',
    type: 'daily',
    times: ['05:00', '19:00'],
    category: 'Job',
    enabled: true
  },
  {
    id: 'job_arena_start',
    name: 'Job Arena - Start',
    type: 'daily',
    times: ['05:05', '19:05'],
    category: 'Job',
    enabled: true
  },
  {
    id: 'job_arena_end',
    name: 'Job Arena - End',
    type: 'daily',
    times: ['05:35'],
    category: 'Job',
    enabled: true
  },
  {
    id: 'special_trader',
    name: 'Special Trader Shops with Bargain Goods',
    type: 'range',
    startTimes: ['18:00', '20:00'],
    endTimes: ['18:30', '20:30'],
    category: 'Event',
    enabled: true
  },
  {
    id: 'alchemy_event',
    name: 'Alchemy Event',
    type: 'range',
    startTimes: ['19:00'],
    endTimes: ['19:30'],
    category: 'Event',
    enabled: true
  },
  {
    id: 'behemoth',
    name: 'Behemoth (Job)',
    type: 'daily',
    times: ['23:00'],
    category: 'Job',
    enabled: true
  },
  {
    id: 'black_dragon',
    name: 'Black Dragon',
    type: 'daily',
    times: ['15:00'],
    category: 'Unique',
    enabled: true
  },
  {
    id: 'blue_dragon',
    name: 'Blue Dragon',
    type: 'daily',
    times: ['17:00'],
    category: 'Unique',
    enabled: true
  },
  {
    id: 'beakyung',
    name: 'BeakYung (Medusa)',
    type: 'daily',
    times: ['10:30'],
    category: 'Unique',
    enabled: true
  },
  {
    id: 'bone_slayer_roc',
    name: 'Bone Slayer Roc',
    type: 'daily',
    times: ['13:00'],
    category: 'Unique',
    enabled: true
  },
  {
    id: 'safe_trade_route',
    name: 'Safe Trade Route Event',
    type: 'range',
    startTimes: ['06:00'],
    endTimes: ['06:40'],
    category: 'Event',
    enabled: true
  },
  {
    id: 'trade_route',
    name: 'Trade Route Event',
    type: 'range',
    startTimes: ['13:00', '19:00'],
    endTimes: ['13:40', '19:40'],
    category: 'Event',
    enabled: true
  },
  {
    id: 'battle_arena_registration',
    name: 'Battle Arena Score - Registration',
    type: 'daily',
    times: ['08:00', '16:00', '20:00', '21:00'],
    category: 'PVP',
    enabled: true
  },
  {
    id: 'battle_arena_start',
    name: 'Battle Arena Score - Start',
    type: 'daily',
    times: ['08:10', '16:10', '20:10', '21:10'],
    category: 'PVP',
    enabled: true
  },
  {
    id: 'ghost_hunting',
    name: 'Ghost Hunting Event',
    type: 'daily',
    times: ['16:00'],
    category: 'Event',
    enabled: true
  },
  {
    id: 'gate_of_ruler',
    name: 'The Gate of the Ruler',
    type: 'daily',
    times: ['20:10'],
    category: 'Event',
    enabled: true
  },
  {
    id: 'fortress_war',
    name: 'Fortress War',
    type: 'weekly',
    times: ['23:00'],
    daysOfWeek: ['Sunday'],
    category: 'PVP',
    enabled: true
  },
  {
    id: 'weekly_reset',
    name: 'Weekly Reset',
    type: 'weekly',
    times: ['18:00'],
    daysOfWeek: ['Friday'],
    category: 'System',
    enabled: true
  },
  {
    id: 'unique_event',
    name: 'Unique Event',
    type: 'daily',
    times: ['04:00', '23:00'],
    category: 'Unique',
    enabled: true
  }
];
