export default class PieChart extends HTMLElement {
    constructor(dataset) {
        super();
        this.data = dataset;
        this.svg = d3.select(this).append('svg');
    }
}