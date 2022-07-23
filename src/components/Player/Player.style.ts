import styled from 'styled-components';

import { assets } from '../../models';

export const PlayerContainer = styled.div`
  text-align: center;
  padding: 20px;
`;

export const PlayerCoverContainer = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  margin: 0 auto;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;

  @media (max-width: 600px) {
    width: 250px;
    height: 250px;
  }
`;

export const PlayerCover = styled.img`
  display: inline-block;
  user-select: none;
  -webkit-user-drag: none;
  width: 101%;
  height: 101%;
  box-shadow: 4px 4px 9px 3px rgba(0, 0, 0, 0.25);
`;

export const PlayerPlayButton = styled.button`
  position: absolute;
  width: 76px;
  height: 91px;
  background-color: transparent;
  background-image: url('${assets.play}');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 0;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

export const PlayerSongName = styled.p`
  margin: 20px 0 0 0;
  color: #ffffff;
  font-size: 1rem;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const PlayerWaveCanvas = styled.canvas`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  bottom: 0;
  opacity: 0.3;
`;

export const PlayerDescription = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  font-size: 15px;
  color: #ffffff;
  font-weight: bold;
  padding: 15px 0;
  letter-spacing: 3px;
`;
