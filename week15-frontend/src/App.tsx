import './App.css'
import { BrowserRouter, Outlet, Route, Routes} from "react-router-dom"
import { Dashboard } from './pages/Dashboard'
import { SignUp } from './pages/SignUp'
import { SignIn } from './pages/SignIn'

function App() {

  return ( 
  <BrowserRouter>
    <Routes>
    <Route path="/" element={<Layout/>}>
      <Route path="/SignUp" element={<SignUp/>} />
      <Route path="/SignIn" element={<SignIn/>} />
      <Route path="/Dashboard" element={<Dashboard/>} />
      <Route path="*" element={<ErrorPage />} />
    </Route>  
    </Routes>
  </BrowserRouter>  
      )
}

function Layout() {

  return <div>
    Layout Brainly App Header
    <Outlet />
    
    Layout Footer || Contact Us
  </div>
}

function ErrorPage() {
  return <div>
    Error 404
  </div>
}

export default App
