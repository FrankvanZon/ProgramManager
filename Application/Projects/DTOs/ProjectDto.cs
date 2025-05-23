using System;
using Application.Profilies.DTOs;
using Domain;

namespace Application.Projects.DTOs;

public class ProjectDto
{
    public required string Id { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }



    // project details
    public required string Category { get; set; }
    public required string Cluster { get; set; }
    public required string Program { get; set; }
    public string Team { get; set; } = "";
    public required double MilestoneID { get; set; } = 0;
    public string ProgramStatus { get; set; } = "New";
    public string ImageUrl { get; set; } = "";
    public string InnovationType { get; set; } = "";
    public string LaunchClassification { get; set; } = "C";
    public string Factory { get; set; } = "";

    //navigation properties
    public ICollection<ProjectPhase> Phases { get; set; } = [];
    public ICollection<UserProfile> Followers { get; set; } = [];
    public ICollection<ProjectPhoto> Photos { get; set; } = [];
    public ICollection<Comment> Comments { get; set; } = [];
}
