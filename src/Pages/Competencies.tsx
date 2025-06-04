import React from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Grid, Paper, Slide, Button } from '@mui/material';
import { Element } from 'react-scroll';
import { motion } from 'framer-motion';
import TechStack from '../Components/TechStack';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DownloadIcon from '@mui/icons-material/Download';

import BenchFitting from '../assets/competencies/BenchFitting.jpg';
import DataEngineerBootcamp from '../assets/competencies/DataEngineerBootcamp-YeungWing.jpg';
import DrivingLicense from '../assets/competencies/DrivingLicense_block.jpg';
import ElectronicsAndIT from '../assets/competencies/ElectronicsAndInformationTechnology.jpg';
import F3Certificate from '../assets/competencies/F3-YeungWing2.jpg';
import HkieContribution from '../assets/competencies/HkieContribution-YeungWing.jpg';
import IVECompetition from '../assets/competencies/IVE_Competition-YeungWing.jpg';
import MachineTools from '../assets/competencies/MachineTools.jpg';
import Refrigeration from '../assets/competencies/Refrigeration.jpg';
import VTCCertificate from '../assets/competencies/VTC_DVE_Cert-YeungWing.jpg';
import Welding from '../assets/competencies/Welding.jpg';
import ConstructionIndustrySafety from '../assets/competencies/ConstructionIndustrySafety.jpg';

