export const convertXP = xp => {
    const MB = 1000000;
    const kB = 1000;

    switch (true) {
        case xp < kB:
            return {
                value: xp,
                unit: 'B'
            }
        case xp < MB:
            return {
                value: Math.round(xp / kB),
                unit: 'kB'
            }
        default:
            return {
                value: (xp / MB).toFixed(2),
                unit: 'MB'
            }
    }
}
