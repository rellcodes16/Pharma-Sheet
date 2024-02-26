function IconButton({ children, disabled, onClick }) {
  return (
    <button className="bg-transparent outline-none border-none p-2 rounded-sm transition-all" disabled={disabled} onClick={onClick}>
        {children}
    </button>
  )
}

export default IconButton