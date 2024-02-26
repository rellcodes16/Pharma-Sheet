import { createContext, useEffect, useContext } from "react"
import { useLocalStorage } from "../../hooks/useLocalStorage"

const ModeContext = createContext()


function ModeProvider({ children }){
    const [isDarkMode, setIsDarkMode] = useLocalStorage('isDark')

    useEffect(function(){
        if(isDarkMode){
            document.documentElement.classList.add('dark')
            document.documentElement.classList.remove('light')
        }
        else{
            document.documentElement.classList.add('light')
            document.documentElement.classList.remove('dark')
        }
    })

    function toggleMode(){
        setIsDarkMode((isDark) => !isDark)
    }
    return <ModeContext.Provider value={{
        isDarkMode,
        toggleMode
    }}>
        {children}
    </ModeContext.Provider>
}

function useDarkMode(){
    const context = useContext(ModeContext)

    if(context === undefined)
        throw new Error ('DarkModeContext was used outside of DarkModeProvider')

    return context
}

export { ModeProvider, useDarkMode }

