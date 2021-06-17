import { v4 } from 'uuid';

const StorageKey = 'PanoState';
const DefaultScene = {
  name: 'default',
  images: [
    {
      type: 'cube',
      url: 'https://qhyxpicoss.kujiale.com/r/2017/09/01/L3D221IS3QKUQUQBOGAPEK3P3XU888_7500x1250.jpg_%s'
    }
  ],
  hotspotIds: []
};

const DefaultState = {
  currentScene: 'default',
  scenes: {
    byId: {
      default: DefaultScene
    },
    ids: [DefaultScene.names]
  },
  hotspots: {
    byId: {},
    ids: []
  }
};

export const getPanoState = () => {
  return new Promise((resolve) => {
    const stateStr = localStorage.getItem(StorageKey);
    if (stateStr === null) {
      resolve(DefaultState);
    } else {
      try {
        const state = JSON.parse(stateStr);
        resolve(state);
      } catch (e) {
        resolve(DefaultState);
      }
    }
  });
};

export const savePanoState = (appState) => {
  return new Promise((resolve) => {
    localStorage.setItem(StorageKey, JSON.stringify(appState));
    resolve();
  });
};

let count = 0;
export const generateNewScene = () => {
  count += 1;
  return Promise.resolve({
    ...DefaultScene,
    name: `sc${v4()}`,
    images: [
      {
        type: 'cube',
        url:
          count % 2 === 0
            ? 'https://qhyxpicoss.kujiale.com/r/2017/09/01/L3D221IS3QKUQUQBOGAPEK3P3XU888_7500x1250.jpg_%s'
            : 'https://qhrenderpicoss.kujiale.com/r/2020/11/08/L3D222S21ENDIK37RIAUI5L7ELUF3P3WO888.0_6000x1000.jpg_%s'
      }
    ]
  });
};
