import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useLocation } from "react-router";
import { useStore } from "./useStore";
import { useAccount } from "./useAccount";
import { quarterToIndex } from "../util/util";

export const useProjects = (id?: string) => {
    const { milestoneStore, projectStore,
        milestoneStore: { filterByMilestoneMin, filterByMilestoneMax }, projectStore: { filterByCluster, filterByProgram } } = useStore();
    const { currentUser } = useAccount();
    const queryClient = useQueryClient();
    const location = useLocation();
    const paths = ['/projects', '/program', '/launchCalendar', '/milestones','/roadmap'];

    //project list paged
    const { data: projectsGroup, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery<PagedList<Project, string>>({
        queryKey: ['projects', filterByCluster, filterByProgram, filterByMilestoneMin, filterByMilestoneMax],
        queryFn: async ({ pageParam = null }) => {
            //console.log('Fetching page with cursor:', pageParam);
            const response = await agent.get<PagedList<Project, string>>('/projects', {
                params: {
                    cursor: pageParam,
                    pageSize: 5,
                    filterByCluster,
                    filterByProgram,
                    filterByMilestoneMin,
                    filterByMilestoneMax
                }
            });
            //console.log('Fetched data:', response.data);
            return response.data;
        },
        initialPageParam: null,

        getNextPageParam: (lastPage) => {
            //console.log('Next cursor:', lastPage.nextCursor);
            return lastPage.nextCursor;
        },

        enabled: !id && paths.includes(location.pathname) && !!currentUser,
        select: data => ({
            ...data,
            pages: data.pages.map((page) => ({
                ...page,
                items: page.items.map(project => {
                    return {
                        ...project,
                        isFollowing: project?.followers.some(x => x.id === currentUser?.id),
                        isOwner: project?.ownerId === currentUser?.id,
                        currentPhase: milestoneStore.Phase[project?.milestoneID],
                        launchQuarter: project?.phases.find(p => (p.phase === "NPDL" && p.required) || (p.phase === "CIB" && p.required))?.finishQuarter
                    }
                })
            }))
        })
    });

    //project list all
    const { data: projects, refetch, isLoading: isLoadingAllProject } = useQuery({
        queryKey: ['projects/all', filterByCluster],
        queryFn: async () => {
            const response = await agent.get<Project[]>
                (`/projects/all?cluster=${filterByCluster}&program=${filterByProgram}&milestoneMin=${filterByMilestoneMin}&milestoneMax=${filterByMilestoneMax}`);
            projectStore.setProjects(response.data);
            return response.data;
        },
        enabled: !id && paths.includes(location.pathname) && !!currentUser,
        select: data => {
            return data.map(project => {
                const requiredPhases = project.phases.filter(p => p.required);

                const startQuarter = requiredPhases.length > 0
                    ? Math.min(...requiredPhases.map(p => p.startQuarter))
                    : undefined;

                const endQuarter = requiredPhases.length > 0
                    ? Math.max(...requiredPhases.map(p => p.finishQuarter))
                    : undefined;

                const totalDuration = (startQuarter !== undefined && endQuarter !== undefined)
                    ? quarterToIndex(endQuarter) - quarterToIndex(startQuarter) + 1
                    : undefined;

                return {
                    ...project,
                    isFollowing: project?.followers.some(x => x.id === currentUser?.id),
                    isOwner: project?.ownerId === currentUser?.id,
                    currentPhase: milestoneStore.Phase[project?.milestoneID],
                    launchQuarter: project?.phases.find(p => (p.phase === "NPDL" && p.required) || (p.phase === "CIB" && p.required))?.finishQuarter,
                    startQuarter,
                    totalDuration
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

    //edit milestone plan
    const updateProjectMilestonePlan = useMutation({
        mutationFn: async (milestoneUpdates: Milestone[]) => {
            const response = await agent.put(`/projects/milestoneUpdate`, milestoneUpdates)
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
        mutationFn: async (id: string) => {
            await agent.post(`/projects/${id}/follow`)
        },
        onMutate: async (projectId: string) => {
            await queryClient.cancelQueries({
                queryKey: ['projects', projectId]
            });

            const prevProject = queryClient.getQueryData<Project>(['projects', projectId])

            queryClient.setQueryData<Project>(['projects', projectId], oldProject => {
                if (!oldProject || !currentUser) {
                    return oldProject
                }

                const isFollowing = oldProject.followers.some(x => x.id === currentUser.id);

                return {
                    ...oldProject,
                    followers:
                        isFollowing
                            ? oldProject.followers.filter(x => x.id !== currentUser.id)
                            : [...oldProject.followers, {
                                id: currentUser.id,
                                displayName: currentUser.displayName,
                                imageUrl: currentUser.imageUrl
                            }]

                }
            });

            return { prevProject };
        },
        onError: (error, projectId, context) => {
            console.log(error)
            if (context?.prevProject) {
                queryClient.setQueryData(['projects', projectId], context.prevProject)
            }
        }
    })



    return {
        projects,
        isLoadingAllProject,
        projectsGroup,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
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
        updateProjectMilestonePlan,
    }
}