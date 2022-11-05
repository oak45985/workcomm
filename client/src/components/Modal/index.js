import React from 'react'
import TaskInput from '../TaskInput'

function Modal({ closeModal }) {
    return (
        <div>
            <h1>Add Task</h1>
            <button onClick={() => closeModal(false)}>X</button>
            <TaskInput />
        </div>
    )
}

export default Modal;