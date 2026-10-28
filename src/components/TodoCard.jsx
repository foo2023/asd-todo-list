import clsx from "clsx";
import { useState } from "react";
import { CiCircleRemove } from "react-icons/ci";

const PRIORITIES = ["Low", "Medium", "High"];

const STATUS = ["Completed", "Working"];

// This is the reusable component for display and modifying or creating.
// All the state is pass from the parrent.
// to keep everything clean
function Card({
    title="", description="", 
    priority="", status="", 
    mode="Display", onValueChange={},
    onSubmit=()=>{},
    onCancel=()=>{}
}) {
    const isDisplayMode = mode == "Display" ?true :false;
    return (

        // The big container (card)
        <div className={clsx(
            "flex-row bg-amber-50 rounded-2xl py-3.5 px-5.5 space-y-2",
            !isDisplayMode && "drop-shadow-2xl shadow-2xl"
            )}>

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
                    priority == "High" 
                    ? "bg-red-400 text-white"
                    : "bg-green-400 text-black"
                )}>
                    {isDisplayMode
                    ? <span>{priority}</span>
                    : <select
                    value={priority}
                    onChange={(it) => onValueChange.setPriority(it.target.value)}
                    >
                        {PRIORITIES.map((p) => (
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
                    status == "Completed" 
                    ? "bg-green-400 text-white"
                    : "bg-blue-400 text-white"
                )}>
                    {isDisplayMode
                    ? <span>{status}</span>
                    : <>
                        <span>Status: </span>
                        <select
                        value={status}
                        onChange={(it) => onValueChange.setStatus(it.target.value)}
                        >
                            {STATUS.map((s) => (
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
                    <button
                        className="rounded-xl p-2 font-bold w-fit cursor-pointer bg-red-600 text-white text-center flex space-x-1.5"
                        onClick={onCancel}
                    >
                        <CiCircleRemove size={28}/>
                        <span>Cancel</span>
                    </button>
                    <button
                        className="rounded-xl p-2 font-bold w-fit cursor-pointer bg-amber-600 text-white"
                        disabled={false} 
                        onClick={onSubmit}
                    >Submit</button>
                </span>
                }
            </div>


        </div>
    );
}

export function TodoCard({title, description, priority, status}) {
    return <Card 
        title={title}
        description={description}
        priority={priority}
        status={status}
    />;
}

export function TodoCardForms({onConfirm, onClose}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState(PRIORITIES[1]);
    const [status, setStatus] = useState(STATUS[1]);
    return (
        <Card 
            mode="Forms"
            title={title}
            description={description}
            priority={priority}
            status={status}
            onValueChange={{
                setTitle, setDescription,
                setPriority, setStatus
            }}
            onSubmit={() => {
                
                onConfirm({title, description, priority, status}); // process with submit
            }}
            onCancel={onClose}
        />
    );

}