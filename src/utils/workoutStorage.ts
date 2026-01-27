export const getWorkouts = (username: string) =>
  JSON.parse(localStorage.getItem(`workouts_${username}`) || '[]')

export const saveWorkouts = (username: string, workouts: any[]) =>
  localStorage.setItem(`workouts_${username}`, JSON.stringify(workouts))
