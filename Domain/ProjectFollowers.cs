using System;

namespace Domain;

public class ProjectFollowers
{
    public string? UserId { get; set; }
    public User User { get; set; } = null!;
    public string? ProjectId { get; set; }
    public Project Project { get; set; } = null!;
    public bool IsOwner { get; set; }
}
