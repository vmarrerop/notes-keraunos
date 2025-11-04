import { Fab, Tooltip } from '@mui/material';
import { Cloud as CloudIcon } from '@mui/icons-material';

export const ApiFloatingButton = ({ onNavigate }) => {
  return (
    <Tooltip title="Ver API del Clima" placement="left">
      <Fab
        onClick={() => onNavigate('weather')}
        sx={{
          position: 'fixed',
          right: { xs: 16, md: 24 },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1000,
          background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
          color: 'white',
          width: { xs: 56, md: 64 },
          height: { xs: 56, md: 64 },
          boxShadow: '0 0 20px rgba(245, 158, 11, 0.4), 0 8px 16px rgba(0, 0, 0, 0.3)',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            background: 'linear-gradient(135deg, #fb923c 0%, #f59e0b 100%)',
            transform: 'translateY(-50%) scale(1.1)',
            boxShadow: '0 0 30px rgba(245, 158, 11, 0.6), 0 12px 24px rgba(0, 0, 0, 0.4)',
          },
        }}
      >
        <CloudIcon sx={{ fontSize: { xs: 28, md: 32 } }} />
      </Fab>
    </Tooltip>
  );
};
