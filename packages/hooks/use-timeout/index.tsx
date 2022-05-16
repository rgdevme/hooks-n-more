import { useCallback, useEffect, useRef } from 'react'

export const useTimeout = (
	callback: Function,
	delay: number = 250,
	autorun: boolean = false
) => {
	const cb = useRef(callback)
	const timeout = useRef<NodeJS.Timeout>()
	const rerender = useRef(autorun)

	useEffect(() => {
		cb.current = callback
	}, [callback])

	const set = useCallback(() => {
		timeout.current = setTimeout(() => cb.current(), delay)
	}, [delay])

	const clear = useCallback(() => {
		timeout.current && clearTimeout(timeout.current)
	}, [])

	const reset = useCallback(() => {
		clear()
		set()
	}, [clear, set])

	useEffect(() => {
		if (rerender.current) set()
		else rerender.current = true
		return clear
	}, [delay, set, clear])

	return { reset, clear }
}

