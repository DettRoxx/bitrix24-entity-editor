import React, { Component } from 'react';

import { Route, BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import './../node_modules/antd/dist/antd.min.css';

import store from './stores/store';

import Layout from './components/layouts/Layout';

import Entity from './components/containers/Entity';
import Section from './components/containers/Section';
import Item from './components/containers/Item';
import ItemProperty from './components/containers/ItemProperty';
import Notice from './components/containers/Notice';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Notice />
        <BrowserRouter>
          <Layout>
            <Route exact path="/" component={Entity} />
            <Route exact path="/sections/:entity" component={Section} />
            <Route exact path="/sections/:entity/:section" component={Section} />
            <Route exact path="/items/:entity" component={Item} />
            <Route exact path="/items/:entity/:section" component={Item} />
            <Route exact path="/properties/:entity" component={ItemProperty} />
          </Layout>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
