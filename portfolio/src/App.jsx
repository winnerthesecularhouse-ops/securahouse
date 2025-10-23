import './App.css'      
import TopBar from './components/TopBar/TopBar' 
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login/Login'
import Hero from './components/Hero/Hero'
import AboutHero from './components/About/AboutHero'
import SuccessStories from './components/Achievements/SuccessStories'
import AllAchievers from './components/Achievements/AllAchievers'
import { ReviewsProvider } from './components/context/ReviewsContext'
import NGOGallery from './components/NGOGallery/NGOGallery'
import Founders from './components/Founders/Founders'
import PoemHero from './components/Poem/PoemHero'

import Footer from './components/Footer/Footer'
import Admin from './components/Admin/Admin'
import RequireAuth from './components/Auth/RequireAuth'
import DonateUs from './components/JoinForm/DonateUs' 
import LocationMap from './components/Map/LocationMap'

function App() {

  return (
    <> 
      <BrowserRouter>
        <ReviewsProvider>
        <TopBar />
          <Navbar />
          <Routes>
            <Route path="/" element={<>
              <Hero />
              <PoemHero />
              <NGOGallery />
              <AboutHero />
              
              <SuccessStories />
              
              
              <Founders/> 
              <LocationMap />
              <Footer />
            </>} />
            <Route path="/login" element={<Login />} />
            <Route path="/allachievers" element={<AllAchievers />} />
            
            <Route path="/admin" element={<RequireAuth><Admin /></RequireAuth>} />
            <Route path="/donateus" element={<DonateUs />} />
            </Routes>
        </ReviewsProvider>
      </BrowserRouter>
    </>
  )
}

export default App
