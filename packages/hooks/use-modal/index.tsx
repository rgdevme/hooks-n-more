import { FunctionComponent } from 'react'
import { useToggle } from '../use-toggle'
import ModalComponent, { ModalProps } from './component'

export const useModal = (initialState: boolean = false) => {
	const {
		value: active,
		off: close,
		on: open,
		toggle
	} = useToggle(initialState)

	let bind = { active, close }
	let Modal: FunctionComponent<ModalProps> = props => (
		<ModalComponent {...bind} {...props} />
	)

	return {
		close,
		open,
		toggle,
		active,
		Modal
	}
}
