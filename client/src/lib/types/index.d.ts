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
    milestone: string
    milestoneID: number
    
    projectPhaseNPDL: boolean
    projectPhaseVPC: boolean
    projectPhaseAPC: boolean
}