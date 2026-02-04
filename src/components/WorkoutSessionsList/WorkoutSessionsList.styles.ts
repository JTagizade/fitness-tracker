import styled from 'styled-components'

export const SessionsList = styled.div`
  height: 100vh; 
  display: flex;
  flex-direction: column;
  color: #000;
`

export const ListLabel = styled.div`
  height: 80px; 
  background: #003c82;
  text-align: center;
  color: #fff;
`
export const NoSessionGif = styled.div`
  position: relative;

   p {
    position: absolute;
    top: 75%;
    left: 5%;
   }

   img{
    width: 100%;
   }

`

export const ListHeader = styled.div`
  display: flex;
  flex-direction: row;
  line-height: 1.5;
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
  background: #fb923c;
  border-left: 2px solid #000;
  border-right: 2px solid #000;
`
export const MuscleGroup = styled.div`
  padding: 8px;
  width: 290px;
  display: flex;
  justify-content: space-between;
`
export const SessionName = styled.div`
  overflow: hidden;
  width: 200px;
  height: 100%;
  padding-bottom: 4px;
  text-align: left;
  white-space: nowrap;
  text-overflow: ellipsis;
`
export const SessionActions = styled.div`
  display: flex;
  gap: 8px;
  color: #44444430;
  cursor: pointer;
`

export const SessionsListUl = styled.ul`
  margin: 0;
  list-style: none;
  padding: 0;
  overflow-y: scroll;
  scrollbar-width: none;
  padding-bottom: 160px;
`

export const WorkoutSession = styled.li`
  border: 1px solid #000;
  background: #94a3b8;
  height: 40px; 
  display: flex;
  text-align: center; 

    &:hover ${SessionActions} {
    & > :first-child {
      color: #025987;
    }

    & > :last-child {
      color: green;
    }
  }    
`

export const FormattedSessionDate = styled.div`
  width: 30%;
  font-size: 18px;
  white-space: nowrap;
  padding: 8px;
  background: #fb923c;
  border-left: 2px solid #94a3b8;
  border-right: 2px solid #94a3b8;
`

