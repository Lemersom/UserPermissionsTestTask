import './App.css'
import { useContext, useState } from 'react'
import { AppContext }  from './context/appContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function App() {

  const [firstName, setFirstName] = useState("")

  const context = useContext(AppContext)
  const navigate = useNavigate()

  const fetchUser = async () => {
    setFirstName(firstName)
    
    try {
      const response = await axios.get(`http://localhost:3000/user/fetch/${firstName}`)
      
      context.setUser(response.data)
      console.log(response.data)
      await fetchUserResponse(response.data)
      
      navigate('/user')
    }
    catch(err) {
      console.log('Error fetching user: ' + err)
    }
  }

  const fetchUserResponse = async (user) => {
    try {
      const response = await axios.get(`http://localhost:3000/user/${user.id}`)
      
      context.setUserResponse(response.data)
      console.log(response.data)
    }
    catch(err) {
      console.log('Error fetching user: ' + err)
    }
  }

  return (
    <>
      <div>
        <label htmlFor="firstname">First Name: </label>
        <input type="text" id='firstname' onChange={(event) => setFirstName(event.target.value)}/>
        <button onClick={fetchUser}>Fetch</button>
      </div>
    </>
  )
}

export default App
