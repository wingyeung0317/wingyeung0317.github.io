import React from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Grid, Paper } from '@mui/material';
import { Element } from 'react-scroll';
import { motion } from 'framer-motion';
import TechStack from '../Components/TechStack';
import ImageDialog from '../Components/ImageDialog';

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

  const handleOpen = (cert: any) => {
    const index = certificates.findIndex(c => c.id === cert.id);
    setSelectedCertIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // 轉換證書格式供 ImageDialog 使用
  const dialogImages = certificates.map(cert => ({
    src: cert.image,
    alt: cert.title,
    title: cert.title,
    subtitle: `${cert.institution} • ${cert.year}`,
    description: cert.description
  }));

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

          {/* 使用 ImageDialog 元件 - 不啟用 slideshow */}
          <ImageDialog
            open={open}
            onClose={handleClose}
            images={dialogImages}
            initialIndex={selectedCertIndex}
            showControls={true}
            showDownload={true}
            enableSlideshow={false} // 證書不需要自動播放
          />
          
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