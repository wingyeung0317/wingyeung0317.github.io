import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { Element } from 'react-scroll';
import { motion } from 'framer-motion';
import ProjectCard from '../Components/ProjectCard';

const Projects = () => (
  <Element name="projects">
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: false }}
    >
      <Box sx={{ py: 8, bgcolor: 'background.default' }}>
        <Typography variant="h4" align="center" gutterBottom>🚀 Projects 🚀</Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid>
            <ProjectCard
              title="ESP32 Remote Car"
              description="Designed and built a remote-controlled car using ESP32, including PCB design and soldering. Controlled via an Android app."
              link="https://github.com/wingyeung0317/EEE3452/tree/main/ea_project"
            />
          </Grid>
          <Grid >  
            <Card sx={{ maxWidth: 345, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
              <CardContent>
                <Typography variant="h6">Hong Kong On-Street Motorcycle Parking Map</Typography>
                <Typography variant="body2" color="text.secondary">A generated KML file and website map about Hong Kong’s on-street motorcycle parking according to the data from HKeMobility, updated every day.</Typography>
                <Button 
                onClick={() => window.open('https://wingyeung0317.github.io/motorcycle-parking', '_blank')}
                variant="contained" 
                sx={{ mt: 2 }}>View Website</Button> <br />
                <Button
                onClick={() => window.open('https://github.com/wingyeung0317/-HKOSMP-KML-Google-Maps-', '_blank')}
                sx={{ mt: 2 }}>View KML Github</Button>
                <Button 
                onClick={() => window.open('https://github.com/wingyeung0317/motorcycle-parking', '_blank')}
                sx={{ mt: 2 }}>View React Github</Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid>
            <ProjectCard
              title="Sentiment Analysis of Tweets [Deprecated]"
              description="A web app which was hosted on Azure to analyze sentiments of tweets on twitter using React JS, Flask, and SQL."
              link="https://github.com/wingyeung0317/JDE-TweetsAnalysis"
            />
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
          <Button
            variant="outlined"
            color="primary"
            href="https://github.com/wingyeung0317?tab=repositories"
            target="_blank"
            rel="noopener"
          >
            View my other GitHub Repos
          </Button>
        </Box>
      </Box>
    </motion.div>
  </Element>
);

export default Projects;