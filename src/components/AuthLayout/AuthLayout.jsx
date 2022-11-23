import React from 'react'
import { Outlet } from 'react-router-dom'
import './authLayout.scss'
const AuthLayout = () => {
    return (
        <div className='layout-main'>
            <div className='auth-layout'></div>
            <div className='auth-form'>
                <div className='auth-user-form'>
                    <Outlet />

                </div>
            </div>
        </div>
    )
}

export default AuthLayout