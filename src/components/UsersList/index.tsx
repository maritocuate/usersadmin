import { SortBy, User } from "../../types.d"

interface Props {
    users: User[]
    bgColor: boolean
    handleDelete: (uuid:string) => void
    handleChangeOrder: (type:SortBy) => void
}

const UsersList = ({ users, bgColor, handleDelete, handleChangeOrder }: Props) => {
  return (
    <table width='100%'>
        <thead>
            <tr>
                <th>Photo</th>
                <th
                    className="set-order"
                    onClick={() => handleChangeOrder(SortBy.FIRST)}
                >First Name</th>
                <th
                    className="set-order"
                    onClick={() => handleChangeOrder(SortBy.LAST)}
                >Last Name</th>
                <th
                    className="set-order"
                    onClick={() => handleChangeOrder(SortBy.COUNTRY)}
                >Country</th>
                <th>Actions</th>
            </tr>
        </thead>

        <tbody>
            {
                users.map((user, index) => {
                    const bg = index%2===0 ? '#444' : '#222'
                    const color = bgColor ? bg : 'transparent' 

                    return (
                        <tr key={user.login.uuid}
                            style={{ backgroundColor:color }}
                        >
                           <td>
                            <img src={user.picture.thumbnail} alt={user.name.title} />
                           </td> 
                           <td>{user.name.first}</td> 
                           <td>{user.name.last}</td> 
                           <td>{user.location.country}</td> 
                           <td>
                            <button
                                onClick={() => handleDelete(user.login.uuid)}
                            >Delete</button>
                           </td> 
                        </tr>
                    )
                })
            }
        </tbody>
    </table>
  )
}

export default UsersList