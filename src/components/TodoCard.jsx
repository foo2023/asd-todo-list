import clsx from "clsx";
import { useState } from "react";
import { CiCircleCheck, CiCircleRemove } from "react-icons/ci";
import Button from "./Button";
import { BUTTON_VARIANT } from "../constants/button-variant";
import { PRIORITY, STATUS } from "../constants/todo";

// Describe to the purpose of the card use for(display, create, edit) either one of this at a time for a single card
export const CARD_MODE = Object.freeze({
    DISPLAY: "Display",
    CREATE: "Create",
    EDIT: "Edit",
});

// This is the reusable component for display and modifying or creating.
// All the state is pass from the parrent.
// to keep everything clean
export function Card({
    title="", description="", 
    priority=PRIORITY.MEDIUM, status=STATUS.TODO, 
    mode=CARD_MODE.DISPLAY, // default is display 

    // for DISPLAY (attributes)
    isCardSelected=false, deleteMode=false,
    onCardSelect=()=>{},

    // use when the card is for create and edit
    onValueChange={}, onSubmit=()=>{}, onCancel=()=>{},
    editMode=false, onEditFocus=()=>{}

}) {
    const isDisplayMode = mode == CARD_MODE.DISPLAY? true: false;

    // only appear in delete mode, when the card is for display purpose
    const itemPicker = () => {
        return<button 
                onClick={onCardSelect}
                className={clsx(
                    "self-center rounded-full cursor-pointer absolute right-1/12 top-1/2",
                    isCardSelected ? "bg-green-300" : "text-gray-500"
            )}>
                <CiCircleCheck size={24}/>
            </button>
    }

    const handleCardClick = () => {
        // because the handle click will only be call when (displayMode & editMode is true)
        onEditFocus(); // after focus to current, enter edit mode
    }

    return (

        // The big container (card)
        <div 
            onClick={isDisplayMode && editMode? handleCardClick: undefined} // only happen when display and edit mode true
            className={clsx(
            "flex-row bg-amber-50 rounded-2xl py-3.5 px-5.5 space-y-2 relative",
            !isDisplayMode && "drop-shadow-2xl shadow-2xl"
            )}
        >

            {/* Only appear in the card for "display" when in delete mode */}
            {isDisplayMode&& deleteMode&& itemPicker()}

            {/* The First Row (title & priority) */}
            <div className="flex justify-between">

                {/* Title */}
                <div className="font-bold text-2xl">
                    {isDisplayMode
                    ? <span>{title}</span>
                    : <input 
                    value={title}
                    placeholder="Title"
                    onChange={(it) => onValueChange.setTitle(it.target.value)}
                    ></input>}
                </div>


                {/* Priority */}
                <div className={clsx(
                    "rounded-xl p-2 font-bold",
                    priority == PRIORITY.HIGH? "bg-red-600 text-white"
                    : priority == PRIORITY.MEDIUM? "bg-amber-600 text-white"
                    : "bg-blue-600 text-white" // priority.low
                )}>
                    {isDisplayMode
                    ? <span>{priority}</span>
                    : <select
                    value={priority}
                    onChange={(it) => onValueChange.setPriority(it.target.value)} // TODO
                    >
                        {Object.values(PRIORITY).map((p) => (
                            <option 
                            key={p} 
                            value={p}
                            className="text-black"
                            >{p}</option>
                        ))}
                    </select>
                    }
                </div>
            </div>


            {/* Description */}
            {isDisplayMode
            ? <div className="text-left"><span>{description}</span></div>
            : <textarea 
            type="text"
            className="w-full"
            value={description}
            placeholder="Write some description to your task"
            onChange={(it) => onValueChange.setDescription(it.target.value)}
            ></textarea>}


            <div className="flex justify-between">


                {/* Status */}
                <div className={clsx(
                    "rounded-xl p-2 font-bold w-fit",
                    status == STATUS.DONE? "bg-green-200 text-black"
                    : status == STATUS.IN_PROGRESS? "bg-blue-200 text-black"
                    : "bg-red-200 text-black" // status.todo
                )}>
                    {isDisplayMode
                    ? <span>{status}</span>
                    : <>
                        <span>Status: </span>
                        <select
                        value={status}
                        onChange={(it) => onValueChange.setStatus(it.target.value)}
                        >
                            {Object.values(STATUS).map((s) => (
                                <option 
                                key={s} 
                                value={s}
                                className="text-black"
                                >{s}</option>
                            ))}
                        </select>
                    </>
                    }
                </div>


                {/* Submit Button & Close Button only appear in "Edit/Update" Mode */}
                {mode != "Display" 
                && <span className="flex space-x-2">
                    <Button
                        variant={BUTTON_VARIANT.CANCEL}
                        onClick={onCancel}
                        className="space-x-1.5 flex p-2"
                    >
                        <CiCircleRemove size={28}/>
                        <span>Cancel</span>
                    </Button>
                    <Button
                        variant={BUTTON_VARIANT.SUBMIT}
                        disabled={false} // TODO
                        onClick={onSubmit}
                        className="p-2"
                    ><span>Submit</span></Button>
                </span>
                }
            </div>


        </div>
    );
}

// this todo card that only use for display
export function DisplayCard({ title, description, priority, status, isCardSelected, deleteMode, onCardSelect }) {
    return <Card 
        title={title}
        description={description}
        priority={priority}
        status={status}
        mode={CARD_MODE.DISPLAY}
        isCardSelected={isCardSelected}
        deleteMode={deleteMode}
        onCardSelect={onCardSelect}
    />;
}

// use in (create and edit)
// hold the state
export function TodoCardForms({
    data, // basic data

    // edit mode attributes
    onConfirm, onClose
}) {

    // assign all the data in state
    const id = Math.random(data.id);
    const [title, setTitle] = useState(data.title);
    const [description, setDescription] = useState(data.description);
    const [priority, setPriority] = useState(data.priority);
    const [status, setStatus] = useState(data.status);
    
    return (
        <Card 
            mode="Forms"
            title={title}
            description={description}
            priority={priority}
            status={status}

            // a set of state update use for callback
            onValueChange={{
                setTitle, setDescription,
                setPriority, setStatus
            }}
            onSubmit={() => onConfirm({ ...data, title, description, priority, status })} // process with submit data
            onCancel={onClose} // callback, signal back to the parrent, exit the card (edit/create) mode
        />
    );

}

// entrance to the todocards in the list(each card)
export function TodoCard({ 
    // basic information
    data,

    // edit
    editMode=false, editFocus=false, onEditFocus=()=>{},
    onEdit=()=>{}, onClose=()=>{},

    // remove/delete
    deleteMode=false, isCardSelected=false, onCardSelect=()=>{}

 }) {
    return (
        editMode && editFocus
        ?<TodoCardForms data={data} onConfirm={onEdit} onClose={onClose} />
        :<Card
            title={data.title}
            description={data.description}
            priority={data.priority}
            status={data.status}
            deleteMode={deleteMode}
            isCardSelected={isCardSelected}
            editMode={editMode}
            onCardSelect={onCardSelect}
            onEditFocus={onEditFocus}
            mode={CARD_MODE.DISPLAY}
        />
    );
}