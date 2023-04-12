import React, { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { info, warn, error } from '@refinitiv-ui/elements/notification'
import { AuthContext } from '../../core/Auth'
import dataAccess from '../../model/dataAccess'
import LoadingScreen from '../LoadingScreen'
import Calendar from '../Calendar'
import HolidaysTable from '../HolidaysTable'
import tokenImage from '../../assets/images/token.png'
import { getCurrentDate, getLastDayOfYear } from '../../helpers/date'
import Select from '../Select'
import { SUPPORTED_LOCALES } from '../../assets/data/locales'

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
  left: 200px;
`

const StyledSelect = styled(Select)`
  position: absolute;
  width: 60px;
  top: 12px;
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
  const { user, loading: authLoading } = useContext(AuthContext)

  const calendarRef = useRef()
  const selectRef = useRef()
  const [holidays, setHolidays] = useState([])
  const [defaultHolidays, setDefaultHolidays] = useState({})
  const [loading, setLoading] = useState(false)
  const [firebaseKey, setFirebaseKey] = useState('')
  const [view, setView] = useState('')
  const [locale, setLocale] = useState('th')

  const currentDate = getCurrentDate()
  const lastDate = getLastDayOfYear()

  useEffect(() => {
    if (selectRef && selectRef.current) {
      selectRef.current.data = SUPPORTED_LOCALES
    }
  }, [selectRef])

  useEffect(() => {
    const loadDefaultHolidays = async () => {
      const currentYear = new Date().toLocaleString('default', {
        year: 'numeric',
      })
      const data = await import(`../../assets/data/${currentYear}.js`)
      if (data && data.default) {
        setDefaultHolidays(data.default.holidays)
      }
    }
    loadDefaultHolidays()
  }, [locale])

  useEffect(() => {
    const initUserHolidays = async () => {
      const dates = {}
      Object.keys(defaultHolidays).forEach((key) => {
        dates[key] = defaultHolidays[key].map((holiday) => holiday.date)
      })
      await dataAccess.initUserHolidays(user.id, user.login, dates)
      setHolidays(dates)
    }

    const getUserHolidays = async () => {
      setLoading(true)
      try {
        const data = await dataAccess.getUserHolidaysByUserId(user.id)

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
        const notification = error('Cannot get data! Please refresh the page.')
        notification.style.setProperty(
          '--background-color',
          'var(--error-color)'
        )
        setLoading(false)
      }
    }
    if (user && defaultHolidays[locale].length) {
      getUserHolidays()
    }
  }, [user, defaultHolidays, currentDate])

  const tokenAmount =
    defaultHolidays[locale] && holidays[locale]
      ? defaultHolidays[locale].length - holidays[locale].length
      : 0

  const handleChange = (e) => {
    if (e.target.values.length > defaultHolidays[locale].length) {
      const notification = warn(
        `You don't have enough token to use. Skip any national holidays to get more tokens.`,
        3000
      )
      notification.style.setProperty(
        '--background-color',
        'var(--warning-color)'
      )
      e.target.values = holidays[locale]
    } else {
      const newHolidays = {
        ...holidays,
        [locale]: e.target.values,
      }
      setHolidays(newHolidays)
    }
  }

  const handleViewChange = (e) => {
    setView(e.detail.value)
  }

  const handleSubmit = async () => {
    setLoading(true)
    await dataAccess.updateUserHolidays(firebaseKey, holidays)
    setLoading(false)
    info(
      'Your holidays saved successfully. Please update your Outlook calendar accordingly.',
      3000
    )
  }

  const handleClickTableTitle = (calendarView) => {
    setView(calendarView)
  }

  const handleChangeSelect = (e) => {
    setLocale(e.detail.value)
  }

  return (
    <Main style={{ display: 'flex', padding: 10 }}>
      <TokenContainer>
        <img
          src={tokenImage}
          alt="token"
          width="30"
          style={{ marginRight: 5 }}
        />
        x {tokenAmount}
      </TokenContainer>
      <StyledSelect
        ref={selectRef}
        onchange={handleChangeSelect}
        value={locale}
      />
      <LoadingScreen loading={authLoading || loading} />
      <div style={{ flex: 1, maxWidth: 600 }}>
        <StyledCalendar
          lang="en"
          ref={calendarRef}
          multiple
          weekdaysOnly
          min={currentDate}
          max={lastDate}
          values={holidays[locale] || []}
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
          holidays={holidays[locale] || []}
          view={view}
          defaultHolidays={defaultHolidays[locale] || []}
          handleClickTableTitle={handleClickTableTitle}
        />
      </Holidays>
    </Main>
  )
}

export default Home
