import React from 'react';
import { Box, Typography, Avatar, Chip } from '@mui/material';
import { Element } from 'react-scroll';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const AboutMe = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState(650);

  React.useLayoutEffect(() => {
    if (ref.current) {
      setHeight(ref.current.offsetHeight);
    }
  }, []);

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, height], [1, 0]);
  const y = useTransform(scrollY, [0, height], [0, -50]);

  const skillsData = [
    { subject: 'Programming (Python, React, C++)', A: 100, fullMark: 100 },
    { subject: 'Microcontrollers (Raspberry Pi, Arduino)', A: 87.5, fullMark: 100 },
    { subject: 'Equipment Maintenance', A: 75, fullMark: 100 }, // 修正拼字
    { subject: 'Networking & Cloud Services', A: 87.5, fullMark: 100 },
  ];

  const competencies = [
    'Programming (Python, React, C++)', 
    'Microcontrollers (Raspberry Pi, Arduino)', 
    'Networking & Cloud Services', 
    'Equipment Maintenance' // 修正拼字
  ];

  return (
    <Element name="about-me">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        style={{ opacity, y }}
      >
        <Box sx={{ py: 8, position: 'relative' }}>
          <Avatar
            src="https://avatars.githubusercontent.com/u/121206892?v=4"
            sx={{ 
              width: 100, 
              height: 100, 
              position: 'absolute',
              top: 16,
              left: 16,
              zIndex: 1,
              border: '3px solid white',
              boxShadow: 2
            }}
          />
          <Box sx={{ textAlign: 'center'}} borderRadius={2} bgcolor="background.paper" boxShadow={3} p={4}>
            <Typography variant="h4" gutterBottom>👨‍💻 About Me 👨‍💻</Typography>
            <Typography variant="body1" sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
              {/* Start with introducing yourself, your background, and your interests */}
              Hello, I'm Yeung Wing, currently work as an Electronic Technician Trainee at EMSD, a Higher Diploma student in Computer and Electronic Engineering from the Hong Kong Institute of Vocational Education. I'm passionate about technology, particularly in Internet of Things (IoT), with hands-on experience in microcontrollers, programming, networking and equipment maintenance such as medical devices, CCTV and PA system. I am eager to apply my skills in engineering projects. <br /><br />
              In my free time, I enjoy photography and developing my skills. I love to tinker with hardware and software, creating innovative solutions to everyday problems. My goal is to become a senior electronic engineer.
            </Typography>
            <Typography variant="h6" gutterBottom>Key Competencies</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1, mb: 4 }}>
              {competencies.map((comp) => (
                <Chip 
                  key={comp}
                  label={comp} 
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
            <Typography variant="h6" gutterBottom>Skills Overview</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <RadarChart cx={400} cy={150} outerRadius={100} width={800} height={300} data={skillsData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar name="Skills" dataKey="A" stroke="#1976d2" fill="#1976d2" fillOpacity={0.6} />
              </RadarChart>
            </Box>
          </Box>
        </Box>
      </motion.div>
    </Element>
  );
};

export default AboutMe;