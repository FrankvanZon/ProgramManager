import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";

export const useProjects = () => {
    const queryCient = useQueryClient();

    const { data: projects, isPending } = useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const response = await agent.get<Project[]>('/projects');
            return response.data;
        }
    });

    const updateProject = useMutation({
        mutationFn: async (project: Project) => {
            await agent.put('/projects', project)
        },
        onSuccess: async () => {
            await queryCient.invalidateQueries({
                queryKey: ['projects'],
            })
        }
    })

    const createProject = useMutation({
        mutationFn: async (project: Project) => {
            await agent.post('/projects', project)
        },
        onSuccess: async () => {
            await queryCient.invalidateQueries({
                queryKey: ['projects'],
            })
        }
    })

    const deleteProject = useMutation({
        mutationFn: async (id: string) => {
            await agent.delete(`/projects/${id}`)
        },
        onSuccess: async () => {
            await queryCient.invalidateQueries({
                queryKey: ['projects'],
            })
        }
    })

    return {
        projects,
        isPending,
        updateProject,
        createProject,
        deleteProject,
    }
}