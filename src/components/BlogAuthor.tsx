import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

interface BlogAuthorProps {
  date: string;
  readTime: string;
}

export default function BlogAuthor({ date, readTime }: BlogAuthorProps) {
  return (
    <Box 
      component={motion.div}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 3 }}
    >
      <Box
        component="img"
        src="https://media.licdn.com/dms/image/v2/D4D03AQHpkNUj8UblgQ/profile-displayphoto-shrink_800_800/B4DZp6_qTiJAAc-/0/1763000100991?e=1764806400&v=beta&t=bGIVfwBW8m8sV6P5MDiVtHbJ9N4hfER1KRh5qhQBNBY"
        alt="Philipp Lützenburger"
        sx={{
          width: { xs: 40, md: 48 },
          height: { xs: 40, md: 48 },
          borderRadius: '50%',
          border: '2px solid #90ddf0',
          objectFit: 'cover',
        }}
      />
      <Box>
        <Typography 
          variant="body1" 
          sx={{ 
            color: 'white', 
            fontWeight: 600, 
            fontSize: { xs: '0.95rem', md: '1rem' },
            lineHeight: 1.3
          }}
        >
          Philipp Lützenburger
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            fontSize: { xs: '0.875rem', md: '0.95rem' },
            lineHeight: 1.3
          }}
        >
          {date} • {readTime}
        </Typography>
      </Box>
    </Box>
  );
}
