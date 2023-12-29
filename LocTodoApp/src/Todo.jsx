import React,{useEffect, useState} from "react";
import './Todo.css';

function TodoApp(){

    const [Tasks, SetTasks] = useState(() => {
        const savedTasks = window.localStorage.getItem('My_Tasks');
        return savedTasks !== null ? JSON.parse(savedTasks) : ["Eat Eggs", "Take a Shower"];
    });
    const [NewTask, SetNewTask] = useState("");

    useEffect(() => {
        window.localStorage.setItem('My_Tasks', JSON.stringify(Tasks));
    }, [Tasks]);

    function handleAddTaskChange(event) {
        SetNewTask(event.target.value);
    }

    function AddTask() {
        if (NewTask.length - 1 < 34) {
            if (NewTask.trim() !== "") {
                SetTasks(prevTasks => [...prevTasks, NewTask]);
                SetNewTask("");
            }
        }
    }

    function DeleteTask(index) {
        const updatedTasks = Tasks.filter((_, i) => i !== index);
        SetTasks(updatedTasks);
    }

    function MoveUpTask(index) {
        if (index > 0) {
            const updatedTasks = [...Tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            SetTasks(updatedTasks);
        }
    }

    function MoveDownTask(index) {
        if (index < Tasks.length - 1) {
            const updatedTasks = [...Tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            SetTasks(updatedTasks);
        }
    }

    return(
        <>
            <div className="whole-container">
                <div className="header-container">
                    <h1>To Do App</h1>
                </div>
                <div className="main-container">
                    <div className="input-container">
                        <input type="text" placeholder="todo" value={NewTask} onChange={handleAddTaskChange}/>
                        <button onClick={AddTask}>Add</button>
                    </div>
                    <div className="todolist-container">
                        <ol>
                            {Tasks.map((task, index) => 
                                <li key={index}>
                                    <p className="Description">{task}</p>
                                    <button className="delete-btn" onClick={() => DeleteTask(index)}>❌</button>
                                    <button className="MoveUp-btn" onClick={() => MoveUpTask(index)}>👆</button>
                                    <button className="MoveDown-btn" onClick={() => MoveDownTask(index)}>👇</button>
                                </li>
                            )}
                        </ol>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TodoApp;