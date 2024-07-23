export const BODY = document.body
export const HEADER = document.querySelector('header')
export const MAIN = document.querySelector('main')
export const FOOTER = document.querySelector('footer')

export const errorNoData = component => {
    component.innerText = '❌';
    component.style.alignItems = 'center';
    component.style.display = 'flex';
    component.style.fontSize = 'var(--text-xxl)';
    component.style.justifyContent = 'center';
}