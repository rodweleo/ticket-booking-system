const Status = ({ status }: { status: string | boolean | null }) => {
    let textColor = "";
    let backgroundColor = "";
    let textContext = "";

    if (typeof status === "string") {
        switch (status?.trim().toLowerCase()) {
            case "active":
                textColor = "green-900";
                backgroundColor = "green-400";
                break;
            case "patched":
                textColor = "green-900";
                backgroundColor = "green-400";
                break;
            case "inactive":
                textColor = "red-600";
                backgroundColor = "red-300";
                break;
            case "not patched":
                textColor = "red-600";
                backgroundColor = "red-300";
                break;
            case "cancelled":
                textColor = "slate-600";
                backgroundColor = "slate-300";
                break;
            case "expired":
                textColor = "orange-600";
                backgroundColor = "orange-300";
                break;
            case "terminated":
                textColor = "black";
                backgroundColor = "black/50";
                break;
            case "renewed":
                textColor = "green-900";
                backgroundColor = "green-400";
                break;
            case "open":
                textColor = "green-900";
                backgroundColor = "green-400";
                break;
            default:
                textColor = "";
                backgroundColor = "";
        }
    } else if (typeof status === "boolean") {
        switch (status) {
            case true:
                textColor = "green-900";
                backgroundColor = "green-400";
                textContext = "Yes"
                break;

            case false:
                textColor = "red-600";
                backgroundColor = "red-300";
                textContext = "No"
                break;

            default:
                textColor = "";
                backgroundColor = "";
        }
    }
    return (
        <div
            className={`bg-${backgroundColor} w-36 bg-opacity-80 rounded-sm text-center py-1`}
        >
            <span className={`text-${textColor} font-bold  w-fit  `}>{status} {textContext.length > 0 && textContext}</span>
        </div>
    );
};

export default Status;
