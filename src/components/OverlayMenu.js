import React from 'react'
import { createComponent } from '@lit/react'
import { OverlayMenu as EfOverlayMenu } from '@refinitiv-ui/elements/overlay-menu'

const OverlayMenu = createComponent({
  tagName: 'ef-overlay-menu',
  elementClass: EfOverlayMenu,
  react: React,
  events: {
    onoutsideclick: 'opened-changed',
  },
})

export default OverlayMenu
