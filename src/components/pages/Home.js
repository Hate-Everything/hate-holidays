import React, { useContext, useState } from 'react'
import { AuthContext } from '../../core/Auth'
import LoadingScreen from '../LoadingScreen'

function Home() {
  const auth = useContext(AuthContext)
  const [value, setValue] = useState('')

  const handleSubmit = () => {}

  return (
    <div>
      <LoadingScreen loading={auth.loading} />
      home
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default Home
