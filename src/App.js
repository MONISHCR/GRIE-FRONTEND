import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import AdminLogin from './components/AdminLogin';
import GrievanceForm from './components/GrievanceForm';
import GrievanceList from './components/GrievanceList';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/grievances" element={<GrievanceList />} />
          <Route path="/" element={<GrievanceForm />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
