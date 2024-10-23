import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import './index.css'
import App from './App.tsx'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import createTheme from '@mui/material/styles/createTheme'
import { ThemeOptions } from '@mui/material/styles';

const customTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#005599',
    },
    secondary: {
      main: '#93051f',
    },
    warning: {
      main: '#f17007',
    },
    error: {
      main: '#ff0000',
    },
    info: {
      main: '#048bd4',
    },
    success: {
      main: '#2e7d32',
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <ThemeProvider theme={customTheme}>
<CssBaseline />
<App />
</ThemeProvider>
  </StrictMode>,
)
