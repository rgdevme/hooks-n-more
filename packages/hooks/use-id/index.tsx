export const useID = (separator: string = '-') => {
	const generate = (...args: (string | number)[]) =>
		args.map(a => a.toString()).join(separator)
	return { generate }
}
