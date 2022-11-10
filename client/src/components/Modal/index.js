import React from 'react'
import TaskInput from '../TaskInput'

function Modal({ closeModal }) {
    return (
        <div className='active'>
            <button onClick={() => closeModal(false)}>X</button>
            <TaskInput />
        </div>
    )
}

export default Modal;