import * as dom from './utils/elements.js'
import LoginForm from './components/form-login.js'

LoginForm.define();

const jwtToken = localStorage.getItem('jwtToken');

if (!jwtToken) {
    dom.MAIN.appendChild(new LoginForm);
}
