using System;

namespace API.DTOs;

public class UpdateRoleDto
{
    public required string UserId { get; set; }
    public required string NewRole { get; set; }
}
