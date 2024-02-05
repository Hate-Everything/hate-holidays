import React from 'react'
import { createComponent } from '@lit/react'
import { Label as EfLabel } from '@refinitiv-ui/elements/label'

const Label = createComponent({
  tagName: 'ef-label',
  elementClass: EfLabel,
  react: React,
})

export default Label
