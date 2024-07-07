import LoginForm from "./components/form.js";
import GraphSection from "./components/section.js";
import ProfileSection from "./components/aside.js";
import * as dom from "./utils/elements.js";

if (dom.MAIN.hasAttribute('connected')) {
    dom.MAIN.append(
        new ProfileSection,
        new GraphSection
    )
} else {
    dom.MAIN.appendChild(new LoginForm)
}

setInterval(() => {
    const jwt = localStorage.getItem('jwtToken');

    if (jwt) {
        dom.MAIN.setAttribute('connected', 'connected');
        dom.MAIN.style.display = 'grid';
    } else {
        dom.MAIN.removeAttribute('connected')
        dom.MAIN.style.display = 'flex';
    }
}, )