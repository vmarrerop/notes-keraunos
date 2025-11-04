import { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Alert,
  CircularProgress,
  Paper,
} from '@mui/material';
import {
  Search as SearchIcon,
  Cloud as CloudIcon,
  Water as WaterIcon,
  Air as AirIcon,
  Visibility as VisibilityIcon,
  Speed as SpeedIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { weatherUseCases } from '../../../config/dependencies';

export const WeatherPage = ({ onNavigate }) => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city.trim()) {
      setError('Por favor ingresa el nombre de una ciudad');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const [weather, forecastData] = await Promise.all([
        weatherUseCases.getWeather.execute(city),
        weatherUseCases.getForecast.execute(city),
      ]);
      setWeatherData(weather);
      setForecast(forecastData);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (icon) => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'transparent', py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            ⚡ Meteorología Keraunos
          </Typography>
          <Button
            variant="outlined"
            startIcon={<HomeIcon />}
            onClick={() => onNavigate('tasks')}
            sx={{
              borderColor: 'primary.main',
              color: 'primary.main',
              '&:hover': {
                borderColor: 'primary.light',
                bgcolor: 'rgba(59, 130, 246, 0.1)',
              },
            }}
          >
            Tareas
          </Button>
        </Box>

        <Paper
          component="form"
          onSubmit={handleSearch}
          sx={{
            p: 3,
            mb: 4,
            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.95) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Buscar ciudad... (ej: Madrid, London, Tokyo)"
              variant="outlined"
              disabled={loading}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <SearchIcon />}
              sx={{
                minWidth: 120,
                bgcolor: 'primary.main',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              }}
            >
              {loading ? 'Buscando...' : 'Buscar'}
            </Button>
          </Box>
        </Paper>

        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        {weatherData && (
          <>
            <Card
              sx={{
                mb: 4,
                background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.95) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Box>
                    <Typography variant="h3" sx={{ fontWeight: 700, color: 'white', mb: 1 }}>
                      {weatherData.city}, {weatherData.country}
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                      {weatherData.description}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <img src={getWeatherIcon(weatherData.icon)} alt={weatherData.description} width={100} />
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 4 }}>
                  <Typography variant="h1" sx={{ fontWeight: 700, color: 'primary.main', mr: 2 }}>
                    {weatherData.temperature}°C
                  </Typography>
                  <Typography variant="h5" sx={{ color: 'text.secondary' }}>
                    Sensación térmica: {weatherData.feelsLike}°C
                  </Typography>
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <WaterIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Humedad
                        </Typography>
                        <Typography variant="h6" color="white">
                          {weatherData.humidity}%
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <AirIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Viento
                        </Typography>
                        <Typography variant="h6" color="white">
                          {weatherData.windSpeed} m/s
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <SpeedIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Presión
                        </Typography>
                        <Typography variant="h6" color="white">
                          {weatherData.pressure} hPa
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <VisibilityIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Visibilidad
                        </Typography>
                        <Typography variant="h6" color="white">
                          {weatherData.visibility} km
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {forecast && (
              <Card
                sx={{
                  background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.95) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'white', mb: 3 }}>
                    Pronóstico próximas 24 horas
                  </Typography>
                  <Grid container spacing={2}>
                    {forecast.forecasts.map((item, index) => (
                      <Grid item xs={6} sm={4} md={3} key={index}>
                        <Paper
                          sx={{
                            p: 2,
                            textAlign: 'center',
                            background: 'rgba(15, 23, 42, 0.6)',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                          }}
                        >
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            {item.time.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                          </Typography>
                          <img src={getWeatherIcon(item.icon)} alt={item.description} width={60} />
                          <Typography variant="h6" color="primary.main" gutterBottom>
                            {item.temperature}°C
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                            {item.description}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {!weatherData && !error && !loading && (
          <Paper
            sx={{
              p: 8,
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.95) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <CloudIcon sx={{ fontSize: 100, color: 'text.secondary', mb: 3, opacity: 0.3 }} />
            <Typography variant="h4" color="text.secondary" gutterBottom>
              Busca el clima de cualquier ciudad
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Ingresa el nombre de una ciudad para ver el clima actual y el pronóstico
            </Typography>
          </Paper>
        )}
      </Container>
    </Box>
  );
};
