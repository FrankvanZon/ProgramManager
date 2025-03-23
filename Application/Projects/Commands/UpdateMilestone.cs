using System;
using Application.Core;
using Application.Projects.DTOs;
using MediatR;
using Persistence;

namespace Application.Projects.Commands;

public class UpdateMilestone
{
    public class Command : IRequest<Result<Unit>>{

        public required MilestoneUpdateDTO MilestoneUpdateDTO { get; set; }
        
    }

    public class Handler(AppDbContext context)
        : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var project = await context.Projects
                .FindAsync([request.MilestoneUpdateDTO.Id], cancellationToken);
            
            if(project == null) return Result<Unit>.Failure("Project not found", 404);

            project.MilestoneID += request.MilestoneUpdateDTO.MilestoneIncrease;

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<Unit>.Failure("Failed to update the project milestone", 400);

            return Result<Unit>.Success(Unit.Value);
            
        }
    }
}


