import { useState } from 'react'
import './App.css'
import TopPanel from './components/TopPanel'
import NewItemCard from './components/NewItemCard'
import { TodoCard } from './components/TodoCard'

function App() {
    const [todoList, setTodoList] = useState([]);

    return (
        <>
            <>
                {/* The confirmation or input fields - either pop up as a container on top of every ui components */}

            </>

            {/* Main panel (search, add, remove, edit) Icon - User can toggle to do these */}
            <TopPanel />



            {/* Side panel for imporant task */}


            {/* Main content (todo list and add form card) */}
            <div className="w-xl self-center space-y-5.5">
                <NewItemCard />



                {/* TODO list items */}
                <ul>
                    {todoList.length == 0
                    ? <h2>Todo list is empty.</h2>
                    :todoList.forEach((data) => {
                        <li>
                            <TodoCard 
                            title={data.title}
                            description={data.description}
                            priority={data.priority}
                            status={data.status}
                            />
                        </li>

                    })}
                </ul>
                

            </div>


        </>
    )
}

export default App
