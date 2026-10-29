import { useState } from 'react'
import './App.css'
import TopPanel from './components/TopPanel'
import { NewItemCard } from './components/FormItemCard'
import { Card, TodoCard } from './components/TodoCard'
import { priority_asc } from './constants/todo'

function App() {
    const [todoList, setTodoList] = useState([]); // the todo list items placed in here
    const [showNewItemCard, setShowNewItemCard] = useState(false); // display the create item card or not
    const [editMode, setEditMode] = useState(false);
    const [editFocus, setEditFocus] = useState(undefined); // edit focus (item id)
    const [deleteMode, setDeleteMode] = useState(false);

    // onDeleteMode (selecting multiple cards at once)
    const [cardSelected, setCardSelected] = useState(new Set());

    // search
    const [searchQuery, setSearchQuery] = useState("");
    // sorting
    const [sortOrder, setSortOrder] = useState(false);
    const visibleTodoList = todoList
    .filter((data) => data.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
        if (!sortOrder) return 0;
        const diff = priority_asc(a.priority) - priority_asc(b.priority);
        return diff;
    })

    return (
        <>

            {/* Main panel (search, add, remove, edit) Icon - User can toggle to do these */}
            <TopPanel 
                onShowNewItemCard={() => {
                    setShowNewItemCard(!showNewItemCard);
                }}
                onEditMode={() => setEditMode(!editMode)}
                onDeleteMode={(mode=1) => {
                    /* ToggleMode=1; PerformDelete=2 */

                    // currently on the delete mode
                    // user want to perform delete
                    if (deleteMode && mode == 2) { 
                        setTodoList(todoList.filter((item) => !cardSelected.has(item.id))); // only keep the item not appear in the cardSelectedlist

                        // After delete success, toggle the delete mode (exit delete mode)
                        setDeleteMode(!deleteMode);
                    } else {
                        // other than that, toggle between delete mode
                        setDeleteMode(!deleteMode);
                    }
                }}
                showNewItemCard={showNewItemCard}
                editMode={editMode}
                deleteMode={deleteMode}
                isSelectAll={cardSelected.size == todoList.length} // describe the selected item length equal to the total length
                onSelectAll={() => {

                    // all item are selected
                    if (cardSelected.size == todoList.length) {
                        // make them unselected (toggle all)
                        setCardSelected(new Set());
                    } else {
                        // do select all
                        setCardSelected((prev) => {
                            const next = new Set(prev); // save previous selected list
                            todoList.forEach((item) => {
                                const itemId = item.id;
                                if (!next.has(itemId)) {
                                    // the itemId not in selected list
                                    // add it to the list
                                    next.add(itemId);
                                }
                            });
                            return next; // update the Set into the state
                        })
                    }
                }}

                // search
                onSearchPerform={(query) => {
                    setSearchQuery(query);
                }}
                searchQuery={searchQuery}
                // sorting
                sortOrder={sortOrder} //boolean
                onSortOrder={()=>setSortOrder(!sortOrder)} // toggle


            />



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
                ? <h2>Todo list is empty.</h2> // todo list empty
                : visibleTodoList.length == 0 && searchQuery.length != 0
                ? <h2>Search result empty.</h2> // empty search result
                :<> 
                    {/* Not perform any search or at least one search result found */}
                    {searchQuery.length != 0 && <span>Search Result:</span>}
                    <ul className="space-y-3.5"> {
                        visibleTodoList.map((data) => (
                            <li key={data.id}>
                                {/* Display and edit */}
                                {/* When display, it can be select to remove */}
                                <TodoCard 
                                    data={data}

                                    // edit 
                                    editMode={editMode}
                                    editFocus={editFocus == data.id} // boolean
                                    onEditFocus={() => setEditFocus(data.id)}
                                    onEdit={(next) => {
                                        setTodoList((prev) =>
                                            prev.map((item) => (item.id == next.id ? { ...item, ...next } : item))
                                        ); // update into state
                                        setEditMode(false); // after submited, exit the edit mode
                                        setEditFocus(undefined); // reset the edit focus item
                                    }}
                                    onClose={() => { // cancel edit
                                        setEditMode(false);
                                        setEditFocus(undefined); // erase the targeted item in edit mode
                                        }}

                                    // delete
                                    deleteMode={deleteMode} // describe current delete mode state (boolean)
                                    isCardSelected={cardSelected.has(data.id)} // describe the item is selected or not (boolean)
                                    onCardSelect={() => {
                                        setCardSelected((prev) => {
                                            const next = new Set(prev);
                        
                                            if (next.has(data.id)) { // if the id exist in the Set
                                                // remove it from the Set
                                                next.delete(data.id);
                                            } else {
                                                // add the card in the selected Set
                                                next.add(data.id);
                                            }
                        
                                            return next;
                                        })
                                    }} // callback function to toggle item select state
                                />
                            </li>
                        ))}
                    </ul>
                </>
                }
                

            </div>


        </>
    )
}

export default App
