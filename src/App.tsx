import { useEffect, useState } from 'react'
import { type User } from './types'

import './App.css'

function App() {
  const [users, setUsers] = useState<User[]>([])
  
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

  return (
    <>
      <h1>App</h1>
      {
        JSON.stringify(users)
      }
    </>
  )
}

export default App
