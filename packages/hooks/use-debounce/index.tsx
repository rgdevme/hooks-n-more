import { useEffect, useState } from 'react'
import { useTimeout } from '../use-timeout'

export const useDebounce = (value: string, delay?: number) => {
	const [debounced, setDebounce] = useState(value)
	const { reset } = useTimeout(() => setDebounce(value), delay)
	useEffect(reset, [value, reset])
	return debounced
}
