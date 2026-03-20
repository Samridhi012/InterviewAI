import React from 'react'
import {useNavigate} from 'react-router'
import { Link } from 'react-router'
import '../auth.form.scss'

const Register = () => {
  //to prevent page refresh on form submission
  const handleSubmit = (e) => { 
    e.preventDefault()
  }

  return (
    <main>
        <div className="form-container">
            <h1>Register</h1>

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="name">Name</label>
                    <input type = "text" id="name" name="name" placeholder='Enter your name' />
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type = "email" id="email" name="email" placeholder='Enter your email' />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type = "password" id="password" name="password" placeholder='Enter your password' />
                </div>

                <button className='button primary-button' type="submit">
                    Register
                </button>
            </form>

            <p>Already have an account? <Link to={"/login"}>Login</Link> </p>
        </div>
    </main>
  )
}

export default Register

