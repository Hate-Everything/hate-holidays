import React from 'react'
import { createComponent } from '@lit-labs/react'
import { Toggle as EfToggle } from '@refinitiv-ui/elements/toggle'

const Toggle = createComponent(React, 'ef-toggle', EfToggle, {
  onchange: 'checked-changed',
})

export default Toggle
