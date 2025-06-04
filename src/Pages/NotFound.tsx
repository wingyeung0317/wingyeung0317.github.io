import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Paper, Button, Box } from '@mui/material';
import '../assets/font.css';
import animation from '../assets/404.gif';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToHome = (): void => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#0414a7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${animation})`,
        backgroundRepeat: 'space',
        backgroundSize: 'auto 5%',
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={6} sx={{ p: 1, bgcolor: '#aaaaaa' }}>
          <Typography
            component="h1"
            variant="h3"
            align="center"
            sx={{
              fontFamily: 'VT323, monospace', 
              fontWeight: 'lighter',
              color: '#0414a7',
            }}
          >
            Error - 404
          </Typography>
        </Paper>
        
        <Paper elevation={6} sx={{ p: 2, bgcolor: '#0414a7' }}>
          <Typography
            component="p"
            variant="h6"
            sx={{ 
              fontFamily: 'VT323, monospace', 
              fontWeight: 'lighter', 
              color: '#e0e2f4', 
              mb: 2 
            }}
          >
            An error has occurred, to continue:<br />
            * Return to my homepage.
          </Typography>
          
          <Typography
            component="p"
            variant="h6"
            sx={{ 
              fontFamily: 'VT323, monospace', 
              fontWeight: 'normal', 
              color: '#e0e2f4', 
              mb: 2 
            }}
          >
            Cause of HTTP 404 Errors:<br />
            * Typed the URL incorrectly.<br />
            * This website had been removed.<br />
            * This website had been moved to other location.
          </Typography>
          
          <Box textAlign="center" mt={5}>
            <Button
              variant="outlined"
              onClick={handleBackToHome}
              sx={{
                fontFamily: 'VT323, monospace',
                fontSize: 24,
                color: '#aaaaaa',
                borderColor: '#e0e2f4',
                borderWidth: 2,
                borderStyle: 'dotted',
                '&:hover': {
                  bgcolor: '#aaaaaa',
                  color: '#0414a7',
                  borderColor: '#e0e2f4',
                },
              }}
            >
              <Typography 
                component="span" 
                variant="h5" 
                sx={{ 
                  fontFamily: 'VT323, monospace', 
                  fontWeight: 'lighter' 
                }}
              >
                BACK TO INDEX
              </Typography>
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default NotFound;