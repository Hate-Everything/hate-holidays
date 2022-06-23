import React from 'react'
import { createComponent } from '@lit-labs/react'
import { Calendar as EfCalendar } from '@refinitiv-ui/elements/calendar'

const Calendar = createComponent(React, 'ef-calendar', EfCalendar, {
  onchange: 'value-changed',
})

export default Calendar
