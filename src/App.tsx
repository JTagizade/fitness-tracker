import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Main, SignIn, SignUp } from './pages'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/app" element={<Main />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
