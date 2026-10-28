import { useState } from 'react'
import './App.css'
import TopPanel from './components/TopPanel'
import NewItemCard from './components/NewItemCard'
import { TodoCard } from './components/TodoCard'

function App() {
    const [todoList, setTodoList] = useState([]); // the todo list items placed in here
    const [showNewItemCard, setShowNewItemCard] = useState(false); // display the create item card or not

    return (
        <>
            <>
                {/* The confirmation or input fields - either pop up as a container on top of every ui components */}

            </>

            {/* Main panel (search, add, remove, edit) Icon - User can toggle to do these */}
            <TopPanel onShowNewItemCard={() => {
                setShowNewItemCard(!showNewItemCard);
            }}/>



            {/* Side panel for imporant task */}


            {/* Main content (todo list and add form card) */}
            <div className="w-xl self-center space-y-5.5">
                {showNewItemCard
                 && <NewItemCard 
                    onCreate={(newTodo) => {
                        setTodoList(todoList.concat(newTodo));
                        setShowNewItemCard(false); // after submited, close the forms(card)
                    }}
                    onClose={() => setShowNewItemCard(false)} // close request ask by user to the forms(card)
                 />}



            {/* TODO list items */}
            {todoList.length == 0
            ? <h2>Todo list is empty.</h2>
            :<ul className="space-y-3.5"> {
                todoList.map((data) => (
                <li>
                    <TodoCard 
                    title={data.title}
                    description={data.description}
                    priority={data.priority}
                    status={data.status}
                    />
                </li>
                ))}
            </ul>
            }
                

            </div>


        </>
    )
}

export default App
