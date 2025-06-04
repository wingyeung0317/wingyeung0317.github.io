import React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import { Element } from 'react-scroll';
import { motion } from 'framer-motion';
import ProjectCard from '../Components/ProjectCard';
import esp32car1 from '../assets/projects/esp32car/image015.jpg';
import esp32car2 from '../assets/projects/esp32car/image016.jpg';
import esp32car3 from '../assets/projects/esp32car/image017.jpg';
import esp32car4 from '../assets/projects/esp32car/image018.jpg';
import esp32car5 from '../assets/projects/esp32car/image019.jpg';
import esp32car6 from '../assets/projects/esp32car/image029.png';
import esp32car7 from '../assets/projects/esp32car/image0.png';
import kaptureaio0 from '../assets/projects/KaptureAIO/image0.png';
import kaptureaio1 from '../assets/projects/KaptureAIO/image1.png';
import kaptureaio2 from '../assets/projects/KaptureAIO/image2.png';
import MotorParkMap1 from '../assets/projects/MotorParkMap/image01.png';
import MotorParkMap2 from '../assets/projects/MotorParkMap/image02.png';
import MotorParkMap3 from '../assets/projects/MotorParkMap/image03.png';

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
              images={[
                esp32car1, esp32car2, esp32car3, esp32car4, esp32car5, esp32car6, esp32car7
              ]}
            />
          </Grid>
          <Grid>
            <ProjectCard
              title="Sentiment Analysis of Tweets [Deprecated]"
              description="A web app which was hosted on Azure to analyze sentiments of tweets on twitter using React JS, Flask, and SQL."
              link="https://github.com/wingyeung0317/JDE-TweetsAnalysis"
              images={[
                kaptureaio0, kaptureaio1, kaptureaio2
              ]}
            />
          </Grid>
          <Grid>
            <ProjectCard
              title="KaptureAIO"
              description="This is a project that aim to build an android app that provide different photographic informations for Hong Konger, such as Weather, Place, Forum etc."
              link="https://github.com/wingyeung0317/JDE-TweetsAnalysis"
              images={[
                kaptureaio0, kaptureaio1, kaptureaio2
              ]}
            />
          </Grid>
          <Grid>
            <ProjectCard
              title="Hong Kong On-Street Motorcycle Parking Map"
              description="A generated KML file and website map about Hong Kong's on-street motorcycle parking according to the data from HKeMobility, updated every day."
              buttons={[
                {
                  label: "View Website",
                  url: "https://wingyeung0317.github.io/motorcycle-parking",
                  variant: "contained"
                },
                {
                  label: "View KML Github",
                  url: "https://github.com/wingyeung0317/-HKOSMP-KML-Google-Maps-",
                  variant: "outlined"
                },
                {
                  label: "View React Github",
                  url: "https://github.com/wingyeung0317/motorcycle-parking",
                  variant: "outlined"
                }
              ]}
              images={[
                MotorParkMap1, MotorParkMap2, MotorParkMap3
              ]}
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