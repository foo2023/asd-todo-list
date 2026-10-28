import { useState } from 'react'
import './App.css'
import TopPanel from './components/TopPanel'
import NewItemCard from './components/NewItemCard'

function App() {

    return (
        <>
            <>
                {/* The confirmation or input fields - either pop up as a container on top of every ui components */}

            </>

            {/* Main panel (search, add, remove, edit) Icon - User can toggle to do these */}
            <TopPanel />



            {/* Side panel for imporant task */}


            <div className="w-xl self-center">
                <NewItemCard />
                {/* TODO list */}

            </div>


        </>
    )
}

export default App
