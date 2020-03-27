import { createGlobalStyle } from 'styled-components';
import { lighten } from 'polished';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap');
  * {
     margin: 0;
     padding: 0;
     outline: 0;
     box-sizing: border-box;
   }
   *:focus {
     outline: 0;
   }
   html, body, #root {
     height: 100%
   }
   body {
     -webkit-font-smoothing: antialiased;
     background: #f0f0f5;
     font: 400 14px 'Roboto', sans-serif
   }
   textarea, input, button {
     font: 400 18px 'Roboto', sans-serif
   }
   a {
     text-decoration: none;
     color: #000
   }
   ul {
     list-style: none;
   }
  button {
    cursor: pointer;
    background: none;
    border: 0;
  }

  form input {
    width: 100%;
    height: 45px;
    color: #333;
    border: 1px solid #dcdce6;
    border-radius: 8px;
    padding: 0 24px;
    transition: border 0.2s;

    &:focus {
      border: 1px solid ${lighten(0.1, '#e02041')};
        box-shadow: 0 0 4px ${lighten(0.1, '#e02041')};

    }
  }
  form textarea {
    width: 100%;
    resize: vertical;
    min-height: 140px;
    max-height: 450px;
    height: 45px;
    color: #333;
    border: 1px solid #dcdce6;
    border-radius: 8px;
    padding: 16px 24px;
    line-height: 24px;

    &:focus {
      border: 1px solid ${lighten(0.1, '#e02041')};
        box-shadow: 0 0 4px ${lighten(0.1, '#e02041')};
    }
  }

  .button {
    width: 100%;
    height: 45px;
    background: #e02041;
    padding: 0 7px;
    border: 0;
    border-radius: 8px;
    color: #f0f0f5;
    font-weight: 700;
    margin-top: 16px;
    display: inline-block;
    text-align: center;
    text-decoration: none;
    line-height: 45px;
    transition: filter 0.2s;

    &:hover {
      filter: brightness(85%)
    }
  }
  .back-link {
      display: flex;
      align-items: center;
      margin-top: 40px;
      color: #41414d;
      font-size: 18px;
      transition: opacity 0.2s;

      &:hover {
        opacity: 0.8;
      }

      svg {
        margin-right: 8px;
      }
    }

`;
