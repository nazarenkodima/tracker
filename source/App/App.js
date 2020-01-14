import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import Layout from "../Components/Layout/Layout";

@hot(module)
export default class App extends Component {
  render() {
    return (
      <Layout>
        <h1>tracker</h1>
      </Layout>
    );
  }
}
