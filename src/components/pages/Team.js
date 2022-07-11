import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import dataAccess from '../../model/dataAccess'
import LoadingScreen from '../LoadingScreen'
import UserHolidays from '../UserHolidays'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
`

function Team() {
  const [loading, setLoading] = useState(false)
  const [userHolidays, setUserHolidays] = useState([])

  useEffect(() => {
    const getAllUserHolidays = async () => {
      setLoading(true)
      const data = await dataAccess.getUserHolidays()
      setUserHolidays(data)
      setLoading(false)
    }
    getAllUserHolidays()
  }, [])

  return (
    <Container>
      <LoadingScreen loading={loading} />
      {userHolidays.map((user, index) => (
        <UserHolidays
          key={`${user.name}-${index}`}
          user={user}
          holidays={user.holidays}
        />
      ))}
    </Container>
  )
}

export default Team
