import styled from 'styled-components'

export const Page = styled.div`
  width: 100vw;
  height: 100vh; 
  background-image: url('https://fitnessvolt.com/wp-content/uploads/2022/08/Best-Pull-Day-Workouts.jpg');
  background-repeat: no-repeat;
  background-size: cover;
`

export const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #00000080;
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
  background: #383838;
  border-radius: 12px;
  color: #eee;
`

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;

  label {
    margin-bottom: 4px;
    font-size: 18px;
  }

  input {
    padding: 8px;
    font-size: 24px;
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
  font-size: 18px;

  a {
    color: orange;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`

