using System;

namespace Application.Profiles.DTOs;

public class MilestoneDTO
{
    public string? Id { get; set; } 
    public required string Name { get; set; }
    public double Target { get; set; }
    public double? Realized { get; set; }
    public double? OnTime { get; set; }

    //nav
    public required string ProjectPhaseId { get; set; }
}
