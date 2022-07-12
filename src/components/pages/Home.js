import React, { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { info } from '@refinitiv-ui/elements/notification'
import { AuthContext } from '../../core/Auth'
import dataAccess from '../../model/dataAccess'
import LoadingScreen from '../LoadingScreen'
import Calendar from '../Calendar'
import HolidaysTable from '../HolidaysTable'
import { holidaysDates } from '../../assets/data/th/2022'
import tokenImage from '../../assets/images/token.png'
import { getCurrentDate, getLastDayOfYear } from '../../helpers/date'

const StyledCalendar = styled(Calendar)`
  display: block;
  flex: 1;
  font-size: 14px;
`

const TokenContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  font-weight: bold;
  top: 11px;
  right: 86px;
`

function Home() {
  const auth = useContext(AuthContext)
  const calendarRef = useRef()
  const [holidays, setHolidays] = useState([])
  const [loading, setLoading] = useState(false)
  const [firebaseKey, setFirebaseKey] = useState('')
  const [view, setView] = useState('')

  useEffect(() => {
    const initUserHolidays = async () => {
      await dataAccess.initUserHolidays(auth.user.id, auth.user.login)
      setHolidays(holidaysDates)
    }

    const getUserHolidays = async () => {
      setLoading(true)
      const data = await dataAccess.getUserHolidaysByUserId(auth.user.id)
      if (data && data.id) {
        setHolidays(data.holidays)
        setFirebaseKey(data.firebaseKey)
        if (calendarRef && calendarRef.current) {
          setView(calendarRef.current.view)
        }
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

  const currentDate = getCurrentDate()
  const lastDate = getLastDayOfYear()
  const availableHolidays = holidaysDates.filter(
    (holiday) => holiday >= currentDate
  )
  const tokenAmount = availableHolidays.length - holidays.length

  const handleChange = (e) => {
    if (e.target.values.length > availableHolidays.length) {
      e.target.values = holidays
    } else {
      setHolidays(e.target.values)
    }
  }

  const handleViewChange = (e) => {
    setView(e.detail.value)
  }

  const handleSubmit = async () => {
    setLoading(true)
    await dataAccess.updateUserHolidays(firebaseKey, holidays)
    setLoading(false)
    info('Data saved successfully.', 2000)
  }

  return (
    <div style={{ display: 'flex', padding: 30 }}>
      <TokenContainer>
        <img
          src={tokenImage}
          alt="token"
          width="30"
          style={{ marginRight: 5 }}
        />
        x {tokenAmount}
      </TokenContainer>
      <LoadingScreen loading={auth.loading || loading} />
      <div style={{ flex: 1, marginRight: 20 }}>
        <StyledCalendar
          ref={calendarRef}
          multiple
          weekdaysOnly
          min={currentDate}
          max={lastDate}
          values={holidays}
          onchange={handleChange}
          viewchange={handleViewChange}
        />
        <ef-button
          onClick={handleSubmit}
          style={{
            width: '100%',
            padding: 20,
            marginTop: 10,
            backgroundColor: 'var(--primary-color)',
            borderRadius: 3,
          }}
        >
          SAVE MY LOVELY HOLIDAYS
        </ef-button>
      </div>
      <div style={{ flex: 2 }}>
        <HolidaysTable holidays={holidays} view={view} />
      </div>
    </div>
  )
}

export default Home
