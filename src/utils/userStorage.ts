export interface UsersMap {
  [username: string]: {
    password: string
  }
}

export const getUsers = (): UsersMap =>
  JSON.parse(localStorage.getItem('users') || '{}')

export const saveUsers = (users: UsersMap) => {
  localStorage.setItem('users', JSON.stringify(users))
}
