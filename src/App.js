import SignIn from "./Components/SignIn";
import { Route, Routes } from 'react-router-dom'
import Home from "./Components/Home";
import useToken from './Auth';
import Verify from "./Components/Verify";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import { useState } from "react";



function App() {
  const { token, setToken } = useToken();
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <>
      {
        token
          ?
          <>
            <Header setRefreshKey={setRefreshKey} />
            <Routes>
              < Route eaxact path="/" element={< Home refreshKey={refreshKey} />} />
              < Route eaxact path="/contact" element={< Contact />} />
            </Routes >
            <Footer />
          </>
          :
          <Routes>
            <Route path="/" element={< SignIn setToken={setToken} />} />
            <Route path="/verify" element={<Verify />} />
          </Routes >
      }
    </>

  )
}

export default App;
