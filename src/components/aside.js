import { MAIN } from "../utils/elements.js";
import { fetchFromGraphiQL } from "../utils/fetch.js";
import LoginForm from "./form.js";

export default class ProfileSection extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        

        this.shadow.innerHTML = /* html */ `
            <aside>
                
            </aside>
        `;

        const style = document.createElement('style');
        style.innerHTML = /* css */ `
            aside {
                background: var(--bg-trans-black);
                border-radius: var(--rounded-md);
                display: flex;
                flex-wrap: wrap;
                height: 100%;
            }
        `;
        this.shadow.appendChild(style);

        this.query = /* GraphQL */ `
            {
                user {
                    attrs
                }
            }
        `;
    }

    connectedCallback() {
        fetchFromGraphiQL(this.query)
            .then(data => data.data.user[0].attrs)
            .then(attrs => {
                console.log(attrs)
            })
            .catch(err => console.error(err))
    }

    disconnectedCallback() {
        MAIN.appendChild(new LoginForm)
    }

    static define(tag = 'profile-section') {
        customElements.define(tag, this)
    }
}

ProfileSection.define();
