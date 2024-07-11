import { PROFILE_QUERY } from "../graphql/profile.js";
import { fetchFromGraphiQL } from "../utils/fetch.js";
import { convertXP } from "../utils/format.js";

export default class ProfileSection extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });

        this.shadow.innerHTML = /* HTML */ `
            <fieldset>
                <legend id="login">Login</legend>
                <figure>
                    <?xml version="1.0" encoding="utf-8"?>
                    <svg version="1.1" id="user-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 121.42" style="enable-background:new 0 0 122.88 121.42" xml:space="preserve">
                        <g>
                            <path class="st0" d="M0,121.42l0-19.63c10.5-4.67,42.65-13.56,44.16-26.41c0.34-2.9-6.5-13.96-8.07-19.26 c-3.36-5.35-4.56-13.85-0.89-19.5c1.46-2.25,0.84-10.44,0.84-13.53c0-30.77,53.92-30.78,53.92,0c0,3.89-0.9,11.04,1.22,14.1 c3.54,5.12,1.71,14.19-1.27,18.93c-1.91,5.57-9.18,16.11-8.56,19.26c2.31,11.74,32.13,19.63,41.52,23.8l0,22.23L0,121.42L0,121.42z"/>
                        </g>
                    </svg>
                    <figcaption id="user"><span></span></figcaption>
                </figure>
            </fieldset>
            <fieldset>
                <legend>XP</legend>
                <figure>
                    <figcaption id="xp-amount"></figcaption>
                    <span id="xp-unit"></sp>
                </figure>
            </fieldset>
            <fieldset>
                <legend>Level</legend>
                <figure>
                    <span id="rank">Apprentice Developer</span>
                    <figcaption id="level"></figcaption>
                </figure>
            </fieldset>
            <fieldset>
                <legend>Audit</legend>
                <figure>
                    <figcaption id="audit"></figcaption>
                    <svg></svg>
                </figure>
            </fieldset>
        `;

        const style = document.createElement('style');
        style.innerHTML = /* CSS */ `
            * {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
            }

            :host, fieldset, figure, figcaption, #xp-unit, #rank {
                align-items: center;
                display: flex;
                justify-content: space-evenly;
            }

            :host {
                flex-wrap: wrap;
                gap: var(--element-gap);
                justify-content: flex-start;
                min-height: 80vh;
                width: 20vw;
            }
            
            fieldset {
                align-items: center;
                background: var(--bg-trans-black);
                border: 1px solid #333;
                border-radius: var(--rounded-md);
                flex: 1;
                height: 19vh;
                min-width: 180px;
                transition: .5s;
            }
            
            fieldset:hover {
                border: 2px solid var(--text-zone01-stats);
                transform: scale(1.1);
            }

            fieldset:hover * {
                color: var(--text-zone01-bim);
            }
            
            figure {
                align-items: center;
                flex-wrap: wrap;
                height: 100%;
                // gap: var(--element-gap);
                width: 100%;
            }

            svg, #xp-unit, #rank {
                border: 1px solid var(--text-dark-gray);
                border-radius: 50%;
                height: 7.5vw;
                width: 7.5vw;
            }
            
            #last-name {
                font-size: var(--text-base);
                font-weight: bolder;
                text-align: left;
                width: 100%;
            }
            
            legend {
                color: var(--text-zone01-stats);
                font-weight: bolder;
                margin-left: 2vw;
            }

            figcaption {
                // margin: 0 1vw;
                width: fit-content;
            }
            
            #user {
                flex-direction: column;
                gap: 0.5vw;
                text-align: left;
            }

            #xp-unit {
                font-size: var(--text-xxl);
            }
            
            #audit, #level, #xp-amount {
                font-size: calc(var(--text-xxl) * 1.5);
                text-align: center;
            }

            #rank {
                font-size: var(--text-sm);
                text-align: center;
            }

            #user-icon {
                // height: 8vh;
            }
            
            @media screen and (max-width: 900px) {
                :host {
                    min-height: 20vh;
                    width: 100%;
                }
                
                fieldset {
                    height: 20vh;
                    // width: 21.5vw;
                }
                                
                #user, #last-name {
                    text-align: center;
                    width: 100%;
                }
            }

        `;
        this.shadow.appendChild(style);

        this.query = PROFILE_QUERY;
    }

    connectedCallback() {
        fetchFromGraphiQL(this.query)
            .then(data => {
                if (!data) {
                    throw new Error('No data fetched');
                }

                const user = data.data.user_info[0];

                this.#render({
                    login: user.login,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    auditRatio: user.auditRatio.toFixed(1),
                    level: user.events[0].level,
                    xpAmount: data.data.xp_amount.aggregate.sum.amount
                })
            })
            .catch(err => console.error(err))
    }

    #render(data) {
        const loginLegend = this.shadow.querySelector('#login');
        const userFigcaption = this.shadow.querySelector('#user');
        const xpFigcaption = this.shadow.querySelector('#xp-amount');
        const xpText = this.shadow.querySelector('#xp-unit');
        const levelFigcaption = this.shadow.querySelector('#level');
        const auditFigcaption = this.shadow.querySelector('#audit');
        const result = convertXP(data.xpAmount);

        loginLegend.innerText = data.login;
        userFigcaption.innerHTML = /* HTML */ `
            ${data.firstName}
            <span id="last-name">
                ${data.lastName}
            </span>`;
        xpFigcaption.innerText = result.value;
        xpText.innerText = result.unit;
        levelFigcaption.innerText = data.level;
        auditFigcaption.innerText = data.auditRatio;
    }

    static define(tag = 'profile-section') {
        customElements.define(tag, this)
    }
}

ProfileSection.define();
