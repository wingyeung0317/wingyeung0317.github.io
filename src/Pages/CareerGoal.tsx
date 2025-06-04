import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Element } from 'react-scroll';
import { motion } from 'framer-motion';

const CareerGoal = () => (
  <Element name="career-goal">
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: false }}
    >
      <Box sx={{ py: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>🎯 Career Goal & Plan 🎯</Typography>
        <Typography variant="h6">Goal</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          To become a senior electronic engineer specializing in Industrial Internet of Things (IIoT) within 5 years.
        </Typography>
        <Typography variant="h6">Steps to Reach My Goal</Typography>
        <List>
          <ListItem><ListItemText primary="Gain hands-on IIoT experience." /></ListItem>
          <ListItem><ListItemText primary="Pursue certifications in IIoT technologies and protocols." /></ListItem>
          <ListItem><ListItemText primary="Contribute to open-source IIoT projects." /></ListItem>
          <ListItem><ListItemText primary="Network with IIoT professionals via conferences and communities." /></ListItem>
        </List>
        <Typography variant="h6">Necessary Skills to Learn</Typography>
        <List>
          <ListItem><ListItemText primary="Advanced C++ for embedded systems" secondary="Online courses, projects; within 12 months" /></ListItem>
          <ListItem><ListItemText primary="IIoT protocols (MQTT, CoAP)" secondary="Documentation, projects; within 6 months" /></ListItem>
          <ListItem><ListItemText primary="Cloud platforms (AWS IoT)" secondary="Tutorials, certifications; within 18 months" /></ListItem>
        </List>
      </Box>
    </motion.div>
  </Element>
);

export default CareerGoal;