import { useEffect, useState } from 'react'
import { type User } from './types'

import UsersList from './components/UsersList'
import ButtonBar from './components/ButtonsBar'

import './App.css'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [bgColor, setBgColor] = useState<boolean>(false)
  const [orderByCountry, setOrderByCountry] = useState<boolean>(false)
  
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
    setBgColor(bgColor => !bgColor)
  }

  const toggleOrderByCountry = () => {
    setOrderByCountry(orderByCountry => !orderByCountry)
  }

  const sortedUsers = orderByCountry
    ? [...users].sort((a, b) => {
      return a.location.country.localeCompare(b.location.country)
    })
    : users

  const handleDelete = (uuid:string) => {
    const filteredUsers = users.filter(user => user.login.uuid !== uuid)
    setUsers(filteredUsers)
  }

  return (
    <>
      <h1>App</h1>
      <div className='container'>
        <ButtonBar
          toggleBgColor={toggleBgColor}
          toggleOrderByCountry={toggleOrderByCountry}
        />
        <UsersList
          users={sortedUsers}
          bgColor={bgColor}
          handleDelete={handleDelete}
        />
      </div>
    </>
  )
}

export default App
