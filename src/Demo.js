// MVP
import React, { useState } from 'react'
import axios from 'axios'
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

  const client_id = 'd6e4413a42f664949676'
  const redirect_uri = 'http://localhost:3000/hate-holidays'

  const handleClickLogin = async () => {
    const code = window.location.href.split('?code=')[1]
    console.log('code =', code)
    const { data } = await axios.post(
      'https://hate-holidays-server.herokuapp.com/authenticate',
      {
        code,
      }
    )
    console.log('data =', data)
  }

  const getProfile = async () => {
    const { data } = await axios.get(
      'https://hate-holidays-server.herokuapp.com/profile',
      {
        headers: { access_token: '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' },
      }
    )
    console.log('data =', data)
  }

  return (
    <div className="App">
      <LogoWrapper>
        <LogoImage />
      </LogoWrapper>
      <a
        className="login-link"
        href={`https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`}
      >
        login
      </a>
      <button onClick={handleClickLogin}>Login again</button>
      <button onClick={getProfile}>get profile</button>
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
