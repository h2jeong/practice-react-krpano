/* eslint-disable no-unused-vars */
import { Hotspot, Krpano, Scene } from '@0xllllh/react-krpano';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ReduxApp = () => {
  const currentState = useSelector((state) => state);
  const currentScene = useSelector((state) => state.currentScene);
  const scenes = useSelector((state) => state.scenes.ids.map((id) => state.scenes.byId[id]));
  const hotspotCount = useSelector((state) => state.hotspots.ids.length);
  const hotspotById = useSelector((state) => state.hotspots.byId);
  const dispatch = useDispatch();
  const [renderer, setRenderer] = useState(null);
  return (
    <>
      <Krpano
        xml={`${process.env.PUBLIC_URL}/xml/dynamic-hotspot.xml`}
        className="pano"
        currentScene={currentScene}
        // eslint-disable-next-line no-undef
        onReady={onReady}
        enableLogger={true}>
        <Scene>
          <Hotspot />
        </Scene>
      </Krpano>
    </>
  );
};

export default ReduxApp;
