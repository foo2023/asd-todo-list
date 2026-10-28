import { TodoCardForms } from "./TodoCard";


export default function NewItemCard() {
    return (
        <div className="flex-row space-y-2.5">
            <h2>Create New TODO</h2>
            <TodoCardForms
            onConfirm={(title, description, priority, status) => {

            }}
             />
        </div>
    );
}