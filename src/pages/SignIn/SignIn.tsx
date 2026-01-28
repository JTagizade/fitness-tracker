import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { useEffect } from 'react'
import type { RootState } from '../../store'
import { setUser } from '../../store/userSlice'
import { Container, FormField, LinkText, Page } from './SignIn.styles'

export const SignIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.user.username)

  useEffect(() => {
    if (user) navigate('/app')
  }, [user, navigate])

  return (
    <Page>
      <Container>
        <h2>Sign In</h2>
        <Formik
          initialValues={{ username: '', password: '' }}
          validate={values => {
            const errors: Partial<typeof values> = {}
            if (!values.username.trim()) errors.username = 'Required'
            if (!values.password.trim()) errors.password = 'Required'
            return errors
          }}
          onSubmit={(values, { resetForm }) => {
            const savedUser = JSON.parse(localStorage.getItem('user') || 'null')
            if (
              savedUser &&
              savedUser.username === values.username &&
              savedUser.password === values.password
            ) {
              dispatch(setUser({ username: savedUser.username }))
              navigate('/')
            } else {
              alert('User not found or password incorrect')
            }
            resetForm()
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
            <button type="submit">Sign In</button>
          </Form>
        </Formik>
        <LinkText>
          No account? <Link to="/signup">Sign up</Link>
        </LinkText>
      </Container>
    </Page>
  )
}
