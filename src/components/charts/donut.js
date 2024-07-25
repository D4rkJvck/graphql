import { AUDIT_QUERY } from "../../graphql/profile.gql.js";
import { fetchFromGraphiQL } from "../../services/services.js";
import { errorNoData } from "../../utils/elements.js";
import { getRatioColor } from "../../utils/extract.js";
import { convertXP } from "../../utils/format.js";

export default class DonutChart extends HTMLElement {
    constructor() {
        super();

        this.style.width = '95%';
        this.style.height = '90%';
        this.style.display = 'flex';
        this.style.justifyContent = 'center';

        this.width = 108;
        this.height = 108;
        this.radius = Math.min(this.width, this.height) / 2;

        this.svg = d3.select(this).append('svg')
            .attr('viewBox', [- this.width / 2, - this.height / 2, this.width, this.height])
            .attr('preserveAspectRatio', 'xMidYMid meet');

        this.query = AUDIT_QUERY;
    }
    //_________________________________________________________________________________________
    //
    connectedCallback() {
        fetchFromGraphiQL(this.query)
            .then(data => {
                if (!data || data.data.audit[0].length === 0) {
                    throw new Error('No data fetched!');
                }

                this.data = Object.values(data.data.audit[0]);
                this.auditRatio = (this.data[0] / this.data[1]).toFixed(1);

                this.#createLayout();
                this.#drawSectors();
            })
            .catch(error => {
                errorNoData(this);
                console.log(error);
            })
    }
    //____________________________________________________________
    //
    #createLayout() {
        this.pie = d3.pie()
            .sort(null)
            .value(d => d)
            .padAngle(.1)

        this.arc = d3.arc()
            .innerRadius(this.radius * .9)
            .outerRadius(this.radius);

        this.arcs = this.pie(this.data)
    }
    //_______________________________________________________________________________________
    //
    #drawSectors() {
        this.svg.append('g')
            .selectAll()
            .data(this.arcs)
            .join('path')
            .attr('fill', (d, i) => getRatioColor(this.auditRatio, i))
            .attr('d', this.arc)
            .append('title')
            .text(d => Object.keys(d.data).map(key => `${key}: ${d.data[key]}`).join(', '))

    }
    //_______________________________________________________________________________________
    //
    static define(tag = 'donut-chart') {
        customElements.define(tag, this);
    }
}

DonutChart.define();