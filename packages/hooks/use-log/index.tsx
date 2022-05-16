export const useLog = (
	dev: boolean = process.env.NODE_ENV === 'development'
) => {
	let logit: typeof console.log = () => {}
	if (dev) {
		logit = (message, ...args) => console.log(message, ...args)
	}
	return logit
}
