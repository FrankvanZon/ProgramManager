import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { LoginSchema } from "../schemas/loginSchema"
import agent from "../api/agent"
import { useNavigate } from "react-router";
import { RegisterSchema } from "../schemas/registerSchema";
import { toast } from "react-toastify";

export const useAccount = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const loginUser = useMutation({
        mutationFn: async (creds: LoginSchema) => {
            await agent.post('login?useCookies=true', creds);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
        }
    });

    const registerUser = useMutation({
        mutationFn: async (creds: RegisterSchema) => {
            await agent.post('/account/register', creds)
        },
        onSuccess: () => {
            toast.success('Register successful');
            navigate('/userManagement');
        }
    });

    const logoutUser = useMutation({
        mutationFn: async () => {
            await agent.post('/account/logout');
        },
        onSuccess: () => {
            queryClient.removeQueries({ queryKey: ['user'] });
            queryClient.removeQueries({ queryKey: ['projects'] });
            navigate('/');
        }
    });

    const { data: currentUser, isLoading: loadingUserInfo } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await agent.get<User>('/account/user-info');
            return response.data;
        },
        enabled: !queryClient.getQueryData(['user'])
    });

    const changePassword = useMutation({
        mutationFn: async (data: ChangePasswordData) => {
            await agent.post('/account/change-password', data);
        },
        onSuccess: () => {
            toast.success("Password updated");
            navigate('/projects')
        }
    });

    const usersQuery = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: async () => (await agent.get('/account/all-users')).data
    });

    const updateRole = useMutation({
        mutationFn: async (data: { userId: string, newRole: string }) => {
            await agent.post('/account/update-role', data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        }
    });

    const deleteUser = useMutation({
        mutationFn: async (userId: string) => {
            await agent.delete(`/account/delete-user/${userId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        }
    });

    return {
        loginUser,
        logoutUser,
        registerUser,
        currentUser,
        loadingUserInfo,
        changePassword,
        users: usersQuery.data ?? [],
        loadingUsers: usersQuery.isLoading,
        errorUsers: usersQuery.error,
        updateRole,
        deleteUser
    };
}