import { SECTION_TEMPLATE } from "../templates/section.html.js";
import { MAIN } from "../utils/elements.js";
import BarChart from "./charts/bar.js";

export default class GraphSection extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });

        this.shadow.innerHTML = SECTION_TEMPLATE;

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'styles/components/section.css';
        this.shadow.appendChild(link);
            
        // this.query = 
    }

    connectedCallback() {
        // this.shadow.appendChild(new BarChart([43, 75, 25, 58, 88]))
    }

    static define(tag = 'graph-section') {
        customElements.define(tag, this)
    }
}

GraphSection.define();