const Competencies = () => {
  const certificates = [
    {
      id: 1,
      title: "HKIE Contribution Certificate",
      institution: "Hong Kong Institution of Engineers (HKIE)",
      year: "2024",
      image: HkieContribution,
      description: "Certificate of Appreciation is presented in appreciation of great contribution to the meaningful event - Hong Kong Engineers Week 2024 Carnival."
    },
    {
      id: 2,
      title: "Construction Industry Safety Training Certificate",
      institution: "Lion Training Centre Limited",
      year: "2024",
      image: ConstructionIndustrySafety,
      description: "Certificate under Section 6BA(2) of the Factories and Industrial Undertakings Ordinance, covering essential safety practices and regulations."
    },
    {
      id: 3,
      title: "Driving License",
      institution: "Transport Department",
      year: "2024",
      image: DrivingLicense,
      description: "Probationary Classes 3, 22 driving licence. Motorcycle and motor tricycle, either manual or automatic transmission are approved, would turn into full licence in 2025-06-23."
    },
    {
      id: 4,
      title: "Junior Data Engineer Programme",
      institution: "CLAP@JC X Generation",
      year: "2023",
      image: DataEngineerBootcamp,
      description: "1-year intensive bootcamp covering data engineering and analysis principles and practices. CLAP@JC X Generation Junior Data Engineer Programme Cohort 5."
    },
    {
      id: 5,
      title: "Innovation Project Invitational Competition",
      institution: "Hong Kong Institution of Engineers (HKIE)",
      year: "2024",
      image: IVECompetition,
      description: "Certificate of Participation of Guangdong-Hong Kong-Macao Greater Bay Area Tertiary Institution Innovation Project Invitational Competition."
    },
    {
      id: 6,
      title: "Electronics and Information Technology Training",
      institution: "Pro-Act Training and Development Centre (Electronics)",
      year: "2024",
      image: ElectronicsAndIT,
      description: "Basic Workshop Training for Technician Trainees (2024 intake) of EMSD- Electronics and Information Technology (72 hours)."
    },
    {
      id: 7,
      title: "Bench Fitting Training",
      institution: "Pro-Act Training and Development Centre (Mechanical)",
      year: "2024",
      image: BenchFitting,
      description: "Basic Workshop Training for EMSD Technician Trainees (Bench Fitting) (18 days)"
    },
    {
      id: 8,
      title: "Machine Tools Training",
      institution: "Pro-Act Training and Development Centre (Mechanical)",
      year: "2024",
      image: MachineTools,
      description: "Basic Workshop Training for EMSD Technician Trainees (Machine Tools) (9 days)."
    },
    {
      id: 9,
      title: "Welding Training",
      institution: "Pro-Act Training and Development Centre (Welding)",
      year: "2024",
      image: Welding,
      description: "Welding Training Course for Technician Trainees [EMSD] (72 hours)."
    },
    {
      id: 10,
      title: "Air-conditioning & Refrigeration Training",
      institution: "Pro-Act Training and Development Centre (Electrical)",
      year: "2024",
      image: Refrigeration,
      description: "Basic Workshop Training for Technician Trainees - Air-conditioning & Refrigeration (72 hours)"
    },
    {
      id: 11,
      title: "VTC DVE Certificate",
      institution: "Vocational Training Council",
      year: "2023",
      image: VTCCertificate,
      description: "Diploma of Vocational Education (Information Technology)"
    },
    {
      id: 12,
      title: "Activity Attendance",
      institution: "CCC Chuen Yuen College",
      year: "2019",
      image: F3Certificate,
      description: "Certificate of Activity Attendance for Form 3 at CCC Chuen Yuen College."
    },
  ];

  const [open, setOpen] = React.useState(false);
  const [selectedCertIndex, setSelectedCertIndex] = React.useState(0);
  const [slideDirection, setSlideDirection] = React.useState<'left' | 'right'>('right');
  const [imageKey, setImageKey] = React.useState(0);

  // 拖拽狀態
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStart, setDragStart] = React.useState<{ x: number; y: number } | null>(null);

  const handleOpen = (cert: any) => {
    const index = certificates.findIndex(c => c.id === cert.id);
    setSelectedCertIndex(index);
    setImageKey(prev => prev + 1);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePrev = () => {
    setSlideDirection('left');
    setSelectedCertIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
    setImageKey(prev => prev + 1);
  };

  const handleNext = () => {
    setSlideDirection('right');
    setSelectedCertIndex((prev) => (prev + 1) % certificates.length);
    setImageKey(prev => prev + 1);
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

  // 滑鼠拖拽控制
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !dragStart) return;
    e.preventDefault();
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging || !dragStart) return;
    
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    const isHorizontalDrag = Math.abs(deltaX) > Math.abs(deltaY);
    
    if (isHorizontalDrag && Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        handlePrev(); // 向右拖拽 = 上一張
      } else {
        handleNext(); // 向左拖拽 = 下一張
      }
    }
    
    setIsDragging(false);
    setDragStart(null);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setDragStart(null);
  };

  // 觸控拖拽控制
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !dragStart) return;
    // 可選：阻止預設行為以防止頁面滾動
    // e.preventDefault();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging || !dragStart) return;
    
    const deltaX = e.changedTouches[0].clientX - dragStart.x;
    const deltaY = e.changedTouches[0].clientY - dragStart.y;
    const isHorizontalDrag = Math.abs(deltaX) > Math.abs(deltaY);
    
    if (isHorizontalDrag && Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        handlePrev(); // 向右拖拽 = 上一張
      } else {
        handleNext(); // 向左拖拽 = 下一張
      }
    }
    
    setIsDragging(false);
    setDragStart(null);
  };

  // 在新分頁開啟圖片
  const handleOpenInNewTab = () => {
    if (selectedCert) {
      window.open(selectedCert.image, '_blank');
    }
  };

  // 下載圖片
  const handleDownloadImage = async () => {
    if (!selectedCert) return;
    
    try {
      const response = await fetch(selectedCert.image);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${selectedCert.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      // 備用方案：直接開啟圖片讓使用者右鍵儲存
      handleOpenInNewTab();
    }
  };

  const selectedCert = certificates[selectedCertIndex];

  return (
    <Element name="competencies">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false }}
      >
        <Box sx={{ py: 8 }}>
          <Typography variant="h4" gutterBottom textAlign="center" sx={{ mb: 6 }}>
            🏆 Competencies & Certifications 🏆
          </Typography>
          
          {/* Certificates Section */}
          <Box sx={{ mb: 8 }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
              Certifications
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              {certificates.map((cert) => (
                <Grid key={cert.id} sx={{ xs: 12, sm: 6, md: 4}} width='45%'>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card 
                      sx={{ height: '100%', boxShadow: 3, cursor: 'pointer' }}
                      onClick={() => handleOpen(cert)}
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image={cert.image}
                        alt={cert.title}
                        sx={{ objectFit: 'cover' }}
                      />
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {cert.title}
                        </Typography>
                        <Typography variant="subtitle1" color="primary" gutterBottom>
                          {cert.institution} • {cert.year}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {cert.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Dialog for full image */}
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
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  color: '#fff',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            
            {selectedCert && (
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
                    maxwidth: '90%',
                    minHeight: '60vh',
                    overflow: 'hidden',
                    cursor: isDragging ? 'grabbing' : 'grab'
                  }}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseLeave}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {/* 左箭頭 */}
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
                  
                  {/* 證書圖片 - 加入滑動動畫 */}
                  <Slide 
                    direction={slideDirection === 'right' ? 'left' : 'right'} 
                    in={true} 
                    key={imageKey} 
                    timeout={400}
                  >
                    <img
                      src={selectedCert.image}
                      alt={selectedCert.title}
                      style={{
                        maxWidth: '90%',
                        maxHeight: '70vh',
                        objectFit: 'contain',
                        borderRadius: 8,
                        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                        userSelect: 'none',
                        pointerEvents: isDragging ? 'none' : 'auto'
                      }}
                      draggable={false}
                    />
                  </Slide>
                  
                  {/* 右箭頭 */}
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
                </Box>
                
                {/* 證書資訊 */}
                <Typography variant="h6" color="#fff" sx={{ mt: 2, textAlign: 'center' }}>
                  {selectedCert.title}
                </Typography>
                <Typography variant="subtitle1" color="#90caf9" sx={{ textAlign: 'center' }}>
                  {selectedCert.institution} • {selectedCert.year}
                </Typography>
                <Typography variant="body2" color="#eee" sx={{ mt: 1, textAlign: 'center', maxWidth: '80%' }}>
                  {selectedCert.description}
                </Typography>
                
                {/* 證書計數器 */}
                <Typography variant="caption" color="#90caf9" sx={{ mt: 1 }}>
                  {selectedCertIndex + 1} / {certificates.length}
                </Typography>

                {/* 底部操作按鈕 */}
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
                </Box>
              </Box>
            )}
          </Dialog>
          
          {/* Tech Stack Section */}
          <Box>
            <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
              Technical Skills
            </Typography>
            <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
              <TechStack />
            </Paper>
          </Box>
        </Box>
      </motion.div>
    </Element>
  );
};

export default Competencies;