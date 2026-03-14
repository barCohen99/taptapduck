// backgrounds.js
export const getBgPaths = (world, stage) => {
    const wIdNum = parseInt(world) || 1;
    let wId = wIdNum < 10 ? `0${wIdNum}` : wIdNum;
    
    let uId = '01';
    if (stage > 3) uId = '02';
    if (stage > 7) uId = '03';

    // Must map exactly to the keys in assetMap.js
    // e.g. 'bg_B.01.U.01' or 'bg_B.01.D'
    return {
        topBg: `bg_B.${wId}.U.${uId}`,
        bottomBg: `bg_B.${wId}.D`
    };
};
