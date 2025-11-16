import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

const Navigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 250, pt: 2 }}>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component="a"
            href="https://swipeup-marketing.com/strategy-session"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleDrawerToggle}
          >
            <ListItemText primary="Strategy-Session buchen" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" elevation={0}>
        <Toolbar sx={{ maxWidth: '1280px', width: '100%', mx: 'auto', px: { xs: 2, sm: 3 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Box 
              component="a"
              href="/"
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                textDecoration: 'none',
                '&:hover': {
                  opacity: 0.8,
                }
              }}
            >
              <MusicNoteIcon sx={{ color: 'primary.main', mr: 1, fontSize: '2rem' }} />
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 700,
                  color: 'text.primary',
                  fontSize: '1.25rem',
                }}
              >
                Musikmarketing.de
              </Typography>
            </Box>
          </Box>

          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Button
                variant="contained"
                href="https://swipeup-marketing.com/strategy-session"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  px: 3,
                  py: 1,
                }}
              >
                Strategy-Session buchen
              </Button>
            </Box>
          )}

          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ color: 'text.primary' }}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navigation;
