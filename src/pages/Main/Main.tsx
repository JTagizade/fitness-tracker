import { Container, Column } from './Main.styles'
import { DashboardStats, WorkoutLogForm, WorkoutSessionsList } from '../../components'
import { useLocalStorageSync } from '../../hooks'

export const Main = () => {
  useLocalStorageSync()

  return (
    <Container>
      <Column><WorkoutSessionsList /></Column>
      <Column><DashboardStats /></Column>
      <Column><WorkoutLogForm /></Column>
    </Container>
  )
}
