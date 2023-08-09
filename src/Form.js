import { Toast } from 'bootstrap'
import React, { useEffect, useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useDispatch, useSelector } from 'react-redux'
import { apiFetch } from './Redux Thunk'

const Form = () => {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.Reducer.photo)
    console.log(data)
    const [inputValues, setInputValue] = useState({
        firstName: '',
        lastName: '',
        email: '',
        gender: '',

    })
    const [phone, setPhone] = useState('');
    const [validation, setValidation] = useState([])
    const [formerror, setFormerror] = useState({});
    const [issubmit, setSubmit] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        // if (inputValues.firstName.trim().length === 0) {
        //     console.log('input value is NOT empty');
        //     setSubmit()
        // }
        if (inputValues !== '') {
            setFormerror(checkValidation(inputValues))
        }
        inputValues.phone = phone;
        setFormerror(checkValidation())
        setValidation(inputValues)
        setInputValue({
            firstName: '',
            lastName: '',
            email: '',
            gender: '',
            phone: ''
        })
        setPhone('')
    }


    const changeHandle = (e) => {
        const { name, value } = e.target;
        let error = formerror
        switch (name) {
            case 'firstName':
                error.firstName =
                    value.length < 10
                        ? 'first Name must be at least 10 characters long!'
                        : '';
                break;
        }
        setInputValue({ ...inputValues, [name]: value });
        setSubmit(true)
    }
    const checkValidation = (value) => {

        let errors = {};
        // let isValid = true
        const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const re = /^[A-Za-z]+$/;
        if (!inputValues.firstName) {
            errors.firstName = "Please Enter firstName"
            setSubmit(true)
        }
        else if (!re.test(inputValues.firstName)) {
            errors.firstName = " Please only letters"
            setSubmit(true)
        }
        if (!inputValues.lastName) {
            errors.lastName = "Please Enter lastName"
        }
        else if (!re.test(inputValues.lastName)) {
            errors.lastName = " Please only letters"
        }

        if (!inputValues.email) {
            errors.email = "Please Enter Email";
        } else if (!emailPattern.test(inputValues.email)) {
            errors.email = "Enter Valid Email";
        }
        if (!inputValues.gender) {
            errors.gender = "Please gender option click";
        }
        if (!phone) {
            errors.phone = "please enter phone number"
        } else if (phone.length === 11) {
            errors.phone = "please invaild number"
        }
        return errors;
    }


    useEffect(() => {
        if (Object.keys(formerror).length === 0 && issubmit) {
            console.log(formerror)
        }
        dispatch(apiFetch())

    }, [])

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {Object.keys(formerror).length === 0 && issubmit ? <p>successful</p> : <p></p>}
                <div className="form-group">
                    <label for="text">First Name:</label>
                    <input onChange={changeHandle}
                        minLength={3}
                        maxLength={10}
                        value={inputValues.firstName}
                        name='firstName'
                        type="text"
                        pattern='[A-Za-z]{3,15}'
                        className="form-control"
                        placeholder="Enter first name"
                    />
                    {formerror.firstName && <span className="text-danger">{formerror.firstName}</span>}
                </div>

                <div className="form-group">
                    <label for="text">Last Name:</label>
                    <input onChange={changeHandle} minLength={3}
                        maxLength={10}
                        value={inputValues.lastName}
                        name='lastName'
                        type="text"
                        pattern='[A-Za-z]{3,15}'
                        className="form-control"
                        placeholder="Enter last name"

                    />
                    <span className="text-danger">{formerror.lastName}</span>
                </div>
                <div className="form-group">
                    <label for="email">Email address:</label>
                    <input onChange={changeHandle}
                        name='email' type="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={inputValues.email}
                    />
                    <span className="text-danger">{formerror.email}</span>
                </div>
                <div className="form-group">
                    <label for="number">Phone :</label>
                    <PhoneInput onChange={(value) => setPhone(value)}
                        country={'in'}
                        name='phone'
                        type="number"
                        className="form-control"
                        placeholder="Enter phone number"
                        value={phone}
                    />
                    <span className="text-danger">{formerror.phone}</span>
                </div>
                <div className="form-group form-check">
                    <label className="form-check-label">
                        <input onChange={changeHandle} type="radio" value="Male" name="gender" />  Male
                        <input onChange={changeHandle} type="radio" value="Female" name="gender" />  Female
                        <input onChange={changeHandle} type="radio" value="Other" name="gender" />  Other
                    </label>
                    <div><span className="text-danger">{formerror.gender}</span></div>

                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

            <div>
                <p>{validation.firstName}</p>
                <p>{validation.lastName}</p>
                <p>{validation.email}</p>
                <p>{validation.phone}</p>
                <p>{validation.gender}</p>
            </div>

        </div>
    )
}

export default Form