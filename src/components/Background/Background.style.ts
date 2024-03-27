import styled from 'styled-components';

export const BackgroundImage = styled.div`
  position: fixed;
  width: 110vw;
  height: 110vh;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  z-index: -1;
  filter: blur(20px);
  transform: scale(1.1);

  @supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none)) {
    filter: none;
    transform: none;
  }
`;

export const BackgroundOverlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(46, 16, 16, 0.3);

  @supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none)) {
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }
`;
