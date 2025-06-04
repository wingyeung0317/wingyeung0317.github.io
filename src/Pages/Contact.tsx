import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Chip, Divider } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Element } from 'react-scroll';
import { motion } from 'framer-motion';

const Contact = () => {
  const contactMethods = [
    {
      icon: <PhoneIcon sx={{ color: 'primary.main', fontSize: 30 }} />,
      label: 'Phone',
      value: '+852 8481 1845',
      href: 'tel:+85284811845'
    },
    {
      icon: <EmailIcon sx={{ color: 'primary.main', fontSize: 30 }} />,
      label: 'Email',
      value: 'wingyeung0317@hotmail.com',
      href: 'mailto:wingyeung0317@hotmail.com'
    },
    {
      icon: <GitHubIcon sx={{ color: 'primary.main', fontSize: 30 }} />,
      label: 'GitHub',
      value: 'github.com/wingyeung0317',
      href: 'https://github.com/wingyeung0317'
    },
  ];

  return (
    <Element name="contact">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Divider sx={{ my: 6 }} />
        <Box sx={{ py: 8, bgcolor: 'background.default', textAlign: 'center'  }}>
          <Typography variant="h4" gutterBottom>🇭🇰 Contact 🇭🇰</Typography>
          
          <Typography variant="body1" textAlign="center" sx={{ mb: 6, maxWidth: 600, mx: 'auto', color: 'text.secondary' }}>
            I'm always open to discussing new opportunities, collaborations, or just having a chat about technology and engineering.
          </Typography>

          <Grid container spacing={3} justifyContent="center">
            {contactMethods.map((method, index) => (
              <Grid key={method.label} sx={{ xs: 12, sm: 6, md: 3 }}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card 
                    sx={{ 
                      height: '100%', 
                      textAlign: 'center', 
                      cursor: method.href ? 'pointer' : 'default',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': method.href ? { 
                        transform: 'translateY(-4px)', 
                        boxShadow: 4 
                      } : {}
                    }}
                    onClick={() => method.href && window.open(method.href, method.href.startsWith('http') ? '_blank' : '_self')}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ mb: 2 }}>
                        {method.icon}
                      </Box>
                      <Typography variant="h6" gutterBottom color="primary">
                        {method.label}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ wordBreak: 'break-word' }}>
                        {method.value}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </motion.div>
    </Element>
  );
};

export default Contact;