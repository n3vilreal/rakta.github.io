import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LandingPage from './pages/LandingPage'


function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/services" element={<Services />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}

      </Routes>
    
    </BrowserRouter>
    
    </>
  )
}

export default App
