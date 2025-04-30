using System;
using Application.Core;

namespace Application.Projects.Queries;

public class ProjectParams : PaginationParams<string?>
{
    public string? FilterByCluster { get; set; }
    public string? FilterByProgram { get; set; }
    public double? FilterByMilestoneMin { get; set; }
    public double? FilterByMilestoneMax { get; set; }

}
