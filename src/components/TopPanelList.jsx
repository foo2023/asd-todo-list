import { CiSearch, CiTrash, CiCirclePlus, CiEdit, CiCircleCheck } from "react-icons/ci";
import clsx from "clsx";

const isSelectAll = false;

export default function TopPanelList({ onShowNewItemCard }) {

    // this is a set of functionality control, each of them will have their own use case
    // onExec will store their excution (lambda) when user click on it
    const panelItems = [
        { id: "Add", icon: CiCirclePlus, onExec: () => onShowNewItemCard() },
        { id: "Edit", icon: CiEdit, onExec: () => {} },
        { id: "Remove", icon: CiTrash, onExec: () => {} }
    ];
    return (
        <div className="space-x-3 flex">
            <div className="flex items-center space-x-2 px-2 rounded-2xl outline">
                <input className="outline-0" placeholder="Quick Search"/>
                <CiSearch className="text-amber-800" size={20}/>
            </div>
            {panelItems.map((item) => {
                const Icon = item.icon;
                return (
                    <button 
                    key={item.id}
                    onClick={item.onExec}
                    className="rounded-full bg-amber-600 p-2 cursor-pointer"
                    >
                        <Icon className="text-amber-50" size={20}/>
                    </button>
                )
            })}
            <button 
            className={clsx(
                "self-center rounded-full text-white cursor-pointer",
                isSelectAll ? "bg-green-300" : "text-black"
            )}>
                <CiCircleCheck size={24} color="black"/>
            </button>
        </div>
    );
}