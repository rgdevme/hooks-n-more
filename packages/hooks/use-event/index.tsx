import { RefObject, useEffect, useRef } from 'react'

export const useEvent = (
	event: string,
	callback: EventListener,
	element: RefObject<Element>['current'] | Window = window
) => {
	const cb = useRef(callback)

	useEffect(() => {
		cb.current = callback
	}, [])

	useEffect(() => {
		if (!element || !element?.addEventListener) return
		const handler: EventListener = e => cb.current(e)
		element.addEventListener(event, handler)
		return () => element.removeEventListener(event, handler)
	}, [event, element])
}

