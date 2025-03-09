using System;
using Application.Core;
using Application.Projects.DTOs;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Projects.Commands;

public class EditProject
{
    public class Command : IRequest<Result<Unit>>{
        
        public required EditProjectDto ProjectDto { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var project = await context.Projects.FindAsync([request.ProjectDto.Id], cancellationToken);
            
            if(project == null) return Result<Unit>.Failure("Project not found", 404);
            
            mapper.Map(request.ProjectDto, project);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<Unit>.Failure("Failed to update the project", 400);

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
