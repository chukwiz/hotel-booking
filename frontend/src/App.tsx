import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Layout from "./layouts/Layout"
import Home from "./pages/Home"
import Register from "./pages/Register"
import SignIn from "./pages/SignIn"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sign-in" element={<SignIn />} />

          <Route path="*" element={<Navigate to="" />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
