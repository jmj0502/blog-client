import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';


//Theme overriding and color definitions. This doesn't kill the overall theme, but add custom things to it.
const theme = extendTheme({
  colors: {
    brand: {
      100: '#F6F6F6',
      500: '#D3CCCC',
      900: '#878484',
      1000: '#878484'
    },
    submit: {
      300: '#37FACB'
    }
  },
  style: {
    body: {
      bg: 'brand.100'
    }
  },
  components: {
    Link: {
      baseStyle: {
        _focus: {
          boxShadow: 'none' 
        }
      }
    },
    Button: {
      baseStyle: {
        _focus: {
          boxShadow: 'none'
        }
      }
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
