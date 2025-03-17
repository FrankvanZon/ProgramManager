using System;
using Application.Core;
using Application.Interfaces;
using Application.Projects.DTOs;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Projects.Commands;

public class CreateProject
{
    public class Command : IRequest<Result<string>>{
        public required CreateProjectDto ProjectDto { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) 
        : IRequestHandler<Command, Result<string>>
    {
        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {          
            var user = await userAccessor.GetUserAsync();


            
            var project = mapper.Map<Project>(request.ProjectDto);
            
            context.Projects.Add(project);

            var follower = new ProjectFollowers
            {
                ProjectId = project.Id,
                UserId = user.Id,
                IsOwner = true
            };

            project.Followers.Add(follower);

            var result = await context.SaveChangesAsync(cancellationToken) >0;

            if (!result) return Result<string>.Failure("Failed to create the project", 400);

            return Result<string>.Success(project.Id);
        }
    }
}
