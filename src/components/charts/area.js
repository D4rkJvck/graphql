import { PROGRESS_QUERY } from '../../graphql/charts.gql.js';
import { fetchFromGraphiQL } from '../../services/services.js';
import { formatProgressData } from '../../utils/format.js';

export default class ProgressAreaChart extends HTMLElement {
    constructor() {
        super();

        this.style.height = '90%'
        this.style.width = '95%';
        this.style.display = 'flex'
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
    //----------------------------------------------------------------------------
    connectedCallback() {

        fetchFromGraphiQL(this.query)
            .then(data => {
                if (!data) {
                    throw new Error('No data fetched!');
                }

                this.data = formatProgressData(data.data.xp_progress);
                
                console.log(this.data);

                this.xpAmount = this.data[this.data.length - 1].amount;

                this.#scaling();
                this.#drawAxis();
                this.#drawArea();
            })
            .catch(err => console.error('ERROR -> ', err));
    }
    //----------------------------------------------------------------------------
    #scaling() {

        this.yScale = d3.scaleLinear()
            .domain([0, this.xpAmount])
            .range([this.height - this.marginBottom, this.marginTop]);

        this.xScale = d3.scaleUtc()
            .domain(d3.extent(this.data, d => d.date))
            // .domain([this.oneYearAgo, new Date()])
            .range([this.marginLeft, this.width - this.marginRight]);
    }
    //----------------------------------------------------------------------------
    #drawAxis() {
        // Draw Y Axis
        const yAxis = d3.axisLeft(this.yScale)
            .tickFormat(d => {
                if (d >= 1e6) {
                    return d3.format('.2s')(d).replace('G', 'B');
                } else if (d >= 1e3) {
                    return d3.format('.2s')(d).replace('G', 'M');
                } else {
                    return d
                }
            });

        this.svg.append('g')
            .attr('transform', `translate(${this.marginLeft}, 0)`)
            .call(yAxis);

        // Draw X Axis
        const xAxis = d3.axisBottom(this.xScale)
            .tickFormat(d3.timeFormat('%b'))

        this.svg.append('g')
            .attr('transform', `translate(0, ${this.height - this.marginBottom})`)
            .call(xAxis);
    }
    //----------------------------------------------------------------------------
    #drawArea() {
        const area = d3.area()
            .x(d => this.xScale(d.date))
            .y0(this.height - this.marginBottom)
            .y1(d => this.yScale(d.amount));

        this.svg.append('path')
            .attr('fill', 'none')
            .attr('d', area(this.data))
            .attr('stroke', '#00d4a1');
    }
    //----------------------------------------------------------------------------
    static define(tag = 'progress-line-chart') {
        customElements.define(tag, this);
    }
}

ProgressAreaChart.define();
