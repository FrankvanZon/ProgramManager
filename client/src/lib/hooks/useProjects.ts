import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useLocation } from "react-router";
import { useStore } from "./useStore";
import { useAccount } from "./useAccount";

export const useProjects = (id?: string) => {
    const { projectStore, milestoneStore } = useStore();
    const { currentUser } = useAccount();
    const queryClient = useQueryClient();
    const location = useLocation();
    const paths = ['/projects', '/program', '/launchCalendar', '/milestones'];

    //project list
    const { data: projects, isLoading, refetch } = useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const response = await agent.get<Project[]>('/projects');
            projectStore.setProjects(response.data);
            return response.data;
        },
        enabled: !id && paths.includes(location.pathname) && !!currentUser,
        select: data => {
            return data.map(project => {
                return {
                    ...project,
                    isFollowing: project?.followers.some(x => x.id === currentUser?.id),
                    isOwner: project?.ownerId === currentUser?.id,
                    currentPhase: milestoneStore.Phase[project?.milestoneID],
                    launchQuarter: project?.phases.find(p => (p.phase === "NPDL" && p.required) || (p.phase === "CIB" && p.required))?.finishQuarter
                }
            })
        }
    });

    //indiviual project
    const { data: project, isLoading: isLoadingProject } = useQuery({
        queryKey: ['projects', id],
        queryFn: async () => {
            const response = await agent.get<Project>(`/projects/${id}`);
            return response.data;
        },
        enabled: !!id && !!currentUser,
        select: data => {
            return {
                ...data,
                isFollowing: data?.followers.some(x => x.id === currentUser?.id),
                isOwner: data?.ownerId === currentUser?.id,
                currentPhase: milestoneStore.Phase[data?.milestoneID],
                launchQuarter: data?.phases.find(p => (p.phase === "NPDL" && p.required) || (p.phase === "CIB" && p.required))?.finishQuarter
                
            }
        }
    });


    //edit
    const updateProject = useMutation({
        mutationFn: async (project: Project) => {
            const response = await agent.put(`/projects/${project.id}`, project)
            return response.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['projects'],
            })
        }
    })

    //edit milestone
    const updateProjectMilestone = useMutation({
        mutationFn: async (milestoneUpdate: ProjectMilestoneUpdate) => {
            const response = await agent.put(`/projects/${milestoneUpdate.id}/milestone`, milestoneUpdate)
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

    //set or create a new project phase 
    const setProjectPhase = useMutation({
        mutationFn: async (projectPhase: ProjectPhase) => {
            const response = await agent.post(`/projects/${projectPhase.projectId}/projectphase`, projectPhase)
            return response.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['projects'],
            })
        }
    })

    //set or create a new project phase 
    const editProjectPhase = useMutation({
        mutationFn: async (projectPhase: ProjectPhase) => {
            const response = await agent.put(`/projects/${projectPhase.projectId}/projectphase`, projectPhase)
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

    //set following of project
    const updateFollowing = useMutation({
        mutationFn: async (id:string) =>{
            await agent.post(`/projects/${id}/follow`)
        },
        onMutate: async (projectId: string) => {
            await queryClient.cancelQueries({
                queryKey: ['projects', projectId]});
            
            const prevProject = queryClient.getQueryData<Project>(['projects',projectId])

            queryClient.setQueryData<Project>(['projects',projectId], oldProject =>{
                if (!oldProject || !currentUser){
                    return oldProject
                }

                const isFollowing = oldProject.followers.some(x => x.id === currentUser.id);

                return{
                    ...oldProject,
                    followers: 
                        isFollowing
                        ? oldProject.followers.filter(x => x.id !== currentUser.id )
                        : [...oldProject.followers,{
                            id: currentUser.id,
                            displayName: currentUser.displayName,
                            imageUrl: currentUser.imageUrl 
                        }]
            
                }
            });
            
            return {prevProject};
            },
            onError: (error,projectId, context) =>{
                console.log(error)
                if(context?.prevProject) {
                    queryClient.setQueryData(['projects',projectId], context.prevProject)
                }
            }
        })
    
    

    return {
        projects,
        refetch,
        isLoading,
        updateProject,
        createProject,
        deleteProject,
        updateProjectMilestone,
        setProjectPhase,
        editProjectPhase,
        project,
        isLoadingProject,
        updateFollowing,
    }
}