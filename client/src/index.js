import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import ReduxThunk from 'redux-thunk'
// import ReduxPromise from 'redux-promise'
import rootReducer from './reducers/index'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<Provider store={
          createStore(
            rootReducer,
            applyMiddleware(ReduxThunk)
          )
        }>
        <App/>
        </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
