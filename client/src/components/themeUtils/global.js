import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`

  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  
  } 
  
  .fs-4 {
    color: ${({ theme }) => theme.text};
  }
  
  .nav-link {
    color: ${({ theme }) => theme.text};
    cursor: pointer;
  }
  .card {
    color: ${({ theme }) => theme.text};
    background: ${({ theme }) => theme.body};
    border: 1px solid #f5f5f5;
  }
  .btn  {
    color: ${({ theme }) => theme.text};
    border-color: ${({ theme }) => theme.text};
  }
  .gray-bg {
    background-color: ${({ theme }) => theme.body};
  }
  .about-list label {
    color: ${({ theme }) => theme.profileText};
  }
  .dark-color {
    color: ${({ theme }) => theme.profileText};
  }
  .about-list label:after {
    background: ${({ theme }) => theme.profileText};
  }
  .m-0px{
    color: black;
  }
  .about-section .counter {
    background: ${({ theme }) => theme.counterBG};
  }
  .table {
    color: ${({ theme }) => theme.text};
  }
`