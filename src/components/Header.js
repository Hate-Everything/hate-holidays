import React from 'react'
import { createComponent } from '@lit/react'
import { Header as EfHeader } from '@refinitiv-ui/elements/header'

const Header = createComponent({
  tagName: 'ef-header',
  elementClass: EfHeader,
  react: React,
})

export default Header
