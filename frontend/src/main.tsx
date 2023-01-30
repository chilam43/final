import React from 'react'
import ReactDOM from 'react-dom/client'


import { store } from './auth/state' // Add this
import { Provider } from 'react-redux' // Add this also
import { BrowserRouter } from 'react-router-dom'
import App from './App'



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <Provider store={store}> {/*Add me*/}
    <BrowserRouter>

      <App />

    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
)
