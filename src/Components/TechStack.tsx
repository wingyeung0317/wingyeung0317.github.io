import React from 'react';
import { Box, Typography, Grid, Stack } from '@mui/material';

const techStack = [
  {
    title: 'Microcontroller',
    items: [
      { alt: 'ESP32', src: 'https://img.shields.io/badge/ESP32-%23009297.svg?style=plastic&logo=Arduino&logoColor=white' },
      { alt: 'Raspberry Pi', src: 'https://img.shields.io/badge/-RaspberryPi-C51A4A?style=plastic&logo=Raspberry-Pi' },
      { alt: 'Arduino', src: 'https://img.shields.io/badge/Arduino-%23009297.svg?style=plastic&logo=Arduino&logoColor=white' },
    ],
  },
  {
    title: 'Front-End',
    items: [
      { alt: 'HTML5', src: 'https://img.shields.io/badge/html5-%23E34F26.svg?style=plastic&logo=html5&logoColor=white' },
      { alt: 'CSS3', src: 'https://img.shields.io/badge/css3-%231572B6.svg?style=plastic&logo=css3&logoColor=white' },
      { alt: 'JavaScript', src: 'https://img.shields.io/badge/javascript-%23323330.svg?style=plastic&logo=javascript&logoColor=%23F7DF1E' },
      { alt: 'jQuery', src: 'https://img.shields.io/badge/jquery-%230769AD.svg?style=plastic&logo=jquery&logoColor=white' },
      { alt: 'React', src: 'https://img.shields.io/badge/react-%2320232a.svg?style=plastic&logo=react&logoColor=%2361DAFB' },
      { alt: 'Flutter', src: 'https://img.shields.io/badge/flutter-black?style=plastic&logo=flutter&logoColor=42d2fd&labelColor=02579d&color=42d2fd' },
    ],
  },
  {
    title: 'Back-end',
    items: [
      { alt: 'Python', src: 'https://img.shields.io/badge/python-3670A0?style=plastic&logo=python&logoColor=ffdd54' },
      { alt: 'Kotlin', src: 'https://img.shields.io/badge/kotlin-%237F52FF.svg?style=plastic&logo=kotlin&logoColor=white' },
      { alt: 'Dart', src: 'https://img.shields.io/badge/dart-%230175C2.svg?style=plastic&logo=dart&logoColor=white' },
      { alt: 'Swift', src: 'https://img.shields.io/badge/swift-F54A2A?style=plastic&logo=swift&logoColor=white' },
      { alt: 'Java', src: 'https://img.shields.io/badge/java-%23ED8B00.svg?style=plastic&logo=openjdk&logoColor=white' },
      { alt: 'C++', src: 'https://img.shields.io/badge/c++-%2300599C.svg?style=plastic&logo=c%2B%2B&logoColor=white' },
      { alt: 'Objective-C', src: 'https://img.shields.io/badge/OBJECTIVE--C-%233A95E3.svg?style=plastic&logo=apple&logoColor=white' },
      { alt: 'PHP', src: 'https://img.shields.io/badge/php-%73777BB4.svg?style=plastic&logo=php&logoColor=white' },
    ],
  },
  {
    title: 'Cloud',
    items: [
      { alt: 'Docker', src: 'https://img.shields.io/badge/docker-%230db7ed.svg?style=plastic&logo=docker&logoColor=white' },
      { alt: 'AWS', src: 'https://img.shields.io/badge/AWS-%23FF9900.svg?style=plastic&logo=amazon-aws&logoColor=white' },
      { alt: 'Azure', src: 'https://img.shields.io/badge/azure-%230072C6.svg?style=plastic&logo=microsoftazure&logoColor=white' },
      { alt: 'Cloudflare', src: 'https://img.shields.io/badge/Cloudflare-F38020?style=plastic&logo=Cloudflare&logoColor=white' },
      { alt: 'Google Cloud', src: 'https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=plastic&logo=google-cloud&logoColor=white' },
      { alt: 'GithubPages', src: 'https://img.shields.io/badge/github%20pages-121013?style=plastic&logo=github&logoColor=white' },
      { alt: 'Netlify', src: 'https://img.shields.io/badge/netlify-%23000000.svg?style=plastic&logo=netlify&logoColor=#00C7B7' },
    ],
  },
  {
    title: 'Library',
    items: [
      { alt: 'Anaconda', src: 'https://img.shields.io/badge/Anaconda-%2344A833.svg?style=plastic&logo=anaconda&logoColor=white' },
      { alt: 'Flask', src: 'https://img.shields.io/badge/flask-%23000.svg?style=plastic&logo=flask&logoColor=white' },
      { alt: 'Pandas', src: 'https://img.shields.io/badge/pandas-%23150458.svg?style=plastic&logo=pandas&logoColor=white' },
      { alt: 'NumPy', src: 'https://img.shields.io/badge/numpy-%23013243.svg?style=plastic&logo=numpy&logoColor=white' },
      { alt: 'Matplotlib', src: 'https://img.shields.io/badge/Matplotlib-%23ffffff.svg?style=plastic&logo=Matplotlib&logoColor=black' },
    ],
  },
  {
    title: 'Database',
    items: [
      { alt: 'Postgres', src: 'https://img.shields.io/badge/postgres-%23316192.svg?style=plastic&logo=postgresql&logoColor=white' },
      { alt: 'MicrosoftSQLServer', src: 'https://img.shields.io/badge/Microsoft%20SQL%20Server-CC2927?style=plastic&logo=microsoft%20sql%20server&logoColor=white' },
      { alt: 'Firebase', src: 'https://img.shields.io/badge/Firebase-039BE5?style=plastic&logo=Firebase&logoColor=white' },
    ],
  },
  {
    title: 'Other',
    items: [
      { alt: 'Cisco', src: 'https://img.shields.io/badge/CISCO-%23049fd9.svg?style=plastic&logo=cisco&logoColor=black' },
      { alt: 'After Effects', src: 'https://img.shields.io/badge/After%20Effects-9999FF.svg?style=plastic&logo=Adobe%20After%20Effects&logoColor=white' },
      { alt: 'Illustrator', src: 'https://img.shields.io/badge/Illustrator-%23FF9A00.svg?style=plastic&logo=adobe%20illustrator&logoColor=white' },
      { alt: 'Lightroom', src: 'https://img.shields.io/badge/Lightroom-31A8FF.svg?style=plastic&logo=Adobe%20Lightroom%20Classic&logoColor=white' },
      { alt: 'Photoshop', src: 'https://img.shields.io/badge/Photoshop-%2331A8FF.svg?style=plastic&logo=adobe%20photoshop&logoColor=white' },
      { alt: 'Premiere Pro', src: 'https://img.shields.io/badge/Premiere%20Pro-9999FF.svg?style=plastic&logo=Adobe%20Premiere%20Pro&logoColor=white' },
      { alt: 'Power Bi', src: 'https://img.shields.io/badge/power_bi-F2C811?style=plastic&logo=powerbi&logoColor=black' },
      { alt: 'Postman', src: 'https://img.shields.io/badge/Postman-FF6C37?style=plastic&logo=postman&logoColor=white' },
      { alt: 'Blender', src: 'https://img.shields.io/badge/blender-%23F5792A.svg?style=plastic&logo=blender&logoColor=white' },
      { alt: 'Markdown', src: 'https://img.shields.io/badge/markdown-%23000000.svg?style=plastic&logo=markdown&logoColor=white' },
    ],
  },
];

const TechStack = () => (
  <Box sx={{ py: 6 }}>
    <Typography variant="h6" align="center" gutterBottom>💻 Tech Stack</Typography>
    <Grid container spacing={4}>
      {techStack.map((group) => (
        <Stack key={group.title} sx={{ width: '100%' }} spacing={2} alignItems="center">
          <Typography variant="body1" gutterBottom>{group.title}</Typography>
          <Box sx={{ display: 'block', gap: 1, mb: 2, textAlign: 'center' }}>
            {group.items.map((item) => (
              <img
                key={item.alt}
                src={item.src}
                alt={item.alt}
                style={{ height: 22, marginRight: 8, marginBottom: 8 }}
              />
            ))}
          </Box>
        </Stack>
      ))}
    </Grid>
  </Box>
);

export default TechStack;