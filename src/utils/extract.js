export const getRank = (level) => {
    switch (true) {
        case level >= 50:
            return 'Junior Developer'
        case level >= 40:
            return 'Basic Developer'
        case level >= 30:
            return 'Assistant Developer'
        case level >= 20:
            return 'Apprentice Developer'
        case level >= 10:
            return 'Beginner Developer'
        default:
            return 'Aspiring Developer'
    }
}

export const getRatioColor = (value, i = 0) => {
    if (i == !0) {
        return '#caadff'
    }

    switch (true) {
        case value >= 1:
            return '#00d4a1'
        case value >= 0.5:
            return '#f0bb00'
        default:
            return '#e63e61'
    }
}