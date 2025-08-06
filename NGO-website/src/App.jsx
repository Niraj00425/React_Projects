import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import VolunteerForm from './components/VolunteerForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Navbar />
      <Home />
      <About />
      <VolunteerForm />
    </>
  );
}

export default App;
