import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Diensten from './pages/Diensten'
import Projecten from './pages/Projecten'
import Aannemers from './pages/Aannemers'
import Schadeherstel from './pages/Schadeherstel'
import OverOns from './pages/OverOns'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/diensten" element={<Diensten />} />
          <Route path="/projecten" element={<Projecten />} />
          <Route path="/aannemers" element={<Aannemers />} />
          <Route path="/schadeherstel" element={<Schadeherstel />} />
          <Route path="/over-ons" element={<OverOns />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
