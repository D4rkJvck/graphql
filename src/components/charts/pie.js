import { TOP_PROJECTS_QUERY } from "../../graphql/charts.gql.js";
import { fetchFromGraphiQL } from "../../services/services.js";
import { errorNoData } from "../../utils/elements.js";
import { convertXP } from "../../utils/format.js";

export default class PieChart extends HTMLElement {
    constructor() {
        super();

        this.style.width = '90%';
        this.style.height = '95%';
        this.style.display = 'flex';
        this.style.justifyContent = 'center';

        this.width = 456;
        this.height = 272;

        this.svg = d3.select(this).append('svg')
            .attr('viewBox', [- this.width / 2, - this.height / 2, this.width, this.height])
            .attr('preserveAspectRatio', 'xMidYMid meet')

        this.query = TOP_PROJECTS_QUERY;
    }
    //________________________________________________________________________________________
    //
    connectedCallback() {
        fetchFromGraphiQL(this.query)
            .then(data => {
                if (!data) {
                    errorNoData(this);
                    throw new Error('Data not fetched');
                }

                this.data = data.data.top_projects.map(d => {
                    d.project = d.project.slice(d.project.lastIndexOf('/') + 1);
                    return d
                });

                this.#createLayout();
                this.#drawSectors()
            })
            .catch(error => console.error('ERROR: ', error))
    }
    //________________________________________________________________________________
    //
    #createLayout() {
        this.pie = d3.pie()
            .sort(null)
            .value(d => d.amount)
            .padAngle(.05);

        this.arc = d3.arc()
            .innerRadius(10)
            .outerRadius(Math.min(this.width, this.height) / 2);

        const labelRadius = this.arc.outerRadius()() * .7;

        this.arcLabel = d3.arc()
            .innerRadius(labelRadius)
            .outerRadius(labelRadius);

        this.arcs = this.pie(this.data);
    }
    //___________________________________________________________________________________________
    //
    #drawSectors() {
        this.svg.append('g')
            .attr('stroke', '#00d4a1')
            .attr('stroke-width', 0.5)
            .selectAll()
            .data(this.arcs)
            .join('path')
            .attr('fill', '#caadff25')
            .attr('d', this.arc)
            .append('title')
            .text(d => d.data.project.toLocaleString('en-US'));

        this.svg.append('g')
            .attr('text-anchor', 'middle')
            .selectAll()
            .data(this.arcs)
            .join('text')
            .attr('transform', d => `translate(${this.arcLabel.centroid(d)})`)
            // Project Name Label
            .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append('tspan')
                .attr('font-size', '10px')
                .attr('fill', '#caadff')
                .text(d => d.data.project))
            // XP Amount Label
            .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append('tspan')
                .attr('font-size', '10px')
                .attr('fill', '#fff')
                .attr('x', 0)
                .attr('y', '1.5em')
                .text(d => {
                    const fmt = convertXP(d.data.amount);
                    return `${fmt.value} ${fmt.unit}`
                }));

    }
    //___________________________________________________________________________________________
    //
    static define(tag = 'pie-chart') {
        customElements.define(tag, this);
    }
}

PieChart.define();