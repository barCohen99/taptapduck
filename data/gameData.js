export const WORLD_CONFIG = Array.from({ length: 10 }, (_, i) => ({
    world: i + 1,
    stages: 10,
    monstersPerStage: 10
}));

export const WEAPONS_CONFIG = [
    { world: 1, name: 'Starter Stick', icon: 'A.WEPONs.svg', desc: 'Basic weapon.', bonusType: '-', base: 0, growth: 1 },
    { world: 2, name: 'Iron Beak', icon: 'A.WEPONs.svg', desc: 'Slightly sharper.', bonusType: 'ATK', base: 5, growth: 1.2 },
    { world: 3, name: 'Golden Wing', icon: 'A.WEPONs.svg', desc: 'Shiny!', bonusType: 'TDG_M', base: 1.5, growth: 1.1 },
    { world: 4, name: 'Duck Blade', icon: 'A.WEPONs.svg', desc: 'A real sword.', bonusType: 'ATK_M', base: 2, growth: 1.5 },
];

export const FRIENDS_CONFIG = [
    { id: 1, name: 'Baby Duck', effect: 'Helps you tap', bonusType: 'ATK', base: 10 },
    { id: 2, name: 'Mage Duck', effect: 'Mágico', bonusType: 'CR_M', base: 0.1 },
];

export const HATCHING_MISSIONS = {
    1: { desc: 'Tap 100 times', target: 100 },
    2: { desc: 'Kill 50 enemies', target: 50 },
};
