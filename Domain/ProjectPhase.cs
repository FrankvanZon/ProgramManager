using System;

namespace Domain;

public class ProjectPhase
{
    public string Id  { get; set; } = Guid.NewGuid().ToString();
    public required string ProjectId  { get; set; }
    public required string Phase  { get; set; }
    public required bool Required { get; set; }
    public double StartQuarter { get; set; }
    public double FinishQuarter { get; set; }
    public string Complexity { get; set; } = "";
    public double FteRunRate { get; set; }
    public double PhaseCost { get; set; }
    public double Capex { get; set; }

    
    public ICollection<Milestone> Milestones { get; set; } = [];
}
