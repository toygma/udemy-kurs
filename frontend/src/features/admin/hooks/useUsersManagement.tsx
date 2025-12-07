import {
  useGetAllUsersQuery,
  useToggleUserRoleMutation,
  useToggleUserStatusMutation,
} from "@/store/api/admin-api";
import type { UserRole } from "../types/admin.types";
import toast from "react-hot-toast";

export const useUsersManagement = () => {
  const { data: usersData } = useGetAllUsersQuery(null);
  console.log("🚀 ~ useUsersManagement ~ usersData:", usersData)
  const [toggleRole] = useToggleUserRoleMutation();
  const [toggleStatus] = useToggleUserStatusMutation();

  const handleRoleChange = async (userId: number, newRole: UserRole) => {
    try {
      const roleResponse = await toggleRole({
        id: userId,
        role: newRole,
      }).unwrap();
      toast.success(roleResponse.message);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleToggleBlock = async (userId: number) => {
    try {
      const response = await toggleStatus({
        id: userId,
      }).unwrap();
      toast.success(response.message);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return {
    users:usersData,
    handleRoleChange,
    handleToggleBlock,
  };
};
