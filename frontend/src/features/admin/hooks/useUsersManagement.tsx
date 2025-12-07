import type { UserRole } from "../types/admin.types";
import {
  useToggleUserStatusMutation,
  useToggleUserRoleMutation,
  useGetAllUsersQuery,
} from "@/store/api/admin-api";
import toast from "react-hot-toast";

export const useUsersManagement = () => {
  const [toggleStatus] = useToggleUserStatusMutation();
  const [toggleRole] = useToggleUserRoleMutation();
  const { data: usersData, } = useGetAllUsersQuery(null)

  const handleRoleChange = async (userId: number, newRole: UserRole) => {
    try {
      const roleResponse = await toggleRole({ id: userId, role: newRole }).unwrap();;
      toast.success(roleResponse.message);
    } catch (error) {
      console.error("Error changing user role:", error);
      toast.error("Failed to change user role.");
    }
  };

  const handleToggleBlock = async (userId: number) => {
    try {
      const response = await toggleStatus({ id: userId }).unwrap();
      toast.success(response.message);
    } catch (err: any) {
      toast.error("Başarısız blok işlemi", err);
    }
  };

  return {
    users: usersData,
    handleRoleChange,
    handleToggleBlock,
  };
};
