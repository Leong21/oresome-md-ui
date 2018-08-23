import {createContext} from 'react';

export const defaultContext = {
  colour: 'orange',
  type: 'light',
  handleConfigChange: () => {}
}

export const {Provider, Consumer} = createContext(defaultContext);