import { sendToMain } from "@/store";

function ButtonGetSecondWindow() {
    function sendRequest() {
        sendToMain({ type: 'get-second-window' });
    }
    return (
        <button
            className="px-4 py-3 border-primary-400 hover:bg-primary-500 border rounded shadow active:scale-[.97] transition-transform"
            onClick={sendRequest}
        >
            Get Second Window
        </button>
    );
}

export function Section2Main() {
    return (
        <div className="m-4 text-primary-900">
            <ButtonGetSecondWindow />
        </div>
    );
}
