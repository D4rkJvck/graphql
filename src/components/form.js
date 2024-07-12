import { loginTalent } from "../services/services.js";
import { FORM_TEMPLATE } from "../templates/form.html.js";
import { HEADER, MAIN } from "../utils/elements.js"
import ProfileSection from "./aside.js";
import NavBar from "./nav.js";
import GraphSection from "./section.js";

export default class LoginForm extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });

        this.shadow.innerHTML = FORM_TEMPLATE;
        this.form = this.shadow.querySelector('form');

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'styles/components/form.css';
        this.shadow.appendChild(link);
    }

    connectedCallback() {
        this.#submission();
    }

    #submission() {
        this.form.onsubmit = (e) => {
            e.preventDefault()

            const user = this.form.user.value;
            const password = this.form.password.value;

            this.form.user.value = '';
            this.form.password.value = '';

            const bytesTab = new TextEncoder().encode(`${user}:${password}`);
            const credentials = btoa(String.fromCharCode(...bytesTab));

            loginTalent(credentials)
                .then(token => {
                    if (token) {
                        localStorage.setItem('jwtToken', token);
                        this.remove();
                        HEADER.appendChild(new NavBar);
                        MAIN.append(
                            new ProfileSection,
                            new GraphSection
                        );
                    };
                })
                .catch((error) => alert(error)); // TODO: Appropriate Alert !
        }
    }

    static define(tag = 'login-form') {
        customElements.define(tag, this)
    }
}

LoginForm.define();
