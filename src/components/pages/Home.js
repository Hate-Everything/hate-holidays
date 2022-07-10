import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { AuthContext } from '../../core/Auth'
import dataAccess from '../../model/dataAccess'
import LoadingScreen from '../LoadingScreen'
import Calendar from '../Calendar'
import { holidaysDates } from '../../assets/data/th/2022'

const StyledCalendar = styled(Calendar)`
  display: block;
  flex: 1;
  margin-right: 10px;
`

const TokenContainer = styled.div`
  position: absolute;
  top: 20px;
`

const getCurrentDate = (currentDate) => {
  let date = currentDate || new Date()
  const offset = date.getTimezoneOffset()
  date = new Date(date.getTime() - offset * 60 * 1000)
  return date.toISOString().split('T')[0]
}

const getLastDayOfYear = () => {
  return getCurrentDate(new Date(new Date().getFullYear(), 11, 31))
}

function Home() {
  const auth = useContext(AuthContext)
  const [holidays, setHolidays] = useState([])
  const [loading, setLoading] = useState(false)
  const [firebaseKey, setFirebaseKey] = useState('')

  useEffect(() => {
    const initUserHolidays = async () => {
      await dataAccess.initUserHolidays(auth.user.id)
    }

    const getUserHolidays = async () => {
      setLoading(true)
      const data = await dataAccess.getUserHolidaysByUserId(auth.user.id)
      if (data && data.id) {
        setHolidays(data.holidays)
        setFirebaseKey(data.firebaseKey)
        setLoading(false)
      } else {
        initUserHolidays()
        setLoading(false)
      }
    }
    if (auth.user) {
      getUserHolidays()
    }
  }, [auth.user])

  const handleChange = (e) => {
    if (e.target.values.length > holidaysDates.length) {
      e.target.values = holidays
    } else {
      setHolidays(e.target.values)
    }
  }

  const handleViewChange = () => {}

  const handleSubmit = async () => {
    setLoading(true)
    await dataAccess.updateUserHolidays(firebaseKey, holidays)
    setLoading(false)
  }

  const currentDate = getCurrentDate()
  const lastDate = getLastDayOfYear()

  return (
    <div style={{ display: 'flex', padding: 10 }}>
      <TokenContainer>
        Token: {holidaysDates.length - holidays.length}
      </TokenContainer>
      <LoadingScreen loading={auth.loading || loading} />
      <div style={{ flex: 1 }}>
        <StyledCalendar
          multiple
          weekdaysOnly
          min={currentDate}
          max={lastDate}
          values={holidays}
          onchange={handleChange}
          viewchange={handleViewChange}
        />
        <ef-button onClick={handleSubmit}>SAVE</ef-button>
      </div>
      <div style={{ flex: 1 }}>xxx</div>
    </div>
  )
}

export default Home
