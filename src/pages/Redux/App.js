import { Hotspot, Krpano, Scene } from '@0xllllh/react-krpano';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as api from './api';
import { addHotspot, addScene, changeCurrentScene, loadPano } from './reducer';

const ReduxApp = () => {
  const currentState = useSelector((state) => state);
  const currentScene = useSelector((state) => state.currentScene);
  const scenes = useSelector((state) => state.scenes.ids.map((id) => state.scenes.byId[id]));
  const hotspotCount = useSelector((state) => state.hotspots.ids.length);
  const hotspotById = useSelector((state) => state.hotspots.byId);
  const [renderer, setRenderer] = useState(null);
  const dispatch = useDispatch();

  const onReady = useCallback((renderer) => {
    setRenderer(renderer);
    api.getPanoState().then((pano) => {
      dispatch(loadPano(pano));
    });
  }, []);

  const onAddHotspot = useCallback(() => {
    dispatch(
      addHotspot({
        name: `hotspot${hotspotCount + 1}`,
        ath: renderer?.get('view.hlookat') || 0,
        atv: renderer?.get('view.vlookat') || 0,
        style: 'hotspot-style'
      })
    );
  }, [renderer, hotspotCount]);

  const onSave = useCallback(() => {
    api.savePanoState(currentState).then(() => {
      window.alert('pano saved');
    });
  }, [currentState]);

  const handleChangeScene = (name) => {
    dispatch(changeCurrentScene(name));
  };
  const onAddScene = useCallback(() => {
    api.generateNewScene().then((sc) => {
      dispatch(addScene(sc));
      alert('new scene added');
    });
  }, []);

  return (
    <>
      <Krpano
        xml={`${process.env.PUBLIC_URL}/xml/dynamic-hotspot.xml`}
        className="pano"
        currentScene={currentScene}
        onReady={onReady}
        enableLogger={true}>
        {scenes.map((scene) => (
          <Scene key={scene.name} {...scene}>
            {scene.hotspotIds
              .map((name) => hotspotById[name])
              .map((hs) => (
                <Hotspot key={hs.name} {...hs} />
              ))}
          </Scene>
        ))}
      </Krpano>
      <div className="action-bar">
        <button className="action-button" onClick={onAddHotspot}>
          +
        </button>
        <button className="action-button" onClick={onSave}>
          S
        </button>
      </div>
      <div className="scene-list">
        {scenes.map((sc) => (
          <button
            key={sc.name}
            className={`scene-list-item ${sc.name === currentScene ? 'active' : ''}`}
            onClick={handleChangeScene(sc.name)}>
            <img src={sc.previewUrl || sc.images[0].url.replace('%s', 'f')} alt={sc.name} />
          </button>
        ))}
        <button className="scene-list-item scene-list-item--add" onClick={onAddScene}>
          +
        </button>
      </div>
    </>
  );
};

export default ReduxApp;
