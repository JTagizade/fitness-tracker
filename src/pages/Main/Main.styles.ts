import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  height: calc(100vh - 64px);
  width: 100vw;
  overflow: hidden;
`

export const Column = styled.div`
  flex: 1;
  box-sizing: border-box;
`
export const CentralColumn = styled.div`
  flex: 1.65;
  box-sizing: border-box;
`

export const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 12px 24px;
  background: #94a3b8;
  border-bottom: 2px solid #fb923c;
`

export const SignOut = styled.button`
  background: transparent;
  border: 1px solid #444;
  color: #eee;
  padding: 6px 12px;
  cursor: pointer;
`
