import Swal from "sweetalert2";

const AlertDialog = (
  title,
  text,
  icon,
  timer,
  showConfirmButton = false,
  showCancelButton = false,
  confirmButtonText = "",
  cancelButtonText = "",
  okAction,
  cancelAction
) => {
  return Swal.fire({
    title: title !== "" ? title : null,
    text: text,
    icon: icon,
    timer: timer !== 0 ? timer : null,
    showConfirmButton: showConfirmButton,
    showCancelButton: showCancelButton,
    confirmButtonText: confirmButtonText,
    cancelButtonText: cancelButtonText,
    customClass: {
      icon: "small-icon", // Apply the class for small icon size
    },
  }).then(async (result) => {
    if (result.isConfirmed) {
      // Call the okAction (deleting the brand)
      okAction();
    } else if (result.isDismissed && cancelAction) {
      // Optionally call cancelAction if needed when user cancels
      cancelAction();
    }
  });
};

export default AlertDialog;
