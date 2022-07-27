import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { SUPPORTED_LOCALES } from '../../assets/data/locales'
import { getCurrentDate } from '../../helpers/date'
import dataAccess from '../../model/dataAccess'
import LoadingScreen from '../LoadingScreen'
import Select from '../Select'
import UserHolidays from '../UserHolidays'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
`

const StyledSelect = styled(Select)`
  position: absolute;
  width: 60px;
  top: 12px;
  right: 86px;
`

const UserText = styled.span`
  display: block;
  padding: 0 10px;
`

function Team() {
  const [loading, setLoading] = useState(false)
  const [userHolidays, setUserHolidays] = useState([])
  const [locale, setLocale] = useState('th')
  const [defaultHolidays, setDefaultHolidays] = useState({})
  const selectRef = useRef()

  const currentDate = getCurrentDate()

  const todayOffUsers = []

  userHolidays.forEach((user) => {
    if (user.holidays[locale].some((day) => day === currentDate)) {
      todayOffUsers.push(user.name)
    }
  })

  useEffect(() => {
    const getAllUserHolidays = async () => {
      setLoading(true)
      const data = await dataAccess.getUserHolidays()

      setUserHolidays(data)
      setLoading(false)
    }
    getAllUserHolidays()
  }, [])

  const handleChangeSelect = (e) => {
    setLocale(e.detail.value)
  }

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

  return (
    <Container>
      <StyledSelect
        ref={selectRef}
        onchange={handleChangeSelect}
        value={locale}
      />

      <div style={{ display: 'flex', width: '100%' }}>
        <div>On Holiday Today:</div>
        {todayOffUsers.length ? (
          todayOffUsers.map((user) => <UserText>{user}</UserText>)
        ) : (
          <UserText>none</UserText>
        )}
      </div>

      <LoadingScreen loading={loading} />
      {userHolidays.map((user, index) => (
        <UserHolidays
          key={`${user.name}-${index}`}
          user={user}
          holidays={user.holidays[locale]}
          defaultHolidays={defaultHolidays[locale]}
        />
      ))}
    </Container>
  )
}

export default Team
