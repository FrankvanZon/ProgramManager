using System;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Projects.Commands;

public class UpdateProjectPhase
{
    public class Command : IRequest<Result<Unit>>{
        
        public required ProjectPhase ProjectPhase { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper)
        : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var projectPhase = await context.ProjectPhases.FindAsync([request.ProjectPhase.Id], cancellationToken);

            if (projectPhase == null) return Result<Unit>.Failure("ProjectPhase not found", 404);

            mapper.Map(request.ProjectPhase, projectPhase);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<Unit>.Failure("Failed to update the project phase", 400);

            return Result<Unit>.Success(Unit.Value);

        }
    }
}
