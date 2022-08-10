import styled, { css } from 'styled-components';

import { assets } from '../../models';

export const PlayerContainer = styled.div`
  text-align: center;
  padding: 20px;
  width: 100%;
`;

export const PlayerCoverContainer = styled.div`
  position: relative;
  width: 40vh;
  height: 40vh;
  margin: 0 auto;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  perspective: 1000px;
`;

export const PlayerCoverInner = styled.div<{ isNextSongCoverActive: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;

  ${({ isNextSongCoverActive }) =>
    isNextSongCoverActive &&
    css`
      transform: rotateY(180deg);
    `}
`;

export const PlayerCoverImage = styled.img`
  display: inline-block;
  user-select: none;
  -webkit-user-drag: none;
  position: absolute;
  width: 100%;
  height: 100%;
  box-shadow: 4px 4px 9px 3px rgba(0, 0, 0, 0.25);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  left: 0;
  top: 0;

  &:nth-child(2) {
    transform: rotateY(180deg);
  }
`;

export const PlayerPlayButton = styled.button`
  position: absolute;
  width: 30%;
  height: 30%;
  max-width: 76px;
  max-height: 91px;
  background-color: transparent;
  background-image: url('${assets.play}');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
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

export const PlayerHeadingText = styled.p`
  margin: 0.9rem 0 0 0;
  color: #ffffff;
  font-size: 0.4rem;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  text-transform: uppercase;
  font-weight: 500;
  text-align: center;
`;

export const PlayerSongName = styled.p`
  margin: 0.25rem 0 0 0;
  color: #ffffff;
  font-size: 0.9rem;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  text-align: center;
`;

export const PlayerWaveCanvas = styled.canvas<{ isVisible: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  bottom: 0;
  opacity: 0;
  transition: opacity 0.5s ease;

  ${({ isVisible }) =>
    isVisible &&
    css`
      opacity: 0.3;
      transition: opacity 0.5s ease 1s;
    `}
`;
