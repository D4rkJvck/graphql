import { MAIN } from "../utils/elements.js";
import BarChart from "./d3/bar.js";

export default class GraphSection extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });

        this.shadow.innerHTML = /* HTML */ `
            <fieldset>
                <legend>Progress (line)</legend>
            </fieldset>
            <fieldset>
                <legend>Top Projects (pie)</legend>
            </fieldset>
            <fieldset>
                <legend>Top Skills (radar)</legend>
            </fieldset>
            <fieldset>
                <legend></legend>
            </fieldset>
        `

        const style = document.createElement('style');
        style.innerHTML = /* CSS */ `
            * {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
            }

            :host {
                align-items: center;
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                grid-template-rows: repeat(2, 1fr);
                gap: var(--element-gap);
                // height: 80vh;
                justify-content: center;
                min-height: 80vh;
                width: 68vw;
            }
            
            fieldset {
                background: var(--bg-trans-black);
                border: 1px solid #333;
                border-radius: var(--rounded-md);
                min-height: 40vh;
            }
            
            fieldset:hover {
                border: 2px solid var(--text-zone01-stats);
            }

            fieldset:hover * {
                color: var(--text-zone01-bim);
            }


            legend {
                color: var(--text-zone01-stats);
                font-weight: bolder;
                margin-left: 2vw;
            }
            
            @media screen and (max-width: 900px) {
                :host {
                    display: flex;
                    flex-wrap: wrap;
                    width: 100%;
                }
                
                fieldset {
                    flex: 1 1 40vw;
                    min-width: 300px;
                }
            }
            `;
            this.shadow.appendChild(style);
            
            // this.query = 
    }

    connectedCallback() {
        // this.shadow.appendChild(new BarChart([43, 75, 25, 58, 88]))
    }

    static define(tag = 'graph-section') {
        customElements.define(tag, this)
    }
}

GraphSection.define();
