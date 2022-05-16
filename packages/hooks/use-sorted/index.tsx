import { useState, useEffect } from 'react'
import { useToggle } from '../use-toggle'

type Value = JSX.Element | string | number | boolean

export const useSorted = <
	T extends {
		property: keyof T
		value: Value
		alt: string
		link: string
	}[]
>(
	items: T[],
	identifier: keyof T,
	ascending: boolean = false
) => {
	const [key, setKey] = useState(identifier)
	const { value: direction, toggle } = useToggle(ascending)
	const [sorted, setSorted] = useState<T[]>([])

	const sortBy = (property: keyof T) => setKey(property)

	const typeIs = (
		type: 'string' | 'boolean' | 'function' | 'number' | 'object' | 'undefined',
		a: any,
		b: any
	) => typeof a == type && typeof b == type

	const sort = () => {
		if (items.length > 0) {
			let sorted = [...items]
			sorted.sort((...args) => {
				let compare_items = [...args]
				let compare_properties: Value[] = []

				compare_items.forEach(ci => {
					let prop = ci.find(c => c.property === key)
					if (!!prop) compare_properties.push(prop.value)
				})

				let [a, b] = compare_properties
				if (typeof a !== typeof b) return 0
				else if (typeIs('number', a, b)) {
					let [a, b] = compare_properties as number[]
					return a - b
				} else if (typeIs('boolean', a, b)) {
					let [a, b] = compare_properties as boolean[]
					return a === b ? 0 : a ? -1 : 1
				} else if (typeIs('string', a, b)) {
					let [a, b] = compare_properties as string[]
					return a.localeCompare(b)
				} else {
					return a.toString().localeCompare(b.toString())
				}
			})
			if (direction) sorted.reverse()
			setSorted(sorted)
		}
	}

	useEffect(() => {
		sort()
	}, [key, items, direction])

	return {
		sorted,
		reverse: toggle,
		key,
		sortBy,
		direction
	}
}
