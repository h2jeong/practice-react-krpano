import React from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { VStack } from '../FlexContainer';

const MenuItem = ({ children, path, exact }) => {
  const match = useRouteMatch({ path, exact });

  return (
    <div className={`aside-menu-item ${match ? 'active' : ''}`}>
      <Link className={`aside-menu-item-link`} to={path}>
        {children}
      </Link>
    </div>
  );
};

const Aside = () => {
  const [collased, setcollased] = useState(window.innerWidth <= 750);
  const onToggle = useCallback(() => {
    setcollased(!collased);
  }, [collased, setcollased]);

  return (
    <aside className={`app-aside ${collased ? 'collased' : ''}`}>
      <VStack>
        <div className="aside-title">React Krpano Examples</div>
        <VStack className="aside-menu">
          <MenuItem path="/load-xml">XML로드</MenuItem>
          <MenuItem path="/switch-scene">장면 전환</MenuItem>
          <MenuItem path="/multires">다중 해상도</MenuItem>
          <MenuItem path="/dynamic-hotspot">동적 핫스팟</MenuItem>
          <MenuItem path="/redux">Redux</MenuItem>
        </VStack>
        <button className="aside-toggle-bar" onClick={onToggle}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </VStack>
    </aside>
  );
};

export default Aside;
