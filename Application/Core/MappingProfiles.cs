using System;
using Application.Profilies.DTOs;
using Application.Projects.DTOs;
using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Project, Project>();
        CreateMap<ProjectPhase, ProjectPhase>();
        CreateMap<CreateProjectDto, Project>();
        CreateMap<EditProjectDto, Project>();
        
        CreateMap<Project, ProjectDto>()
            .ForMember(d => d.OwnerDisplayName, 
                o => o.MapFrom(
                s => s.Followers.FirstOrDefault(
                x=>x.IsOwner)!.User.DisplayName))
            .ForMember(d => d.OwnerId, 
                o => o.MapFrom(
                s => s.Followers.FirstOrDefault(
                x=>x.IsOwner)!.User.Id));
        
        CreateMap<ProjectFollowers, UserProfile>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.User.DisplayName))
            .ForMember(d => d.Id, o => o.MapFrom(s => s.User.Id))
            .ForMember(d => d.Bio, o => o.MapFrom(s => s.User.Bio))
            .ForMember(d => d.ImageUrl, o => o.MapFrom(s => s.User.ImageUrl));

        CreateMap<User, UserProfile>();
    }
}
