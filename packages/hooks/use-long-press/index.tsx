import { RefObject } from 'react'
import { useEvent } from '../use-event'
import { useTimeout } from '../use-timeout'

export const useLongPress = (
	ref: RefObject<Element>,
	callback: Function,
	delay?: number
) => {
	const { reset, clear } = useTimeout(callback, delay)

	useEvent('mousedown', reset, ref.current)
	useEvent('mouseup', clear, ref.current)
	useEvent('mouseleave', clear, ref.current)

	useEvent('touchstart', reset, ref.current)
	useEvent('touchend', clear, ref.current)
}
