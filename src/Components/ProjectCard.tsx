import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
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

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, link, images, buttons }) => {
  const [index, setIndex] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [autoPlay, setAutoPlay] = React.useState(true); // 新增：控制自動播放
  const timerRef = React.useRef<NodeJS.Timeout | null>(null); // 新增：計時器引用

  // 卡片自動輪播
  React.useEffect(() => {
    if (open || !images || images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [open, images]);

  // Dialog 自動輪播
  React.useEffect(() => {
    if (!open || !images || images.length <= 1 || !autoPlay) return;
    
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2700);
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [open, images, autoPlay]);

  const bgImage = images && images.length > 0 ? images[index] : undefined;

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    
    if (images && images.length > 0) {
      setOpen(true);
      setAutoPlay(true); // 開啟 Dialog 時恢復自動播放
    }
  };

  const handleClose = () => {
    setOpen(false);
    setAutoPlay(true); // 關閉 Dialog 時恢復自動播放
  };

  // 手動切換圖片時暫停自動播放
  const handleManualChange = (newIndex: number) => {
    setIndex(newIndex);
    setAutoPlay(false); // 暫停自動播放
    
    // 清除現有計時器
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    // 5秒後恢復自動播放
    setTimeout(() => {
      setAutoPlay(true);
    }, 3000);
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

      {/* 使用 ImageDialog 元件 */}
      <ImageDialog
        open={open}
        onClose={handleClose}
        images={dialogImages}
        initialIndex={index}
        showControls={false}
        showDownload={false}
        onIndexChange={handleManualChange} // 新增：手動切換回調
      />
    </>
  );
};

export default ProjectCard;