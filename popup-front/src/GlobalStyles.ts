import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  
  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  
  ::-webkit-scrollbar-thumb {
    background-color: #1b1b1b;
    border-radius: 1px;
  }
  
  scrollbar-width: thin;
  scrollbar-color: #1b1b1b transparent;
`
