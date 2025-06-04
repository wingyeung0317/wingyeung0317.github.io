import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { keyframes } from '@mui/system';
import ImageDialog from './ImageDialog';

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

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, link, images, buttons }) => {
  const [index, setIndex] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  // 只保留卡片自動輪播
  React.useEffect(() => {
    if (open || !images || images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [open, images]);

  const bgImage = images && images.length > 0 ? images[index] : undefined;

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    
    if (images && images.length > 0) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  // 轉換圖片格式供 ImageDialog 使用
  const dialogImages = images?.map((img, idx) => ({
    src: img,
    alt: `${title} - ${idx + 1}`,
    title: title,
    description: description
  })) || [];

  return (
    <>
        <Card
          sx={{
            maxWidth: 345,
            minHeight: 250,
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': { 
              transform: 'scale(1.05)',
              boxShadow: 6,
              '& .click-hint': { // 懸停時顯示提示
                opacity: 1
              }
            },
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
          
          {/* 將 click hint 移到左上角，避免與內容重疊 */}
          {images && images.length > 0 && (
            <Box
              className="click-hint"
              sx={{
                position: 'absolute',
                top: 12,
                left: 12,
                bgcolor: 'rgba(255, 255, 255, 0.9)',
                color: 'black',
                px: 1.5,
                py: 0.5,
                borderRadius: 2,
                fontSize: '0.75rem',
                fontWeight: 500,
                opacity: 0,
                transition: 'opacity 0.3s',
                zIndex: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
              }}
            >
              🖱️ Click to view
            </Box>
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

          {/* 移除動畫圖標，避免與 click hint 重複 */}
        </Card>

      {/* 簡化的 ImageDialog 使用 */}
      <ImageDialog
        open={open}
        onClose={handleClose}
        images={dialogImages}
        initialIndex={index}
        showControls={true}
        showDownload={true}
        enableSlideshow={true}
        slideshowInterval={2700}
      />
    </>
  );
};

export default ProjectCard;