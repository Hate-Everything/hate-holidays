export const holidays = [
  {
    date: '2022-07-13',
    name: '​วันอาสาฬหบูชา',
  },
  {
    date: '2022-07-28',
    name: '​วันเฉลิมพระชนมพรรษาพระบาทสมเด็จพระเจ้าอยู่หัว',
  },
  {
    date: '2022-07-29',
    name: 'วันหยุดพิเศษ',
  },
  {
    date: '2022-08-12',
    name: 'วันแม่',
  },
  {
    date: '2022-10-13',
    name: '​วันคล้ายวันสวรรคตพระบาทสมเด็จพระบรมชนกาธิเบศรมหาภูมิพลอดุลยเดชมหาราช บรมนาถบพิตร',
  },
  {
    date: '2022-10-14',
    name: 'วันหยุดพิเศษ',
  },
  {
    date: '2022-10-24',
    name: '​ชดเชยวันปิยมหาราช',
  },
  {
    date: '2022-12-05',
    name: 'วันพ่อ',
  },
  {
    date: '2022-12-12',
    name: 'ชดเชยวันรัฐธรรมนูญ',
  },
]

export const holidaysMapping = holidays.reduce((acc, holiday) => {
  const { date, name } = holiday
  return { ...acc, [date]: name }
}, {})

export const holidaysDates = holidays.map((holiday) => holiday.date)
