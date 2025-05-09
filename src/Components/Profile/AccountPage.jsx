import { useParams } from "react-router-dom";
import UserMenu from "./UserMenu.jsx";
import FavouritesList from "./FavouritesList.jsx";
import GoingList from "./GoingList.jsx";
import MyEventsList from "./MyEventsList.jsx";
import CreateEvent from "./CreateEvent.jsx";
import LogOut from "./LogOut.jsx";
import UserProfile from "./UserProfile.jsx";
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../Contexts/UserContext.jsx"
import useScreenWidth from "../../Custom Hooks/useScreenWidth.jsx"
import "./CSS/Profile.css"

const componentMap = {
    favourites: FavouritesList,
    going: GoingList,
    myevents: MyEventsList,
    create: CreateEvent,
    logout: LogOut
  };

export default function AccountPage() {
    const { item } = useParams();
    const Component = componentMap[item];
    const { user } = useContext(UserContext)
    const screenWidth = useScreenWidth()
    const [showNav, setShowNav] = useState(true)

    useEffect(() => {
      if (screenWidth < 701) {
        setShowNav(false)
      }
      if (screenWidth >= 701) {
        setShowNav(true)
      }
    }, [screenWidth])

    if (Component) {
        return (
            <div className="account-page-container">
            {showNav ? <UserMenu user={user} /> : <></>}
            <div className="user-container">
            <Component user={user} />
            </div>
            </div>
          )
    }
  return (
    <div className="account-page-container">
    {showNav ? <UserMenu user={user} /> : <></>}
    <div className="user-container">
    <UserProfile user={user} />
    </div>
    </div>
  )
}
