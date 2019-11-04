import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { Field } from './components/Field';
import { rootReducer } from './reducers';

import './App.css';

const App: React.FC = () => {
  return (
    <Provider store={createStore(rootReducer)}>
      <div className="App">
        <Field />
      </div>
    </Provider>
  );
};

export default App;
