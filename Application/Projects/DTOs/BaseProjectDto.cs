using System;

namespace Application.Projects.DTOs;

public class BaseProjectDto
{
    public string Name { get; set; } ="";
    public DateTime ReleaseDate { get; set; }
    public string Description { get; set; } ="";
    public string Category { get; set; } ="";

    // project details
    public string Cluster { get; set; } ="";
    public string Team { get; set; } = "";
    public double StartQuarter { get; set; }
    public double LaunchQuarter { get; set; }
    public string Milestone { get; set; } = "<PI";
    public double MilestoneID { get; set; } = 4;
}
