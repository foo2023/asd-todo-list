import { PRIORITY, STATUS } from "../constants/todo";
import { TodoCardForms } from "./TodoCard";


export function NewItemCard({ onCreate, onClose }) {
    // default data to the user when they creating
    const data = {
        id: Math.random(),
        title: "",
        description: "",
        priority: PRIORITY.MEDIUM,
        status: STATUS.TODO,
    }
    return (
        <>
            <div className="flex-row space-y-2.5">
                <h2>Create New TODO</h2>
                <TodoCardForms data={data} onConfirm={onCreate} onClose={onClose} />
            </div>

        </>
    );
}