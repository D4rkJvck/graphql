import { USER_INFO_QUERY } from "../graphql/profile.js";
import { fetchFromGraphiQL } from "../utils/fetch.js";

export default class ProfileSection extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        
        this.shadow.innerHTML = /* HTML */ `
            <figure>
                <img alt="ID">
                <figcaption></figcaption>
            </figure>
            <fieldset></fieldset>
            <fieldset></fieldset>
            <fieldset></fieldset>
        `;

        const style = document.createElement('style');
        style.innerHTML = /* css */ `
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
            
            figure, fieldset {
                background: var(--bg-trans-black);
                border: 1px solid #333;
                border-radius: var(--rounded-md);
                height: 19vh;
                width: 20vw;
            }


            @media screen and (max-width: 900px) {
                :host {
                    min-height: 20vh;
                    width: 100%;
                }

                figure,  fieldset {
                    height: 20vh;
                    width:
                }
            }
        `;
        this.shadow.appendChild(style);

        this.query = USER_INFO_QUERY;
    }

    connectedCallback() {
        fetchFromGraphiQL(this.query)
            .then(data => {
                return {
                    user_info: data.data.user_info[0].attrs,
                    xp_amount: data.data.xp_amount.aggregate.sum.amount
                }
            })
            .then(userData => this.#render(userData))
            .catch(err => console.error(err))
    }

    #render(data) {
        const id_name = this.shadow.querySelector('figcaption');
        id_name.innerHTML = data.user_info.firstName;
    }

    static define(tag = 'profile-section') {
        customElements.define(tag, this)
    }
}

ProfileSection.define();
