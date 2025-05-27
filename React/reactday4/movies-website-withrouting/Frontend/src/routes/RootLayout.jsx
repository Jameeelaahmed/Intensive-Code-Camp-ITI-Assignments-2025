import React from 'react'
import Header from '../Components/Header/Header'
import Home from '../pages/Home/Home'
import { Outlet } from 'react-router-dom'
function RootLayout() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default RootLayout
