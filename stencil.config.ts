import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'xeph-autocomplete',
  copy: [
    { src: 'xeph-autocomplete.css', dest: '../xeph-autocomplete.css' }
  ],
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
