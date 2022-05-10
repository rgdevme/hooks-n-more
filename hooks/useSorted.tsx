import { useState, useEffect } from 'react'

const useSorted = <T extends string | number | boolean>(
	items: T[],
	identifier?: keyof T,
	ascending: boolean = false
) => {
	const [key, sortBy] = useState(identifier)
	const [direction, setOrder] = useState(ascending)
	const [sorted, setSorted] = useState<T[]>([])

	const reverse = () => setOrder(prev => !prev)

	const sort = () => {
		let sorted = [...items]
		let item = !!key ? items[0][key] : items[0]

		sorted.sort((...args) => {
			let params = ascending ? args.reverse() : args
			if (!!key && typeof items == 'object')
				params = params.map(param => param[key]) as unknown as T[]
			let a, b
			switch (typeof item) {
				case 'number':
					;[a, b] = params as number[]
					return a - b
				case 'boolean':
					;[a, b] = params as boolean[]
					return a === b ? 0 : a ? -1 : 1
				case 'string':
				default:
					;[a, b] = params as string[]
					return a.localeCompare(b)
			}
		})

		setSorted(sorted)
	}

	useEffect(() => {
		sort()
	}, [key, direction, items])

	return {
		sorted,
		reverse,
		key,
		sortBy,
		direction
	}
}

export default useSorted
