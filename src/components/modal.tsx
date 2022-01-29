import React from 'react';
import ReactDom from "react-dom";

interface ModalProps {
    isOpen: boolean
    title: string
    children: React.ReactNode
    onClose: any
    onAction: any
    onActionText: string
}

export default function Modal(props: ModalProps) {
    const {isOpen, title, children, onClose, onAction, onActionText} = props;
    const portal = document.getElementById('portal')!;

    if (!isOpen) return null;

    return ReactDom.createPortal(
        <>
           <div className="modal-container">
            <div className="flex items-center text-center justify-center fixed left-0 bottom-0 w-full h-full">
                <div className="bg-white shadow-lg rounded-lg w-1/2">
                    <div className="flex flex-col items-start p-4">
                        <div className="flex items-center w-full">
                            <div className="text-black font-medium text-lg">{title}</div>
                                <svg onClick={onClose} className="ml-auto fill-current text-white w-6 h-6 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
                                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/>
                            </svg>
                            </div>
                            <div className='self-center'>
                            {children}
                            </div>

                            <div className="ml-auto mt-10">
                            <button onClick={onClose} className="mr-2 mb-2 bg-white hover:bg-slate-100 text-black font-semibold py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                Close
                            </button>
                            <button onClick={onAction} className="mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >
                                {onActionText}
                            </button>
                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>,portal
    )
}
