import { useState, useContext } from "react"
import {
  signInWithGooglePopup,
  signInAuthWithEmailAndPassword,
  createUserDocumentFromAuth
} from "../../utils/firebase/firebase.utils"
import FormInput from "../form-input/form-input.component"
import './sign-in-form.styles.scss'
import Button from "../button/button.component"

import { UserContext } from "../../context/user.context"

const defaultFormFields = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const [formFields, setFormFields ] = useState(defaultFormFields)
  const { email, password } = formFields

  const { setCurrentUser } = useContext(UserContext)

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    createUserDocumentFromAuth(user)
  }

  function resetFormFields () {
    setFormFields(defaultFormFields)
  }

  function handleChange(event) {
    const { name, value } = event.target

    setFormFields({...formFields, [name]: value})
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const { user } = await signInAuthWithEmailAndPassword(email, password)
      setCurrentUser(user)
      resetFormFields()
    } catch(error) {
      switch(error.code) {
        case 'auth/wrong-password':
          alert('Incorrect password');
          break;
        case 'auth/user-not-found':
          alert('No user with this email exists');
          break;
        default:
          console.log(error)
      }
      console.log(error)
    }
  }

  return (
    <div className="sign-in-container">
      <h2>Already have an account</h2>
      <span>Sign In with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="text"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />

        <FormInput
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={logGoogleUser}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm