import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';


const Dashboard = () => {
    const { state } = useLocation()
    console.log(state.userData)
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('token-info');
        navigate('/')
    };
    return (
        <div>

            <h1>User is logged in</h1>
            <button onClick={logout} type='submit' className="btn btn-dark btn-lg btn-block">logout user</button>
            <h2>Welcome to Dashboard</h2>
            <h3>UserName: {state.userData.username}</h3>
            <h4>Password: 
            {state.userData.password}</h4>

        </div>
    )
}

export default Dashboard