using System;
using System.Text.Json.Serialization;

namespace Domain;

public class Milestone
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string Name { get; set; }
    public required double MilestoneRefId { get; set; }
    public double Target { get; set; }
    public double Realized { get; set; }
    public double OnTime { get; set; }

    //nav
    public required string ProjectPhaseId { get; set; }

    [JsonIgnore]
    public ProjectPhase ProjectPhase { get; set; } = null!;
}
