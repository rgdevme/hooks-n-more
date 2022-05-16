import { useLayoutEffect } from 'react'

export const useLockBodyScroll = (...args: [locked?: boolean]) => {
	let body = document.body
	const overflow = () => getComputedStyle(body).overflow
	let original = overflow()

	const lock = () => {
		body.style.overflow = 'hidden'
	}
	const unlock = () => {
		body.style.overflow = original
	}

	useLayoutEffect(() => {
		if (overflow() === 'hidden') unlock()
		else lock()
		return unlock
	}, args)
}
