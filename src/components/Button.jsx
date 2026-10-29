import clsx from "clsx";

const VARIANT_STYLES = {
    [BUTTON_VARIANT.SUBMIT]: clsx(
        "bg-amber-600 text-white",
        "hover:bg-amber-700",
        "active:bg-amber-800",
        "disabled:bg-gray-200 disabled:text-gray-400 disabled:hover:bg-gray-200"
    ),
    [BUTTON_VARIANT.CANCEL]: clsx(
        "bg-red-600 text-white",
        "hover:bg-red-700",
        "active:bg-red-800",
        "disabled:bg-gray-200 disabled:text-gray-400 disabled:hover:bg-gray-200"
    ),
};

export default function Button ({ variant, className="", children, ...rest }) {
    return (
        <button
            className={clsx(
                "rounded-xl font-bold w-fit cursor-pointer text-center",
                VARIANT_STYLES[variant],
                className // optional className to customize the button
            )}
            {...rest} // the rest of the attributes can be pass in by caller (such as onClick)
        >
            {children}
        </button>
    );
}