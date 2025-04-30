using System;

namespace Application.Projects.DTOs;

public class BaseProjectDto
{
    public string Name { get; set; } ="";

    public string Description { get; set; } ="";
    public string Program { get; set; } ="";
    public string Category { get; set; } ="";
    public string Cluster { get; set; } ="";
    public string Team { get; set; } = "";
    public double MilestoneID { get; set; } = 4;
    public double TargetLaunchQuarter { get; set; } =0;

    // project details


}
