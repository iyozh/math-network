import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`

  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  
  } 
  
  .fs-4 {
    color: ${({ theme }) => theme.bootstrapText};
  }
  
  .nav-link {
    color: ${({ theme }) => theme.bootstrapText};
    cursor: pointer;
  }
  .card {
    color: ${({ theme }) => theme.bootstrapText};
    background: ${({ theme }) => theme.body};
    border: 1px solid #f5f5f5;
  }
  .btn  {
    color: ${({ theme }) => theme.bootstrapText};
    border-color: ${({ theme }) => theme.bootstrapText};
}
  
`