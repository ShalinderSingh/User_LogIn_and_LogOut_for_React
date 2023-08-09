import React, { useEffect, useState } from 'react'
import showPwdImg from './show-password.svg'
import hidePwdImg from './hide-password.svg'
import { useNavigate } from 'react-router-dom'
import { FcOk } from "react-icons/fc";
const Login = () => {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState("")
    const [errorsMessage, setErrorsMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);
    const [icons, setIcons] = useState('')
    const [icons1, setIcons1] = useState('')

    const navigate = useNavigate()
    const hendleSubmit = (e) => {
        e.preventDefault()

        let new_email = e.target[0].value
        const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!new_email.match(emailPattern)) {
            setErrorsMessage('Invalid email address')
        } else (
            setIcons(<FcOk />)
        )
        let new_pass = e.target[1].value
        let lowerCase = /[a-z]/g;
        let upperCase = /[A-Z]/g;
        let numbers = /[0-9]/g;
        const minLengthRegExp = /.{8,}/;
        if (!new_pass.match(lowerCase)) {
            setErrorMessage("Password should contains lowercase letters!");
        } else if (!new_pass.match(upperCase)) {
            setErrorMessage("Password should contain uppercase letters!");
        } else if (!new_pass.match(numbers)) {
            setErrorMessage("Password should contains numbers also!");
        } else if (!new_pass.match(minLengthRegExp)) {
            setErrorMessage("Password length should be more than 8.");
        } else {
            setIcons1(<FcOk />)
        }
        if ((new_email.match(emailPattern)) && (new_pass.match(lowerCase)) && (new_pass.match(upperCase)) && (new_pass.match(numbers) && (new_pass.match(minLengthRegExp)))) {
            const userData = {
                username,
                password,
            };
            localStorage.setItem('token-info', JSON.stringify(userData))
            navigate('/dashboard', { state: { userData } })

        }
        setUserName('')
        setPassword('')

    }
    // console.log(show)
    const handleUsername = (e) => {
        let new_email = e.target.value;

        const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!new_email.match(emailPattern)) {
            setErrorsMessage('Invalid email address')
            setIcons('')
        } else {
            setIcons(<FcOk />)
            setErrorsMessage('')
        }
        setUserName(new_email)
    }
    const handlePassword = (e) => {

        let new_pass = e.target.value;

        let lowerCase = /[a-z]/g;
        let upperCase = /[A-Z]/g;
        let numbers = /[0-9]/g;
        const minLengthRegExp = /.{8,}/;
        if (!new_pass.match(lowerCase)) {
            setErrorMessage("Password should contains lowercase letters!");
            setIcons1('')
        } else if (!new_pass.match(upperCase)) {
            setErrorMessage("Password should contain uppercase letters!");
            setIcons1('')
        } else if (!new_pass.match(numbers)) {
            setErrorMessage("Password should contains numbers also!");
            setIcons1('')
        } else if (!new_pass.match(minLengthRegExp)) {
            setErrorMessage("Password length should be more than 8.");
            setIcons1('')
        } else {
            setIcons1(<FcOk />)
            setErrorMessage('')
        }
        setPassword(new_pass)

    }


    return (
        <section className="vh-100" style={{ background_color: "#9A616D" }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div className="card" style={{ border_radius: "1rem" }}>
                            <div className="row g-0">
                                <div className="col-md-6 col-lg-5 d-none d-md-block">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                                        alt="Phone image" className="img-fluid" style={{ border_radius: "1rem 0 0 1rem" }} />
                                </div>
                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">

                                        <form onSubmit={hendleSubmit}>

                                            <h5 className="fw-normal mb-3 pb-3" style={{ letter_spacing: "1px" }}>Sign into your account</h5>

                                            <div className="form-outline mb-4">
                                                <input type="email" name='userName' value={username} onChange={handleUsername} className="form-control form-control-lg"
                                                />
                                                {icons}
                                                <label className="form-label" for="form2Example17">Email address</label>
                                                <div style={{ color: "red" }}> {errorsMessage} </div>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input type={passwordShown ? "text" : "password"} name='password' value={password} onChange={handlePassword} className="form-control form-control-lg"></input>
                                                {icons1}
                                                <img title={passwordShown ? "Hide password" : "Show password"} src={passwordShown ? hidePwdImg : showPwdImg} onClick={() => setPasswordShown(prevState => !prevState)}></img>
                                                <label className="form-label" for="form2Example27">Password</label>
                                                <div style={{ color: "red" }}> {errorMessage} </div>
                                            </div>

                                            <div className="pt-1 mb-4">
                                                <button type='submit' className="btn btn-dark btn-lg btn-block" >Login</button>

                                            </div>


                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login