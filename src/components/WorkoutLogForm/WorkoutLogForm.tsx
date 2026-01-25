import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useDispatch } from 'react-redux'
import { addWorkout } from '../../store/workoutsSlice'
import { v4 as uuid } from 'uuid'
import { Container, FormField } from './WorkoutLogForm.styles'

interface Values {
  name: string
  date: string
}

export const WorkoutLogForm = () => {
  const dispatch = useDispatch()

  return (
    <Container>
      <h2>Log Workout</h2>
      <Formik
        initialValues={{ name: '', date: '' }}
        validate={(values: Values) => {
          const errors: Partial<Values> = {}
          if (!values.name.trim()) errors.name = 'Required'
          if (!values.date) errors.date = 'Required'
          return errors
        }}
        onSubmit={(values, { resetForm }) => {
          dispatch(addWorkout({ id: uuid(), ...values }))
          resetForm()
        }}
      >
        <Form>
          <FormField>
            <label>Workout Name: </label>
            <Field name="name" />
            <ErrorMessage 
              name="name" 
              component="div" 
              render={msg => <div style={{ color: 'red' }}>{msg}</div>}
            />
          </FormField>
          <FormField>
            <label>Date: </label>
            <Field type="date" name="date" />
            <ErrorMessage 
              name="date" 
              component="div" 
              render={msg => <div style={{ color: 'red' }}>{msg}</div>}
            />
          </FormField>
          <button type="submit">Add Workout</button>
        </Form>
      </Formik>
    </Container>
  )
}
