type Project = {
    id: string
    name: string
    releaseDate: date
    description: string
    category: string
    isCancelled: boolean
    cluster: string
    team: string
    startQuarter: number
    launchQuarter: number
    milestoneID: number
    
    projectPhaseNPDL: boolean
    projectPhaseVPC: boolean
    projectPhaseAPC: boolean
}

type ProjectPhase = {
    id: string
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