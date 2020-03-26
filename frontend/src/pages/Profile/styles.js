import styled from 'styled-components';

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
      padding: 24px;
      border-radius: 8px;
      position: relative;

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
