import React from 'react'
import { createComponent } from '@lit/react'
import { Calendar as EfCalendar } from '@refinitiv-ui/elements/calendar'

const Calendar = createComponent({
  tagName: 'ef-calendar',
  elementClass: EfCalendar,
  react: React,
  events: {
    onchange: 'value-changed',
    viewchange: 'view-changed',
  },
})

export default Calendar
