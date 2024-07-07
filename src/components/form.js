import { MAIN } from "../utils/elements.js"

export default class LoginForm extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });

        this.shadow.innerHTML = /*html*/`
            <form>
                <p>Login</p>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
                    </svg>
                    <input autocomplete="off" placeholder="User" type="text" name="user" required>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
                    </svg>
                    <input placeholder="Password" type="password" name="password" required>
                </div>
                <button type="submit">Connect</button>
            </form>
        `

        const style = document.createElement('style')
        style.innerHTML = /*css*/`
            * {
                border-radius: var(--rounded-md);
                box-sizing: border-box;
            }

            form {
                background: var(--bg-trans-black);
                display: flex;
                flex-direction: column;
                gap: 2.5vh;
                padding: 1em;
                transition: .5s ease-in-out;
            }

            form:hover {
                border: 1px solid var(--text-dark-gray);
                transform: scale(1.5);
            }

            p {
                font-size: var(--text-lg);
                font-weight: bolder;
                text-align: center;
            }

            div {
                align-items: center;
                background-color: var(--bg-gray);
                box-shadow: inset 2px 5px 10px rgb(5, 5, 5);
                display: flex;
                gap: 0.5em;
                justify-content: center;
                padding: 0.5em;
            }

            svg {
                height: 1.5em;
                width: 1.5em;
                fill: white;
            }

            input {
                background: none;
                border: none;
                color: var(--text-light-gray);
                outline: none;
                width: 100%;
            }

            input::placeholder {
                color: var(--text-dark-gray);
                font-family: monospace;
            }

            button {
                background-color: var(--bg-gray);
                border: none;
                color: var(--text-dark-gray);
                cursor: pointer;
                margin-top: 2vh;
                outline: none;
                padding: 0.5em;
                transition: .25s ease-in-out;
            }

            button:hover {
                background-color: black;
                color: var(--text-light-gray);
                font-weight: bolder;
                letter-spacing: .5em;
            }
        `
        this.shadow.appendChild(style)
    }

    connectedCallback() {
        this.#submission();
    }

    disconnecteCallback() {
        console.log('Disconnected');
    }

    #submission() {
        const form = this.shadow.querySelector('form');

        if (form) {
            form.onsubmit = (e) => {
                e.preventDefault()

                const user = form.user.value
                const password = form.password.value
                // TODO: Reset Inputs
                const credentials = btoa(`${user}:${password}`)

                fetch('https://learn.zone01dakar.sn/api/auth/signin', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Basic ${credentials}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ user, password })
                })
                    .then(response => {
                        if (response.ok) {
                            return response.json()
                        } else if (response.status === 401) {
                            // TODO: Alert User
                        } else {
                            throw new Error('Failed to authenticate')
                        }
                    })
                    .then(token => {
                        localStorage.setItem('jwtToken', token)
                        // MAIN.classList.add('connected')
                    })
                    .catch((error) => {
                        alert(error)
                    })
            }
        }
    }

    static define(tag = 'login-form') {
        customElements.define(tag, this)
    }
}

LoginForm.define();
