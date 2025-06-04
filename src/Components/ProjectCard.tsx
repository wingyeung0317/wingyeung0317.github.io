import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

type ProjectButton = {
  label: string;
  url: string;
  variant?: 'contained' | 'outlined' | 'text';
};

type ProjectCardProps = {
  title: string;
  description: string;
  link?: string;
  images?: string[];
  buttons?: ProjectButton[];
};

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, link, images, buttons }) => {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (!images || images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [images]);

  const bgImage = images && images.length > 0 ? images[index] : undefined;

  return (
    <Card
      sx={{
        maxWidth: 345,
        minHeight: 250,
        transition: 'transform 0.3s',
        '&:hover': { transform: 'scale(1.05)' },
        backgroundImage: bgImage ? `url(${bgImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: bgImage ? '#fff' : 'inherit',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {bgImage && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            bgcolor: 'rgba(0, 0, 0, 0.8)',
            zIndex: 1,
          }}
        />
      )}
      <CardContent
        sx={{
          borderRadius: 2,
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" color={bgImage ? "#fff" : "text.secondary"}>{description}</Typography>
        
        {/* 如果有自訂按鈕，顯示自訂按鈕 */}
        {buttons ? (
          <Box sx={{ mt: 2 }}>
            {buttons.map((btn, idx) => (
              <div><Button
                key={idx}
                variant={btn.variant || (idx === 0 ? 'contained' : 'outlined')}
                onClick={() => window.open(btn.url, '_blank')}
                sx={{ mt: 1, mr: 1 }}
              >
                {btn.label}
              </Button></div>
            ))}
          </Box>
        ) : (
          /* 否則顯示預設的 GitHub 按鈕 */
          link && (
            <Button variant="contained" onClick={() => window.open(link, '_blank')} sx={{ mt: 2 }}>
              View on GitHub
            </Button>
          )
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectCard;