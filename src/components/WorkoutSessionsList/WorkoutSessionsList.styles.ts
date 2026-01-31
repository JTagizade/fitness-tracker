import styled from 'styled-components'

export const SessionsList = styled.div`
  height: 100vh; 
  display: flex;
  flex-direction: column;
  color: #000;
`

export const ListLabel = styled.div`
  height: 80px; 
  background: #025987;
  text-align: center;
`

export const ListHeader = styled.div`
  display: flex;
  flex-direction: row;
  height: 44px; 
  background: #94a3b8;
  border: 1px solid #000;
  text-align: center;
`

export const SessionOrder = styled.div`
  padding: 8px;
  width: 7%;
`
export const SessionDate = styled.div`
  width: 30%;
  padding: 8px;
  border-left: 2px solid #000;
  border-right: 2px solid #000;
`
export const MuscleGroup = styled.div`
  padding: 8px;
  width: 63%;
`

export const SessionsListUl = styled.ul`
  margin: 0;
  list-style: none;
  padding: 0;
`

export const WorkoutSession = styled.li`
  border: 1px solid #000;
  background: #94a3b8;
  height: 40px; 
  display: flex;
  text-align: center;    
`

export const FormattedSessionDate = styled.div`
  width: 30%;
  padding: 8px;
  background: #fb923c;
  border-left: 2px solid transparent;
  border-right: 2px solid transparent;
`

