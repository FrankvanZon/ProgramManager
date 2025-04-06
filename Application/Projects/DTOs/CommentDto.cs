using System;

namespace Application.Projects.DTOs;

public class CommentDto
{
    public string Id { get; set; } 
    public required string Body { get; set; }
    public DateTime CreatedAt { get; set; } 

    //Nav properties
    public required string UserId { get; set; }
    public required string DisplayName { get; set; }
    public string? ImageUrl { get; set; }
}
