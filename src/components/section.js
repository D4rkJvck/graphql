import { SECTION_TEMPLATE } from "../templates/section.html.js";
import BarChart from "./charts/bar.js";
import ProgressAreaChart from "./charts/area.js";

export default class GraphSection extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });

        this.shadow.innerHTML = SECTION_TEMPLATE;

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'styles/components/section.css';
        this.shadow.appendChild(link);
            
        this.areaFieldset = this.shadow.querySelector('#area');
        this.pieFieldset = this.shadow.querySelector('#pie');
        this.polarFieldset = this.shadow.querySelector('#polar');
        this.barFieldset = this.shadow.querySelector('#bar');
    }

    connectedCallback() {
        this.areaFieldset.appendChild(new ProgressAreaChart());
        this.barFieldset.appendChild(new BarChart());
    }

    static define(tag = 'graph-section') {
        customElements.define(tag, this)
    }
}

GraphSection.define();
