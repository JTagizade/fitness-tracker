import { Formik, Form, Field, ErrorMessage } from 'formik'
// import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
// import { setUser } from '../../store/userSlice'
import { Container, FormField, LinkText, Page } from './SignUp.styles'

export const SignUp = () => {
  // const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <Page>
      <Container>
        <h2>Sign Up</h2>
        <Formik
          initialValues={{ username: '', password: '' }}
          validate={values => {
            const errors: Partial<typeof values> = {}
            if (!values.username.trim()) errors.username = 'Required'
            if (!values.password) errors.password = 'Required'
            return errors
          }}
          onSubmit={(values, { resetForm }) => {
            localStorage.setItem(
              'user',
              JSON.stringify({
                username: values.username,
                password: values.password,
              })
            )
            resetForm()
            navigate('/signin')
          }}
        >
          <Form>
            <FormField>
              <label>Username:</label>
              <Field name="username" />
              <ErrorMessage
                name="username"
                render={msg => <div style={{ color: 'red' }}>{msg}</div>}
              />
            </FormField>
            <FormField>
              <label>Password:</label>
              <Field type="password" name="password" />
              <ErrorMessage
                name="password"
                render={msg => <div style={{ color: 'red' }}>{msg}</div>}
              />
            </FormField>
            <button type="submit">Sign Up</button>
          </Form>
        </Formik>

        <LinkText>
          Already have an account? <Link to="/">Sign in</Link>
        </LinkText>
      </Container>
    </Page>
  )
}
