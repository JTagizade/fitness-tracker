import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  height: calc(100vh - 64px);
  width: 100vw;
  overflow: hidden;
`

export const Column = styled.div`
  flex: 1;
  padding: 16px;
  box-sizing: border-box;
  border: 1px solid #ccc;
`

export const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 12px 24px;
`

export const SignOut = styled.button`
  background: transparent;
  border: 1px solid #444;
  color: #eee;
  padding: 6px 12px;
  cursor: pointer;
`
