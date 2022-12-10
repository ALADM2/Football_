import axios from 'axios'
import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Button } from 'reactstrap'
import { Navigate } from 'react-router-dom'
import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap'
import LoginForm from './forms/LoginForm'
import RegisterForm from './forms/RegisterForm'
import CountriesTable from './tables/CountriesTable'
import CitiesTable from './tables/CitiesTable'
import TeamsTable from './tables/TeamsTable'

/**
 * 
 * @param {*} props 
 * @returns navigation component
 */
const Navigation = (props) => {
  const BASE_URL = 'https://footballdataserver.onrender.com/';

  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem('isLoggedIn') === 'true' || false
  )
  const [isHome, setIsHome] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  /**Login user */
  const login = () => {
    setIsLoggedIn(true)
    sessionStorage.setItem('isLoggedIn', true)
  }

  /**Logout user */
  const logout = async () => {
    try {
      const res = await axios.post(`${BASE_URL}api/v1/logout`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      })
      
      if (res.status === 200) {
        setIsLoggedIn(false);
        setIsHome(true);
        sessionStorage.clear();       
        alert("Logout successful");  
      }
    } catch (error) {
      console.log(error)
    }
      if (isHome === true) {
    return <Navigate to="/" />
  }
  }

  // Render a NavLink based on whether a user is logged in or out
  const authLink = isLoggedIn ? (
    <>
      <NavItem>
        <NavLink href="/countries">Countries</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/cities">Cities</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/teams">Teams</NavLink>
      </NavItem>
      <NavItem>
        <Button
          to="/"
          onClick={logout}
          color="primary"
          style={{ float: 'left', marginRight: '10px', marginLeft: '50px' }}
        >
          Logout
        </Button>
      </NavItem>
    </>
  ) : (
    <>
      <NavLink href="/register">Register</NavLink>
      <NavLink href="/login">Login</NavLink>
    </>
  )

  const authResources = isLoggedIn ? (
    <>
      <Route path="/countries" element={<CountriesTable />} />
      <Route path="/cities" element={<CitiesTable />} />
      <Route path="/teams" element={<TeamsTable />} />
    </>
  ) : (
    <></>
  )

  const title = isLoggedIn ? (
    <></>
  ) : (
    <div className='welcome'><h1>Welcome to Football Data</h1></div>
  )

  return (
    <Router>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">Football Data</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            {authLink}
          </Nav>
        </Collapse>
      </Navbar>
      <Container>
        <Routes>
          <Route path="/login" element={<LoginForm login={login} />} />
          {authResources}
          <Route path="/register" element={<RegisterForm />} />
          {authResources}
        </Routes>
      </Container>
      {title}
    </Router>
  )
}

export default Navigation
