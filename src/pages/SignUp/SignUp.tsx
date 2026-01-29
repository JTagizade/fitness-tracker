import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useNavigate, Link } from 'react-router-dom'
import { Backdrop, Container, FormField, LinkText, Page } from './SignUp.styles'
import { getUsers, saveUsers } from '../../utils/userStorage'

export const SignUp = () => {
  const navigate = useNavigate()

  return (
    <Page>
      <Backdrop>
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
              const users = getUsers()

              if (users[values.username]) {
                alert('Username already exists')
                return
              }
              users[values.username] = { password: values.password }
              saveUsers(users)

              resetForm()
              navigate('/')
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
      </Backdrop>
    </Page>
  )
}
