import Button from "../form/button"
import CrossIco from "@assets/svg/cross_ico.svg"
import CrossFillIco from "@assets/svg/cross_fill.svg"
interface IProps {
    isOpen: number | boolean | string | null
    title?: string
    children?: React.ReactNode
    des?: string
    des1?: string
    IconCom?: any
    onClose?: () => void
}
export default function DialogConfirm({ isOpen, children, IconCom, title, des, des1, onClose }: IProps) {
    if (!isOpen) {
        return <></>
    }
    return <>
        <div className="modal fade show d-block" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-body">
                        {onClose && <div className="d-flex justify-content-end">
                            <Button type="button" className="btn btn-close" onClick={onClose}>
                                <img src={CrossIco} alt='cross' />
                            </Button>
                        </div>}
                        <div className="modal-body-info text-center">
                            {IconCom ? <IconCom/> : <img src={CrossFillIco} alt='cross_message' />}
                            {title ? <h5 className="mt-4">{title}</h5> : null}
                            {des ? <p className="mt-3">{des}</p> : null}
                            {des1 ? <p className="mt-3">{des1}</p> : null}
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="modal-backdrop fade show" onClick={onClose}></div>
    </>
}