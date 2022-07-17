import React from 'react'
import { createComponent } from '@lit-labs/react'
import { Select as EfSelect } from '@refinitiv-ui/elements/select'

const Select = createComponent(React, 'ef-select', EfSelect, {
  onchange: 'value-changed',
})

export default Select
