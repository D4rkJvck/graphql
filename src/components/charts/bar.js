import { PROGRESS_QUERY } from "../../graphql/charts.gql.js";
import { fetchFromGraphiQL } from "../../services/services.js";
import { errorNoData } from "../../utils/elements.js";
import { convertXP, xpByMonth } from "../../utils/format.js";

export default class BarChart extends HTMLElement {
    constructor() {
        super();

        this.style.height = '90%';
        this.style.width = '95%';
        this.style.display = 'flex';
        this.style.justifyContent = 'center';

        this.width = 456;
        this.height = 272;
        this.marginTop = 20;
        this.marginRight = 20;
        this.marginBottom = 30;
        this.marginLeft = 50;

        this.svg = d3.select(this)
            .append('svg')
            .attr('viewBox', `0 0 ${this.width} ${this.height}`)
            .attr('preserveAspectRatio', 'xMidYMid meet');

        this.query = PROGRESS_QUERY;
        this.oneYearAgo = new Date(new Date() - 31536000000);
    }
    //___________________________________________________________________
    //
    connectedCallback() {
        fetchFromGraphiQL(this.query)
            .then(data => {
                if (!data) {
                    errorNoData(this);
                    throw new Error('ERROR: Data not fectched')
                }

                const xpTab = xpByMonth(data.data.xp_progress);
                this.data = xpTab.filter(d => d.date >= this.oneYearAgo);

                this.#scaling();
                this.#drawAxis();
                this.#drawBars();
            })
            .catch(error => console.log(error))
    }
    //______________________________________________________________________
    //
    #scaling() {
        const xpAVG = 281337.5;

        this.yScale = d3.scaleLinear()
            .domain([0, Math.max(d3.max(this.data, d => d.amount), xpAVG)])
            .range([this.height - this.marginBottom, this.marginTop]);

        this.xScale = d3.scaleBand()
            .domain(this.data.map(d => d.date))
            .range([this.marginLeft, this.width - this.marginRight])
            .paddingInner(.25)
            .paddingOuter(.25);
    }
    //__________________________________________________________________
    //
    #drawAxis() {
        // Draw Y Axis
        const yAxis = d3.axisLeft(this.yScale)
            .tickFormat(d => {
                if (d >= 1e6) {
                    return d3.format('.2s')(d).replace('M', ' MB')
                } else if (d >= 1e3) {
                    return d3.format('.2s')(d).replace('k', ' kB')
                } else {
                    return d
                }
            });

        this.svg.append('g')
            .attr('transform', `translate(${this.marginLeft}, 0)`)
            .call(yAxis);

        // Add Y Grid Lines
        const yGridLines = d3.axisLeft(this.yScale)
            .tickSize(- this.width + this.marginLeft + this.marginRight)
            .tickFormat('')
            .tickSizeOuter(0);

        this.svg.append('g')
            .attr('transform', `translate(${this.marginLeft}, 0)`)
            .call(yGridLines)
            .selectAll('line')
            .attr('stroke', '#777')
            .attr('stroke-width', .15);

        // Draw X Axis
        const xAxis = d3.axisBottom(this.xScale)
            .tickFormat(d3.timeFormat('%b'));

        this.svg.append('g')
            .attr('transform', `translate(0, ${this.height - this.marginBottom})`)
            .call(xAxis);

        // Add X Grid Lines
        const xGridLines = d3.axisBottom(this.xScale)
            .tickSize(- this.height + this.marginBottom + this.marginTop)
            .tickFormat('')
            .tickSizeOuter(0);

        this.svg.append('g')
            .attr('transform', `translate(0, ${this.height - this.marginBottom})`)
            .call(xGridLines)
            .selectAll('line')
            .attr('stroke', '#777')
            .attr('stroke-width', .15);
    }
    //________________________________________________________________________________
    //
    #drawBars() {
        this.svg.append('g')
            .attr('fill', '#caadff25')
            .selectAll()
            .data(this.data)
            .join('rect')
            .attr('stroke', '#00d4a1')
            .attr('stroke-width', 0.5)
            .attr('x', d => this.xScale(d.date))
            .attr('y', d => this.yScale(d.amount))
            .attr('height', d => this.yScale(0) - this.yScale(d.amount))
            .attr('width', this.xScale.bandwidth())
            .on('mouseover', (e, d) => {
                this.svg.select('text')
                    .attr('x', this.xScale(d.date) - 40)
                    .attr('y', this.yScale(d.amount) - this.yScale(0) - 10)
                    .attr('text-anchor', 'middle')
                    .text(convertXP(d.amount).fmt);
            })
    }
    //______________________________________________________________________________
    //
    static define(tag = 'bar-chart') {
        customElements.define(tag, this)
    }
}

BarChart.define();
