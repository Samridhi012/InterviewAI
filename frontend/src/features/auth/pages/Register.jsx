import React from 'react'
import {useNavigate} from 'react-router'
import { Link } from 'react-router'
import '../auth.form.scss'

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { loading, handleRegister } = useAuth();
    
  //to prevent page refresh on form submission
    const handleSubmit = async (e) => { 
        e.preventDefault()
        await handleRegister({ username, email, password });
        navigate("/"); //after successful registration, we navigate to the home page ("/") using the useNavigate hook from react-router.
    }

  return (
    <main>
        <div className="form-container">
            <h1>Register</h1>

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="name">Name</label>
                    <input onChange={(e) => {setUsername(e.target.value)}} //two way data binding for username input field. Whenever the user types something in the name input field, the onChange event is triggered, and the setUsername function is called with the new value (e.target.value). This updates the username state variable with the latest value entered by the user.
                        type = "text" id="name" name="name" placeholder='Enter your name' />
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input onChange={(e) => {setEmail(e.target.value)}}
                        type = "email" id="email" name="email" placeholder='Enter your email' />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input onChange={(e) => {setPassword(e.target.value)}}
                        type = "password" id="password" name="password" placeholder='Enter your password' />
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

