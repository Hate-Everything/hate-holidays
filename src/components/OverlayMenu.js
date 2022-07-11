import React from 'react'
import { createComponent } from '@lit-labs/react'
import { OverlayMenu as EfOverlayMenu } from '@refinitiv-ui/elements/overlay-menu'

const OverlayMenu = createComponent(React, 'ef-overlay-menu', EfOverlayMenu, {
  onoutsideclick: 'opened-changed',
})

export default OverlayMenu
