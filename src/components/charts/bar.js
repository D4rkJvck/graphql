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
    }

    connectedCallback() {
        this.xpMax = 147000
        this.#scaling();
        this.#drawAxis();
        this.#drawBars();
    }

    #scaling() {
        this.yScale = d3.scaleLinear()
            .domain([0, this.xpMax])
            .range([this.height - this.marginBottom, this.marginTop]);

        this.xScale = d3.scaleLinear()
            .domain([0, 10])
            .range([this.marginLeft, this.width - this.marginRight]);
    }

    #drawAxis() {
        // Draw Y Axis
        const yAxis = d3.axisLeft(this.yScale)
            .tickFormat(d => {
                if (d >= 1e6) {
                    return d3.format('.2s')(d).replace('G', 'B')
                } else if (d >= 1e3) {
                    return d3.format('.2s')(d).replace('G', 'M')
                } else {
                    return d
                }
            });

        this.svg.append('g')
            .attr('transform', `translate(${this.marginLeft}, 0)`)
            .call(yAxis);
        
        // Draw X Axis
        const xAxis = d3.axisBottom(this.xScale);

        this.svg.append('g')
            .attr('transform', `translate(0, ${this.height - this.marginBottom})`)
            .call(xAxis);
    }

    #drawBars() {
        
    }

    static define(tag = 'bar-chart') {
        customElements.define(tag, this)
    }
}

BarChart.define()