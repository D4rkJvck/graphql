import * as dom from './utils/elements.js'
import LoginForm from './components/form-login.js'
import ProfileSection from './components/section-profile.js';

LoginForm.define();
ProfileSection.define();

const jwtToken = localStorage.getItem('jwtToken');

if (!jwtToken) {
    dom.MAIN.appendChild(new LoginForm);
} else {
    dom.MAIN.appendChild(new ProfileSection)
}
