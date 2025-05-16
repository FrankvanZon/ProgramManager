const getMilestoneTarget = (project: Project | undefined, phaseName: string, milestoneName: string) => {
    if (!project) return 'Not Found';

    const phase = project.phases.find((p) => p.phase === phaseName);
    if (!phase) return 'No phase';

    const milestone = phase.milestones.find((m) => m.name === milestoneName);
    if (!milestone) return 'No MS date';

    return milestone.target; // Return the target value
  };

  export default getMilestoneTarget;