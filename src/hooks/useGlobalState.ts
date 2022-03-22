import { createGlobalState } from 'react-hooks-global-state';

const initialState = { isPlaying: false };
const { useGlobalState } = createGlobalState(initialState);

export { useGlobalState };
