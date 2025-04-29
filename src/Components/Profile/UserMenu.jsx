import { Link } from "react-router-dom";



export default function UserMenu({user}) {
    
    return (
        <div className="menu-container">
            <Link to={"/account"}>
            <h3>Account</h3>
            </Link>
            <Link to={"/account/favourites"}>
            <h3>Favourites</h3>
            </Link>
            <Link to={"/account/going"}>
            <h3>Going</h3>
            </Link>
            {user.is_staff ? <Link to={"/account/myevents"}>
            <h3>My Events</h3>
            </Link> : <></>}
            {user.is_staff ? <Link to={"/account/create"}>
            <h3>Create New Event</h3>
            </Link> : <></>}
            <Link to={"/account/logout"}>
            <h3>Log Out</h3>
            </Link>
        </div>
    )
}
