import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Users from './pages/Users'; // Đảm bảo rằng tệp và đường dẫn đúng

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Users />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
