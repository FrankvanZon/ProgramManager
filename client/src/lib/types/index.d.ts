type Project = {
    id: string
    
    name: string
    description: string
    category: string
    
    cluster: string
    team: string

    milestoneID: number
    programStatus: string

    
    //To be removed
    releaseDate: date
    targetlaunchQuarter: number


    isCancelled: boolean
    isOwner : boolean
    updatedBy : string
    ownerId : string
    ownerDisplayName : string
    
    phases: ProjectPhase[]
    followers : Profile[]

    isFollowing : boolean
}

type Profile = {
    id: string
    email?: string
    displayName: string
    imageUrl?: string
}


type ProjectPhase = {
    id?: string
    projectId : string
    phase: string
    required: boolean
    startQuarter: number
    finishQuarter: number
}

type User = {
    id: string
    email: string
    displayName: string
    imageUrl?: string
}

type ProjectMilestoneUpdate = {
    id: string
    milestoneIncrease: number
}