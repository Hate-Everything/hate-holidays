import React from 'react'
import { createComponent } from '@lit/react'
import { Item as EfItem } from '@refinitiv-ui/elements/item'

const Item = createComponent({
  tagName: 'ef-item',
  elementClass: EfItem,
  react: React,
})

export default Item
