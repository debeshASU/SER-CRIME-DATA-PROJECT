import './App.css';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Names } from './components/Names';
import { PoliceKilling } from './components/PoliceKilling';
import { LaCrimes } from './components/LaCrimes';
import { NewYorkCrimes } from './components/NewYorkCrimes';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<>
            <Navbar />
            <Names />
          </>} />
          <Route path='/police' element={
            <>
            <Navbar />
            <PoliceKilling />
            </>
          } />
            <Route path='/laCrimes' element={
            <>
            <Navbar />
            <LaCrimes />
            </>
          } />
          <Route path='/nyCrimes' element={
            <>
            <Navbar />
            <NewYorkCrimes />
            </>
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
