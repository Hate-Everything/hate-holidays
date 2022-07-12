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

const Main = styled.main`
  display: flex;
  flex-wrap: wrap-reverse;
  gap: 5px;
  padding: 10px;
`

const StyledCalendar = styled(Calendar)`
  display: block;
  flex: 1;
  font-size: var(--font-size);
`

const TokenContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  font-weight: bold;
  top: 11px;
  right: 86px;
`

const Holidays = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 5px;

  @media (max-width: 768px) {
    min-width: 250px;
    max-height: 320px;
    overflow-y: scroll;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    max-height: 565px;
    overflow-y: scroll;
  }
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

  const handleChange = (e) => {
    if (e.target.values.length > holidaysDates.length) {
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

  const currentDate = getCurrentDate()
  const lastDate = getLastDayOfYear()

  return (
    <Main>
      <TokenContainer>
        <img
          src={tokenImage}
          alt="token"
          width="30"
          style={{ marginRight: 5 }}
        />
        x {holidaysDates.length - holidays.length}
      </TokenContainer>
      <LoadingScreen loading={auth.loading || loading} />
      <div style={{ flex: 1 }}>
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
            marginTop: 5,
            backgroundColor: 'var(--primary-color)',
            fontWeight: 'bold',
          }}
        >
          SAVE MY LOVELY HOLIDAYS
        </ef-button>
      </div>
      <Holidays>
        <HolidaysTable holidays={holidays} view={view} />
      </Holidays>
    </Main>
  )
}

export default Home
