// import BarChart from "../svg/bar-chart.js";

export default class GraphSection extends HTMLElement {
    constructor() {
        super()
        // this.shadow = this.attachShadow({ mode: 'open' })
        this.innerHTML = /*html*/ `
            <section>

            </section>
        `;

        const style = document.createElement('style');
        style.innerHTML = /*css*/ `
            section {
                background: var(--bg-trans-black);
                border-radius: var(--rounded-md);
                display: flex;
                // grid-column: 2;
                min-height: 80vh;
                // min-width: 750px;
                // width: 100%;
            }    
        `;
        this.appendChild(style);
    }

    connectedCallback() {
        // d3.select(this).node().querySelector('section').appendChild(new BarChart([43, 75, 25, 58, 88]))
    }

    static define(tag = 'graph-section') {
        customElements.define(tag, this)
    }
}