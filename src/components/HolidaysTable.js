import React from 'react'
import styled from 'styled-components'
import Label from './Label'

const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
  border: 1px solid;
  border-color: ${(props) =>
    props.isActive ? `var(--secondary-color)` : 'rgba(255, 255, 255, 0.2)'};
  transition: border-color ease-in-out 0.25s;
  margin: 5px;
  margin-top: 0px;
  min-width: 280px;
  min-height: 200px;
  border-radius: 3px;
`

const Title = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${(props) =>
    props.isActive ? `var(--primary-color)` : 'rgba(255, 255, 255, 0.2)'};
  font-weight: 600;
  transition: background-color ease-in-out 0.25s;
  padding: 5px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
`

const ItemContainer = styled.div`
  padding: 15px;
`

const DateText = styled.h6`
  display: inline-block;
  width: 35px;
  color: ${(props) => (props.isHighlight ? 'white' : 'gray')};
  text-decoration: ${(props) => (props.isHighlight ? 'underline' : 'none')};
`

const StyledLabel = styled(Label)`
  width: 200px;
  color: ${(props) => (props.isHighlight ? 'white' : 'gray')};
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

function HolidaysTable({ holidays, view, style, defaultHolidays }) {
  if (!holidays) return

  let holidayItems = {}

  if (!defaultHolidays.length) {
    return
  }

  defaultHolidays.forEach((holiday) => {
    const date = new Date(holiday.date)
    const month = getMonth(date, true)

    if (!holidayItems[month]) {
      holidayItems[month] = []
    }
    holidayItems[month].push({
      name: holiday.name,
      date: getDay(date),
      view: getView(date),
      isDefaultHoliday: true,
    })
  })

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
        name: 'My Holiday',
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

  const viewMonth = getMonth(new Date(`${view}-01`))

  return holidayItems.map((item) => (
    <Container
      isActive={item.month === viewMonth}
      key={item.month}
      style={style}
    >
      <Title isActive={item.month === viewMonth}>{item.month}</Title>
      <ItemContainer>
        {item.holidays
          .sort((a, b) => a.date - b.date)
          .map((holiday) => (
            <div key={holiday.date}>
              <DateText isHighlight={!holiday.isDefaultHoliday}>
                {holiday.date}
              </DateText>
              <StyledLabel
                isHighlight={!holiday.isDefaultHoliday}
                line-clamp="1"
              >
                {holiday.name}
              </StyledLabel>
            </div>
          ))}
      </ItemContainer>
    </Container>
  ))
}

export default HolidaysTable
