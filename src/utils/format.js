export const convertXP = xp => {
    const MB = 1000000;
    const kB = 1000;

    switch (true) {
        case xp < kB:
            return {
                value: xp,
                unit: 'B',
                fmt: `${xp} B`
            }
        case xp < MB:
            return {
                value: Math.round(xp / kB),
                unit: 'kB',
                fmt: `${Math.round(xp / kB)} kB`
            }
        default:
            return {
                value: (xp / MB).toFixed(2),
                unit: 'MB',
                fmt: `${(xp / MB).toFixed(2)} MB`
            }
    }
}

//_________________________________________________________________
//

export const xpByMonth = data => {
    const xpObj = data.reduce((acc, d) => {
        const date = new Date(d.date);
        const month = date.getMonth();
        const year = date.getFullYear();
        const key = `${month + 1}/${year}`;

        if (!acc[key]) {
            acc[key] = { date: new Date(year, month), amount: 0 };
        }

        acc[key].amount += d.amount;

        return acc
    }, {})

    const monthTab = [];
    const earliestDate = new Date(Math.min(...data.map(d => new Date(d.date))));
    const now = new Date()
    let currentDate = new Date(earliestDate)
    
    while (currentDate <= now) {
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        const key = `${month + 1}/${year}`;
        
        if (!xpObj[key]) {
            xpObj[key] = { date: new Date(year, month), amount: 0 };
        }
        
        monthTab.push(xpObj[key]);
        
        currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return monthTab
};
