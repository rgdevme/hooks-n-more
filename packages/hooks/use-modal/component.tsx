import { FunctionComponent, PropsWithChildren, SyntheticEvent } from 'react'
import { useLockBodyScroll } from '../use-lock-body-scroll'

export interface ModalProps
	extends PropsWithChildren<{
		icons?: {
			close?: FunctionComponent<{ onClick: Function }>
			done?: FunctionComponent<{ onClick: Function }>
		}
		onSuccess?: () => any | Promise<any>
		onFailure?: () => any | Promise<any>
		backlayer?: boolean
	}> {}

interface Modal
	extends FunctionComponent<
		{
			active: boolean
			close: () => void
		} & ModalProps
	> {}

const Modal: Modal = ({
	active,
	close,
	icons,
	children,
	onSuccess,
	onFailure,
	backlayer = true
}) => {
	useLockBodyScroll(active)
	const handleSuccess = async (e: SyntheticEvent) => {
		e?.preventDefault()
		if (!!onFailure) await onFailure()
		close()
	}
	const handleFailure = async (e: SyntheticEvent) => {
		e?.preventDefault()
		if (!!onSuccess) await onSuccess()
		close()
	}
	return (
		<div className='modalcontainer' data-active={active}>
			{backlayer && <div className='backlayer' onClick={close} />}
			<div className='modal'>
				{!!icons && icons?.close && <icons.close onClick={handleFailure} />}
				<div className='options'>{children}</div>
				{!!icons && icons?.done && <icons.done onClick={handleSuccess} />}
			</div>
		</div>
	)
}

export default Modal
