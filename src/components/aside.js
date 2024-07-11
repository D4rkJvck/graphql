import { PROFILE_QUERY } from "../graphql/profile.gql.js";
import { PROFILE_TEMPLATE } from "../templates/aside.html.js";
import { fetchFromGraphiQL } from "../services/api.js";
import { convertXP } from "../utils/format.js";

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
