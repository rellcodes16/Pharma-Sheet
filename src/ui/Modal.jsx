import { cloneElement, createContext, useContext, useState } from "react"
import { createPortal } from "react-dom"
import { HiXMark } from 'react-icons/hi2'
import { useOutsideClick } from "./useOutsideClick"

const ModalContext = createContext()

function Modal({ children }) {
    const [openModal, setOpenModal] = useState("")

    const close = () => setOpenModal("")
    const open = setOpenModal;

  return (
    <ModalContext.Provider value={{ close, open, openModal}}>
        {children}
    </ModalContext.Provider>
  )
}

function Open({ children, openModalName }){
    const { open } = useContext(ModalContext)

    return cloneElement(children, { onClick: () => open(openModalName) })
}

function Window({ children, name }){
    const {openModal, close} = useContext(ModalContext)

    const { ref } = useOutsideClick(close)

    if(name !== openModal) return null;

    return createPortal(
        <div className="fixed top-0 left-0 w-full h-full z-40 transition-all backdrop-blur-sm">
            <div ref={ref} className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-gray-50 rounded-lg shadow-lg py-[3.2rem] px-[4rem] transition-all dark:bg-slate-700">
                <button onClick={close} className="bg-none border-none p-2 rounded-sm translate-x-3 transition absolute top-5 right-8 hover:bg-gray-100"><HiXMark /></button>
                <div>{cloneElement (children, {onCloseModal: close})}</div>
            </div>
        </div>,
        document.body
    )
}

Modal.Open = Open
Modal.Window = Window

export default Modal

