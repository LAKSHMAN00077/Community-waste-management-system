import { axiosInstance } from "../../lib/axios";
import Swal from "sweetalert2"; 
import { useNavigate } from "react-router-dom";

const handleResetPassword = async (userId) => {
  const { value: newPassword } = await Swal.fire({
    title: "Enter New Password",
    input: "text",
    inputLabel: "New Password",
    inputPlaceholder: "Enter new password",
    inputAttributes: {
      autocapitalize: "off",
      autocorrect: "off"
    },
    showCancelButton: true
  });

  if (!newPassword) return;

  const navigate = useNavigate();

  try {
    const res = await axiosInstance.put(`/admin/users/${userId}/reset-password`, {
      newPassword,
    });

    Swal.fire("Success!", res.data.message || "Password reset successfully!", "success");
    navigate("")
  } catch (err) {
    console.error("Password reset error:", err);
    Swal.fire("Error", err.response?.data?.error || "Something went wrong", "error");
  }
};
