import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useLocation } from "react-router";
import { useStore } from "./useStore";

export const useProjects = (id?: string) => {
    const {projectStore} = useStore();
    const queryClient = useQueryClient();
    const location = useLocation();
    const paths = ['/projects', '/program', '/launchCalendar', '/milestones'];

    //project list
    const { data: projects, isPending} = useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const response = await agent.get<Project[]>('/projects');
            projectStore.setProjects(response.data);
            return response.data;
        },
        enabled: !id && paths.includes(location.pathname)
    });

    //indiviual project
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
            await queryClient.invalidateQueries({
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
            await queryClient.invalidateQueries({
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
            await queryClient.invalidateQueries({
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