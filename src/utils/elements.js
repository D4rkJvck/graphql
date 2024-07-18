export const BODY = document.body
export const HEADER = document.querySelector('header')
export const MAIN = document.querySelector('main')
export const FOOTER = document.querySelector('footer')

export const ratioColor = (value, i = 0) => {
    if (i ==! 0) {
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