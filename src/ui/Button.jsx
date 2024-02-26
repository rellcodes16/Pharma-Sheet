const Button = ({ children, disabled, type, onClick, value }) => {

    const base = "p-2 rounded-md mb-3 text-gray-600 inline-block cursor:pointer"

    const styles = {
        reset: base + '  bg-gray-400 dark:text-gray-900',
        primary: base + ' bg-green-700 hover:bg-green-800 text-white',
        disabled: base + ' bg-gray-500 text-white',
        danger: base + ' bg-red-500 text-white',
        notify: base + ' bg-none text-red-800'
    }

    
  if(onClick)
  return (
    <button
        onClick={onClick}
        disabled={disabled}
        className={styles[type]}
        value={value}
    >
        {children}
    </button>
  )

  return (
    <button disabled={disabled} onClick={onClick} className={styles[type]}>
        {children}
    </button>
  )
}

export default Button