import axios from 'axios'
import { useState } from 'react'
import { Alert, Button, Form, FormGroup, Input } from 'reactstrap'
import { Navigate } from 'react-router-dom'

const RegisterForm = (props) => {
  const BASE_URL = 'https://footballdataserver.onrender.com'

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isHome, setIsHome] = useState(false)
  const [authError, setAuthError] = useState(false) // Used for authentication errors
  const [unknownError, setUnknownError] = useState(false) // Used for network errors
  const [nameError, setNameError] = useState(false)
  const [emailError, setEmailError] = useState(false) // Used for authentication errors
  const [passwordError, setPasswordError] = useState(false) // Used for network errors

  /**
   * Register User
   */
  const registerUser = async () => {
    setAuthError(false)
    setUnknownError(false)
    setNameError(false)
    setEmailError(false)
    setPasswordError(false)
    setIsLoading(true)

    try {
      /**Regal expression to make sure 'email' has the correct format */
      const validEmailRegex = RegExp(
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      )
      let error = false

      if (name.length < 5) {
        /**test if field 'name' has less than 5 characters */
        setNameError(true)
        error = true
      }
      if (!validEmailRegex.test(email)) {
        /**test if field 'email' has the right format */
        setEmailError(true)
        error = true
      }
      if (password.length < 8) {
        /**test if field 'name' has less than 8 characters */
        setPasswordError(true)
      }

      if (error === false) {
        const res = await axios.post(`${BASE_URL}/api/v1/register`, {
          name: name,
          email: email,
          password: password,
        })

        if (res.status === 201) {
          setNameError(false)
          setEmailError(false)
          setPasswordError(false)
          setIsHome(true)
          sessionStorage.setItem('userId', res.data.userId)
        }
      }
    } catch (error) {
      console.log(error)

      if (error.response.status === 401) {
        setAuthError(true)
      } else {
        setUnknownError(true)
      }
    }
    setIsLoading(false)
  }
/**
 * Submit event. Register user.
 * @param {*} e 
 */
  const handleSubmit = (e) => {
    e.preventDefault()
    registerUser()
  }

  /**Go to main page */
  if (isHome === true) {
    return <Navigate to="/" />
  }

  return (
    <>
      <h1 style={{ marginTop: '10px' }}>Register</h1>
      {/* 
        When the form is submitted, it will call the handleSubmit 
        function above. You do not need to worry about specifying
        a method and action as you would typically do when dealing 
        with forms
      */}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            type="name"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormGroup>
        {nameError ? (
          <Alert color="danger" height="15px">
            "Name" must contain at least 5 characters.
          </Alert>
        ) : null}
        <FormGroup>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            /*
              This attribute detects when the value of an input element changes
            */
            onChange={(e) => setEmail(e.target.value)}
            /*
              You can fetch validation messages from the request. There are plenty 
              of online resources that show you how to do this 
            */
            required
          />
        </FormGroup>
        {emailError ? (
          <Alert color="danger" height="15px">
            "E-mail" must have the correct format.
          </Alert>
        ) : null}
        <FormGroup>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormGroup>
        {passwordError ? (
          <Alert color="danger" height="15px">
            "Password" must contain at least 8 characters.
          </Alert>
        ) : null}
        {/* 
          Display an alert message if there is either an authentication or network error
        */}
        {authError ? (
          <Alert color="danger">
            Cannot recognize your credentials. Please try again.
          </Alert>
        ) : null}
        {unknownError ? (
          <Alert color="danger">
            There was a problem submitting your credentials.
          </Alert>
        ) : null}
        <Button className='button' color="success">Submit</Button>
        {isLoading ? <h2>Loading...</h2> : <></>}
      </Form>
    </>
  )
}

export default RegisterForm
