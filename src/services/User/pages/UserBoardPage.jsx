import { useEffect, useState } from "react";
import { notificationHelper } from "../../../shared/utils/notificationHelper";
import SharedIcon from "../../../shared/components/common/Icon";
import userApi from "../api/userApi";
import BoardPage from "../../../shared/components/BoardPage";
import UserBoard from "../components/UserBoard";
import { UserBtnCreate } from "../components/UserButton";
import userActionPermission from "../utils/actionPermission";
import { useLayoutContext } from "../../../shared/components/AppLayout";
import Enum from "../../../shared/utils/enum";


function UserBoardPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const {setSelectedMenuKey, setBreadcrumbItems} = useLayoutContext();

    useEffect(() => {
        setSelectedMenuKey(Enum.Menu.user.key);
        setBreadcrumbItems([
            {
                title: Enum.Menu.user.label,
            },
        ]);
    }, [setSelectedMenuKey, setBreadcrumbItems]);

    // Get all partners
    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await userApi.getAllUserrs();
            setUsers(response.data.data); 
          } catch (err) {
            notificationHelper.showErrorNotification({description : err.response.data.message})
          } finally {
            setLoading(false);
          }
        };
    
        fetchUsers();
    }, []);

    return (
    <BoardPage.ContentContainer>
        {/* Subheader */}
        <BoardPage.Subheader 
            icon={(<SharedIcon.User width={24} height={24} fill="rgba(0, 167, 111, 1)"></SharedIcon.User>)}
            title = "All User"
        >
            {userActionPermission.canAction() && <UserBtnCreate />}
        </BoardPage.Subheader >
     
        {/* Table */}
        <BoardPage.BoardContainer>
            <UserBoard users={users} loading={loading}></UserBoard>
        </BoardPage.BoardContainer>
    </BoardPage.ContentContainer>)
}

export default UserBoardPage;