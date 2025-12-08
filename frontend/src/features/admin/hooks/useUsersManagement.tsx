import {
  useGetAllUsersQuery,
  useToggleUserRoleMutation,
  useToggleUserStatusMutation,
} from "@/store/api/admin-api";
import type { UserRole } from "../types/admin.types";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router";

export const useUsersManagement = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  const params = { page: currentPage };

  const handlePageClick = (event: { selected: number }) => {
    const newPage = event.selected + 1;
    setSearchParams({ page: newPage.toString() });
  };
  const { data: usersData } = useGetAllUsersQuery(params);
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
    users: usersData,
    handleRoleChange,
    handleToggleBlock,
    handlePageClick
  };
};
