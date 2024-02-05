import React from 'react'
import { createComponent } from '@lit/react'
import { DatetimePicker as EfDatetimePicker } from '@refinitiv-ui/elements/datetime-picker'

const DatetimePicker = createComponent({
  tagName: 'ef-datetime-picker',
  elementClass: EfDatetimePicker,
  react: React,
  events: {
    onchange: 'value-changed',
  },
})

export default DatetimePicker
