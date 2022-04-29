import './Styles/App.css';
import React from 'react';
import AddPenyakit from './Component/AddPenyakit';
import DnaPage from './Component/DnaPage';
import Home from './Component/Home';
import Navbar from './Component/Navbar';
import SearchHistory from './Component/SearchHistory';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <div className="content">
              <Routes >
                  <Route exact path="/"  element={<Home/>} />
                  <Route exact path="/addPenyakit"  element={<AddPenyakit/>} />
                  <Route exact path="/testDNA"  element={<DnaPage/>} />
                  <Route exact path="/searchHasil" element={<SearchHistory/>} />
              </Routes >
        </div>
      </div>
    </Router>
  );
}

export default App;
