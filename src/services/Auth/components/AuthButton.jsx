import { useNavigate } from "react-router-dom";
import { notificationHelper } from "../../../shared/utils/notificationHelper123";
import { Button } from "antd";

function LogoutBtn() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        notificationHelper.showSuccessNotification({ description: "Logout successfully" });
        setTimeout(() => navigate("/login"), 1000);
    }

    return <Button onClick={handleLogout} type="dash">Logout</Button>
}

export default LogoutBtn;