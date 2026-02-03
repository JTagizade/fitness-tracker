import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import type { RootState } from '../../store'
import { Container } from './DashboardStats.styles'
import PieChartComponent from '../PieChart/PieChartComponent'


export const DashboardStats = () => {
  const workouts = useSelector((state: RootState) => state.workouts.workouts)

  

  const totalWorkouts = workouts.length
  const lastWorkout = useMemo(() => {
    if (!workouts.length) return 'N/A'
    return workouts[workouts.length - 1].date
  }, [workouts])

  

  return (
    <Container>
      <PieChartComponent />
      
      <h2>Dashboard</h2>
      <p>Total Workouts: {totalWorkouts}</p>
      <p>Last Workout: {lastWorkout}</p>


    </Container>
  )
}
