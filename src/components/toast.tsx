import Swal from "sweetalert2";

export const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    timer: 2500,
    timerProgressBar: true,
    showConfirmButton: false
  })