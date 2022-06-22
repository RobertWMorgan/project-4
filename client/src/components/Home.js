import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import React, { useState } from 'react'
import axios from 'axios'

import { isUserAuth, getUserName } from '../helpers/Auth'




const Home = () => {
  // Modals
  const [show, setShow] = useState(false)
  const handleShow = () => setShow(true)
  const [showLogin, setShowLogin] = useState(false)
  const handleShowLogin = () => setShowLogin(true)
  const handleClose = () => {
    setShow(false)
    setShowLogin(false)
  }


  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  })

  const handleLoginChange = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value })
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/auth/login/', loginFormData)
      console.log(data)
      setTokenToLocalStorage(data.token)
      window.localStorage.setItem('brogress-username', data.username)
      handleClose()
      window.location.reload()
    } catch (error) {
      console.log(error)
      setErrors(true)
    }
  }

  const [registerStatus, setRegisterStatus] = useState(false)

  const [registerFormData, setRegisterFormData] = useState({
    email: '',
    password: '',
    username: '',
    password_confirmation: '',
  })

  const handleRegisterChange = (e) => {
    setRegisterFormData({ ...registerFormData, [e.target.name]: e.target.value })
  }

  const handleRegisterSubmit = async (e) => {
    e.preventDefault()
    if (registerFormData.password !== registerFormData.password_confirmation){
      setPasswordError(true)
    }  else {
      try {
        await axios.post('/api/auth/register/', registerFormData)
        setRegisterStatus(true)
      } catch (error) {
        setErrors(error.response.data.detail)
        console.log(error.response)
      }
    }
  }



  const [ errors, setErrors ] = useState({
    username: '',
    email: '',
  })

  const [passwordError, setPasswordError] = useState(false)



  const setTokenToLocalStorage = (token) => {
    window.localStorage.setItem('brogress-token', token)
  }









  return (
    <main className='home'>
      <section className='home-content'>
        <h1>Brogress</h1>
        <h3>Track your gym progress!</h3>
        {isUserAuth()
          ?
          <h5>Welcome Back {getUserName()}!</h5>
          :
          <section className='home-auth'>
            {/* Login Modal */}
            <button className="modal-launch" onClick={handleShowLogin}>
              <span>Login</span>
            </button>
            <Modal show={showLogin} onHide={handleClose}>
              <Modal.Header className="auth-modal-header" closeButton>
                <Modal.Title className="auth-modal-title" >Login </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      autoFocus
                      onChange={handleLoginChange}
                      name='email' />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='' autoFocus onChange={handleLoginChange} name='password' />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer className="auth-footer">
                <button className='auth-modal-submit' onClick={handleLoginSubmit}>
                  Login
                </button>
                <button className='auth-modal-close' onClick={handleClose}>
                  Close
                </button>
              </Modal.Footer>
            </Modal>

            {/* Register Modal */}
            <button className="modal-launch" onClick={handleShow}>
              <span>Register</span>
            </button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header className="auth-modal-header" closeButton>
                <Modal.Title className="auth-modal-title" >Register</Modal.Title>
                {registerStatus && <p>Registration Successful!</p>}
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <p className='denied-text'>* Required</p>
                    <Form.Label>Username<p className='denied-text'>*</p></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      autoFocus
                      onChange={handleRegisterChange}
                      name='username' />
                    {errors.username && <p className='denied-text'>{errors.username}</p>}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email Address<p className='denied-text'>*</p></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      autoFocus
                      onChange={handleRegisterChange}
                      name='email' />
                    {errors.email && <p className='denied-text'>{errors.email}</p>}
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Password<p className='denied-text'>*</p></Form.Label>
                    <Form.Control type='password' placeholder='' autoFocus onChange={handleRegisterChange} name='password' />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Confirm Password<p className='denied-text'>*</p></Form.Label>
                    <Form.Control type='password' placeholder='' autoFocus onChange={handleRegisterChange} name='password_confirmation' />
                    {passwordError && <p className='denied-text'>Passwords must match</p>}
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer className="auth-footer">
                <button className='auth-modal-submit' onClick={handleRegisterSubmit}>
                  Register
                </button>
                <button className='auth-modal-close' onClick={handleClose}>
                  Close
                </button>
              </Modal.Footer>
            </Modal>
          </section>
        }
      </section>
    </main>
  )
}



export default Home