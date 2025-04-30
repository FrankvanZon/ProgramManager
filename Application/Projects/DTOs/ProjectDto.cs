using System;
using Application.Profilies.DTOs;
using Domain;

namespace Application.Projects.DTOs;

public class ProjectDto
{
    public required string Id { get; set; }
    public required string Name { get; set; }
    public DateTime ReleaseDate { get; set; }
    public required string Description { get; set; }
    public required string Program { get; set; }
    public required string Category { get; set; }
    public bool IsCancelled { get; set; }
 
    public required string OwnerDisplayName { get; set; }
    public required string OwnerId { get; set; }

    // project details
    public required string Cluster { get; set; }
    public string Team { get; set; } = "";
    public double TargetLaunchQuarter { get; set; }
    public string ProgramStatus { get; set; } ="New";
    public string UpdatedBy { get; set; } = "";
    public required double MilestoneID { get; set; } = 4;

    //navigation properties
    public ICollection<ProjectPhase> Phases { get; set; } = [];
    public ICollection<UserProfile> Followers { get; set; } = [];
    public ICollection<Photo> Photos { get; set; } = [];
}
