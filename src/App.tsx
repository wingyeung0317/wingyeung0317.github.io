import React from 'react';
import { ThemeProvider, createTheme, Box, Container } from '@mui/material';
import Navbar from './Components/Navbar';
import AboutMe from './Pages/AboutMe';
import Projects from './Pages/Projects';
import CareerGoal from './Pages/CareerGoal';
import Contact from './Pages/Contact';
import Competencies from './Pages/Competencies';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
    background: { default: '#f5f5f5' },
  },
  typography: { fontFamily: 'Roboto, Arial, sans-serif' },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <Navbar />
    <Box sx={{ pt: 8 }}>
      <Container>
        <AboutMe />
        <Competencies/>
        <Projects />
        <CareerGoal />
        <Contact />
      </Container>
    </Box>
  </ThemeProvider>
);

export default App;