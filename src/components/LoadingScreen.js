import React from 'react'
import styled from 'styled-components'
import '@refinitiv-ui/elements/loader'

const Container = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 9999;
`

function LoadingScreen({ loading }) {
  if (loading) {
    return (
      <Container>
        <ef-loader />
      </Container>
    )
  }
}

export default LoadingScreen
