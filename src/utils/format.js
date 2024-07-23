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

//___________________________________________________________________________________________
//

export const xpByMonth = data => {
    const xpObj = data.reduce((acc, d) => {
        const date = formatDate(new Date(d.date)).date; console.log(date);
        const key = formatDate(date).key;

        if (!acc[key]) {
            acc[key] = { date: new Date(date), amount: 0 };
        }

        acc[key].amount += d.amount;

        return acc
    }, {})

    const monthTab = [];
    const earliestDate = new Date(Math.min(...data.map(d => new Date(d.date))));
    const now = formatDate(new Date()).date; console.log(now);
    let currentDate = formatDate(new Date(earliestDate)).date; console.log(currentDate);

    while (currentDate <= now) {
        const key = formatDate(currentDate).key;

        if (!xpObj[key]) {
            xpObj[key] = { date: new Date(currentDate), amount: 0 };
        }

        monthTab.push(xpObj[key]);

        currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return monthTab
};

//_________________________________________________________________________________________
//

const formatDate = date => {
    const month = date.getMonth();
    const year = date.getFullYear();
    const key = `${month + 1}/${year}`;
    return {
        date: new Date(year, month),
        key: key
    }
}