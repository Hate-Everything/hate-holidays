import React, { useContext } from 'react'
import styled from 'styled-components'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AuthContext } from '../../core/Auth'
import LoadingScreen from '../LoadingScreen'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledLink = styled.a`
  margin-top: 20px;
`

function Login() {
  const navigate = useNavigate()
  const auth = useContext(AuthContext)
  const [searchParams] = useSearchParams()
  const code = searchParams.get('code')

  React.useEffect(() => {
    if (!auth.loading && auth.user) {
      navigate('/', { replace: true })
    }
  }, [auth.loading, auth.user])

  React.useEffect(() => {
    if (code) {
      auth.login(code, () => {
        navigate('/', { replace: true })
      })
    }
  }, [])

  return (
    <Container>
      <StyledLink
        href={`${process.env.REACT_APP_GITHUB_OAUTH_URL}?scope=user&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`}
      >
        login with github
      </StyledLink>
      <LoadingScreen loading={auth.loading} />
    </Container>
  )
}

export default Login
