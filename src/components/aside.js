import { USER_INFO_QUERY } from "../graphql/profile.js";
import { fetchFromGraphiQL } from "../utils/fetch.js";

export default class ProfileSection extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });

        this.shadow.innerHTML = /* HTML */ `
            <fieldset>
                <legend id="login"></legend>
                <figure>
                    <svg></svg>
                    <figcaption id="user"><span></span></figcaption>
                </figure>
            </fieldset>
            <fieldset>
                <legend>Level</legend>
            </fieldset>
            <fieldset>
                <legend>XP</legend>
            </fieldset>
            <fieldset>
                <legend>Audit</legend>
                <div></div>
                <svg></svg>
            </fieldset>
        `;

        const style = document.createElement('style');
        style.innerHTML = /* CSS */ `
            * {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
            }

            :host {
                display: flex;
                flex-wrap: wrap;
                gap: var(--element-gap);
                justify-content: center;
                min-height: 80vh;
                width: 20vw;
            }
            
            fieldset {
                align-items: center;
                background: var(--bg-trans-black);
                border: 1px solid #333;
                border-radius: var(--rounded-md);
                display: flex;
                height: 19vh;
                justify-content: space-evenly;
                width: 20vw;
            }
            
            figure {
                align-items: center;
                display: flex;
                flex-wrap: wrap;
                height: 100%;
                // gap: var(--element-gap);
                justify-content: space-evenly;
                width: 100%;
            }

            svg {
                border: 1px solid var(--text-zone01);
                border-radius: 50%;
                height: 6vw;
                margin-left: 1vw;
                width: 6vw;
            }
            
            figcaption {
                color: var(--text-light-gray);
                display: flex;
                flex-direction: column;
                gap: 0.5vw;
                margin: 0 1vw;
                width: 10vw;
            }
            
            span {
                font-size: var(--text-base);
                font-weight: bolder;
            }
            
            legend {
                color: var(--text-gray);
                font-weight: bolder;
                margin-left: 2vw;
            }
            
            div {
                color: var(--text-zone01);
                font-size: calc(var(--text-xxl) * 2);
                height: 100%;
                // border: 1px solid white;
                text-align: center;
                width: 10vw;
            }
            
            @media screen and (max-width: 900px) {
                :host {
                    min-height: 20vh;
                    width: 100%;
                }
                
                fieldset {
                    height: 20vh;
                    width: 21.5vw;
                }
                
                svg {
                    height: 6vw;
                    margin: 0;
                    width: 6vw;
                }
                
                figcaption {
                    text-align: center;
                    width: 100%;
                }

                div {
                    font-size: calc(var(--text-xxl) * 1.5);
                }
            }
        `;
        this.shadow.appendChild(style);

        this.query = /* GraphQL */ `
            query {
                user_info: user {
                    login
                    firstName
                    lastName
                    auditRatio
                }
                xp_amount: transaction_aggregate(
                    where: { type: { _eq: "xp" }, event: { path: { _eq: "/dakar/div-01" } } }
                ) {
                    aggregate {
                        sum {
                            amount
                        }
                    }
                }
            }
        `;
    }

    connectedCallback() {
        fetchFromGraphiQL(this.query)
            .then(data => {
                const user = data.data.user_info[0];
                console.log(user.auditRatio);
                this.#render({
                    login: user.login,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    auditRatio: user.auditRatio.toFixed(1),
                    xpAmount: data.data.xp_amount.aggregate.sum.amount
                })
            })
            .catch(err => console.error(err))
    }

    #render(data) {
        const loginLegend = this.shadow.querySelector('#login');
        const userFigcaption = this.shadow.querySelector('#user');
        const auditDiv = this.shadow.querySelector('div');

        loginLegend.innerText = data.login;
        userFigcaption.innerHTML = /* HTML */ `${data.firstName}<span>${data.lastName}</span>`;
        auditDiv.innerText = data.auditRatio;
    }

    static define(tag = 'profile-section') {
        customElements.define(tag, this)
    }
}

ProfileSection.define();
