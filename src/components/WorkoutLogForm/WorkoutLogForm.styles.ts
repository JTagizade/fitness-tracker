import { Field } from 'formik'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: #fff;
  height: 100vh;
`
export const Tags = styled.div`
  width: 75%;
  height: 100px;
  border: 2px solid #025987;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 16px;
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
  scrollbar-width: none;
`
export const Tag = styled.div`
  height: 30px;
  padding: 0 12px;
  background: #fb923c;
  margin: 4px;
  border-radius: 16px;
  color: #000;
  cursor: pointer;
`

export const FormLabel = styled.div`
  height: 80px; 
  background: #025987;
  text-align: center;
  color: #fff;
`
export const StyledField = styled(Field)`
  width: 75%;
  height: 20px;
  background: transparent;
  border: 2px solid #025987;
  border-radius: 4px;
  padding: 8px;
  color: #000;
`

export const FormField = styled.div`  
  margin-bottom: 8px;
  border: 1px solid #ccc;
  color: #000;
`

export const ErrorText = styled.div`
  color: red;
`
