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

export const formatProgressData = progressData => {
    const newFormat = progressData.reduce((acc, d) => {

        const date = new Date(d.date);
        const month = date.getMonth();
        const year = date.getFullYear();
        const key = `${month + 1}/${year}`;

        if (!acc[key]) {
            acc[key] = { date: new Date(year, month), amount: 0 };
        }
        
        acc[key].amount += d.amount;
        
        return acc
    }, {});

    newFormat['Now'] = {date: new Date(), amount: 0};

    const tableFormat = Object.values(newFormat);
    tableFormat.forEach((d, i) => {
        if (i > 0) {
            d.amount += tableFormat[i - 1].amount;
        }
    });

    return tableFormat
};
