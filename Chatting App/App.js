import React, { Component }from 'react';
import Routers from "./compunent/Routers";
import { Provider } from "react-redux";
import store from './store/index'
console.disableYellowBox = true

export default class App extends Component {
    render() {
        return (
          <Provider store={store}>
            <Routers />
          </Provider>
        );
    }
}