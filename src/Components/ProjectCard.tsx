import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

type ProjectCardProps = {
  title: string;
  description: string;
  link: string;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, link }) => (
  <Card sx={{ maxWidth: 345, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
    <CardContent>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body2" color="text.secondary">{description}</Typography>
      <Button variant="contained" onClick={()=> window.open(link, '_blank')} sx={{ mt: 2 }}>View on GitHub</Button>
    </CardContent>
  </Card>
);

export default ProjectCard;