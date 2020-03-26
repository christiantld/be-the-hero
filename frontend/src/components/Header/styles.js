import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  background: #f0f0f5;
  padding: 0 30px;

  header {
    height: 65px;
    max-width: 1020px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    nav {
      display: flex;
      align-items: center;
      span {
        font-size: 20px;
      }
      img {
        height: 60px;
        margin-right: 20px;
        padding-right: 20px;
        border-right: 1px solid #737373;
      }
    }
    aside {
      display: flex;
      align-items: baseline;
      height: 45px;

      a {
        margin-top: 0;
      }

      button {
        height: 45px;
        width: 60px;
        align-content: center;
        border-radius: 8px;
        border: 1px solid #dcdce6;
        background: transparent;
        display: inline-block;
        text-align: center;
        margin-left: 16px;
        transition: border-color 0.2s;

        &:hover {
          border-color: #aaa;
        }
      }
    }
  }
`;
