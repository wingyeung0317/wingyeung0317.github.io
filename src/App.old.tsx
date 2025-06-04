import React, { useEffect, useState } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Button,
  Container,
  Grid,
  Stack,
} from '@mui/material';
import { motion } from 'framer-motion';
import './App.css';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#ffffff' },
    background: { default: '#f5f7fa' },
  },
  typography: { fontFamily: 'Roboto, sans-serif' },
});

const scrollToSection = (sectionId: string) => {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
};

const Header: React.FC = () => (
  <AppBar position="sticky" className="header" sx={{ backgroundColor: '#1976d2', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>Yeung Wing</Typography>
      <a href="#about-me" onClick={e => { e.preventDefault(); scrollToSection('about-me'); }} className="nav-link">About Me</a>
      <a href="#skills" onClick={e => { e.preventDefault(); scrollToSection('skills'); }} className="nav-link">Skills</a>
      <a href="#projects" onClick={e => { e.preventDefault(); scrollToSection('projects'); }} className="nav-link">Projects</a>
      <a href="#career-goals" onClick={e => { e.preventDefault(); scrollToSection('career-goals'); }} className="nav-link">Career Goals</a>
    </Toolbar>
  </AppBar>
);

const AboutMe: React.FC = () => {
  const [bgOpacity, setBgOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      // 0~300px 之間淡出
      const scrollY = window.scrollY;
      const fadeStart = 0;
      const fadeEnd = 300;
      let opacity = 1;
      if (scrollY > fadeStart) {
        opacity = Math.max(0, 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart));
      }
      setBgOpacity(opacity);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box
      id="about-me"
      className="section hero"
      sx={{
        background: `linear-gradient(rgba(25, 118, 210, ${0.8 * bgOpacity}), rgba(25, 118, 210, ${0.8 * bgOpacity})), url('https://via.placeholder.com/1200x400?text=Circuit+Pattern')`,
        backgroundSize: 'cover',
        color: 'white',
        textAlign: 'center',
        py: { xs: 6, md: 12 },
        px: { xs: 2, md: 4 },
        transition: 'background 0.3s'
      }}
    >
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <Avatar src="https://via.placeholder.com/150" sx={{ width: { xs: 100, md: 150 }, height: { xs: 100, md: 150 }, mb: 2, mx: 'auto' }} />
        <Typography variant="h4" gutterBottom>Yeung Wing</Typography>
        <Typography variant="subtitle1" gutterBottom>
          Aspiring Electronic Engineer | Passionate about Innovative Solutions
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 600, margin: '0 auto' }}>
          I’m a Higher Diploma graduate in Computer and Electronic Engineering with a strong foundation in full-stack development and electronics.
          Currently, I work as an Electronic Technician Trainee at EMSD, where I maintain and modify communication and surveillance systems.
          I’m passionate about creating impactful solutions and am eager to contribute my skills to a leading technology company.
        </Typography>
      </motion.div>
    </Box>
  );
};

const Skills: React.FC = () => (
  <Container id="skills" className="section" sx={{ py: 8 }}>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
      <Typography variant="h4" gutterBottom>Skills</Typography>
      <Grid container spacing={2}>
        {['C++', 'Python', 'Java', 'Arduino', 'Raspberry Pi', 'PCB Design', 'Soldering', 'Networking', 'GitHub'].map(skill => (
          <Stack
            key={skill}
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ width: { xs: '100%', sm: '48%', md: '30%' }, mb: 2 }}
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardContent>
                <Typography variant="h6">{skill}</Typography>
              </CardContent>
            </Card>
          </Stack>
        ))}
      </Grid>
    </motion.div>
  </Container>
);

const Projects: React.FC = () => (
  <Container id="projects" className="section" sx={{ py: 8 }}>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}>
      <Typography variant="h4" gutterBottom>Projects</Typography>
      <Grid container spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" alignItems="center" sx={{ mb: 4 }}>
          <Card className="project-card" sx={{ transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
            <CardMedia component="img" height="140" image="https://via.placeholder.com/300x140?text=Remote+Car" />
            <CardContent>
              <Typography variant="h6">ESP32 Remote Car</Typography>
              <Typography variant="body2">
                Built a remote-controlled car using ESP32, involving circuit design, PCB creation, and soldering.
              </Typography>
              <Button href="https://github.com/wingyeung0317/EEE3452/tree/main/ea_project" target="_blank" color="primary">View on GitHub</Button>
            </CardContent>
          </Card>
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" alignItems="center" sx={{ mb: 4 }}>
          <Card className="project-card" sx={{ transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
            <CardMedia component="img" height="140" image="https://via.placeholder.com/300x140?text=Temp+Humidity" />
            <CardContent>
              <Typography variant="h6">ESP32 Temperature & Humidity</Typography>
              <Typography variant="body2">
                Developed an ESP32 application to record and display temperature and humidity on an LCD.
              </Typography>
              <Button href="https://github.com/wingyeung0317/EEE3453/tree/master/Year1/Mini%20Project" target="_blank" color="primary">View on GitHub</Button>
            </CardContent>
          </Card>
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" alignItems="center" sx={{ mb: 4 }}>
          <Card className="project-card" sx={{ transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
            <CardMedia component="img" height="140" image="https://via.placeholder.com/300x140?text=Mini+Project" />
            <CardContent>
              <Typography variant="h6">EEE3456 Mini Project</Typography>
              <Typography variant="body2">
                A mini-project showcasing electronic engineering skills (details in repo).
              </Typography>
              <Button href="https://github.com/wingyeung0317/EEE3456-miniproject" target="_blank" color="primary">View on GitHub</Button>
            </CardContent>
          </Card>
        </Stack>
      </Grid>
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button variant="contained" href="https://github.com/wingyeung0317" target="_blank">Explore More Projects</Button>
      </Box>
    </motion.div>
  </Container>
);

const CareerGoals: React.FC = () => (
  <Container id="career-goals" className="section" sx={{ py: 8 }}>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }}>
      <Typography variant="h4" gutterBottom>Career Goals</Typography>
      <Typography variant="h6">Goal</Typography>
      <Typography variant="body1" gutterBottom>
        To become a senior electronic engineer at a leading technology company within 5 years.
      </Typography>
      <Typography variant="h6">Steps to Reach My Goal</Typography>
      <ul>
        <li>Pursue further education in electronic engineering.</li>
        <li>Gain relevant work experience through internships and projects.</li>
        <li>Build a professional network in the industry.</li>
      </ul>
      <Typography variant="h6">Skills to Learn</Typography>
      <Typography variant="body1">
        <strong>Skills:</strong> Embedded Systems, IoT, Machine Learning<br />
        <strong>How:</strong> Online courses, workshops, mentorship<br />
        <strong>When:</strong> Within the next 2 years
      </Typography>
    </motion.div>
  </Container>
);

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Header />
    <AboutMe />
    <Skills />
    <Projects />
    <CareerGoals />
  </ThemeProvider>
);

export default App;
