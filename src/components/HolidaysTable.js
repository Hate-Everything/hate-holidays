import React from 'react'
import styled from 'styled-components'
import Label from './Label'
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
  color: ${(props) => (props.isHighlight ? 'white' : 'gray')};
  text-decoration: ${(props) => (props.isHighlight ? 'underline' : 'none')};
`

const getDay = (date) => {
  return date.toLocaleString('default', {
    day: '2-digit',
  })
}

const getMonth = (date, isDigit) => {
  return date.toLocaleString('default', { month: isDigit ? '2-digit' : 'long' })
}

const getView = (date) => {
  return `${date.getFullYear()}-${date.toLocaleString('default', {
    month: '2-digit',
  })}`
}

function HolidaysTable({ holidays, view, style }) {
  if (!holidays) return

  let holidayItems = {}

  holidays.sort().forEach((holiday) => {
    const date = new Date(holiday)
    const day = getDay(date)
    const month = getMonth(date, true)

    if (!holidayItems[month]) {
      holidayItems[month] = []
    }
    const defaultHoliday = holidayItems[month].find((item) => item.date === day)

    if (defaultHoliday) {
      defaultHoliday.isDefaultHoliday = false
    } else {
      holidayItems[month].push({
        name: holidaysMapping[holiday] || 'My Holiday',
        date: getDay(date),
        view: getView(date),
        isDefaultHoliday: false,
      })
    }
  })

  holidayItems = Object.keys(holidayItems)
    .sort()
    .map((key) => {
      return {
        key,
        month: getMonth(new Date(key)),
        holidays: holidayItems[key],
      }
    })

  const viewMonth = new Date(`${view}-01`).toLocaleDateString('default', {
    month: 'long',
  })

  return holidayItems.map((date) => (
    <Container
      isActive={date.month === viewMonth}
      key={date.month}
      style={style}
    >
      <Title isActive={date.month === viewMonth}>{date.month}</Title>
      <ItemContainer>
        {holidayItems[key].map((item) => (
          <div key={item.date}>
            <DateText isHighlight={!item.isDefaultHoliday}>
              {item.date}
            </DateText>
            <ef-label style={{ width: 200 }} line-clamp="1">
              {item.name}
            </ef-label>
          </div>
        ))}
      </ItemContainer>
    </Container>
  ))
}

export default HolidaysTable
