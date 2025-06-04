import React from 'react';
import { Box, Typography, Dialog, IconButton, Slide, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DownloadIcon from '@mui/icons-material/Download';

type ImageItem = {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  description?: string;
};

type ImageDialogProps = {
  open: boolean;
  onClose: () => void;
  images: ImageItem[];
  initialIndex?: number;
  showControls?: boolean;
  showDownload?: boolean;
  onIndexChange?: (index: number) => void; // 新增：索引變更回調
};

const ImageDialog: React.FC<ImageDialogProps> = ({ 
  open, 
  onClose, 
  images, 
  initialIndex = 0,
  showControls = true,
  showDownload = false,
  onIndexChange // 新增
}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(initialIndex);
  const [slideDirection, setSlideDirection] = React.useState<'left' | 'right'>('right');
  const [imageKey, setImageKey] = React.useState(0);

  // 更新選中索引
  React.useEffect(() => {
    if (open) {
      setSelectedIndex(initialIndex);
      setImageKey(prev => prev + 1);
    }
  }, [open, initialIndex]);

  const handlePrev = () => {
    setSlideDirection('left');
    const newIndex = (selectedIndex - 1 + images.length) % images.length;
    setSelectedIndex(newIndex);
    setImageKey(prev => prev + 1);
    onIndexChange?.(newIndex); // 通知父元件索引變更
  };

  const handleNext = () => {
    setSlideDirection('right');
    const newIndex = (selectedIndex + 1) % images.length;
    setSelectedIndex(newIndex);
    setImageKey(prev => prev + 1);
    onIndexChange?.(newIndex); // 通知父元件索引變更
  };

  // 鍵盤控制
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  // 在新分頁開啟圖片
  const handleOpenInNewTab = () => {
    if (currentImage) {
      window.open(currentImage.src, '_blank');
    }
  };

  // 下載圖片
  const handleDownloadImage = async () => {
    if (!currentImage) return;
    
    try {
      const response = await fetch(currentImage.src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${(currentImage.title || currentImage.alt || 'image').replace(/[^a-z0-9]/gi, '_').toLowerCase()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      handleOpenInNewTab();
    }
  };

  const currentImage = images[selectedIndex];

  if (!currentImage) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
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
      {/* 頂部控制按鈕 */}
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 3,
          display: 'flex',
          gap: 1
        }}
      >
        {showControls && (
          <>
            <IconButton
              aria-label="open in new tab"
              onClick={handleOpenInNewTab}
              sx={{
                color: '#fff',
                bgcolor: 'rgba(255,255,255,0.1)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
              }}
            >
              <OpenInNewIcon />
            </IconButton>
            {showDownload && (
              <IconButton
                aria-label="download"
                onClick={handleDownloadImage}
                sx={{
                  color: '#fff',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
                }}
              >
                <DownloadIcon />
              </IconButton>
            )}
          </>
        )}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: '#fff',
            bgcolor: 'rgba(255,255,255,0.1)',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      
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
        <Box 
          sx={{ 
            position: 'relative', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            width: '100%',
            minHeight: '60vh',
            overflow: 'hidden'
          }}
        >
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
          
          {/* 圖片 - 滑動動畫 */}
          <Slide 
            direction={slideDirection === 'right' ? 'left' : 'right'} 
            in={true} 
            key={imageKey} 
            timeout={400}
          >
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              style={{
                maxWidth: '90%',
                maxHeight: '70vh',
                objectFit: 'contain',
                borderRadius: 8,
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                userSelect: 'none'
              }}
              draggable={false}
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
        
        {/* 圖片資訊 */}
        {currentImage.title && (
          <Typography variant="h6" color="#fff" sx={{ mt: 2, textAlign: 'center' }}>
            {currentImage.title}
          </Typography>
        )}
        {currentImage.subtitle && (
          <Typography variant="subtitle1" color="#90caf9" sx={{ textAlign: 'center' }}>
            {currentImage.subtitle}
          </Typography>
        )}
        {currentImage.description && (
          <Typography variant="body2" color="#eee" sx={{ mt: 1, textAlign: 'center', maxWidth: '80%' }}>
            {currentImage.description}
          </Typography>
        )}
        
        {/* 圖片計數器 */}
        {images.length > 1 && (
          <Typography variant="caption" color="#90caf9" sx={{ mt: 1 }}>
            {selectedIndex + 1} / {images.length}
          </Typography>
        )}

        {/* 底部操作按鈕 */}
        {showControls && (
          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Button
              variant="outlined"
              startIcon={<OpenInNewIcon />}
              onClick={handleOpenInNewTab}
              sx={{ 
                color: '#fff', 
                borderColor: '#fff',
                '&:hover': { 
                  borderColor: '#90caf9',
                  bgcolor: 'rgba(144, 202, 249, 0.1)'
                }
              }}
            >
              在新分頁開啟
            </Button>
            {showDownload && (
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={handleDownloadImage}
                sx={{ 
                  bgcolor: '#1976d2',
                  '&:hover': { bgcolor: '#1565c0' }
                }}
              >
                下載圖片
              </Button>
            )}
          </Box>
        )}
      </Box>
    </Dialog>
  );
};

export default ImageDialog;