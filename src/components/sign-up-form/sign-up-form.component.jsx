import { useState, useContext } from "react"
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth
} from "../../utils/firebase/firebase.utils"
import FormInput from "../form-input/form-input.component"
import './sign-up-form.styles.scss'
import Button from "../button/button.component"
import { UserContext } from "../../context/user.context"

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const [formFields, setFormFields ] = useState(defaultFormFields)
  const { displayName, email, password, confirmPassword } = formFields
  const { setCurrentUser } = useContext(UserContext)

  function resetFormFields () {
    setFormFields(defaultFormFields)
  }

  function handleChange(event) {
    const { name, value } = event.target

    setFormFields({...formFields, [name]: value})
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if(password !== confirmPassword) {
      alert("Passwords does not match")
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password)
      setCurrentUser(user)

      await createUserDocumentFromAuth(user, { displayName })
      resetFormFields()
    } catch(error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use')
      } else {
        console.log("user creation encountered an error", error.message)
      }
    }
  }

  return (
    <div className="sign-up-container">
      <h2>I don't have an account</h2>
      <span>Sign Up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          required
        />

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

        <FormInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          required
        />

        <Button type="submit">Sign Up Form</Button>
      </form>
    </div>
  )
}

export default SignUpForm