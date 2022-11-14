import styled from 'styled-components';

export const Won = styled.div`
  display: flex;
  flex-flow: column;
  position: fixed;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(6px);
  align-items: center;
  padding-top: 5rem;

  h1,
  h2,
  h3 {
    color: black;
    text-shadow: 0 0 2px white;
  }

  & > * + * {
    margin-top: 1rem;
  }
`;
