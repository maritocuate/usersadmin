import { useEffect, useState, useRef, useMemo } from 'react'
import { SortBy, type User } from './types.d'

import UsersList from './components/UsersList'
import ButtonBar from './components/ButtonsBar'

import './App.css'

function App() {
  const originalUsers = useRef<User[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [bgColor, setBgColor] = useState<boolean>(false)
  const [orderBy, setOrderBy] = useState<SortBy>(SortBy.EMPTY)
  const [filterCountry, setFilterCountry] = useState<string>('')
  
  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
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
    const orderValue = orderBy===SortBy.EMPTY ? SortBy.COUNTRY : SortBy.EMPTY
    setOrderBy(orderValue)
  }

  const handleDelete = (uuid:string) => {
    const filteredUsers = users.filter(user => user.login.uuid !== uuid)
    setUsers(filteredUsers)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  const handleChangeOrder = (type:SortBy) => {
    setOrderBy(type)
  }

  const filteredUsers = useMemo(() => {
    return filterCountry
      ? users.filter(user => {
        return user.location.country.toLowerCase().includes(filterCountry.toLocaleLowerCase())
      })
      : users
  }, [users, filterCountry])

  const sortedUsers = useMemo(() => {
    if(orderBy===SortBy.EMPTY) return filteredUsers

    const compareProperties: Record<string, (user:User) => any> = {
      [SortBy.FIRST]: user => user.name.first,
      [SortBy.LAST]: user => user.name.last,
      [SortBy.COUNTRY]: user => user.location.country,
    }
    return [...filteredUsers].sort((a, b) => {
      const extractProperty = compareProperties[orderBy]
      return extractProperty(a).localeCompare(extractProperty(b))
    })
  }, [filteredUsers, orderBy])

  return (
    <>
      <h1>Users Admin</h1>
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
          handleChangeOrder={handleChangeOrder}
        />
      </div>
    </>
  )
}

export default App
