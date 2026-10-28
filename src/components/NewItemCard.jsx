import TodoCard from "./TodoCard";


export default function NewItemCard() {
    return (
        <div>
            <text>Create New TODO</text>
            <TodoCard 
            title="hello" 
            description="hello how are you!" 
            priority="High"
            status="Completed"
             />
        </div>
    );
}