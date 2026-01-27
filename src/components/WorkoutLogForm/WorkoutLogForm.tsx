import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { addWorkout, updateWorkout } from '../../store/workoutsSlice'
import { v4 as uuid } from 'uuid'
import { Container, FormField } from './WorkoutLogForm.styles'
import { saveWorkouts, getWorkouts } from '../../utils/workoutStorage'
import type { RootState } from '../../store'

interface Values {
  name: string
  date: string
}

interface Workout {
  id: string
  name: string
  date: string
}

interface WorkoutLogFormProps {
  editWorkout?: Workout | null
  setEditWorkout?: (w: Workout | null) => void
}

export const WorkoutLogForm = ({
  editWorkout,
  setEditWorkout,
}: WorkoutLogFormProps) => {
  const dispatch = useDispatch()
  const username = useSelector((state: RootState) => state.user.username)

  return (
    <Container>
      <h2>{editWorkout ? 'Edit Workout' : 'Log Workout'}</h2>

      <Formik<Values>
        enableReinitialize
        initialValues={{
          name: editWorkout?.name || '',
          date: editWorkout?.date || '',
        }}
        validate={(values) => {
          const errors: Partial<Values> = {}
          if (!values.name.trim()) errors.name = 'Required'
          if (!values.date) errors.date = 'Required'
          return errors
        }}
        onSubmit={(values, { resetForm }) => {
          if (!username) return

          const current: Workout[] = getWorkouts(username)

          if (editWorkout) {
            const updated: Workout[] = current.map((w) =>
              w.id === editWorkout.id ? { ...w, ...values } : w
            )

            saveWorkouts(username, updated)
            dispatch(updateWorkout({ id: editWorkout.id, ...values }))
            setEditWorkout?.(null)
          } else {
            const workout: Workout = { id: uuid(), ...values }

            saveWorkouts(username, [...current, workout])
            dispatch(addWorkout(workout))
          }

          resetForm()
        }}
      >
        <Form>
          <FormField>
            <label>Workout Name:</label>
            <Field name="name" />
            <ErrorMessage name="name" render={(msg) => <div style={{ color: 'red' }}>{msg}</div>} />
          </FormField>

          <FormField>
            <label>Date:</label>
            <Field type="date" name="date" />
            <ErrorMessage name="date" render={(msg) => <div style={{ color: 'red' }}>{msg}</div>} />
          </FormField>

          <button type="submit">
            {editWorkout ? 'Update Workout' : 'Add Workout'}
          </button>
        </Form>
      </Formik>
    </Container>
  )
}
