import { useEffect, useRef } from 'react'

export const useRenderCount = () => {
	const count = useRef(1)
	useEffect(() => {
		count.current++
	})
	return { count: count.current, first: count.current === 1 }
}
