import React from 'react'
import { createComponent } from '@lit/react'
import { Toggle as EfToggle } from '@refinitiv-ui/elements/toggle'

const Toggle = createComponent({
  tagName: 'ef-toggle',
  elementClass: EfToggle,
  react: React,
  events: {
    onchange: 'checked-changed',
  },
})

export default Toggle
