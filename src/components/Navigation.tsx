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
        <Toolbar sx={{ maxWidth: '1280px', width: '100%', mx: 'auto', px: { xs: 2, sm: 3 }, minHeight: '56px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Box 
              component="a"
              href="/"
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                textDecoration: 'none',
                '&:hover': {
                  opacity: 0.7,
                }
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 600,
                  color: '#ffffff',
                  fontSize: '1rem',
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
                      color: '#9e9e9e',
                      textTransform: 'none',
                      fontSize: '0.875rem',
                      fontWeight: 400,
                      px: 2,
                      cursor: 'pointer',
                      '&:hover': {
                        color: '#ffffff',
                        background: 'rgba(255, 255, 255, 0.05)',
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
                          background: '#000000',
                          border: '1px solid #2a2a2a',
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
                            color: '#9e9e9e',
                            fontSize: '0.875rem',
                            '&:hover': {
                              background: 'rgba(255, 255, 255, 0.05)',
                              color: '#ffffff',
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
