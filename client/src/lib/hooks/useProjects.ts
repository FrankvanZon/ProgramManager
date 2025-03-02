import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useLocation } from "react-router";

export const useProjects = (id?: string) => {
    const queryCient = useQueryClient();
    const location = useLocation();
    const paths = ['/projects', '/program', '/launchCalendar', '/milestones'];

    //project list
    const { data: projects, isPending} = useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const response = await agent.get<Project[]>('/projects');
            return response.data;
        },
        enabled: !id && paths.includes(location.pathname)
    });

    //indiviual proejct
    const { data: project, isLoading: isLoadingProject } = useQuery({
        queryKey: ['projects', id],
        queryFn: async () => {
            const response = await agent.get<Project>(`/projects/${id}`);
            return response.data;
        },
        enabled: !!id
    });



    //edit
    const updateProject = useMutation({
        mutationFn: async (project: Project) => {
            const response = await agent.put('/projects', project)
            return response.data;
        },
        onSuccess: async () => {
            await queryCient.invalidateQueries({
                queryKey: ['projects'],
            })
        }
    })

    //create
    const createProject = useMutation({
        mutationFn: async (project: Project) => {
            const response = await agent.post('/projects', project)
            return response.data;
        },
        onSuccess: async () => {
            await queryCient.invalidateQueries({
                queryKey: ['projects'],
            })
        }
    })

    //delete
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
        project,
        isLoadingProject,
    }
}