import BarChart from "./d3/bar.js";

export default class GraphSection extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' })

        this.style.background =  /* css */ `var(--bg-trans-black)`;
        this.style.borderRadius = /* css */ `var(--rounded-md)`;
        this.style.display = 'flex';
        this.style.height = '80vh';
        // this.style.width = '65vw';

        this.query = /* GraphQL */ `
            {

            }
        `
    }

    connectedCallback() {
        this.shadow.appendChild(new BarChart([43, 75, 25, 58, 88]))
    }

    static define(tag = 'graph-section') {
        customElements.define(tag, this)
    }
}

GraphSection.define();
