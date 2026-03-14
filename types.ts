
export interface Upgrade {
  id: string;
  name: string;
  description: string;
  baseCost: number;
  costMultiplier: number;
  baseBenefit: number;
  type: 'TAP' | 'DPS';
  level: number;
  hebrewName: string;
}

export interface GameState {
  gold: number;
  stage: number; // Overall level
  subStage: number; // 1 to 10 within a world
  world: 'normal' | 'leaf';
  monstersKilled: number;
  monsterHp: number;
  maxMonsterHp: number;
  tapDamage: number;
  dps: number;
  isBoss: boolean;
}

export interface FloatingText {
  id: number;
  x: number;
  y: number;
  value: string;
  color: string;
}
