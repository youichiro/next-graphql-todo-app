import { teal, orange, red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: teal.A700,
    },
    secondary: {
      main: orange.A700,
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
