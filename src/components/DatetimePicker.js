import React from 'react'
import { createComponent } from '@lit-labs/react'
import { DatetimePicker as EfDatetimePicker } from '@refinitiv-ui/elements/datetime-picker'

const DatetimePicker = createComponent(
  React,
  'ef-datetime-picker',
  EfDatetimePicker,
  {
    onchange: 'value-changed',
  }
)

export default DatetimePicker
