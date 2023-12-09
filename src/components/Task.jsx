import React, {useState} from 'react'
import '../styles/Task.css'

function Task() {

    // Initialize task
    const [task, setTask] = useState('')

    // Initialize task list
    const [taskList, setTaskList] = useState([])

    // Initialize placeholder 
    const [placeholder, setPlaceholder] = useState('Add a new task')

    // Add task function
    const addTask = (event) => {

        // If the user presses enter
        if (event.key === 'Enter') {
            
            // Make sure the task is not empty
            if (task.length !== 0) {

                // Initialize new task with completed property and removed property
                const newTask = {name: task, completed: false, removed: false}

                // Add the task to the list
                setTaskList(prevTaskList => [...prevTaskList, newTask])

                // Reset the task
                setTask('')

                // Reset placeholder 
                setPlaceholder('Add a new task')

            } else {

                setPlaceholder('You entered empty task')

            }
            
        } 

    }

    const deleteTask = (taskIndex) => {

        // Initialize new task list
        const newTaskList = [...taskList]

        // Set removed property as true for the task
        newTaskList[taskIndex].removed = true

        // Remove the task
        newTaskList.splice(taskIndex, 1)
        
        // Update the task list
        setTaskList(newTaskList)
    
    }

    const completeTask = (taskIndex) => {

        // Initialize new task list
        const newTaskList = [...taskList]

        // Mark the task as completed 
        newTaskList[taskIndex].completed = true

        // Update the task list
        setTaskList(newTaskList)    

    }

    return (
        <div id='task-container'>
            <p id='task-title'>Pending tasks &#40;1&#41;</p>
            <div id='task-list'>
                {taskList.map((item, index) => (
                    <li className='task' key={index}>
                        {
                            // If the task is completed draw a line through the task, otherwise no line 
                            item.completed === false ? (<div className='name' style={
                                {textDecoration: 'none', 
                                wordWrap: 'break-word', 
                                fontSize: '1.25rem',
                                width: '70%'}
                            } >{item.name}</div>) : 
                            (<div id='name' style={
                                {textDecoration: 'line-through',
                                wordWrap: 'break-word',
                                fontSize: '1.25rem',
                                width: '70%'}
                            } >{item.name}</div>)
                        }
                        <div className='complete-remove'>
                            <div className='complete' onClick={() => completeTask(index)}>Complete</div>
                            <div className='remove' onClick={() => deleteTask(index)}>&#10005;</div>
                        </div>
                    </li>
                ))}
            </div>
            <input 
                type='text' 
                id='task-input' 
                placeholder={placeholder}
                onChange={(event) => setTask(event.target.value)}
                value={task}
                onKeyDown={(event) => addTask(event)}
            />
        </div>
  )
}

export default Task