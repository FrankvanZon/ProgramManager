using System;

namespace Application.Projects.DTOs;

public class BaseProjectDto
{
    public string Name { get; set; } ="";

    public string Description { get; set; } ="";
    public string Category { get; set; } ="";
    public string Cluster { get; set; } ="";
    public string Team { get; set; } = "";

    // project details
    public DateTime ReleaseDate { get; set; }
    public double StartQuarter { get; set; } =0;
    public double LaunchQuarter { get; set; } =0;
    public double MilestoneID { get; set; } = 4;
    public bool ProjectPhaseVPC { get; set; } = false; 
    public bool ProjectPhaseAPC { get; set; } = false;
    public bool ProjectPhaseNPDL { get; set; } = true;
}
