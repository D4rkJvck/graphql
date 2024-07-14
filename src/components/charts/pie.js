import { TOP_PROJECTS_QUERY } from "../../graphql/charts.gql.js";
import { fetchFromGraphiQL } from "../../services/services.js";
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
            .attr('viewBox', `-228 -136 ${this.width} ${this.height}`)
            .attr('preserveAspectRatio', 'xMidYMid meet');

        this.query = TOP_PROJECTS_QUERY;
    }

    connectedCallback() {
        fetchFromGraphiQL(this.query)
            .then(data => {
                if (!data) {
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

    #createLayout() {
        this.color = d3.scaleOrdinal()
            .domain(this.data.map(d => d.project))
            .range(d3.quantize(t => d3.interpolateSpectral(t * .8 + .1), this.data.length).reverse());

        this.pie = d3.pie()
            .sort(null)
            .value(d => d.amount);

        this.arc = d3.arc()
            .innerRadius(0)
            .outerRadius(Math.min(this.width, this.height) / 2);

        const labelRadius = this.arc.outerRadius()() * .7;

        this.arcLabel = d3.arc()
            .innerRadius(labelRadius)
            .outerRadius(labelRadius);

        this.arcs = this.pie(this.data);
    }

    #drawSectors() {
        this.svg.append('g')
                .attr('stroke', '#00d4a1')
            .selectAll()
            .data(this.arcs)
            .join('path')
                .attr('fill', '#00000000')
                .attr('d', this.arc)
            .append('title')
                .text(d => d.data.project.toLocaleString('en-US'));
            
        this.svg.append('g')
                .attr('text-anchor', 'middle')
            .selectAll()
            .data(this.arcs)
            .join('text')
                .attr('transform', d => `translate(${this.arcLabel.centroid(d)})`)
                .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append('tspan')
                    .attr('font-size', '10px')
                    .attr('fill', '#caadff')
                    .text(d => d.data.project))
                .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append('tspan')
                    .attr('font-size', '10px')
                    .attr('fill', '#fff')
                    .attr('x', 0)
                    .attr('y', '1.25em')
                    .text(d => {
                        const fmt = convertXP(d.data.amount);
                        return `${fmt.value} ${fmt.unit}`
                    }));

    }

    static define(tag = 'pie-chart') {
        customElements.define(tag, this);
    }
}

PieChart.define();