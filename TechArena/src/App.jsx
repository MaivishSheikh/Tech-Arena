import React from 'react'
import Header from './components/Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer.jsx/Footer'

function App(props) {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default App