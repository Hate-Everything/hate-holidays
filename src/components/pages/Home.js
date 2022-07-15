import React, { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { info, error } from '@refinitiv-ui/elements/notification'
import { AuthContext } from '../../core/Auth'
import dataAccess from '../../model/dataAccess'
import LoadingScreen from '../LoadingScreen'
import Calendar from '../Calendar'
import HolidaysTable from '../HolidaysTable'
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
  &::part(btn-next),
  &::part(btn-prev) {
    width: 30px;
    height: 30px;
  }
  &::part(btn-view) {
    font-size: var(--font-size);
  }
`

const TokenContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  font-weight: 600;
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
  const [defaultHolidays, setDefaultHolidays] = useState([])
  const [loading, setLoading] = useState(false)
  const [firebaseKey, setFirebaseKey] = useState('')
  const [view, setView] = useState('')
  const [currentYear, setCurrentYear] = useState('')

  useEffect(() => {
    setCurrentYear(new Date().toLocaleString('default', { year: 'numeric' }))
  }, [])

  const currentDate = getCurrentDate()
  const lastDate = getLastDayOfYear()

  useEffect(() => {
    const loadDefaultHolidays = async () => {
      const { lang } = document.documentElement
      const data = await import(`../../assets/data/${lang}/${currentYear}.js`)
      if (data && data.default) {
        setDefaultHolidays(data.default.holidays)
      }
    }

    const initUserHolidays = async () => {
      const dates = defaultHolidays.map((data) => data.date)
      await dataAccess.initUserHolidays(auth.user.id, auth.user.login, dates)
      setHolidays(dates)
    }

    const getUserHolidays = async () => {
      setLoading(true)
      try {
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
      } catch (err) {
        error('Cannot get data! Please refresh the page.', 2000)
        setLoading(false)
      }
    }
    if (auth.user && currentYear) {
      loadDefaultHolidays()
      getUserHolidays()
    }
  }, [auth.user, currentYear, defaultHolidays, currentDate])

  const availableHolidays = defaultHolidays.filter(
    (holiday) => holiday.date >= currentDate
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

  const handleClickTableTitle = (calendarView) => {
    setView(calendarView)
  }

  return (
    <Main style={{ display: 'flex', padding: 30 }}>
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
      <div style={{ flex: 1, maxWidth: 600 }}>
        <StyledCalendar
          lang="en"
          ref={calendarRef}
          multiple
          weekdaysOnly
          min={currentDate}
          max={lastDate}
          values={holidays}
          view={view}
          onchange={handleChange}
          viewchange={handleViewChange}
        />
        <ef-button
          onClick={handleSubmit}
          style={{
            width: '100%',
            padding: 20,
            marginTop: 5,
            fontWeight: 'bold',
            color: 'black',
            backgroundColor: 'var(--tertiary-color)',
          }}
        >
          SAVE MY LOVELY HOLIDAYS
        </ef-button>
      </div>
      <Holidays>
        <HolidaysTable
          holidays={holidays}
          view={view}
          defaultHolidays={defaultHolidays}
          handleClickTableTitle={handleClickTableTitle}
        />
      </Holidays>
    </Main>
  )
}

export default Home
