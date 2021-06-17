import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PageLoadXML from './pages/LoadXML';
import PageSwitchScene from './pages/SwitchScene';
import PageDynamicHotspot from './pages/DynamicHotspot';
import PageMultires from './pages/Multires';
import PageRedux from './pages/Redux';
import Aside from './components/Aside';
import { FlexItem, HStack, VStack } from './components/FlexContainer';
// import Header from './components/Header';

function App() {
  return (
    <VStack className="App">
      {/* <Header /> */}
      <HStack>
        <Aside />
        <FlexItem>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/load-xml" />
            </Route>
            <Route path="/load-xml">
              <PageLoadXML />
            </Route>
            <Route path="/switch-scene">
              <PageSwitchScene />
            </Route>
            <Route path="/dynamic-hotspot">
              <PageDynamicHotspot />
            </Route>
            <Route path="/multires">
              <PageMultires />
            </Route>
            <Route path="/redux">
              <PageRedux />
            </Route>
          </Switch>
        </FlexItem>
      </HStack>
    </VStack>
  );
}

export default App;
