import React, { useState } from 'react'
import styled from 'styled-components'
import Calendar from './Calendar'
import HolidaysTable from './HolidaysTable'

const UserContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-width: 300px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 3px;
  padding: 20px;
  margin: 10px;
`

function UserHolidays({ user, holidays }) {
  const [showTable, setShowTable] = useState(false)
  const [view, setView] = useState('')

  const handleClickButton = () => {
    setShowTable(!showTable)
  }

  const handleViewChange = (e) => {
    setView(e.detail.value)
  }

  return (
    <UserContainer>
      <div style={{ width: '100%' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}
        >
          <h6 style={{ margin: 0 }}>{user.name}</h6>
          <ef-button onClick={handleClickButton} style={{ padding: 15 }}>
            {showTable ? 'HIDE' : 'SHOW'} TABLE
          </ef-button>
        </div>
        <Calendar
          lang="en"
          values={holidays}
          readonly
          style={{ maxWidth: 400, display: 'block' }}
          viewchange={handleViewChange}
        />
      </div>
      {showTable ? (
        <HolidaysTable
          holidays={holidays}
          view={view}
          style={{ marginTop: 20 }}
        />
      ) : null}
    </UserContainer>
  )
}

export default UserHolidays
