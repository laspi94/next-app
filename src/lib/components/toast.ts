

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const showToast = () => {
    MySwal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Successfully saved!",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: "#333",
        color: "#fff",
    });
};