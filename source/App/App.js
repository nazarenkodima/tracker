import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import Layout from '../Components/Layout/Layout';
import Logo from '../Components/Logo/Logo';

@hot(module)
export default class App extends Component {
  render() {
    return (
      <Layout>
        <Logo />
      </Layout>
    );
  }
}
