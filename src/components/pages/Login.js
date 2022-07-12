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
  position: absolute;
  left: 45%;
  top: 470px;
  width: 250px;
  border: 1px white solid;
  display: flex;
  &:hover {
    text-decoration: none;
    background-color: #fff;
    color: #000;
    transition: 200ms;
  }
  &:hover:visited {
    color: #000;
  }
  &:visited {
    color: #fff;
  }
`

const Bomber = styled.div`
  position: absolute;
  left: 35%;
  top: 400px;
  transform: scale(5);
  width: 1px;
  height: 1px;
  background: transparent;
  box-shadow: 8px 0px #c37200, 4px 1px #c77100, 5px 1px #c77100, 6px 1px #556282, 7px 1px #914708, 4px 2px #c76e06, 5px 2px #fcee43, 6px 2px #fcee43, 7px 2px #f8c206, 8px 2px #d16d00, 5px 3px #cc6e00, 6px 3px #fbed42, 7px 3px #fbed42, 8px 3px #fbc106, 9px 3px #c47400, 3px 4px #924a00, 4px 4px #c67100, 5px 4px #ffbf01, 6px 4px #fbee40, 7px 4px #ffc000, 8px 4px #9e4203, 9px 4px #1b161a, 4px 5px #a53f01, 5px 5px #cc690b, 6px 5px #f6c403, 9px 5px #22304b, 7px 6px #223148, 8px 6px #586084, 9px 6px #9fa5bb, 10px 6px #9fa5bb, 11px 6px #5a5f85, 5px 7px #23314c, 6px 7px #23314c, 7px 7px #5a5f87, 8px 7px #a1a6ba, 9px 7px #ffffff, 10px 7px #ffffff, 11px 7px #9fa7ba, 12px 7px #5a6084, 4px 8px #23314c, 5px 8px #23314c, 6px 8px #5a5f85, 7px 8px #292a2e, 8px 8px #414141, 9px 8px #414141, 10px 8px #414141, 11px 8px #2b2b29, 12px 8px #5a5f85, 13px 8px #5a5f85, 3px 9px #23314c, 4px 9px #5a5d8a, 5px 9px #1c180f, 6px 9px #262827, 7px 9px #424242, 8px 9px #424242, 9px 9px #666666, 10px 9px #666666, 11px 9px #424242, 12px 9px #424242, 13px 9px #2a2a2a, 3px 10px #21314b, 4px 10px #171717, 5px 10px #2a2a2a, 6px 10px #424242, 7px 10px #424242, 8px 10px #666666, 9px 10px #666666, 10px 10px #666666, 11px 10px #666666, 12px 10px #424242, 13px 10px #424242, 14px 10px #2b2b2b, 3px 11px #191919, 4px 11px #2a2a2a, 5px 11px #2a2a2a, 6px 11px #424242, 7px 11px #424242, 8px 11px #666666, 9px 11px #666666, 10px 11px #5a5f85, 11px 11px #656565, 12px 11px #656565, 13px 11px #434240, 14px 11px #5a5f85, 15px 11px #2e2e2e, 3px 12px #2a2a2a, 4px 12px #2a2a2a, 5px 12px #2a2a2a, 6px 12px #424242, 7px 12px #424242, 8px 12px #666666, 9px 12px #585d94, 10px 12px #ffffff, 11px 12px #9fa7ba, 12px 12px #696562, 13px 12px #586084, 14px 12px #ffffff, 15px 12px #454641, 2px 13px #171717, 3px 13px #2a2a2a, 4px 13px #2a2a2a, 5px 13px #2a2a2a, 6px 13px #424242, 7px 13px #424242, 8px 13px #666666, 9px 13px #a1a5c0, 10px 13px #ffffff, 11px 13px #696468, 12px 13px #676566, 13px 13px #a0a6bc, 14px 13px #ffffff, 15px 13px #a0a6bc, 16px 13px #171717, 2px 14px #171717, 3px 14px #171717, 4px 14px #2a2a2a, 5px 14px #2a2a2a, 6px 14px #424242, 7px 14px #424242, 8px 14px #424242, 9px 14px #9fa8b9, 10px 14px #ffffff, 11px 14px #9fa8b9, 12px 14px #656766, 13px 14px #9fa8b9, 14px 14px #ffffff, 15px 14px #9fa8b9, 16px 14px #292b2a, 2px 15px #171717, 3px 15px #171717, 4px 15px #2a2a2a, 5px 15px #2a2a2a, 6px 15px #424242, 7px 15px #424242, 8px 15px #424242, 9px 15px #5a6084, 10px 15px #ffffff, 11px 15px #5a6084, 12px 15px #66675f, 13px 15px #586084, 14px 15px #ffffff, 15px 15px #586084, 16px 15px #2a2a2a, 2px 16px #171717, 3px 16px #171717, 4px 16px #171717, 5px 16px #2a2a2a, 6px 16px #2a2a2a, 7px 16px #424242, 8px 16px #424242, 9px 16px #1e3352, 10px 16px #9fa8b9, 11px 16px #5a6080, 12px 16px #434240, 13px 16px #25304c, 14px 16px #9fa8b9, 15px 16px #595e88, 16px 16px #2a2a2a, 2px 17px #171717, 3px 17px #171717, 4px 17px #171717, 5px 17px #2a2a2a, 6px 17px #2a2a2a, 7px 17px #424242, 8px 17px #424242, 9px 17px #424242, 10px 17px #25334e, 11px 17px #424242, 12px 17px #424242, 13px 17px #424242, 14px 17px #26304b, 15px 17px #2a2a2c, 16px 17px #171717, 3px 18px #171717, 4px 18px #171717, 5px 18px #171717, 6px 18px #2a2a2a, 7px 18px #2a2a2a, 8px 18px #414141, 9px 18px #414141, 10px 18px #414141, 11px 18px #414141, 12px 18px #2a2a2a, 13px 18px #2a2a2a, 14px 18px #2a2a2a, 15px 18px #171717, 3px 19px #cc6c08, 4px 19px #f9c300, 5px 19px #cc6c08, 6px 19px #171717, 7px 19px #2b2b2b, 8px 19px #2b2b2b, 9px 19px #2b2b2b, 10px 19px #2b2b2b, 11px 19px #2b2b2b, 12px 19px #2b2b2b, 13px 19px #2b2b2b, 14px 19px #171717, 15px 19px #171717, 16px 19px #c96f00, 2px 20px #c67001, 3px 20px #ffbb06, 4px 20px #fbee40, 5px 20px #fbee40, 6px 20px #f9c300, 7px 20px #d36600, 8px 20px #181619, 9px 20px #2a2a2a, 10px 20px #2a2a2a, 11px 20px #2a2a2a, 12px 20px #191a1e, 13px 20px #191a1e, 14px 20px #191a1e, 15px 20px #c27300, 16px 20px #fcc302, 17px 20px #c27300, 1px 21px #cc6b0d, 2px 21px #fcc200, 3px 21px #fcc200, 4px 21px #faed46, 5px 21px #faed46, 6px 21px #faed46, 7px 21px #f9c203, 8px 21px #c96e05, 9px 21px #171717, 10px 21px #171717, 11px 21px #171717, 12px 21px #171717, 13px 21px #171717, 14px 21px #c67100, 15px 21px #f9c206, 16px 21px #f9c206, 17px 21px #ffef47, 18px 21px #fbc201, 1px 22px #98460a, 2px 22px #c96f00, 3px 22px #fbc200, 4px 22px #fbc200, 5px 22px #fded40, 6px 22px #fded40, 7px 22px #fbc106, 8px 22px #fbc106, 9px 22px #171717, 10px 22px #171717, 11px 22px #171717, 12px 22px #8f470d, 13px 22px #fbc200, 14px 22px #fbc200, 15px 22px #fbc200, 16px 22px #fded42, 17px 22px #fded42, 18px 22px #fcc101, 2px 23px #924801, 3px 23px #c96f00, 4px 23px #c96f00, 5px 23px #c96f00, 6px 23px #c96f00, 7px 23px #924801, 11px 23px #924801, 12px 23px #c86e00, 13px 23px #c86e00, 14px 23px #914700, 15px 23px #fbc201, 16px 23px #fbc201, 17px 23px #fbc201;
