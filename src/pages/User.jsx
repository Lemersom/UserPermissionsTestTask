import { useContext, useEffect } from "react";
import { AppContext } from "../context/appContext";
import { useNavigate } from 'react-router-dom'

const User = () => {

    const { userResponse, user } = useContext(AppContext)

    const navigate = useNavigate();

    return (
        <>
            {userResponse && 
                <>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                        <p>{ userResponse.user.firstname }</p>
                        {
                            user.isEditor || user.canEditFirstName ?
                                <button onClick={
                                    () => navigate('/user/update', {state: {firstName: user.firstName}})
                                }>Update</button>
                            : null
                        }
                    </div>

                    <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                        <p>{ userResponse.user.email }</p>
                        {
                            user.isEditor || user.canEditEmail ?
                                <button onClick={
                                    () => navigate('/user/update', {state: {email: user.email}})
                                }>Update</button>
                            : null
                        }
                    </div>

                    {
                        userResponse.permissions.map(permission => (
                            <p>{permission}</p>
                        ))
                    }
                </>
            }
            
            <button onClick={() => navigate('/')}>Go Back</button>

        </>
    )
}

export default User;