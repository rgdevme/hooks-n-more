export const useDeepCompare = () => {
	const compare = (a: any, b: any): boolean => {
		if (!!a && !!b && typeof a !== typeof b) return false

		if (!Array.isArray(a) && typeof a !== 'object') {
			return a.toString() === b.toString()
		} else if (Array.isArray(a)) {
			if (a.length !== b.length) return false

			let control: undefined[] = []
			control.length = a.length

			let result = control
				.map((v, i) => {
					return compare(a[i], b[i])
				})
				.every(v => v)
			return result
		} else {
			let { length: a_k } = Object.keys(a)
			let { length: b_k } = Object.keys(b)
			let control = Object.keys({ ...a, ...b })

			if (a_k !== control.length || b_k !== control.length) return false

			let result = control
				.map(key => {
					return compare(a[key], b[key])
				}, true)
				.every(v => v)

			return result
		}
	}
	return compare
}
