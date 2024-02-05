import React from 'react'
import ReactDOM from 'react-dom/client'
import Routes from './core/Routes'

import '@refinitiv-ui/halo-theme/dark/css/native-elements.css'

// Overrides Halo
import './index.css'

import '@refinitiv-ui/elements/calendar/themes/halo/dark'
import '@refinitiv-ui/elements/item/themes/halo/dark'
import '@refinitiv-ui/elements/toggle/themes/halo/dark'
import '@refinitiv-ui/elements/datetime-picker/themes/halo/dark'
import '@refinitiv-ui/elements/header/themes/halo/dark'
import '@refinitiv-ui/elements/overlay-menu/themes/halo/dark'
import '@refinitiv-ui/elements/loader/themes/halo/dark'
import '@refinitiv-ui/elements/label/themes/halo/dark'
import '@refinitiv-ui/elements/notification/themes/halo/dark'
import '@refinitiv-ui/elements/select/themes/halo/dark'

// eslint-disable-next-line import/no-named-as-default-member
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Routes />)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
