import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { initTranslation } from './lib/translate'

/*
 * Browser translators (Google Translate, Chrome's built-in translate) wrap
 * text in <font> tags. When React later updates that text it can crash with
 * "Failed to execute 'removeChild' on 'Node'". This small guard prevents it.
 */
if (typeof Node === 'function' && Node.prototype) {
  const removeChild = Node.prototype.removeChild
  Node.prototype.removeChild = function (child) {
    if (child.parentNode !== this) return child
    return removeChild.apply(this, arguments)
  }
  const insertBefore = Node.prototype.insertBefore
  Node.prototype.insertBefore = function (newNode, ref) {
    if (ref && ref.parentNode !== this) return newNode
    return insertBefore.apply(this, arguments)
  }
}

initTranslation()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
