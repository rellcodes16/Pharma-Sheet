import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiCalendar, HiEllipsisVertical } from "react-icons/hi2";
import { useOutsideClick } from "./useOutsideClick";

const MenuContext = createContext();

function Menu({ children }) {
    const [openMenuId, setOpenMenuId] = useState("");
    const [position, setPosition] = useState(null);

    const open = setOpenMenuId;
    const close = () => setOpenMenuId("");

    return (
        <MenuContext.Provider value={{ openMenuId, position, setPosition, open, close }}>
            {children}
        </MenuContext.Provider>
    );
}

function Toggle({ id, name }) {
    const { setPosition, open, close, openMenuId } = useContext(MenuContext);

    function handleToggle(e) {
        e.stopPropagation()
        const toggleRect = e.target.closest('button').getBoundingClientRect();
        setPosition({
            x: window.innerWidth - toggleRect.width - toggleRect.x,
            y: toggleRect.y + toggleRect.height + 8
        });
        openMenuId === "" || openMenuId !== id ? open(id) : close();
    }

    return (
        <button onClick={handleToggle} className="bg-none border-none p-2 rounded-sm transform translate-x-3 transition-all">
            {name ? <HiCalendar className="text-3xl mb-2"/> : (<HiEllipsisVertical />)}
        </button>
    );
}


function List({ id, children, name }) {
    const { openMenuId, position, close } = useContext(MenuContext);

    const { ref } = useOutsideClick(close, false)

    if(!position) return null

    const { x, y } = position

    if (openMenuId !== id) return null;

    return createPortal(
        <div className={`fixed ${!name && 'shadow-md rounded-md z-10 bg-gray-100 p-4'}`} style={{ right: x, top: y }} ref={ref}>{children}</div>, document.body
    );
}


function Button({ children, icon, onClick }) {
    const { close } = useContext(MenuContext);

    function handleClick() {
        onClick?.();
        close();
    }

    return <li className="list-none">
        <button onClick={handleClick} className="w-full text-left bg-none border-none transition-all flex items-center gap-3">{icon}<span>{children}</span></button>
    </li>;
}

export { Menu, Toggle, List, Button };

