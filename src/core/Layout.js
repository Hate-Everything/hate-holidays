import React, { useContext, useRef, useState } from 'react'
import styled from 'styled-components'
import { Outlet, useNavigate } from 'react-router-dom'
import { AuthContext } from './Auth'

import Header from '../components/Header'
import OverlayMenu from '../components/OverlayMenu'

const ImageAvatar = styled.img`
  cursor: pointer;
  border-radius: 50%;
  width: 28px;
  height: 28px;
`

const StyledHeader = styled(Header)`
  height: 50px;
  padding: 0 40px;
`

function ProfileMenu({ user, slot, logout }) {
  const [opened, setOpened] = useState(false)
  const navigate = useNavigate()
  const imageRef = useRef()

  if (!user) {
    return
  }
  const { avatar_url, login } = user

  const handleClickAvatar = () => {
    setOpened(!opened)
  }

  const handleClosePopup = () => {
    setOpened(false)
  }

  const handleClickLogout = () => {
    logout(() => {
      navigate('/', { replace: true })
    })
  }

  return (
    <>
      <ImageAvatar
        ref={imageRef}
        src={avatar_url}
        alt="avatar"
        slot={slot}
        onClick={handleClickAvatar}
      />
      <OverlayMenu
        position="bottom-end"
        positionTarget={imageRef.current}
        opened={opened}
        onoutsideclick={handleClosePopup}
      >
        <ef-item type="header">Signed in as {login}</ef-item>
        <ef-item onClick={handleClickLogout}>Logout</ef-item>
      </OverlayMenu>
    </>
  )
}

function Layout() {
  const auth = useContext(AuthContext)

  return (
    <div>
      <StyledHeader>
        <ProfileMenu logout={auth.logout} user={auth.user} slot="right" />
      </StyledHeader>
      <Outlet />
    </div>
  )
}

export default Layout
