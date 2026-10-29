import { CiSearch, CiTrash, CiCirclePlus, CiEdit, CiCircleCheck, CiFilter } from "react-icons/ci";
import clsx from "clsx";
import Button from "./Button";
import { BUTTON_VARIANT } from "../constants/button-variant";

export default function TopPanelList({ 
    onShowNewItemCard, onEditMode, onDeleteMode,
    showNewItemCard, editMode, deleteMode,
    isSelectAll = false, onSelectAll=()=>{},
    onSearchPerform=()=>{}, searchQuery="",
    sortOrder=false, onSortOrder=()=>{}
 }) {

    const selectAll = () => ( // select all icon, this icon only appear in delete mode
        <>
            <Button
                variant={BUTTON_VARIANT.CANCEL}
                onClick={() => onDeleteMode()} // exit the delete mode
                className="px-1.5"
            >Cancel</Button>
            <button 
            onClick={onSelectAll}
            className={clsx(
                "self-center rounded-full text-white cursor-pointer",
                isSelectAll ? "bg-green-300" : "text-black"
            )}>
                <CiCircleCheck size={24} color="black"/>
            </button>
        </>
    )

    // this is a set of functionality control, each of them will have their own use case
    // state will reflect to it's current state (open = true)
    // onExec will store their excution (lambda) when user click on it
    const panelItems = [
        { id: "Add", icon: CiCirclePlus, state: showNewItemCard, onExec: () => onShowNewItemCard() },
        { id: "Edit", icon: CiEdit, state: editMode, onExec: () => onEditMode() },
        { id: "Remove", icon: CiTrash, state: deleteMode, onExec: () => onDeleteMode(2), customElement: selectAll() }
    ];

    // check the global modes' state
    let currOpen = false;
    for (const panelItem of panelItems) {
        if (panelItem.state) { // one of the item state is true
            currOpen = true;    
        }
    }

    return (
        <div className="space-x-3 flex items-center">

            {/* Search */}
            <div className="flex items-center space-x-2 px-2 rounded-2xl outline">
                <input 
                    className="outline-0" 
                    placeholder="Quick Search"
                    value={searchQuery}
                    onChange={(it) => {onSearchPerform(it.target.value)}}
                />
                <CiSearch className="text-amber-800" size={20}/>
            </div>

            {/* Sorting */}
            <button 
                onClick={onSortOrder}
                className={clsx(
                    "cursor-pointer rounded-full p-1.5",
                    sortOrder? "bg-white/50": "hover:bg-white/50"
                )}
            >
                <CiFilter className="text-amber-800"/>
            </button>

            {panelItems.map((item) => {
                const Icon = item.icon;
                return (
                    <>
                        <button 
                        key={item.id}
                        /*
                            onClick:
                            Add: open menu/ close menu
                            Edit: open edit mode/ close edit mode
                            Remove: open remove selection mode/ remove item
                                - Cancel: close remove selection mode
                        */
                        onClick={item.onExec} // TODO 
                        disabled={!item.state && currOpen} // disable = !state (open state) && currOpen
                        className="rounded-full bg-amber-600 text-amber-50 p-2 cursor-pointer 
                        hover:bg-amber-700 active:scale-95
                        disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-200"
                        >
                            <Icon size={20}/>
                        </button>
                        {item.customElement && item.state // the item has it's own custome element and the state is true (current)
                        && item.customElement
                        
                        }
                    </>
                )
            })}
            
            
        </div>
    );
}