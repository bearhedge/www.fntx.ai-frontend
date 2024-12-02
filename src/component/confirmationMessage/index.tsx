import ConfirmationIcon from '@assets/svg/confirmation-tick.svg'
import * as React from 'react'
import Button from '../form/button'
interface Iprops {
    title: string
    para1: string
    className?:string
    para2?: string | null
    btnText?: string | null
    onHandleConfirm?: (e: React.MouseEvent<HTMLButtonElement>) => void
}
export default function Confirmation({ title, para1, para2 = null, onHandleConfirm,className='', btnText = null }: Iprops) {
    return <div className={`confirmation ${className}`}>
        <div className="text-center mb-4">
            <img src={ConfirmationIcon} alt='confirmation-tick' />
        </div>
        <h4 className='mb-4 pt-3'>{title}</h4>
        <div className={`confirmation-container`}>
            <p className='mb-3'>{para1}</p>
            {para2 ? <p className='mb-3'>{para2}</p> : null}
        </div>
        {btnText ? <Button type='button' className='btn btn-primary w-100 mt-4' onClick={onHandleConfirm}>{btnText}</Button> : null
        }
    </div>
}