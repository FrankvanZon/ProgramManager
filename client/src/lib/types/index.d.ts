type PagedList<T, TCursor> = {
    items: T[],
    nextCursor: TCursor
}

type Project = {
    id: string
    
    name: string
    description: string
    category: string
    
    program: string
    cluster: string
    team: string

    milestoneID: number
    programStatus: string
    currentPhase: string

    
    //To be removed
 
    startQuarter : number | undefined
    launchQuarter : number | undefined
    totalDuration : number | undefined



    imageUrl: string
    
    phases: ProjectPhase[]
    followers : Profile[]
    photos: Photo[]

    isFollowing : boolean
}

type Profile = {
    id: string
    email?: string
    displayName: string
    imageUrl?: string
    bio?: string
}

type Milestone = {
    id: string
    milestoneId? : number
    name: string
    target : number
    realized : number
    onTime : number
    projectPhaseId : string
}

type Photo = {
    id: string
    url: string
}

type ProjectPhase = {
    id?: string
    projectId : string
    phase: string
    required: boolean
    startQuarter: number
    finishQuarter: number

    milestones : Milestone[]
}

type ChatComment = {
    id: string
    createdAt : Date
    body : string
    userId : string
    displayName : string
    imageUrl? : string
}

type User = {
    id: string
    email: string
    displayName: string
    imageUrl?: string
}

type ProjectMilestoneUpdate = {
    id: string
    newMilestoneId: number
}