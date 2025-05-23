using System;
using Application.Profiles.DTOs;
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
        CreateMap<Milestone, Milestone>();
        CreateMap<Milestone, MilestoneDTO>();
        CreateMap<MilestoneDTO, Milestone>();
        CreateMap<CreateProjectDto, Project>();
        CreateMap<EditProjectDto, Project>();

        CreateMap<Project, ProjectDto>();
            
        CreateMap<ProjectFollowers, UserProfile>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.User.DisplayName))
            .ForMember(d => d.Id, o => o.MapFrom(s => s.User.Id))
            .ForMember(d => d.Bio, o => o.MapFrom(s => s.User.Bio))
            .ForMember(d => d.ImageUrl, o => o.MapFrom(s => s.User.ImageUrl));

        CreateMap<User, UserProfile>();

        CreateMap<Comment, CommentDto>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.User.DisplayName))
            .ForMember(d => d.UserId, o => o.MapFrom(s => s.User.Id))
            .ForMember(d => d.ImageUrl, o => o.MapFrom(s => s.User.ImageUrl));
    }
}
