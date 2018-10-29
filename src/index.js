import 'bootstrap/dist/css/bootstrap.min.css'
import $ from 'jquery'
import Popper from 'popper.js'

import React from 'react'
import ReactDOM from 'react-dom'

import './asset/css/default.scss'
import App from './App'

window.Popper = Popper.default
Window.$ = window.jQuery = $

ReactDOM.render(<App />, document.getElementById('root'))