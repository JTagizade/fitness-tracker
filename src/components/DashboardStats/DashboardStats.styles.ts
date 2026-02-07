import styled from 'styled-components'
import { RxVideo } from "react-icons/rx";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  padding-bottom: 0;
  /* background-image: url('/src/assets/imgs/grid.png'); */
  background-color: #6d6565;
  height: 100vh;
  overflow: hidden;
`

export const SessionStats = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  padding: 0 16px;
  background-color: #003c82;
  color: #fff;
`

export const ExerciseInfo = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`
export const ExerciseName = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;

   a{
    text-decoration: none;
    color: #003c82;
    font-size: 24px;
    display: flex;
    align-items: center;
    gap: 4px;
   }

   a:hover{
    color: blue;
   }

`

export const StyledVideoIcon = styled(RxVideo)`
  font-size: 32px;

`
