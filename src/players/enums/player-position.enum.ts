// Enum для позиций с полными и короткими названиями
export enum PlayerPosition {
  GOALKEEPER = 'goalkeeper',
  DEFENDER = 'defender',
  MIDFIELDER = 'midfielder',
  FORWARD = 'forward',
  WINGER = 'winger',
  STRIKER = 'striker',
}

// Маппинг полных названий к коротким
export const PositionMapping: Record<
  PlayerPosition,
  { full: string; short: string }
> = {
  [PlayerPosition.GOALKEEPER]: { full: 'Goalkeeper', short: 'GK' },
  [PlayerPosition.DEFENDER]: { full: 'Defender', short: 'DF' },
  [PlayerPosition.MIDFIELDER]: { full: 'Midfielder', short: 'MF' },
  [PlayerPosition.FORWARD]: { full: 'Forward', short: 'FW' },
  [PlayerPosition.WINGER]: { full: 'Winger', short: 'WG' },
  [PlayerPosition.STRIKER]: { full: 'Striker', short: 'ST' },
};

// Функция для получения Position из enum
export function getPosition(position: PlayerPosition): {
  full: string;
  short: string;
} {
  return PositionMapping[position];
}
