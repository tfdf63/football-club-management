// Enum для позиций (коды и полные названия)
export enum PlayerPosition {
  GK = 'GK',
  LCB = 'LCB',
  CB = 'CB',
  RCB = 'RCB',
  LB = 'LB',
  LWB = 'LWB',
  PLM = 'PLM',
  DM = 'DM',
  RB = 'RB',
  RWB = 'RWB',
  CM = 'CM',
  CAM = 'CAM',
  LW = 'LW',
  CF = 'CF',
  SS = 'SS',
  RW = 'RW',
}

// Маппинг кодов к полным названиям
export const PositionMapping: Record<
  PlayerPosition,
  { full: string; short: string }
> = {
  [PlayerPosition.GK]: { full: 'Goalkeeper', short: 'GK' },
  [PlayerPosition.LCB]: { full: 'Left Centre Back', short: 'LCB' },
  [PlayerPosition.CB]: { full: 'Centre Back', short: 'CB' },
  [PlayerPosition.RCB]: { full: 'Right Centre Back', short: 'RCB' },
  [PlayerPosition.LB]: { full: 'Left Back', short: 'LB' },
  [PlayerPosition.LWB]: { full: 'Left Wing Back', short: 'LWB' },
  [PlayerPosition.PLM]: { full: 'Playmaker', short: 'PLM' },
  [PlayerPosition.DM]: { full: 'Defensive Midfielder', short: 'DM' },
  [PlayerPosition.RB]: { full: 'Right Back', short: 'RB' },
  [PlayerPosition.RWB]: { full: 'Right Wing Back', short: 'RWB' },
  [PlayerPosition.CM]: { full: 'Centre Midfielder', short: 'CM' },
  [PlayerPosition.CAM]: { full: 'Central Attacking Midfielder', short: 'CAM' },
  [PlayerPosition.LW]: { full: 'Left Winger', short: 'LW' },
  [PlayerPosition.CF]: { full: 'Centre Forward', short: 'CF' },
  [PlayerPosition.SS]: { full: 'Second Striker', short: 'SS' },
  [PlayerPosition.RW]: { full: 'Right Winger', short: 'RW' },
};

// Функция для получения Position из enum
export function getPosition(position: PlayerPosition): {
  full: string;
  short: string;
} {
  return PositionMapping[position];
}
