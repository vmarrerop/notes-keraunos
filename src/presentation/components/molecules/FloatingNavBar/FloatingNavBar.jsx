import { Box, Typography, Button, Container, Fade, Avatar, Chip } from '@mui/material';
import { Add as AddIcon, Person as PersonIcon, Cloud as CloudIcon } from '@mui/icons-material';

export const FloatingNavBar = ({ userName, onCreateTask, onNavigate }) => {
  return (
    <Fade in timeout={800}>
      <Box
        sx={{
          position: 'fixed',
          bottom: { xs: 16, md: 24 },
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          width: '100%',
          maxWidth: 'lg',
          px: { xs: 1.5, md: 2 },
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.95) 100%)',
            backdropFilter: 'blur(20px)',
            borderRadius: { xs: 3, md: 4 },
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            py: { xs: 1.5, md: 2 },
            px: { xs: 2, md: 3 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: { xs: 1.5, md: 3 },
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 24px 70px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.2)',
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 1.5 } }}>
            <Avatar
              src="/keranous.png"
              alt="Keraunos"
              sx={{
                width: { xs: 45, md: 55 },
                height: { xs: 45, md: 55 },
                bgcolor: 'transparent',
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '0.8rem', sm: '1.1rem' },
                color: '#f8fafc',
                whiteSpace: 'nowrap',
                display: { xs: 'none', sm: 'block' },
              }}
            >
              Gestor de Tareas Keraunos
            </Typography>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: '0.85rem',
                color: '#f8fafc',
                whiteSpace: 'nowrap',
                display: { xs: 'block', sm: 'none' },
              }}
            >
              Keraunos
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 1, md: 1.5 },
              flex: { xs: 1, sm: 0 },
              justifyContent: 'center',
            }}
          >
            <PersonIcon sx={{ fontSize: { xs: 18, md: 22 }, color: '#cbd5e1' }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                fontSize: { xs: '0.85rem', sm: '1rem', md: '1.15rem' },
                color: '#f8fafc',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: { xs: '100px', sm: '150px', md: '200px' },
              }}
            >
              {userName}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: { xs: 1, md: 1.5 }, alignItems: 'center' }}>
            <Chip
              icon={<CloudIcon />}
              label="API EXTERNA"
              onClick={() => onNavigate('weather')}
              sx={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
                color: 'white',
                fontWeight: 700,
                fontSize: { xs: '0.7rem', md: '0.75rem' },
                border: '2px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 0 20px rgba(245, 158, 11, 0.4)',
                cursor: 'pointer',
                transition: 'all 0.3s',
                '&:hover': {
                  background: 'linear-gradient(135deg, #fb923c 0%, #f59e0b 100%)',
                  transform: 'scale(1.05)',
                  boxShadow: '0 0 30px rgba(245, 158, 11, 0.6)',
                },
                '& .MuiChip-icon': {
                  color: 'white',
                  fontSize: { xs: 18, md: 20 },
                },
              }}
            />

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={onCreateTask}
              sx={{
                px: { xs: 2, md: 3 },
                py: { xs: 1, md: 1.25 },
                borderRadius: 2.5,
                textTransform: 'none',
                fontWeight: 600,
                fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.95rem' },
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.1) 100%)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
              whiteSpace: 'nowrap',
              minWidth: { xs: 'auto', sm: 'auto' },
              '&:hover': {
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.15) 100%)',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              },
              '& .MuiButton-startIcon': {
                display: { xs: 'none', sm: 'inherit' },
                mr: { sm: 0.5, md: 1 },
              },
            }}
          >
            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
              Crear Tarea
            </Box>
            <AddIcon sx={{ display: { xs: 'inline', sm: 'none' }, fontSize: 24 }} />
          </Button>
          </Box>
        </Container>
      </Box>
    </Fade>
  );
};
