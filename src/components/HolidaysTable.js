import React from 'react'
import styled from 'styled-components'
import '@refinitiv-ui/elements/label'
import { holidaysMapping } from '../assets/data/th/2022'

const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
  border: 1px solid;
  border-color: ${(props) =>
    props.isActive ? `var(--secondary-color)` : 'rgba(255, 255, 255, 0.2)'};
  transition: border-color ease-in-out 0.25s;
  min-height: 270px;
`

const Title = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${(props) =>
    props.isActive ? `var(--primary-color)` : 'rgba(255, 255, 255, 0.2)'};
  font-weight: bold;
  padding: 2px 0;
  transition: background-color ease-in-out 0.25s;
`

const ItemContainer = styled.div`
  padding: 15px;
`

const DateText = styled.h6`
  display: inline-block;
  margin-right: 5px;
  color: ${(props) => (props.isHighlight ? 'var(--error-color)' : 'white')};
  text-decoration: ${(props) => (props.isHighlight ? 'underline' : 'none')};
`

function HolidaysTable({ holidays, view, style }) {
  if (!holidays) return

  const holidayItems = {}

  holidays.sort().forEach((holiday) => {
    const date = new Date(holiday)
    const month = date.toLocaleString('default', { month: 'long' })

    if (!holidayItems[month]) {
      holidayItems[month] = []
    }

    holidayItems[month].push({
      name: holidaysMapping[holiday] || 'My Holiday',
      date: date.toLocaleString('default', {
        day: '2-digit',
      }),
      view: `${date.getFullYear()}-${date.toLocaleString('default', {
        month: '2-digit',
      })}`,
      isDefaultHoliday: !!holidaysMapping[holiday],
    })
  })

  const viewMonth = new Date(`${view}-01`).toLocaleDateString('default', {
    month: 'long',
  })

  return Object.keys(holidayItems).map((key) => (
    <Container isActive={key === viewMonth} key={key} style={style}>
      <Title isActive={key === viewMonth}>{key}</Title>
      <ItemContainer>
        {holidayItems[key].map((item) => (
          <div key={item.date}>
            <DateText isHighlight={!item.isDefaultHoliday}>
              {item.date}
            </DateText>
            <ef-label style={{ width: 230 }} line-clamp="1">
              {item.name}
            </ef-label>
          </div>
        ))}
      </ItemContainer>
    </Container>
  ))
}

export default HolidaysTable
