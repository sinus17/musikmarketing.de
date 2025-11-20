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
  Menu,
  MenuItem,
} from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon, KeyboardArrowDown } from '@mui/icons-material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

const Navigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [leitfaedenAnchor, setLeitfaedenAnchor] = useState<null | HTMLElement>(null);
  const [agenturAnchor, setAgenturAnchor] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { 
      label: 'Leitfäden', 
      hasDropdown: true,
      subItems: [
        { label: 'Instagram Marketing für Musiker', href: '/instagram-marketing-musiker' },
        { label: 'Ultimativer Leitfaden', href: '/ultimativer-leitfaden' },
        { label: 'Marketing Handbuch', href: '/marketing-handbuch-fuer-artists' },
        { label: 'Ads schalten lernen', href: '/ads-schalten-lernen' },
      ]
    },
    { 
      label: 'Agentur',
      hasDropdown: true,
      subItems: [
        { label: 'Musikmarketing Agentur', href: '/musikmarketing-agentur' },
        { label: 'Strategy-Session buchen', href: 'https://swipeup-marketing.com/strategy-session', external: true },
        { label: 'Kostenlose Analyse', href: 'https://swipeup-marketing.com/analyse', external: true },
      ]
    },
    { label: 'Blog', href: '/blog', hasDropdown: false },
  ];

  const drawer = (
    <Box sx={{ width: 250, pt: 2 }}>
      <List>
        {menuItems.map((item) => (
          <Box key={item.label}>
            {item.hasDropdown ? (
              <>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
                {item.subItems?.map((subItem) => (
                  <ListItem key={subItem.label} disablePadding sx={{ pl: 2 }}>
                    <ListItemButton
                      component="a"
                      href={subItem.href}
                      target={subItem.external ? "_blank" : undefined}
                      rel={subItem.external ? "noopener noreferrer" : undefined}
                      onClick={handleDrawerToggle}
                    >
                      <ListItemText 
                        primary={subItem.label} 
                        primaryTypographyProps={{ fontSize: '0.9rem' }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </>
            ) : (
              <ListItem disablePadding>
                <ListItemButton
                  component="a"
                  href={item.href}
                  onClick={handleDrawerToggle}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            )}
          </Box>
        ))}
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
                musikmarketing.de
              </Typography>
            </Box>
          </Box>

          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {menuItems.map((item) => (
                <Box 
                  key={item.label}
                  sx={{ position: 'relative' }}
                  onMouseEnter={(e) => {
                    if (item.hasDropdown) {
                      if (item.label === 'Leitfäden') setLeitfaedenAnchor(e.currentTarget);
                      if (item.label === 'Agentur') setAgenturAnchor(e.currentTarget);
                    }
                  }}
                  onMouseLeave={() => {
                    if (item.label === 'Leitfäden') setLeitfaedenAnchor(null);
                    if (item.label === 'Agentur') setAgenturAnchor(null);
                  }}
                >
                  <Button
                    component={item.hasDropdown ? "div" : "a"}
                    href={!item.hasDropdown ? item.href : undefined}
                    sx={{
                      color: 'text.primary',
                      textTransform: 'none',
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      px: 2,
                      cursor: 'pointer',
                      '&:hover': {
                        background: 'rgba(144, 221, 240, 0.1)',
                      }
                    }}
                  >
                    {item.label}
                    {item.hasDropdown && <KeyboardArrowDown sx={{ ml: 0.5, fontSize: '1.2rem' }} />}
                  </Button>
                  
                  {item.hasDropdown && (
                    <Menu
                      anchorEl={item.label === 'Leitfäden' ? leitfaedenAnchor : agenturAnchor}
                      open={Boolean(item.label === 'Leitfäden' ? leitfaedenAnchor : agenturAnchor)}
                      onClose={() => {
                        if (item.label === 'Leitfäden') setLeitfaedenAnchor(null);
                        if (item.label === 'Agentur') setAgenturAnchor(null);
                      }}
                      MenuListProps={{
                        onMouseLeave: () => {
                          if (item.label === 'Leitfäden') setLeitfaedenAnchor(null);
                          if (item.label === 'Agentur') setAgenturAnchor(null);
                        }
                      }}
                      sx={{
                        '& .MuiPaper-root': {
                          mt: 1,
                          minWidth: 220,
                          background: 'rgba(10, 9, 12, 0.95)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(144, 221, 240, 0.2)',
                        }
                      }}
                    >
                      {item.subItems?.map((subItem) => (
                        <MenuItem
                          key={subItem.label}
                          component="a"
                          href={subItem.href}
                          target={subItem.external ? "_blank" : undefined}
                          rel={subItem.external ? "noopener noreferrer" : undefined}
                          onClick={() => {
                            if (item.label === 'Leitfäden') setLeitfaedenAnchor(null);
                            if (item.label === 'Agentur') setAgenturAnchor(null);
                          }}
                          sx={{
                            color: 'text.secondary',
                            fontSize: '0.9rem',
                            '&:hover': {
                              background: 'rgba(144, 221, 240, 0.1)',
                              color: 'primary.light',
                            }
                          }}
                        >
                          {subItem.label}
                        </MenuItem>
                      ))}
                    </Menu>
                  )}
                </Box>
              ))}
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
