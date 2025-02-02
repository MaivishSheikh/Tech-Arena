import React from 'react'
import Header from './components/Header/Header'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'

function App(props) {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default App