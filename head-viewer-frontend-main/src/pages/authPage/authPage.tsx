import { SignInForm } from "futures";

import './styles.scss'

export default function AuthPage() {
    return <section className="auth">
        <div className="auth--container">
            <h1 className="auth--title">Lorem <span>Ipsum</span></h1>
            <SignInForm/>
        </div>
    </section>
}