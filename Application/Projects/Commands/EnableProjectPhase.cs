using System;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Projects.Commands;

public class EnableProjectPhase
{
    public class Command : IRequest<Result<Unit>>{
        
        public required ProjectPhase NewProjectPhase { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper)
        : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var projectPhase = await context.ProjectPhases.FindAsync([request.NewProjectPhase.Id], cancellationToken);

            if (projectPhase == null)
            {
                var newProjectPhase = mapper.Map<ProjectPhase>(request.NewProjectPhase);
                newProjectPhase.Required = true;

                context.ProjectPhases.Add(newProjectPhase);
            }
            else
            {
                projectPhase.Required = !projectPhase.Required;
            }

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<Unit>.Failure("Failed to update the project phase", 400);

            return Result<Unit>.Success(Unit.Value);

        }
    }
}
