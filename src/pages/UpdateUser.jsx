import { useContext, useState } from "react";
import { AppContext } from "../context/appContext";
import { useNavigate, useLocation } from "react-router-dom"
import axios from 'axios'

const UpdateUser = () => {

    const [newValue, setNewValue] = useState("")

    const { user } = useContext(AppContext)
    const navigate = useNavigate()
    const location = useLocation()

    const { state } = location
    const firstName = state && state.firstName;
    const email = state && state.email;

    const updateFirstName = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/user/${user.id}/firstName`, {
                firstName: newValue
            })
            
            navigate('/')
          }
          catch(err) {
            console.log('Error fetching user: ' + err)
          }
    }

    const updateEmail = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/user/${user.id}/email`, {
                email: newValue
            })
            
            navigate('/')
          }
          catch(err) {
            console.log('Error fetching user: ' + err)
          }
    }

    return (
        <>
            {firstName ?
                <>
                    <p>{ firstName }</p>
                    <input type="text" onChange={(event) => setNewValue(event.target.value)}/>
                    <button onClick={updateFirstName}>Update</button>
                </>

            : null
            }

            {email ? 
                <>
                    <p>{ email }</p>
                    <input type="text" onChange={(event) => setNewValue(event.target.value)}/>
                    <button onClick={updateEmail}>Update</button>
                </>

            : null
            }

            <br />
            <button onClick={() => navigate(-1)}>Go Back</button>
        </>
    )
}

export default UpdateUser;