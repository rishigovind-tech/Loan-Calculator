import React, { useContext, useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  FormControlLabel, 
  Switch,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from 'react-router-dom';
import ThemeContext from '../context/ThemeContext';

const Navbar = () => {
  const contextValue = useContext(ThemeContext);
  const location = useLocation();
  const currentPath = location.pathname;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  
 
  
  const { darkMode, setDarkMode } = contextValue;
  
  // Navigation items with their paths
  const navItems = [
    { title: 'HOME', path: '/' },
    { title: 'EXCHANGE RATES (LIVE)', path: '/exchange-rates' },
    { title: 'ABOUT', path: '/about' },
    { title: 'ERROR PAGE', path: '/404' }
  ];

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNavClick = () => {
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {isMobile ? (
          // Mobile view - with hamburger menu
          <>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Loan Calculator
            </Typography>
          </>
        ) : (
          // Desktop view - with regular buttons
          <>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Loan Calculator
            </Typography>
            
            {navItems.map((item) => (
              <Button 
                key={item.path}
                color="inherit" 
                component={Link} 
                to={item.path}
                sx={{
                  backgroundColor: currentPath === item.path ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                  '&:hover': {
                    backgroundColor: currentPath === item.path 
                      ? 'rgba(255, 255, 255, 0.3)' 
                      : 'rgba(255, 255, 255, 0.1)'
                  },
                  borderRadius: 1,
                  mx: 0.5
                }}
              >
                {item.title}
              </Button>
            ))}
          </>
        )}
        
        <FormControlLabel
          control={
            <Switch 
              checked={darkMode} 
              onChange={() => setDarkMode(!darkMode)} 
              sx={{ ml: 2 }}
            />
          }
          label=""
        />
      </Toolbar>

      {/* Mobile drawer/hamburger menu */}
      <Drawer
        anchor="left"
        open={isMobile && drawerOpen}
        onClose={toggleDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            width: 250,
            bgcolor: darkMode ? '#121212' : '#0277bd',
            color: 'white',
          }
        }}
      >
        <List>
          {navItems.map((item) => (
            <ListItem 
              button 
              component={Link} 
              to={item.path} 
              key={item.path}
              onClick={handleNavClick}
              sx={{
                bgcolor: currentPath === item.path 
                  ? darkMode 
                    ? 'rgba(255, 255, 255, 0.2)' 
                    : '#2196f3' 
                  : 'transparent',
                color: 'white',
                py: 1.5,
                '&:hover': {
                  bgcolor: darkMode
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(255, 255, 255, 0.2)'
                }
              }}
            >
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: 16,
                      fontWeight: currentPath === item.path ? 'bold' : 'normal'
                    }}
                  >
                    {item.title}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;