import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'xeph-autocomplete',
  outputTargets:[
    {
      type: 'dist'
    },
    {
      type: 'www',
      serviceWorker: null
    }
  ]
};
