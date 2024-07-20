import { PROGRESS_QUERY } from '../../graphql/charts.gql.js';
import { fetchFromGraphiQL } from '../../services/services.js';
import { xpByMonth } from '../../utils/format.js';

export default class AreaChart extends HTMLElement {
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
    //___________________________________________________________________________________________
    //
    connectedCallback() {
        fetchFromGraphiQL(this.query)
            .then(data => {
                if (!data) {
                    throw new Error('No data fetched!');
                }

                const xpTab = xpByMonth(data.data.xp_progress);

                // Accumulate XP
                xpTab.forEach((d, i) => {
                        if (i > 0) {
                            d.amount += xpTab[i - 1].amount;
                        }
                    })

                // Filter Time Interval
                this.data = xpTab.filter(d => d.date >= this.oneYearAgo);
                this.xpAmount = this.data[this.data.length - 1].amount;

                this.#scaling();
                this.#drawAxis();
                this.#drawArea();
            })
            .catch(err => console.error('ERROR -> ', err));
    }
    //_____________________________________________________________________
    //
    #scaling() {
        this.yScale = d3.scaleLinear()
            .domain([0, this.xpAmount])
            .range([this.height - this.marginBottom, this.marginTop]);

        this.xScale = d3.scaleUtc()
            .domain(d3.extent(this.data, d => d.date))
            .range([this.marginLeft, this.width - this.marginRight]);
    }
    //________________________________________________________________
    //
    #drawAxis() {
        // Draw Y Axis
        const yAxis = d3.axisLeft(this.yScale)
            .tickFormat(d => {
                if (d >= 1e6) {
                    return d3.format('.2s')(d).replace('M', ' MB');
                } else if (d >= 1e3) {
                    return d3.format('.2s')(d).replace('k', ' kB');
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
            .tickFormat('');

        this.svg.append('g')
            .attr('transform', `translate(${this.marginLeft}, 0)`)
            .call(yGridLines)
            .selectAll('line')
            .attr('stroke', '#777')
            .attr('stroke-width', .25)
        
        this.svg.append('text')
            .attr('x', this.marginLeft + 50)
            .attr('y', this.marginTop)
            .attr('dy', '-0.5em')
            .attr('text-anchor', 'end')
            .attr('fill', '#00d4a1')
            .text(d3.format('.3s')(this.xpAmount).replace('k', 'kB').replace('M', 'MB'));

        // Draw X Axis
        const xAxis = d3.axisBottom(this.xScale)
            .tickFormat(d3.timeFormat('%b'));

        this.svg.append('g')
            .attr('transform', `translate(0, ${this.height - this.marginBottom})`)
            .call(xAxis);

        // Add X Grid Lines
        const xGridLines = d3.axisBottom(this.xScale)
            .tickSize(- this.width + this.marginBottom + this.marginTop)
            .tickFormat('');

        this.svg.append('g')
            .attr('transform', `translate(0, ${this.height - this.marginBottom})`)
            .call(xGridLines)
            .selectAll('line')
            .attr('stroke', '#777')
            .attr('stroke-width', .25)
    }
    //___________________________________________________________________________________________
    //
    #drawArea() {
        const area = d3.area()
            .x(d => this.xScale(d.date))
            .y0(this.height - this.marginBottom)
            .y1(d => this.yScale(d.amount))
            .curve(d3.curveCardinal)

        const line = d3.line()
            .x(d => this.xScale(d.date))
            .y(d => this.yScale(d.amount))
            .curve(d3.curveCardinal);

        this.svg.append('path')
            .attr('fill', '#caadff25')
            .attr('d', area(this.data));

        // Overlay Line on Area
        this.svg.append('path')
            .attr('fill', 'none')
            .attr('d', line(this.data))
            .attr('stroke', '#00d4a1')
    }
    //____________________________________________
    //
    static define(tag = 'progress-line-chart') {
        customElements.define(tag, this);
    }
}

AreaChart.define();
