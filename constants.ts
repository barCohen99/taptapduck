
import { Upgrade } from './types';

export const INITIAL_MONSTER_HP = 10;
export const MONSTER_HP_MULTIPLIER = 1.6;
export const GOLD_MULTIPLIER = 0.8;
export const MONSTERS_PER_STAGE = 10;

export const UPGRADES: Upgrade[] = [
  {
    id: 'stronger_taps',
    name: 'Sharp Beak',
    hebrewName: 'מקור חד',
    description: 'Increases damage per click',
    baseCost: 15,
    costMultiplier: 1.15,
    baseBenefit: 1,
    type: 'TAP',
    level: 0
  },
  {
    id: 'duck_soldier',
    name: 'Duck Soldier',
    hebrewName: 'ברווז לוחם',
    description: 'Auto-damages the enemy every second',
    baseCost: 50,
    costMultiplier: 1.15,
    baseBenefit: 2,
    type: 'DPS',
    level: 0
  },
  {
    id: 'bread_bomb',
    name: 'Bread Bomb',
    hebrewName: 'פצצת לחם',
    description: 'Explosive damage over time',
    baseCost: 250,
    costMultiplier: 1.2,
    baseBenefit: 12,
    type: 'DPS',
    level: 0
  },
  {
    id: 'giant_feather',
    name: 'Giant Feather',
    hebrewName: 'נוצה ענקית',
    description: 'Heavy critical taps',
    baseCost: 1000,
    costMultiplier: 1.3,
    baseBenefit: 15,
    type: 'TAP',
    level: 0
  },
  {
    id: 'quack_commander',
    name: 'Quack Commander',
    hebrewName: 'מפקד הקוואק',
    description: 'Leads the army with high DPS',
    baseCost: 5000,
    costMultiplier: 1.25,
    baseBenefit: 75,
    type: 'DPS',
    level: 0
  }
];
