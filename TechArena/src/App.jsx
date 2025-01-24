import React from 'react'
import Header from './components/Header/Header'
import { Outlet } from 'react-router-dom'

function App(props) {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default App