`

const HateHoliday = styled.div`
  position: absolute;
  left: 40%;
  top: 100px;
  width: 1px;
  height: 1px;
  transform: scale(20);
  background: transparent;
  box-shadow: 1px 1px #3552c1, 2px 1px #3552c1, 3px 1px #3552c1, 4px 1px #3552c1, 5px 1px #3552c1, 18px 1px #ff1c1c, 19px 1px #ff1c1c, 22px 1px #ff1c1c, 23px 1px #ff1c1c, 3px 2px #3552c1, 8px 2px white, 13px 2px white, 17px 2px #ff1c1c, 18px 2px #ff1c1c, 19px 2px #ff1c1c, 20px 2px #ff1c1c, 21px 2px #ff1c1c, 22px 2px #ff1c1c, 23px 2px #ff1c1c, 24px 2px #ff1c1c, 3px 3px #3552c1, 9px 3px white, 12px 3px white, 17px 3px #ff1c1c, 18px 3px #ff1c1c, 19px 3px #ff1c1c, 20px 3px #ff1c1c, 21px 3px #ff1c1c, 22px 3px #ff1c1c, 23px 3px #ff1c1c, 24px 3px #ff1c1c, 3px 4px #3552c1, 10px 4px white, 11px 4px white, 17px 4px #ff1c1c, 18px 4px #ff1c1c, 19px 4px #ff1c1c, 20px 4px #ff1c1c, 21px 4px #ff1c1c, 22px 4px #ff1c1c, 23px 4px #ff1c1c, 24px 4px #ff1c1c, 3px 5px #3552c1, 10px 5px white, 11px 5px white, 18px 5px #ff1c1c, 19px 5px #ff1c1c, 20px 5px #ff1c1c, 21px 5px #ff1c1c, 22px 5px #ff1c1c, 23px 5px #ff1c1c, 1px 6px #3552c1, 2px 6px #3552c1, 3px 6px #3552c1, 4px 6px #3552c1, 5px 6px #3552c1, 9px 6px white, 12px 6px white, 19px 6px #ff1c1c, 20px 6px #ff1c1c, 21px 6px #ff1c1c, 22px 6px #ff1c1c, 8px 7px white, 13px 7px white, 20px 7px #ff1c1c, 21px 7px #ff1c1c, 1px 10px #3552c1, 4px 10px #3552c1, 10px 10px #3552c1, 16px 10px #3552c1, 1px 11px #3552c1, 4px 11px #3552c1, 10px 11px #3552c1, 12px 11px #3552c1, 16px 11px #3552c1, 1px 12px #3552c1, 4px 12px #3552c1, 10px 12px #3552c1, 16px 12px #3552c1, 1px 13px #3552c1, 2px 13px #3552c1, 3px 13px #3552c1, 4px 13px #3552c1, 6px 13px #3552c1, 7px 13px #3552c1, 8px 13px #3552c1, 10px 13px #3552c1, 12px 13px #3552c1, 14px 13px #3552c1, 15px 13px #3552c1, 16px 13px #3552c1, 18px 13px #3552c1, 19px 13px #3552c1, 20px 13px #3552c1, 23px 13px #3552c1, 25px 13px #3552c1, 1px 14px #3552c1, 4px 14px #3552c1, 6px 14px #3552c1, 8px 14px #3552c1, 10px 14px #3552c1, 12px 14px #3552c1, 14px 14px #3552c1, 16px 14px #3552c1, 18px 14px #3552c1, 20px 14px #3552c1, 23px 14px #3552c1, 25px 14px #3552c1, 1px 15px #3552c1, 4px 15px #3552c1, 6px 15px #3552c1, 8px 15px #3552c1, 10px 15px #3552c1, 12px 15px #3552c1, 14px 15px #3552c1, 16px 15px #3552c1, 18px 15px #3552c1, 20px 15px #3552c1, 23px 15px #3552c1, 25px 15px #3552c1, 1px 16px #3552c1, 4px 16px #3552c1, 6px 16px #3552c1, 7px 16px #3552c1, 8px 16px #3552c1, 10px 16px #3552c1, 12px 16px #3552c1, 14px 16px #3552c1, 15px 16px #3552c1, 16px 16px #3552c1, 18px 16px #3552c1, 19px 16px #3552c1, 20px 16px #3552c1, 21px 16px #3552c1, 23px 16px #3552c1, 24px 16px #3552c1, 25px 16px #3552c1, 25px 17px #3552c1, 23px 18px #3552c1, 24px 18px #3552c1, 25px 18px #3552c1;
