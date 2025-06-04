import React from 'react';
import { Box, Typography, Dialog, IconButton, Slide, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DownloadIcon from '@mui/icons-material/Download';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

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
  enableSlideshow?: boolean;
  slideshowInterval?: number;
};

const ImageDialog: React.FC<ImageDialogProps> = ({ 
  open, 
  onClose, 
  images, 
  initialIndex = 0,
  showControls = true,
  showDownload = false,
  enableSlideshow = false,
  slideshowInterval = 2700
}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(initialIndex);
  const [slideDirection, setSlideDirection] = React.useState<'left' | 'right'>('right');
  const [imageKey, setImageKey] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const slideshowRef = React.useRef<NodeJS.Timeout | null>(null);
  const pauseTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // 更新選中索引
  React.useEffect(() => {
    if (open) {
      setSelectedIndex(initialIndex);
      setImageKey(prev => prev + 1);
      if (enableSlideshow) {
        setIsPlaying(true); // 開啟 dialog 時自動開始播放
      }
    } else {
      setIsPlaying(false);
      // 清理計時器
      if (slideshowRef.current) {
        clearInterval(slideshowRef.current);
        slideshowRef.current = null;
      }
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
        pauseTimeoutRef.current = null;
      }
    }
  }, [open, initialIndex, enableSlideshow]);

  // Slideshow 自動播放
  React.useEffect(() => {
    if (!enableSlideshow || !isPlaying || !open || images.length <= 1) {
      if (slideshowRef.current) {
        clearInterval(slideshowRef.current);
        slideshowRef.current = null;
      }
      return;
    }
    
    slideshowRef.current = setInterval(() => {
      setSlideDirection('right');
      setSelectedIndex(prev => (prev + 1) % images.length);
      setImageKey(prev => prev + 1);
    }, slideshowInterval);
    
    return () => {
      if (slideshowRef.current) {
        clearInterval(slideshowRef.current);
        slideshowRef.current = null;
      }
    };
  }, [enableSlideshow, isPlaying, open, selectedIndex, images.length, slideshowInterval]);

  // 手動切換時暫停播放的邏輯
  const pauseAndResume = () => {
    if (!enableSlideshow || !isPlaying) return;
    
    setIsPlaying(false);
    
    // 清除現有的恢復計時器
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    
    // 3秒後恢復播放
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPlaying(true);
    }, 3000);
  };

  const handlePrev = () => {
    setSlideDirection('left');
    setSelectedIndex(prev => (prev - 1 + images.length) % images.length);
    setImageKey(prev => prev + 1);
    pauseAndResume(); // 暫停並稍後恢復播放
  };

  const handleNext = () => {
    setSlideDirection('right');
    setSelectedIndex(prev => (prev + 1) % images.length);
    setImageKey(prev => prev + 1);
    pauseAndResume(); // 暫停並稍後恢復播放
  };

  // 切換播放/暫停
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    
    // 如果是手動暫停，清除自動恢復計時器
    if (isPlaying && pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
      pauseTimeoutRef.current = null;
    }
  };

  // 鍵盤控制
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    } else if (e.key === 'Escape') {
      onClose();
    } else if (e.key === ' ' && enableSlideshow) {
      e.preventDefault();
      togglePlayPause();
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
        {enableSlideshow && images.length > 1 && (
          <IconButton
            aria-label={isPlaying ? "pause slideshow" : "play slideshow"}
            onClick={togglePlayPause}
            sx={{
              color: '#fff',
              bgcolor: 'rgba(255,255,255,0.1)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
            }}
          >
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
        )}
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
            maxWidth: '95%',
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
            <Typography variant="caption" color="#90caf9">
              {selectedIndex + 1} / {images.length}
            </Typography>
            {enableSlideshow && (
              <Typography variant="caption" color={isPlaying ? "#4caf50" : "#ff9800"}>
                • {isPlaying ? "播放中" : "已暫停"}
              </Typography>
            )}
          </Box>
        )}

        {/* 底部操作按鈕 */}
        {showControls && (
          <Box sx={{ display: 'flex', gap: 2, mt: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
            {enableSlideshow && images.length > 1 && (
              <Button
                variant="outlined"
                startIcon={isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                onClick={togglePlayPause}
                sx={{ 
                  color: isPlaying ? '#4caf50' : '#ff9800', 
                  borderColor: isPlaying ? '#4caf50' : '#ff9800',
                  '&:hover': { 
                    borderColor: isPlaying ? '#66bb6a' : '#ffb74d',
                    bgcolor: isPlaying ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 152, 0, 0.1)'
                  }
                }}
              >
                {isPlaying ? '暫停播放' : '開始播放'}
              </Button>
            )}
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