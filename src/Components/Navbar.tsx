import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Avatar, IconButton, Menu, MenuItem, useMediaQuery } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link } from 'react-scroll';
import avatarImg from '../assets/avatar.png'; 

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isSmallScreen = useMediaQuery('(max-width:750px)');
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = ['About Me', 'Competencies', 'Projects', 'Career Goal', 'Contact'];

  return (
    <AppBar 
      position="fixed" 
      color="primary" 
      sx={{ 
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)', 
        background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
      }}
    >
      <Toolbar>
        <Avatar src={avatarImg} alt="Avatar" style={{ borderRadius: '50%', marginRight: '16px' }} />
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>Yeung Wing</Typography>
        
        {isSmallScreen ? (
          <>
            <IconButton
              color="inherit"
              aria-label="menu"
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              {menuItems.map((text) => (
                <MenuItem key={text} onClick={handleClose}>
                  <Link
                    to={text.toLowerCase().replace(' ', '-')}
                    smooth={true}
                    duration={500}
                    offset={-64}
                    style={{ color: 'inherit', cursor: 'pointer', textDecoration: 'none' }}
                  >
                    {text}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          <Box>
            {menuItems.map((text) => (
              <Link
                key={text}
                to={text.toLowerCase().replace(' ', '-')}
                smooth={true}
                duration={500}
                offset={-64}
                style={{ margin: '0 16px', color: 'white', cursor: 'pointer', textDecoration: 'none' }}
              >
                {text}
              </Link>
            ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;