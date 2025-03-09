using System;
using Application.Projects.DTOs;
using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Project, Project>();
        CreateMap<CreateProjectDto, Project>();
        CreateMap<EditProjectDto, Project>();
    }
}
