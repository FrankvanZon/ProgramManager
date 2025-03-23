using System;

namespace Application.Projects.DTOs;

public class MilestoneUpdateDTO
{
    public required string Id { get; set; }
    public required double MilestoneIncrease { get; set; }
}
