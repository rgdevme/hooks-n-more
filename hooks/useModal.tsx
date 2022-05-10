import { FunctionComponent } from 'react'
import ModalComponent, { ModalProps } from '../components/Modal'
import useToggle from './useToggle'

const useModal = (initialState: boolean = false) => {
	const { value: active, off: close, on: open } = useToggle(initialState)

	let bind = { active, close }
	let Modal: FunctionComponent = (props: ModalProps) => <ModalComponent {...bind} {...props} />

	return {
		close,
		open,
		Modal
	}
}

export default useModal
