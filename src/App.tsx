import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, Box, Container } from '@mui/material';
import Navbar from './Components/Navbar';
import AboutMe from './Pages/AboutMe';
import Projects from './Pages/Projects';
import CareerGoal from './Pages/CareerGoal';
import Contact from './Pages/Contact';
import Competencies from './Pages/Competencies';
import NotFound from './Pages/NotFound';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
    background: { default: '#f5f5f5' },
  },
  typography: { fontFamily: 'Roboto, Arial, sans-serif' },
});

// 主頁面組件
const HomePage = () => (
  <Container>
    <Navbar />
    <Box sx={{ pt: 8}}>
      <AboutMe />
      <Competencies/>
      <Projects />
      <CareerGoal />
      <Contact />
    </Box>
  </Container>
);

const App = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  </ThemeProvider>
);

export default App;