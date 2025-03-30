import { useEffect } from "react";

// returns a toast notification component
function Toast({ message, onClose }) {

    useEffect(() => {
        const toastElement = document.getElementById("toast");
        if (toastElement) {
            toastElement.classList.remove("slide-out");
        }

        const timeout = setTimeout(() => {
            if (toastElement) {
                toastElement.classList.add("slide-out");
                setTimeout(() => {
                    onClose();
                }, 1000);
            }
        }, 3000);

        return () => clearTimeout(timeout);
    }, [message, onClose]);

    const closeHandler = () => {
        const toastElement = document.getElementById("toast");

        if (toastElement) {
            toastElement.classList.add("slide-out");
            setTimeout(() => {
                onClose();
            }, 1000);
        }
    }

    return (
      <div className = "w-100 position-fixed" style={{zIndex: 1000}}>
          <div className="alert-popup slide-in" id = "toast">
              <div className="toast-header">
                  <strong className="me-auto">Notification</strong>
                  <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => closeHandler()}></button>
              </div>
              <div className="toast-body">
                  {message}
              </div>
          </div>
      </div>
    );
}

export default Toast;