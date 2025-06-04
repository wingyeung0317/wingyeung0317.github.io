import React from 'react';
import { Card, CardContent, Typography, Button, Box, Dialog, IconButton, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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
  const [open, setOpen] = React.useState(false);
  const [dialogIndex, setDialogIndex] = React.useState(0);
  const [slideDirection, setSlideDirection] = React.useState<'left' | 'right'>('right');
  const [imageKey, setImageKey] = React.useState(0);

  // 卡片自動輪播
  React.useEffect(() => {
    if (!images || images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [images]);

  // Dialog 自動輪播 - 改為 1.5 秒
  React.useEffect(() => {
    if (!open || !images || images.length <= 1) return;
    const timer = setInterval(() => {
      setSlideDirection('right');
      setDialogIndex((prev) => (prev + 1) % images.length);
      setImageKey(prev => prev + 1);
    }, 2700);
    return () => clearInterval(timer);
  }, [open, images]);

  const bgImage = images && images.length > 0 ? images[index] : undefined;

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    
    if (images && images.length > 0) {
      setDialogIndex(index);
      setImageKey(prev => prev + 1);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePrev = () => {
    if (images) {
      setSlideDirection('left');
      setDialogIndex((prev) => (prev - 1 + images.length) % images.length);
      setImageKey(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (images) {
      setSlideDirection('right');
      setDialogIndex((prev) => (prev + 1) % images.length);
      setImageKey(prev => prev + 1);
    }
  };

  // 鍵盤控制
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    } else if (e.key === 'Escape') {
      handleClose();
    }
  };

  return (
    <>
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
          cursor: images && images.length > 0 ? 'pointer' : 'default',
        }}
        onClick={handleCardClick}
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
          
          {buttons ? (
            <Box sx={{ mt: 2 }}>
              {buttons.map((btn, idx) => (
                <Button
                  key={idx}
                  variant={btn.variant || (idx === 0 ? 'contained' : 'outlined')}
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(btn.url, '_blank');
                  }}
                  sx={{ mt: 1, mr: 1 }}
                >
                  {btn.label}
                </Button>
              ))}
            </Box>
          ) : (
            link && (
              <Button 
                variant="contained" 
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(link, '_blank');
                }} 
                sx={{ mt: 2 }}
              >
                View on GitHub
              </Button>
            )
          )}
        </CardContent>
      </Card>

      {/* Dialog for slideshow */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        onKeyDown={handleKeyDown}
        PaperProps={{
          sx: { 
            background: 'rgba(0,0,0,0.9)', 
            boxShadow: 0, 
            position: 'relative',
            outline: 'none'
          }
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            color: '#fff',
            zIndex: 3,
            bgcolor: 'rgba(255,255,255,0.1)',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
          }}
        >
          <CloseIcon />
        </IconButton>
        
        {images && images.length > 0 && (
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              p: 4,
              position: 'relative'
            }}
          >
            {/* 圖片容器 */}
            <Box sx={{ 
              position: 'relative', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              width: '100%',
              minHeight: '60vh',
              overflow: 'hidden'
            }}>
              {/* 左箭頭 */}
              {images.length > 1 && (
                <IconButton
                  onClick={handlePrev}
                  sx={{ 
                    position: 'absolute',
                    left: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#fff',
                    bgcolor: 'rgba(0,0,0,0.5)',
                    zIndex: 2,
                    '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' }
                  }}
                >
                  <ArrowBackIosIcon />
                </IconButton>
              )}
              
              {/* 圖片 - 加入 Slide 動畫 */}
              <Slide 
                direction={slideDirection === 'right' ? 'left' : 'right'} 
                in={true} 
                key={imageKey} 
                timeout={400}
              >
                <img
                  src={images[dialogIndex]}
                  alt={`${title} - ${dialogIndex + 1}`}
                  style={{
                    maxWidth: '90%',
                    maxHeight: '70vh',
                    objectFit: 'contain',
                    borderRadius: 8,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
                  }}
                />
              </Slide>
              
              {/* 右箭頭 */}
              {images.length > 1 && (
                <IconButton
                  onClick={handleNext}
                  sx={{ 
                    position: 'absolute',
                    right: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#fff',
                    bgcolor: 'rgba(0,0,0,0.5)',
                    zIndex: 2,
                    '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' }
                  }}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              )}
            </Box>
            
            {/* 標題和描述 */}
            <Typography variant="h6" color="#fff" sx={{ mt: 2, textAlign: 'center' }}>
              {title}
            </Typography>
            <Typography variant="body2" color="#eee" sx={{ mt: 1, textAlign: 'center', maxWidth: '80%' }}>
              {description}
            </Typography>
            
            {/* 圖片計數器 */}
            {images.length > 1 && (
              <Typography variant="caption" color="#90caf9" sx={{ mt: 1 }}>
                {dialogIndex + 1} / {images.length}
              </Typography>
            )}
          </Box>
        )}
      </Dialog>
    </>
  );
};

export default ProjectCard;