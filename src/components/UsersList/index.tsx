import { User } from "../../types"

interface Props {
    users: User[]
}

const UsersList = ({ users }: Props) => {
  return (
    <table width='100%'>
        <thead>
            <tr>
                <th>Photo</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Country</th>
                <th>Actions</th>
            </tr>
        </thead>

        <tbody>
            {
                users.map(user => (
                    <tr key={user.login.uuid}>
                       <td>
                        <img src={user.picture.thumbnail} alt={user.name.title} />
                       </td> 
                       <td>{user.name.first}</td> 
                       <td>{user.name.last}</td> 
                       <td>{user.location.country}</td> 
                       <td>
                        <button>Delete</button>
                       </td> 
                    </tr>
                ))
            }
        </tbody>
    </table>
  )
}

export default UsersList