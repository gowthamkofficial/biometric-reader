import Swal from "sweetalert2";

export function showAlert() {
    Swal.fire({
        title: '<strong >Information</strong>',
        html:
            `<b >Your device is not ready . Unplug and connect device again and try...</b>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Okay',
        allowOutsideClick: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
    })
}



export function captured() {
    Swal.fire({
        title: 'Captured fngerprint successfully.',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    })
}

