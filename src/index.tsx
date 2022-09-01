import React from 'react';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
// import AppWithReducer from "./AppWithReducer";
import AppWithRedux from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./state/state";
import {createRoot} from "react-dom/client";

const el = document.getElementById('root')
if (el === null) throw new Error('Root container missing in index.html')

const root = createRoot(el)
root.render(
    <Provider store={store}>
        <AppWithRedux/>
    </Provider>,
    // document.getElementById('root'));
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
