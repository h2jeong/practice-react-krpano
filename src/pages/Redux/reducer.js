// actions
const LOAD_PANO = 'pano/LOADPANO';
const CHANGE_CURRENT_SCENE = 'pano/CHANGECURRENTSCENE';
const ADD_SCENE = 'pano/ADDSCENE';
const ADD_HOT_SPOT = 'pano/ADDHOTSPOT';

// initialState
const initialState = {
  currentScene: 'default',
  scenes: {
    byId: {
      default: {
        name: 'default',
        hotspotIds: [],
        images: [
          {
            type: 'cube',
            url: 'https://qhyxpicoss.kujiale.com/r/2017/09/01/L3D221IS3QKUQUQBOGAPEK3P3XU888_7500x1250.jpg_%s'
          }
        ]
      }
    },
    ids: ['default']
  },
  hotspots: {
    byId: {},
    ids: []
  }
};
// reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_PANO: {
      const { currentScene, scenes, hotspots } = action.payload;
      return { currentScene, scenes, hotspots, ...state };
    }
    case CHANGE_CURRENT_SCENE:
      return { ...state, currentScene: action.payload };
    case ADD_SCENE: {
      const { name } = action.payload;
      return {
        ...state,
        scenes: { byId: { [name]: action.payload }, ids: [...state.scenes.ids, name] }
      };
    }
    case ADD_HOT_SPOT: {
      const { name } = action.payload;
      const hotspots = { byId: { [name]: action.payload }, ids: [...state.hotspots.ids, name] };
      const scenes = {
        byId: {
          [state.currentScene]: {
            hotspotIds: [...state.scenes.byId[state.currentScene].hotspotIds, name]
          }
        }
      };
      return { ...state, scenes, hotspots };
    }
    default:
      return state;
  }
}

// action creators
export function loadPano(payload) {
  return { type: LOAD_PANO, payload };
}

export function changeCurrentScene(payload) {
  return { type: CHANGE_CURRENT_SCENE, payload };
}

export function addScene(payload) {
  return { type: ADD_SCENE, payload };
}

export function addHotspot(payload) {
  return { type: ADD_HOT_SPOT, payload };
}
