import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Fade,
  Backdrop,
} from '@mui/material';
import { Person as PersonIcon, Rocket as RocketIcon } from '@mui/icons-material';

export const WelcomeModal = ({ open, onSave }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onSave(name.trim());
    }
  };

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Fade}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        sx: {
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(15, 23, 42, 0.9)',
        },
      }}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 4,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        },
      }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ textAlign: 'center', pt: 4, pb: 2 }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
              mb: 2,
              boxShadow: '0 8px 32px rgba(255, 255, 255, 0.1)',
            }}
          >
            <RocketIcon sx={{ fontSize: 40, color: '#0f172a' }} />
          </Box>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1,
            }}
          >
            ¡Bienvenido a Keraunos!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Para comenzar, cuéntanos tu nombre
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ px: 4, pb: 2 }}>
          <TextField
            autoFocus
            fullWidth
            label="Tu nombre"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej: María García"
            InputProps={{
              startAdornment: (
                <PersonIcon sx={{ color: 'text.secondary', mr: 1, fontSize: 20 }} />
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                },
              },
            }}
          />
        </DialogContent>

        <DialogActions sx={{ px: 4, pb: 4, justifyContent: 'center' }}>
          <Button
            type="submit"
            variant="contained"
            disabled={!name.trim()}
            sx={{
              px: 6,
              py: 1.5,
              borderRadius: 2,
              fontSize: '1rem',
              fontWeight: 600,
              textTransform: 'none',
              background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
              color: '#0f172a',
              boxShadow: '0 4px 12px rgba(255, 255, 255, 0.2)',
              '&:hover': {
                background: 'linear-gradient(135deg, #f8fafc 0%, #cbd5e1 100%)',
                boxShadow: '0 6px 20px rgba(255, 255, 255, 0.3)',
              },
              '&:disabled': {
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'rgba(255, 255, 255, 0.3)',
              },
            }}
          >
            Comenzar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
