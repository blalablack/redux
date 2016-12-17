import React from 'react';
import ReactDOM from 'react-dom'
import TodoList from './components/App'
import {createStore} from "redux"
import {Provider} from 'react-redux'
import todoApp from "./reducers/reducers"


let store = createStore(todoApp)

let rootElement = document.getElementById('root')

ReactDOM.render(
    <Provider store={store}>
        <TodoList/>
    </Provider>,
    rootElement
)
