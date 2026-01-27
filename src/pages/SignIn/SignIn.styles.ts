import styled from 'styled-components'

export const Page = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  margin: 80px auto;
  padding: 24px;
  background: #111;
  border-radius: 12px;
  color: #eee;
`

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;

  label {
    margin-bottom: 4px;
    font-size: 14px;
  }

  input {
    padding: 8px;
    border-radius: 6px;
    border: 1px solid #333;
    background: #222;
    color: #eee;
  }
`

export const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 6px;
  background: #4caf50;
  color: #fff;
  cursor: pointer;

  &:hover {
    background: #45a049;
  }
`
export const LinkText = styled.p`
  margin-top: 16px;
  font-size: 14px;

  a {
    color: #4caf50;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`