`

const LoginLabel = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: center;
`

const svgStyle = {
  display: 'block',
  height: '35px',
  width: '45px',
  border: 'none',
  textAlign: 'center',
  verticalAlign: 'center',
  boxShadow: '0 2px 4px 0 rgba(0,0,0,.25)',
  fontSize: '16px',
  lineHeight: '48px',
  borderRadius: '1px',
  transition: 'background-color .218s, border-color .218s, box-shadow .218s',
  cursor: 'pointer',
  userSelect: 'none',
  backgroundColor: 'rgba(255,255,255,.95)',
  padding: '4px'
}

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
      <HateHoliday />
      <Bomber />
      <StyledLink
        href={`${process.env.REACT_APP_GITHUB_OAUTH_URL}?scope=user&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`}
      >
        <svg
          version="1.2"
          baseProfile="tiny"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 2350 2314.8"
          xmlSpace="preserve"
          style={svgStyle}
        >
          <path
            d="M1175,0C525.8,0,0,525.8,0,1175c0,552.2,378.9,1010.5,890.1,1139.7c-5.9-14.7-8.8-35.3-8.8-55.8v-199.8H734.4
	c-79.3,0-152.8-35.2-185.1-99.9c-38.2-70.5-44.1-179.2-141-246.8c-29.4-23.5-5.9-47,26.4-44.1c61.7,17.6,111.6,58.8,158.6,120.4
	c47,61.7,67.6,76.4,155.7,76.4c41.1,0,105.7-2.9,164.5-11.8c32.3-82.3,88.1-155.7,155.7-190.9c-393.6-47-581.6-240.9-581.6-505.3
	c0-114.6,49.9-223.3,132.2-317.3c-26.4-91.1-61.7-279.1,11.8-352.5c176.3,0,282,114.6,308.4,143.9c88.1-29.4,185.1-47,284.9-47
	c102.8,0,196.8,17.6,284.9,47c26.4-29.4,132.2-143.9,308.4-143.9c70.5,70.5,38.2,261.4,8.8,352.5c82.3,91.1,129.3,202.7,129.3,317.3
	c0,264.4-185.1,458.3-575.7,499.4c108.7,55.8,185.1,214.4,185.1,331.9V2256c0,8.8-2.9,17.6-2.9,26.4
	C2021,2123.8,2350,1689.1,2350,1175C2350,525.8,1824.2,0,1175,0L1175,0z"
          />
        </svg>
        <LoginLabel>Sign in with GitHub</LoginLabel>
      </StyledLink>
      <LoadingScreen loading={auth.loading} />
    </Container>
  )
}

export default Login
