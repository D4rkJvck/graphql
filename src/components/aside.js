import { PROFILE_QUERY } from "../graphql/profile.gql.js";
import { PROFILE_TEMPLATE } from "../templates/aside.html.js";
import { fetchFromGraphiQL } from "../services/services.js";
import { convertXP } from "../utils/format.js";
import DonutChart from "./charts/donut.js";
import { ratioColor } from "../utils/elements.js";

export default class ProfileSection extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });

        this.shadow.innerHTML = PROFILE_TEMPLATE;

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'styles/components/aside.css';
        this.shadow.appendChild(link);

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
            .catch(err => console.error('ERROR -> ', err))
    }

    #render(data) {
        const loginLegend = this.shadow.querySelector('#login');
        const userFigcaption = this.shadow.querySelector('#user');

        const xpFigcaption = this.shadow.querySelector('#xp-amount');
        const xpText = this.shadow.querySelector('#xp-unit');

        const levelFigcaption = this.shadow.querySelector('#level');
        const auditFigcaption = this.shadow.querySelector('#audit');
        const auditRatio = this.shadow.querySelector('#audit-ratio');

        const fmt = convertXP(data.xpAmount);

        loginLegend.innerText = data.login;
        userFigcaption.innerHTML = /* HTML */ `
            <span id="first-name">
                ${data.firstName}
            </span>
            <span id="last-name">
                ${data.lastName}
            </span>`;

        xpFigcaption.innerText = fmt.value;
        xpText.innerText = fmt.unit;

        levelFigcaption.innerText = data.level;

        // Audit Text Color and Size depending on Value
        auditFigcaption.parentNode.parentNode.addEventListener('mouseover', () => {
            auditFigcaption.style.color = ratioColor(data.auditRatio);
        })
        auditFigcaption.parentNode.parentNode.addEventListener('mouseout', () => {
            auditFigcaption.style.color = 'inherit'
        })
        
        auditFigcaption.innerText = data.auditRatio;
        auditRatio.appendChild(new DonutChart());
    }

    static define(tag = 'profile-section') {
        customElements.define(tag, this)
    }
}

ProfileSection.define();
