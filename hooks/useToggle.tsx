import { useState } from 'react'

const useToggle = (initial: boolean = false) => {
	const [value, set] = useState(initial)

	const off = () => set(false)
	const on = () => set(true)
	const toggle = () => set(prev => !prev)

	return { value, on, off, toggle }
}

export default useToggle
