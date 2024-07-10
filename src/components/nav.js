import { HEADER, MAIN } from "../utils/elements.js";
import LoginForm from "./form.js";

export default class NavBar extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });

        this.shadow.innerHTML = /* HTML */ `
            <svg id="logo" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 121.26">
                <defs>
                    <style>.cls-1{fill-rule:evenodd;}</style>
                </defs>
                <title>market-share</title>
                <path class="cls-1" d="M65.17,69.35l48.1.8a51.36,51.36,0,0,1-22.67,42.6L65.17,69.35Zm45.12-30.51V57.62l5.48.16a56.86,56.86,0,0,0-5.48-18.94ZM105,57.46V30.13a57.25,57.25,0,0,0-5.55-6.49V57.29l5.55.17Zm-10.83-.34V19a56,56,0,0,0-5.55-3.85V57l5.55.17Zm-10.83-.33V12.25A58.91,58.91,0,0,0,77.79,10V56.62l5.56.17Zm-10.84-.33v-48c-1.92-.48-3.82-.85-5.5-1.13v49l5.5.17ZM60.4,0A76.5,76.5,0,0,1,76.53,2.56a63.9,63.9,0,0,1,46.19,58.53l.16,3.59L60.4,62.76V0ZM54.85,66.41l27.43,47.51A54.86,54.86,0,1,1,52.53,11.6l2.32,54.81Z"/>
            </svg>
            <h1>Welcome to Graph01</h1>
            <button>
                <?xml version="1.0" encoding="utf-8"?>
                <svg version="1.1" id="logout" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50px" height="40px" viewBox="0 0 122.88 114.318" enable-background="new 0 0 122.88 114.318" xml:space="preserve">
                    <g>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M122.88,35.289L87.945,70.578v-17.58c-22.091-4.577-39.542,0.468-52.796,17.271 c2.301-34.558,25.907-51.235,52.795-52.339L87.945,0L122.88,35.289L122.88,35.289z"/>
                        <path d="M6.908,23.746h35.626c-4.587,3.96-8.71,8.563-12.264,13.815H13.815v62.943h80.603V85.831l13.814-13.579v35.159 c0,3.814-3.093,6.907-6.907,6.907H6.908c-3.815,0-6.908-3.093-6.908-6.907V30.653C0,26.838,3.093,23.746,6.908,23.746L6.908,23.746 z"/>
                    </g>
                </svg>
            </button>   
        `;

        const style = document.createElement('style');
        style.innerHTML = /* CSS */ `
            :host {
                align-items: center;
                display: flex;
                gap: var(--element-gap);
                height: 10vh;
                justify-content: space-between;
                // min-width: 250px;
                width: 90vw;
            }

            h1 {
                color: var(--text-light-gray);
                font-size: var(--text-xl);
                text-align: center;
            }

            button {
                background: none;
                border: none;
                cursor: pointer;
            }

            #logo {
                animation: rot 30s alternate infinite;
                fill: var(--text-light-gray);
                height: 8vh;
                transition: 10s;
            }
            
            @keyframes rot {
                from {transform: rotate(0);}
                to {transform: rotate(360deg)}
            }

            #logout {
                fill: var(--text-dark-gray);
            }

            #logout:hover {
                fill: brown;
                transform: scale(1.2);
            }
        `
        this.shadow.appendChild(style)
    }

    connectedCallback() {
        const btn = this.shadow.querySelector('button');

        btn.onclick = () => {
            localStorage.removeItem('jwtToken');
            HEADER.removeChild(this);
            MAIN.innerHTML = '';
            MAIN.appendChild(new LoginForm);
        }
    }

    static define(tag = 'header-navbar') {
        customElements.define(tag, this)
    }
}

NavBar.define()
