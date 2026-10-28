import clsx from "clsx";

export default function TodoCard({title, description, priority, status}) {
    return (
        <div className="flex-row bg-amber-50 p-3">
            <div className="flex justify-between">
                <text className="font-bold text-2xl">{title}</text>
                <div className={clsx(
                    "rounded-xl p-2 font-bold",
                    priority == "High" 
                    ? "bg-red-400 text-white"
                    : "bg-green-400 text-black"
                )}>
                    <text>{priority}</text>
                </div>
            </div>
            <text>{description}</text>
            <div className={clsx(
                "rounded-xl p-2 font-bold",
                status == "Completed" 
                ? "bg-green-400 text-white"
                : "bg-blue-400 text-white"
            )}>
                <text>{status}</text>
            </div>
        </div>
    );
}