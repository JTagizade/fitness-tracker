import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import type { RootState } from '../../store'
import { Container } from './DashboardStats.styles'
import { Cell, Pie, PieChart, Tooltip } from 'recharts'


const fakedata = [
  { price: 400 },
  { price: 30 },
  { price: 100 },
  { price: 250 },
  { price: 55 },
]

export const DashboardStats = () => {
  const workouts = useSelector((state: RootState) => state.workouts.workouts)

  const totalWorkouts = workouts.length
  const lastWorkout = useMemo(() => {
    if (!workouts.length) return 'N/A'
    return workouts[workouts.length - 1].date
  }, [workouts])

  return (
    <Container>
      <h2>Dashboard</h2>
      <p>Total Workouts: {totalWorkouts}</p>
      <p>Last Workout: {lastWorkout}</p>

      <PieChart width={600} height={400}>
        <Pie data={fakedata} dataKey="price" label>
          <Cell key={`cell-0`} fill="#8884d8" />
          <Cell key={`cell-1`} fill="#444444" />
          <Cell key={`cell-2`} fill="#987" />
          <Cell key={`cell-3`} fill="#706" />
        </Pie>

      </PieChart>
      <Tooltip />

    </Container>
  )
}
