import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { addWorkout, updateWorkout } from '../../store/workoutsSlice'
import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { Container, FormField, FormLabel, Tag, Tags, StyledField, ErrorText } from './WorkoutLogForm.styles'
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

const muscleGroupsInitValue = ['Chest', 'Back', 'Legs', 'Shoulders', 'Biceps', 'Triceps', 'Abs'];

export const WorkoutLogForm = ({
  editWorkout,
  setEditWorkout,
}: WorkoutLogFormProps) => {
  const dispatch = useDispatch()
  const username = useSelector((state: RootState) => state.user.username)
  
  const [muscleGroups, setMuscleGroups] = useState(muscleGroupsInitValue);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // const tagRemover = (e: string) => {
  //   let i = muscleGroups.indexOf(e);
  //   muscleGroups.splice(i, 1);
  //   setMuscleGroups(muscleGroups);
  // }  

  return (
    <Container>
      <FormLabel>
        <h2>{editWorkout ? 'Edit Workout' : 'Log Workout'}</h2>
      </FormLabel>

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
              w.id === editWorkout.id
                ? { ...w, name: selectedTags.join(', '), date: values.date }
                : w
            )

            saveWorkouts(username, updated)
            dispatch(
              updateWorkout({
                id: editWorkout.id,
                name: selectedTags.join(', '),
                date: values.date,
                username,
              })
            )
            setEditWorkout?.(null)
          } else {
            const workout: Workout = {
              id: uuid(),
              name: selectedTags.join(', '),
              date: values.date,
            }
            saveWorkouts(username, [...current, workout])
            dispatch(addWorkout({ workout, username }))
          }
          resetForm()
          setSelectedTags([])
          setMuscleGroups(muscleGroupsInitValue)
        }}
      >
        {({ setFieldValue }) => (
          <Form>
          <Tags>
            {muscleGroups.map((e) => 
            <Tag 
            onClick={() => {
              const newSelected = [...selectedTags, e]
              // tagRemover(e);     
              setMuscleGroups(prev => prev.filter(m => m !== e))       
              setFieldValue('name', newSelected.join(', '));   
              return  setSelectedTags(newSelected);
            }} 
            >
              {e}
            </Tag>)}
          </Tags>  

          <FormField>
            {/* <label>Workout Name:</label> */}
            <StyledField
              name="name"
              placeholder="Select a muscle group"
              value={selectedTags.join(', ')}
              readOnly
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue('name', e.target.value)}
            />
            <ErrorMessage name="name" render={(msg) => <ErrorText>{msg}</ErrorText>} />
          </FormField>

          <FormField>
            <label>Date:</label>
            <StyledField type="date" name="date" />
            <ErrorMessage name="date" render={(msg) => <ErrorText>{msg}</ErrorText>} />
          </FormField>

          <button type="submit">
            {editWorkout ? 'Update Workout' : 'Add Workout'}
          </button>
        </Form>
        )}
      </Formik>
    </Container>
  )
}

