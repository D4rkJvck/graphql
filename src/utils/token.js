import LoginForm from "../components/form-login.js";
import GraphSection from "../components/section-graphs.js";
import ProfileSection from "../components/section-profile.js";
import { MAIN } from "./elements.js";

export default class MainContentManager {
    constructor() {
        // Bind the context (this) to the current instance
        addEventListener('storage', this.#checkToken.bind(this))
    };

    #checkToken(event) {
        if (event.key === 'jwtToken') {
            if (event.newValue) {
                this.#handleDisplay(true);
            } else {
                this.#handleDisplay(false);
            }
        }
    }

    #handleDisplay(hasToken) {
        MAIN.innerHTML = '';

        if (hasToken) {
            MAIN.style.display = 'grid';
            MAIN.append(
                new ProfileSection,
                new GraphSection
            )
        } else {
            MAIN.style.display = 'flex';
            MAIN.appendChild(new LoginForm)
        }
    }
}