import { useState } from 'react'

function useInput(initialState) {
    
    const [input, setInput] = useState(initialState);
    const handleInput = (e) => {
        e.preventDefault()
        const target = e.target
        setInput( oldInput => {
            return {...oldInput, [target.name]: target.value}
        })
    }

    const resetInput = () => setInput(initialState)

    return [input, handleInput, resetInput, setInput]
}

export default useInput;