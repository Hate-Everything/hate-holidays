import React from 'react'
import { createComponent } from '@lit/react'
import { Select as EfSelect } from '@refinitiv-ui/elements/select'

const Select = createComponent({
  tagName: 'ef-select',
  elementClass: EfSelect,
  react: React,
  events: {
    onchange: 'value-changed',
  },
})

export default Select
