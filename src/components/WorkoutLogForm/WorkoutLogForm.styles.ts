import { Field } from 'formik'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: #fff;
  height: 100vh;
  `
export const FormWraper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 24px;
  width: 350px;
  gap: 8px;
  margin: 0 auto;
`
export const CalendarWrapper = styled.div`
  border-radius: 4px;
  border: 2px solid #003c82;

  .react-calendar {
    border: none;
    width: auto;
  }
  
  .react-calendar__tile--now {
    background: #fb923c;
    font-size: large;
  }
  .react-calendar__tile--active {
    background: #003c82 !important;
    font-size: large;
    color: #fb923c !important;
  }

`
export const Tags = styled.div`
  height: 100px;
  width: 330px;
  border: 2px solid #003c82;
  border-radius: 4px;
  padding: 8px;
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
  scrollbar-width: none;
`
export const Tag = styled.div`
  height: 30px;
  line-height: 1.5;
  padding: 0 12px;
  background: #fb923c;
  margin: 4px;
  border-radius: 16px;
  color: #003c82;
  cursor: pointer;
`

export const FormLabel = styled.div`
  height: 80px; 
  background: #003c82;
  text-align: center;
  color: #fff;
`
export const StyledField = styled(Field)`
  width: 300px;
  border: none;
  font-size: 18px;
  padding: 8px;
  color: #003c82;
  outline: none;
`

export const InputWrapper = styled.div`
  display: flex;
  border: 2px solid #003c82;
  border-radius: 4px;
  justify-content: space-between;
  align-items: center;
  padding-right: 8px;
`

export const ErrorText = styled.div`
  color: red;
  `
export const StyledButton = styled.button`
  width: 160px;
  height: 56px;
  background: #003c82;
  margin-top: 8px;
  color: #fff;
  font-size: 20px;
`

