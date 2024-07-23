import { PROFILE_QUERY } from "../graphql/profile.gql.js";
import { PROFILE_TEMPLATE } from "../templates/aside.html.js";
import { fetchFromGraphiQL } from "../services/services.js";
import { convertXP } from "../utils/format.js";
import DonutChart from "./charts/donut.js";
import { getRatioColor, getRank } from "../utils/extract.js";
import { errorNoData } from "../utils/elements.js";

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
    //__________________________________________________________________
    //
    connectedCallback() {
        fetchFromGraphiQL(this.query)
            .then(data => {
                if (!data) {
                    this.shadow.querySelectorAll('figure')
                        .forEach(elem => {
                            errorNoData(elem)
                        });

                    throw new Error('No data fetched');
                }

                const user = data.data.user_info[0];

                this.#render({
                    login: user.login,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    gender: user.attrs.gender,
                    auditRatio: user.auditRatio.toFixed(1),
                    level: user.events[0].level,
                    xpAmount: data.data.xp_amount.aggregate.sum.amount
                })
            })
            .catch(err => console.error('ERROR -> ', err))
    }
    //________________________________________________________________________________
    //
    #render(data) {
        const fmt = convertXP(data.xpAmount);

        const loginLegend = this.shadow.querySelector('#login');
        loginLegend.innerText = data.login;

        const profileSpan = this.shadow.querySelector('#profile');
        let img = '👤'

        if (data.gender === 'Masculin') {
            img = /* HTML */ `<img src="assets/avatar-male.svg" alt="👤" />`
        } else if (data.gender === 'Féminin') {
            img = /* HTML */ `<img src="assets/avatar-female.svg" alt="👤" />`
        }

        profileSpan.innerHTML = img

        const userFigcaption = this.shadow.querySelector('#user');
        userFigcaption.innerHTML = /* HTML */ `
            <span id="first-name">
                ${data.firstName}
            </span>
            <span id="last-name">
                ${data.lastName}
            </span>`;

        const xpFigcaption = this.shadow.querySelector('#xp-amount');
        xpFigcaption.innerText = fmt.value;

        const xpText = this.shadow.querySelector('#xp-unit');
        xpText.innerText = fmt.unit;

        const levelFigcaption = this.shadow.querySelector('#level');
        levelFigcaption.innerText = data.level;

        const rankSpan = this.shadow.querySelector('#rank');
        rankSpan.innerText = getRank(data.level);
        rankSpan.style.color = '#caadff'

        const auditFigcaption = this.shadow.querySelector('#audit');
        auditFigcaption.innerText = data.auditRatio;

        // Audit Text Color and Size depending on Value
        const auditFieldset = auditFigcaption.parentNode.parentNode;
        auditFieldset.addEventListener('mouseover', () => {
            auditFigcaption.style.color = getRatioColor(data.auditRatio);
        })
        auditFieldset.addEventListener('mouseout', () => {
            auditFigcaption.style.color = 'inherit'
        })

        const auditRatio = this.shadow.querySelector('#audit-ratio');
        auditRatio.appendChild(new DonutChart());
    }
    //________________________________________________________________________________
    //
    static define(tag = 'profile-section') {
        customElements.define(tag, this)
    }
}

ProfileSection.define();
