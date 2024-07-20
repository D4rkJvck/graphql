import { SECTION_TEMPLATE } from "../templates/section.html.js";
import BarChart from "./charts/bar.js";
import AreaChart from "./charts/area.js";
import PieChart from "./charts/pie.js";
import RadarChart from "./charts/radar.js";

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
        this.radarFieldset = this.shadow.querySelector('#radar');
        this.barFieldset = this.shadow.querySelector('#bar');
    }
    //______________________________________________________________
    //
    connectedCallback() {
        this.areaFieldset.appendChild(new AreaChart());
        this.pieFieldset.appendChild(new PieChart());
        this.radarFieldset.appendChild(new RadarChart());
        this.barFieldset.appendChild(new BarChart());
    }
    //______________________________________________________________
    //
    static define(tag = 'graph-section') {
        customElements.define(tag, this)
    }
}

GraphSection.define();
