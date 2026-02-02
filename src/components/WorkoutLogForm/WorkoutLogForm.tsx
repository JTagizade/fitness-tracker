import { Formik, Form, ErrorMessage } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { addWorkout, updateWorkout } from '../../store/workoutsSlice'
import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { Container, FormLabel, Tag, Tags, StyledField, ErrorText, StyledButton, FormWraper, CalendarWrapper, InputWrapper } from './WorkoutLogForm.styles'
import { saveWorkouts, getWorkouts } from '../../utils/workoutStorage'
import type { RootState } from '../../store'
import { BsBackspace } from "react-icons/bs";
import Calendar from 'react-calendar';
import type { Value } from 'react-calendar/src/shared/types.js'
import 'react-calendar/dist/Calendar.css';

interface Workout {
  id: string
  name: string
  date: string
}

interface WorkoutLogFormProps {
  editWorkout?: Workout | null
  setEditWorkout?: (w: Workout | null) => void
}

const muscleGroupsInitValue = ['Chest', 'Back', 'Legs', 'Abs', 'Shoulders', 'Biceps', 'Triceps'];

export const WorkoutLogForm = ({
  editWorkout,
  setEditWorkout,
}: WorkoutLogFormProps) => {
  const dispatch = useDispatch()
  const username = useSelector((state: RootState) => state.user.username)
  
  const [muscleGroups, setMuscleGroups] = useState(muscleGroupsInitValue);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [dateValue, setDateValue] = useState<Value>(
    editWorkout ? new Date(editWorkout.date) : new Date()
  )

  useEffect(() => {
    if (editWorkout) setDateValue(new Date(editWorkout.date))
  }, [editWorkout])

  return (
    <Container>
      <FormLabel>
        <h2>{editWorkout ? 'Edit Workout' : 'Log Workout'}</h2>
      </FormLabel>

      <Formik
        enableReinitialize
        initialValues={{
          name: editWorkout?.name || '',
        }}
        validate={(values) => {
          const errors: Partial<{ name: string }> = {}
          if (!values.name.trim() && selectedTags.length === 0) errors.name = 'Required'
          if (!dateValue) errors.name = 'Date required'
          return errors
        }}
        onSubmit={(_, { resetForm }) => {
          if (!username || !dateValue) return
          const formattedDate = (dateValue as Date).toLocaleDateString('en-CA')
          const current: Workout[] = getWorkouts(username)

          if (editWorkout) {
            if (!selectedTags.length) return alert('Workout name required')

            const updated = current.map(w =>
              w.id === editWorkout.id
                ? { ...w, name: selectedTags.join(', '), date: formattedDate }
                : w
            )

            saveWorkouts(username, updated)
            dispatch(updateWorkout({
              id: editWorkout.id,
              name: selectedTags.join(', '),
              date: formattedDate,
              username
            }))
            setEditWorkout?.(null)
          } else {
            const workout: Workout = {
              id: uuid(),
              name: selectedTags.join(', '),
              date: formattedDate,
            }

            saveWorkouts(username, [...current, workout])
            dispatch(addWorkout({workout, username}))
          }

          resetForm()
          setDateValue(new Date())
          setSelectedTags([])
          setMuscleGroups(muscleGroupsInitValue)
        }}
      >        
        {({ setFieldValue }) => (
          <Form>
            <FormWraper>
              <CalendarWrapper>
                <Calendar onChange={date => setDateValue(date)} value={dateValue} />
              </CalendarWrapper>
              <Tags>
                {muscleGroups.map((e) => 
                <Tag 
                key={e.toLowerCase()}
                onClick={() => {
                  const newSelected = [...selectedTags, e]
                  setMuscleGroups(prev => prev.filter(m => m !== e))       
                  setFieldValue('name', newSelected.join(', '));   
                  return  setSelectedTags(newSelected);
                }} 
                >
                  {e}
                </Tag>)}
              </Tags>  

              <div>
                <InputWrapper>
                  <StyledField
                    name="name"
                    placeholder="Select a muscle group"
                    value={selectedTags.join(', ')}
                    readOnly
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue('name', e.target.value)}
                  />

                  <BsBackspace onClick={() => {
                      setSelectedTags([])
                      setMuscleGroups(muscleGroupsInitValue)
                    }}
                  />
                </InputWrapper>
                <ErrorMessage name="name" render={(msg) => <ErrorText>{msg}</ErrorText>} />
              </div>

              <StyledButton type="submit">
                {editWorkout ? 'Update Workout' : 'Add Workout'}
              </StyledButton>
            </FormWraper>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

