import { useEffect, useRef } from 'react'
import { useLog } from '../use-log'
import { useRenderCount } from '../use-render-count'

export const useDebugData = (name: string, props: { [key: string]: any }) => {
	const log = useLog()
	const count = useRenderCount()
	const previousProps = useRef<typeof props>({})
	const changedProps = useRef<typeof props>({})
	const lastRender = useRef(Date.now())

	const getInfo = () => ({
		count,
		change: changedProps.current,
		time: { now: lastRender.current, past: Date.now() - lastRender.current }
	})

	const update = () => {
		changedProps.current = Object.keys({ ...props, ...previousProps }).reduce(
			(obj, key) => {
				let from = previousProps.current[key]
				let to = props[key]
				let result: typeof props = { ...obj }
				if (from != to) result[key] = { from, to }
				return result
			},
			{}
		)

		let info = getInfo()

		previousProps.current = props
		lastRender.current = Date.now()

		return info
	}

	useEffect(() => {
		log('[debug]', name, update())
	})
}
