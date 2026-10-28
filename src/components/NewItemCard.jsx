import { TodoCardForms } from "./TodoCard";


export default function NewItemCard({ onCreate, onClose }) {
    return (
        <>
            <div className="flex-row space-y-2.5">
                <h2>Create New TODO</h2>
                <TodoCardForms
                onConfirm={(newTodoItem) => {
                    onCreate(newTodoItem);
                }}
                onClose={onClose}
                />
            </div>

        </>
    );
}