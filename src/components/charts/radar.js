import { SKILLS_QUERY } from "../../graphql/charts.gql.js";
import { fetchFromGraphiQL } from "../../services/services.js";
import { errorNoData } from "../../utils/elements.js";

export default class RadarChart extends HTMLElement {
    constructor() {
        super();

        this.style.width = '95%';
        this.style.height = '90%';
        this.style.display = 'flex';
        this.style.justifyContent = 'center';

        this.width = 456;
        this.height = 272;
        this.radius = Math.min(this.width / 2.25, this.height / 2.25);

        this.svg = d3.select(this)
            .append('svg')
            .attr('viewBox', `0 0 ${this.width} ${this.height}`)
            .attr('preserveAspectRatio', 'xMidYMid meet');

        this.query = SKILLS_QUERY;
    }
    //_____________________________________________________________________
    //
    connectedCallback() {
        fetchFromGraphiQL(this.query)
            .then(data => {
                if (!data || data.data.skills.length === 0) {
                    throw new Error('No data fetched!')
                }

                this.data = data.data.skills
                    .map(d => {
                        d.type = d.type.slice(d.type.indexOf('_') + 1);
                        return d
                    })
                    .sort((a, b) => b.amount - a.amount)
                    .slice(0, 10)
                    .sort((a, b) => a.type.localeCompare(b.type));

                this.#scaling();
                this.#createLayout();
                this.#drawRadar();
            })
            .catch(err => {
                errorNoData(this);
                console.log(err);
            });
    }
    //_____________________________________________________________________
    //
    #scaling() {

        this.scale = d3.scaleLinear()
            .domain([0, 100])
            .range([0, this.radius])
    };
    //_______________________________________________________________________________
    //
    #createLayout() {
        this.angleSlice = Math.PI * 2 / this.data.length;
        const levels = 5;

        // Center Radial Grid
        const radialGrid = this.svg.append('g')
            .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);

        // Draw Concentric Circles
        for (let i = 0; i < levels; i++) {
            radialGrid.append('circle')
                .attr('r', this.radius / levels * (i + 1))
                .attr('fill', 'none')
                .attr('stroke', '#777')
                .attr('stroke-width', 0.5);
        }

        // Draw Radial Lines
        this.data.forEach((d, i) => {
            const angle = this.angleSlice * i - Math.PI / 2;
            const x = this.radius * Math.cos(angle);
            const y = this.radius * Math.sin(angle);

            radialGrid.append('line')
                .attr('x1', 0)
                .attr('y1', 0)
                .attr('x2', x)
                .attr('y2', y)
                .attr('stroke', '#777')
                .attr('stroke-width', 0.5);

            // Add Labels
            radialGrid.append('text')
                .attr('x', x * 1.2)
                .attr('y', y * 1.1)
                .attr('dy', '0.35em')
                .attr('text-anchor', 'middle')
                .attr('fill', '#caadff')
                .attr('font-size', '12px')
                .text(d.type)
        });

    };
    //_______________________________________________________________________________
    //
    #drawRadar() {
        const radarLine = d3.lineRadial()
            .radius(d => this.scale(d.amount))
            .angle((d, i) => i * this.angleSlice)
            .curve(d3.curveCardinalClosed);

        const radarGroup = this.svg.append('g')
            .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);

        radarGroup.append('path')
            .datum(this.data)
            .attr('d', radarLine)
            .attr('fill', '#caadff25')
            .attr('stroke', '#00d4a1')
    };
    //________________________________________________________________________________
    //
    static define(tag = 'radar-chart') {
        customElements.define(tag, this);
    }
}

RadarChart.define();