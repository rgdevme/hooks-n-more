import { useState } from 'react'

export const useSwitch = <T extends object>(initial: T) => {
	const [value, set] = useState(initial)

	const reset = () => set(initial)
	const toggle = (state: T) => {
		let string_a = JSON.stringify(value)
		let string_b = JSON.stringify(state)

		if (string_a == string_b) set(initial)
		else set(state)
	}

	return { value, set, reset, toggle }
}

