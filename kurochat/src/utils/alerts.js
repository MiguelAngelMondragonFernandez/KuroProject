import Swal from "sweetalert2";


export const showAlert = (type, message, title) => {
    switch (type) {
        case 'loading':
            Swal.fire({
                title: title,
                icon: 'info',
                text: message,
                showConfirmButton: false,
                timer: 2000
            });
            break;
        case 'success':
            Swal.fire({
                title: title,
                icon: 'success',
                text: message,
                showConfirmButton: false,
                timer: 2000
            });
            break;
        case 'error':
            Swal.fire({
                title: title,
                icon: 'error',
                text: message,
                showConfirmButton: false,
                timer: 2000
            });
            break;
    }
}