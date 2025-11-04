import { Paper, Box, Typography, LinearProgress, Stack, Grid, alpha } from '@mui/material';
import {
  PendingActions as PendingIcon,
  PlayCircle as InProgressIcon,
  CheckCircle as CompletedIcon,
  TrendingUp as TrendingIcon,
} from '@mui/icons-material';

export const TaskStats = ({ stats }) => {
  const { total, pending, inProgress, completed } = stats;
  const completionRate = total > 0 ? (completed / total) * 100 : 0;

  const statCards = [
    {
      label: 'Pendientes',
      value: pending,
      icon: PendingIcon,
      color: '#f59e0b',
      bgColor: alpha('#f59e0b', 0.1),
    },
    {
      label: 'En Progreso',
      value: inProgress,
      icon: InProgressIcon,
      color: '#3b82f6',
      bgColor: alpha('#3b82f6', 0.1),
    },
    {
      label: 'Completadas',
      value: completed,
      icon: CompletedIcon,
      color: '#10b981',
      bgColor: alpha('#10b981', 0.1),
    },
  ];

  return (
    <Box
      sx={{
        mb: { xs: 2, md: 4 },
        px: { xs: 0.5, sm: 0 },
        maxWidth: { xs: 360, md: '100%' },
        mx: 'auto',
      }}
    >
      <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }} justifyContent="center">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Grid item xs={6} md={3} key={stat.label} sx={{ display: 'flex' }}>
              <Paper
                elevation={0}
                sx={{
                  width: '100%',
                  height: '100%',
                  p: { xs: 2, md: 3 },
                  background: alpha('#1e293b', 0.6),
                  backdropFilter: 'blur(20px)',
                  border: '1px solid',
                  borderColor: alpha('#94a3b8', 0.1),
                  borderRadius: { xs: 2, md: 3 },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    borderColor: stat.color,
                    transform: 'translateY(-4px)',
                    boxShadow: `0 12px 24px ${alpha(stat.color, 0.2)}`,
                  },
                }}
              >
                <Stack direction="row" alignItems="center" spacing={{ xs: 1.5, md: 2 }}>
                  <Box
                    sx={{
                      p: { xs: 1, md: 1.5 },
                      borderRadius: 2,
                      bgcolor: stat.bgColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon sx={{ fontSize: { xs: 22, md: 28 }, color: stat.color }} />
                  </Box>
                  <Box flex={1}>
                    <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontSize: { xs: '0.7rem', md: '0.75rem' } }}>
                      {stat.label}
                    </Typography>
                    <Typography variant="h2" fontWeight={700} sx={{ fontSize: { xs: '1.5rem', md: '1.75rem' } }}>
                      {stat.value}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          );
        })}

        <Grid item xs={12} md={3} sx={{ display: 'flex' }}>
          <Paper
            elevation={0}
            sx={{
              width: '100%',
              height: '100%',
              p: { xs: 2, md: 3 },
              background: alpha('#1e293b', 0.6),
              backdropFilter: 'blur(20px)',
              border: '1px solid',
              borderColor: alpha('#94a3b8', 0.1),
              borderRadius: { xs: 2, md: 3 },
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                borderColor: '#3b82f6',
                transform: 'translateY(-4px)',
                boxShadow: `0 12px 24px ${alpha('#3b82f6', 0.2)}`,
              },
            }}
          >
            <Stack direction="row" alignItems="center" spacing={{ xs: 1.5, md: 2 }}>
              <Box
                sx={{
                  p: { xs: 1, md: 1.5 },
                  borderRadius: 2,
                  bgcolor: alpha('#3b82f6', 0.1),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <TrendingIcon sx={{ fontSize: { xs: 22, md: 28 }, color: '#3b82f6' }} />
              </Box>
              <Box flex={1}>
                <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontSize: { xs: '0.7rem', md: '0.75rem' } }}>
                  Progreso
                </Typography>
                <Typography variant="h2" fontWeight={700} sx={{ fontSize: { xs: '1.5rem', md: '1.75rem' } }}>
                  {completionRate.toFixed(0)}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={completionRate}
                  sx={{
                    mt: { xs: 1, md: 1.5 },
                    height: { xs: 4, md: 6 },
                    borderRadius: 3,
                    bgcolor: alpha('#3b82f6', 0.1),
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 3,
                      background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
                    },
                  }}
                />
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

