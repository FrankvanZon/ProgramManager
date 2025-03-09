using System;
using Application.Core;
using MediatR;
using Persistence;

namespace Application.Projects.Commands;

public class DeleteProject
{
    public class Command : IRequest<Result<Unit>>{
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var project = await context.Projects
                .FindAsync([request.Id], cancellationToken);
            
            if(project == null) return Result<Unit>.Failure("Project not found", 404);
                
            context.Remove(project);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<Unit>.Failure("Failed to delete the project", 400);

            return Result<Unit>.Success(Unit.Value);

        }
    }
}
