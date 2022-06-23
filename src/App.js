import React, { useState } from 'react'
import styled from 'styled-components'
import LogoImage from './components/LogoImage'

import Toggle from './components/Toggle'

import { holidays } from './assets/data/th/2022'
import Calendar from './components/Calendar'
import './themes/dark'

const LogoWrapper = styled.div`
  width: 50px;
  height: 50px;
  margin: 20px;
`

function App() {
  const [tokenPoints, setTokenPoints] = useState(0)
  const [selectedDates, setSelectedDates] = useState([])

  const handleChecked = ({ detail }) => {
    const checked = detail.value
    const newPoints = checked ? tokenPoints + 1 : tokenPoints - 1

    if (!checked && tokenPoints < selectedDates.length) {
      const newDates = [...selectedDates]
      newDates.splice(-1)
      setSelectedDates(newDates)
      setTokenPoints(0)
    } else {
      setTokenPoints(newPoints)
    }
  }

  const handleSelectDate = (e) => {
    if (selectedDates.length > e.target.values.length) {
      setSelectedDates(e.target.values)
      setTokenPoints(tokenPoints + 1)
    } else if (!tokenPoints) {
      e.target.values = selectedDates
    } else {
      let newPoints
      setSelectedDates(e.target.values)

      if (e.target.values.length < selectedDates.length) {
        newPoints = tokenPoints + 1
      } else {
        newPoints = tokenPoints - 1
      }

      setTokenPoints(newPoints)
    }
  }

  const handleClickRemove = (date) => {
    setSelectedDates(
      selectedDates.filter((selectedDate) => selectedDate !== date)
    )
    setTokenPoints(tokenPoints + 1)
  }

  return (
    <div className="App">
      <LogoWrapper>
        <LogoImage />
      </LogoWrapper>
      <div style={{ padding: 20 }}>
        <p>Token: {tokenPoints}</p>
        {holidays.map((holiday, idx) => (
          <div key={`holiday_${idx}`}>
            <span>{holiday.date}</span>
            <span>{holiday.name}</span>
            <Toggle onchange={handleChecked} />
          </div>
        ))}
        <br />
        <Calendar
          values={selectedDates}
          multiple
          onchange={handleSelectDate}
          disabled={!tokenPoints && !selectedDates.length}
        />
        <div>
          <p>Your love holidays:</p>
          {!selectedDates.length && <p>None</p>}
          {selectedDates.map((date, idx) => (
            <div key={`date_${idx}`}>
              <p>{date}</p>
              <button onClick={() => handleClickRemove(date)}>Remove</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
