import { useEffect, useState, useRef } from 'react'
import { type User } from './types'

import UsersList from './components/UsersList'
import ButtonBar from './components/ButtonsBar'

import './App.css'

function App() {
  const originalUsers = useRef<User[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [bgColor, setBgColor] = useState<boolean>(false)
  const [orderByCountry, setOrderByCountry] = useState<boolean>(false)
  const [filterCountry, setFilterCountry] = useState<string>('')
  
  useEffect(() => {
    fetch('https://randomuser.me/api?results=10')
    .then(response => response.json())
    .then(response => {
      setUsers(response.results)
      originalUsers.current = response.results
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

  const handleDelete = (uuid:string) => {
    const filteredUsers = users.filter(user => user.login.uuid !== uuid)
    setUsers(filteredUsers)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  const filteredUsers = filterCountry 
    ? users.filter(user => {
      return user.location.country.toLowerCase().includes(filterCountry.toLocaleLowerCase())
    })
    : users
  

  const sortedUsers = orderByCountry
    ? [...filteredUsers].sort((a, b) => {
      return a.location.country.localeCompare(b.location.country)
    })
    : filteredUsers

  return (
    <>
      <h1>App</h1>
      <div className='container'>
        <ButtonBar
          toggleBgColor={toggleBgColor}
          toggleOrderByCountry={toggleOrderByCountry}
          handleReset={handleReset}
          setFilterCountry={setFilterCountry}
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
