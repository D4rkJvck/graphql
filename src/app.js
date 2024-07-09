import ProfileSection from './components/aside.js';
import LoginForm from './components/form.js';
import NavBar from './components/nav.js';
import GraphSection from './components/section.js';
import * as dom from './utils/elements.js'

const jwt = localStorage.getItem('jwtToken');

if (jwt) {
    dom.HEADER.appendChild(new NavBar);
    dom.MAIN.append(
        new ProfileSection,
        new GraphSection
    );
} else {
    dom.MAIN.appendChild(new LoginForm);
}
