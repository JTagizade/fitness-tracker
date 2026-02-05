import axios from 'axios'

export interface WgerExerciseTranslation {
  id: number
  name: string
  description: string
  language: number
}

export interface WgerExercise {
  id: number
  exercise_base?: number
  category: number | null
  muscles: number[]
  muscles_secondary: number[]
  equipment: number[]
  translations: WgerExerciseTranslation[]
}

export interface WgerExerciseResponse {
  count: number
  next: string | null
  previous: string | null
  results: WgerExercise[]
}

export interface WgerExerciseImage {
  id: number
  exercise_base: number
  image: string
  is_main: boolean
}

export interface WgerExerciseImageResponse {
  count: number
  next: string | null
  previous: string | null
  results: WgerExerciseImage[]
}

export interface WgerExerciseVideo {
  id: number
  exercise: number
  video: string
  is_main: boolean
}

export interface WgerExerciseVideoResponse {
  count: number
  next: string | null
  previous: string | null
  results: WgerExerciseVideo[]
}

export interface WgerMuscle {
  id: number
  name: string
  name_en?: string
  is_front?: boolean
  image_url_main?: string
  image_url_secondary?: string
}

export interface WgerMuscleResponse {
  count: number
  next: string | null
  previous: string | null
  results: WgerMuscle[]
}

const WGER_BASE_URL = 'https://wger.de/api/v2'

interface FetchExercisesParams {
  language?: number
  limit?: number
  offset?: number
  muscles?: number
  status?: number
}

export const fetchExercises = async (
  params: FetchExercisesParams = {}
): Promise<WgerExerciseResponse> => {
  const response = await axios.get<WgerExerciseResponse>(
    `${WGER_BASE_URL}/exerciseinfo/`,
    { params }
  )
  return response.data
}

export const fetchExerciseImages = async (exerciseBaseId: number) => {
  const response = await axios.get<WgerExerciseImageResponse>(
    `${WGER_BASE_URL}/exerciseimage/`,
    { params: { exercise_base: exerciseBaseId, is_main: true } }
  )
  return response.data.results
}

export const fetchExerciseVideos = async (exerciseId: number) => {
  const response = await axios.get<WgerExerciseVideoResponse>(
    `${WGER_BASE_URL}/video/`,
    { params: { exercise: exerciseId } }
  )
  return response.data.results
}

export const fetchMuscles = async (): Promise<WgerMuscleResponse> => {
  const response = await axios.get<WgerMuscleResponse>(
    `${WGER_BASE_URL}/muscle/`
  )
  return response.data
}
