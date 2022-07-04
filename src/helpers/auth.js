const localStorageKey = process.env.REACT_APP_TOKEN_KEY

function getToken() {
  return window.localStorage.getItem(localStorageKey)
}

function setToken(token) {
  return window.localStorage.setItem(localStorageKey, token)
}

function removeToken() {
  return window.localStorage.removeItem(localStorageKey)
}

export { getToken, setToken, removeToken }
