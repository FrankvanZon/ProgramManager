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

            project.MilestoneID = request.MilestoneUpdateDTO.NewMilestoneId;

            if (project.MilestoneID <= 5 ) project.ProgramStatus = "Proposed";
            if (project.MilestoneID >= 6 && project.MilestoneID <= 10) project.ProgramStatus = "Committed";
            if (project.MilestoneID == 11) project.ProgramStatus = "Released";
            if (project.MilestoneID >= 12) project.ProgramStatus = "Proposed";

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<Unit>.Failure("Failed to update the project milestone", 400);

            return Result<Unit>.Success(Unit.Value);
            
        }
    }
}


