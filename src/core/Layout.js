import React, { useContext, useRef, useState } from 'react'
import styled from 'styled-components'
import { Outlet, useNavigate } from 'react-router-dom'
import { AuthContext } from './Auth'

import Header from '../components/Header'
import OverlayMenu from '../components/OverlayMenu'

const ImageAvatar = styled.img`
  cursor: pointer;
  border-radius: 50%;
  width: 30px;
  height: 30px;
`

const StyledHeader = styled(Header)`
  height: 50px;
  padding: 20px 40px;
  padding-left: 10px;
  font-weight: 600;
  font-size: 110%;
`

const svgStyle = {
  width: '30',
  height: '30',
  paddingRight: '5',
}

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
        position={['bottom-end']}
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
        <svg slot="left" style={svgStyle} viewBox="0 0 200 220">
          <defs id="SvgjsDefs1494" />
          <g
            id="SvgjsG1495"
            transform="matrix(1.893939393939394,0,0,1.893939393939394,12,0)"
            fill="currentColor"
          >
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M0,32v59.906C0,96.377,3.582,100,8,100h72c4.418,0,8-3.623,8-8.094V32H0z M22,94H6V78h16V94z M22,74H6V58h16V74z M22,54H6  V38h16V54z M42,94H26V78h16V94z M42,74H26V58h16V74z M42,54H26V38h16V54z M62,94H46V78h16V94z M62,74H46V58h16V74z M62,54H46V38h16  V54z M82,94H66V78h16V94z M82,74H66V58h16V74z M82,54H66V38h16V54z"
            />
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M80,12H67V3c0-1.657-1.344-3-3-3c-1.657,0-3,1.343-3,3v9H27V3c0-1.657-1.344-3-3-3c-1.657,0-3,1.343-3,3v9H8  c-4.418,0-8,3.623-8,8.093V27v0v1h88v-1v0v-6.907C88,15.623,84.418,12,80,12z M24,26c-3.313,0-6-2.687-6-6  c0-2.219,1.209-4.152,3-5.19V20c0,1.657,1.343,3,3,3c1.656,0,3-1.343,3-3v-5.191c1.792,1.038,3,2.972,3,5.191  C30,23.313,27.314,26,24,26z M64,26c-3.313,0-6-2.687-6-6c0-2.219,1.209-4.152,3-5.19V20c0,1.657,1.343,3,3,3c1.656,0,3-1.343,3-3  v-5.191c1.792,1.038,3,2.972,3,5.191C70,23.313,67.314,26,64,26z"
            />
          </g>
        </svg>
        <div slot="left">Hate Holidays</div>
        <ProfileMenu logout={auth.logout} user={auth.user} slot="right" />
      </StyledHeader>
      <Outlet />
    </div>
  )
}

export default Layout
