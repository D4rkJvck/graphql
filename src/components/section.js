import { MAIN } from "../utils/elements.js";
import BarChart from "./d3/bar.js";

export default class GraphSection extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });

        this.shadow.innerHTML = /* HTML */ `
            <fieldset>
                <legend>Progress</legend>
            </fieldset>
            <fieldset>
                <legend></legend>
            </fieldset>
            <fieldset>
                <legend></legend>
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
                grid-template-columns: 1fr 1fr;
                grid-template-rows: 1fr 1fr;
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
                // width: 34vw;
            }

            legend {
                color: var(--text-gray);
                font-weight: bolder;
                margin-left: 2vw;
            }

            @media screen and (max-width: 900px) {
                :host {
                    width: 100%;
                }

                // fieldset {
                //     height: 35vw;
                // }
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
