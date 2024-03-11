import { HiOutlineBell, HiOutlineUser } from "react-icons/hi2";
import IconButton from "./IconButton";
import AppColorMode from "./AppColorMode";
import Logout from "../features/Authentication/Logout";
import { useNavigate } from "react-router-dom";

function HeaderOptions() {
    const navigate = useNavigate();

    return (
        <ul className="flex justify-end items-center gap-4 py-3">
            <li>
                <IconButton onClick={() => navigate('/updateuserdata')}>
                    <HiOutlineUser className="text-gray-600 dark:text-gray-300 text-2xl cursor-pointer hover:text-green-600 active:text-green-600"/>
                </IconButton>
            </li>
            <li>
                <AppColorMode/>
            </li>
            <li>
                <IconButton onClick={() => navigate('/notification')}>
                    <HiOutlineBell className="text-gray-600 relative dark:text-gray-300 text-2xl cursor-pointer hover:text-green-600 active:text-green-600"/>
                    {/* <div className="dot">{unreadMessages.length}</div> */}
                </IconButton>
            </li>
            <li>
                <Logout/>
            </li>
        </ul>
    );
}

export default HeaderOptions;
