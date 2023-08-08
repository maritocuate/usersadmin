import { useEffect, useState } from 'react'
import { type User } from './types'

import UsersList from './components/UsersList'
import ButtonBar from './components/ButtonsBar'

import './App.css'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [bgColor, setBgColor] = useState<boolean>(false)
  
  useEffect(() => {
    fetch('https://randomuser.me/api?results=10')
    .then(response => response.json())
    .then(response => {
      setUsers(response.results)
    })
    .catch(error => {
      console.error(error)
    })
  }, [])

  const toggleBgColor = () => {
    setBgColor(!bgColor)
  }

  return (
    <>
      <h1>App</h1>
      <div className='container'>
        <ButtonBar
          toggleBgColor={toggleBgColor}
        />
        <UsersList users={users} bgColor={bgColor} />
      </div>
    </>
  )
}

export default App
