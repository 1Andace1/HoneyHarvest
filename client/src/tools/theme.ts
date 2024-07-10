import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        // bg: '#1e1f23', // !!! ВОт этот серый цвет влиял на все все все
        bg: '#ffffff',
        color: '#f8f9fb',   
      },
      a: {
        color: '#f8f9fb',
        _hover: {
          textDecoration: 'underline',
        },
      },
      h1: {
        color: '#f8f9fb',
      },
      h2: {
        color: '#f8f9fb',
      },
   
    },
  },
});

export default theme;

