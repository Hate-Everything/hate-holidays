export const getCurrentDate = (currentDate) => {
  let date = currentDate || new Date()
  const offset = date.getTimezoneOffset()
  date = new Date(date.getTime() - offset * 60 * 1000)
  return date.toISOString().split('T')[0]
}

export const getLastDayOfYear = () => {
  return getCurrentDate(new Date(new Date().getFullYear(), 11, 31))
}
