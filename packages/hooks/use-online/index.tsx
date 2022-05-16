import { useEvent } from '../use-event'
import { useToggle } from '../use-toggle'

export const useOnline = () => {
	const { value, on, off } = useToggle(navigator?.onLine || true)

	useEvent('online', on)
	useEvent('offline', off)

	return {
		status: value,
		goOnline: on,
		goOffline: off
	}
}
