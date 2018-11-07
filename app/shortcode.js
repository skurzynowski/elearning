/* global window, document */
if (!window._babelPolyfill) {
  require('@babel/polyfill')
}

import React from 'react'
import ReactDOM from 'react-dom'
import Shortcode from './containers/Shortcode.jsx'
// import 'bootstrap3/dist/css/bootstrap.css'
import { Provider } from 'react-redux'
import {store} from '../redux/store'

document.addEventListener('DOMContentLoaded', function () {
  const shortcode_containers = document.querySelectorAll('.wp-reactivate-shortcode')

  for (let i = 0; i < shortcode_containers.length; ++i) {
    const objectId = shortcode_containers[i].getAttribute('data-object-id')

    ReactDOM.render(<Provider store={store}><Shortcode wpObject={window[objectId]}/></Provider>, shortcode_containers[i])
  }
})
