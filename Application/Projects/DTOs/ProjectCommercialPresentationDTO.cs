using System;
using Persistence.Migrations;

namespace Application.Projects.DTOs;

public class ProjectCommercialPresentationDTO
{
    public required string Id { get; set; }
    public string? Url { get; set; }

    public static implicit operator ProjectCommercialPresentationDTO(CommercialPresentationUrl v)
    {
        throw new NotImplementedException();
    }
}
