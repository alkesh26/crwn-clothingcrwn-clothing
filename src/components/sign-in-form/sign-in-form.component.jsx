import { useState } from "react"
import {
  signInWithGooglePopup,
  signInAuthWithEmailAndPassword,
  createUserDocumentFromAuth
} from "../../utils/firebase/firebase.utils"
import FormInput from "../form-input/form-input.component"
import './sign-in-form.styles.scss'
import Button from "../button/button.component"

const defaultFormFields = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const [formFields, setFormFields ] = useState(defaultFormFields)
  const { email, password } = formFields

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
      const response = await signInAuthWithEmailAndPassword(email, password)
      console.log(response)
      resetFormFields()
    } catch(error) {
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
          <Button buttonType="google" onClick={logGoogleUser}>Google Sign In</Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm