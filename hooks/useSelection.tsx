import { useState } from 'react'

const useSelection = <T,>(
	items: T[],
	identifier: keyof T,
	initial: T[] = [],
	multiple: boolean = false
) => {
	const [all, refresh] = useState(items)
	const [selected, set] = useState(initial)

	const verify = (item: T) => {
		let index = selected.findIndex(i => i[identifier] === item[identifier])
		return { index, status: index >= 0 }
	}

	const fill = () => set(all)
	const reset = () => set(initial)
	const clear = () => set([])

	const select = (item: T) => {
		let { index, status } = verify(item)
		if (multiple) {
			let seleciton_update = [...selected]
			if (status) seleciton_update.splice(index, 1)
			else seleciton_update.push(item)
			set(seleciton_update)
		} else {
			if (status) clear()
			else set([item])
		}
	}

	return {
		clear,
		fill,
		refresh,
		reset,
		select,
		selected,
		verify
	}
}

export default useSelection
