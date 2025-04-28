import { useParams } from "react-router-dom";
import UserMenu from "./UserMenu.jsx";
import FavouritesList from "./FavouritesList.jsx";
import GoingList from "./GoingList.jsx";
import MyEventsList from "./MyEventsList.jsx";
import CreateEvent from "./CreateEvent.jsx";
import LogOut from "./LogOut.jsx";
import UserProfile from "./UserProfile.jsx";

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

    if (Component) {
        return (
            <div>
            <UserMenu />
            <Component />
            </div>
          )
    }
  return (
    <div>
    <UserMenu />
    <UserProfile />
    </div>
  )
}
