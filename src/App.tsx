import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { Crud, DragonBall, Home } from './screens';

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dragonBall" element={<DragonBall />} />
          <Route path="/crud" element={<Crud />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
