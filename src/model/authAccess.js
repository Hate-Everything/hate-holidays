import axios from 'axios'

const login = (code) => {
  const url = `${process.env.REACT_APP_API_URL}/authenticate`
  return axios.post(url, { code })
}

const getProfile = (token) => {
  const url = `${process.env.REACT_APP_GITHUB_PROFILE}`
  return axios.get(url, {
    headers: {
      Authorization: `token ${token}`,
    },
  })
}

export default {
  login,
  getProfile,
}
