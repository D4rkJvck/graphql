export default class BarChart extends HTMLElement {
    constructor(dataset) {
        super();
        // this.shadow = this.attachShadow({ mode: 'open' });

        this.data = dataset;

        this.style.width = '50%';
        this.style.height = '50%';
        this.style.display = 'flex';
        this.style.justifyContent = 'center';
        this.style.alignItems = 'center';

        this.svg = d3.select(this)
            .append('svg')
            .attr('width', '90%')
            .attr('height', '90%')
            .style('border', '1px dashed white');

        this.xScale = d3.scaleLinear()
            .domain([0, this.data.length])
            .range([0, this.style.width * 2]);

        this.yScale = d3.scaleLinear()
            .domain([0, d3.max(this.data)])
            .range([0, this.style.height * 2]);

        this.xAxis = d3.axisLeft(this.xScale);
        this.yAxis = d3.axisBottom(this.yScale);    
    }

    connectedCallback() {
        this.#drawAxis();
        this.#drawBars();
    }

    #drawAxis() {
        this.svg.append('g')
            .attr('transform', `translate(0, ${this.style.height * 2 - 50})`)
            .call(this.xAxis)
        
        this.svg.append('g')
            .attr('transform', `translate(0, ${this.style.width * 2 - 50})`)
            .call(this.yAxis)
    }

    #drawBars() {
        this.svg.selectAll('rect')
            .data(this.data)
            .enter()
            .append('rect')
            .attr('x', (d, i) => i * 50 + 25)
            .attr('y', d => this.style.height * 2 - d * 2.5 - 25 )
            .attr('width', 30)
            .attr('height', d => d * 2.5)
            .attr('fill', 'white')
    }

    static define(tag = 'bar-chart') {
        customElements.define(tag, this)
    }
}

BarChart.define()