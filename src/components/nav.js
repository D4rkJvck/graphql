import { NAV_TEMPLATE } from "../templates/nav.html.js";
import { MAIN } from "../utils/elements.js";
import LoginForm from "./form.js";

export default class NavBar extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });

        this.shadow.innerHTML = NAV_TEMPLATE;

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'styles/components/nav.css';
        this.shadow.appendChild(link);
    }
    //_______________________________________________________
    //
    connectedCallback() {
        const btn = this.shadow.querySelector('button');

        btn.onclick = () => {
            localStorage.removeItem('jwtToken');
            this.remove();
            MAIN.innerHTML = '';
            MAIN.appendChild(new LoginForm);
        }
    }
    //_______________________________________________________
    //
    static define(tag = 'header-navbar') {
        customElements.define(tag, this)
    }
}

NavBar.define()
