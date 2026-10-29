export const PRIORITY = Object.freeze({
    LOW: "Low",
    MEDIUM: "Medium",
    HIGH: "High",
});

export const STATUS = Object.freeze({
    TODO: "Todo",
    IN_PROGRESS: "In Progress",
    DONE: "Done",
});


export function priority_asc(priority) {
    // ascending arrangement to the priority
    // for sorting use
    switch(priority) {
        case PRIORITY.HIGH: return 1;
        case PRIORITY.MEDIUM: return 2;
        case PRIORITY.HIGH: return 3;
        default: throw new Error(`Unknown priority: ${priority}`);
    }
}


