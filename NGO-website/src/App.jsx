import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import VolunteerForm from './components/VolunteerForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js' //toggle to work

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
