import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  width: 100%;
  max-width: 1180px;
  padding: 0 30px;
  margin: 32px auto;

  h1 {
    margin-top: 80px;
    margin-bottom: 24px;
  }

  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 24px;
    list-style: none;

    li {
      background: #fff;
      border: 1px solid #fff;
      padding: 24px;
      border-radius: 8px;
      position: relative;
      transition: border 0.2s, box-shadow 0.2s;

      &:hover {
        border-color: ${lighten(0.1, '#e02041')};
        box-shadow: 0 0 4px ${lighten(0.1, '#e02041')};
      }

      button {
        position: absolute;
        right: 24px;
        top: 24px;
        border: 0;
        transition: opacity 0.2s;

        &:hover {
          filter: brightness(80%);
        }
      }

      strong {
        display: block;
        margin-bottom: 16px;
        color: #41414d;
      }
      p {
        color: #737380;
        line-height: 21px;
        font-size: 16px;
      }

      p + strong {
        margin-top: 32px;
      }
    }
  }
`;
export const PageActions = styled.div`
  padding-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  button {
    transition: opacity 0.25s ease-out;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 700;
    outline: 0;
    border: 0;
    padding: 8px;
    color: #41414d;
    background: #fff;
    &:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }

    &:hover {
      color: #e02041;
    }
  }

  span {
    color: #41414d;
    font-weight: 700;
    font-size: 14px;
  }
`;
