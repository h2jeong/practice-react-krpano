import React from 'react';
import ReduxApp from './App';
import { Provider } from 'react-redux';
import reducer from './reducer';
import { createStore } from 'redux';

const store = createStore(reducer);

const PageRedux = () => {
  return (
    <div className="page-redux">
      <Provider store={store}>
        <ReduxApp />
      </Provider>
    </div>
  );
};

export default PageRedux;
