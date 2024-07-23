export const getRank = (level) => {
    switch (true) {
        case level >= 50:
            return {
                text: 'Junior Developer',
                color: '#601AFF'
            }
        case level >= 40:
            return {
                text: 'Basic Developer',
                color: '#7538FF'
            }
        case level >= 30:
            return {
                text: 'Assistant Developer',
                color: '#9969FF'
            }
        case level >= 20:
            return {
                text: 'Apprentice Developer',
                color: '#B795FF'
            }
        case level >= 10:
            return {
                text: 'Beginner Developer',
                color: '#CAADFF'
            }
        default:
            return {
                text: 'Aspiring Developer',
                color: '#D7C2FF'
            }
    }
}

//_______________________________________________
//

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
