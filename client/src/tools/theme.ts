import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#F0FFF4',
        color: 'rgb(74, 85, 104)', 
        margin: 0,
        padding: 0,  
      },
      h1: {
        fontFamily: "'Bona Nova SC', cursive",
        fontWeight: 'bold',
      },
      h2: {
        fontFamily: "'Bona Nova SC', cursive",
        fontWeight: 'bold',
      },
      h3: {
        fontFamily: "'Bona Nova SC', cursive",
        fontWeight: 'bold',
      },
      h4: {
        fontFamily: "'Bona Nova SC', cursive",
        fontWeight: 'bold',
      },
      h5: {
        fontFamily: "'Bona Nova SC', cursive",
        fontWeight: 'bold',
      },
      h6: {
        fontFamily: "'Bona Nova SC', cursive",
        fontWeight: 'bold',
      },
      
      a: {
        color: '#f8f9fb',
        _hover: {
          textDecoration: 'underline',
        },
      },

   
    },
  },
});

export default theme;

