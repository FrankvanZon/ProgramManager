using System;
using MediatR;
using Persistence;

namespace Application.Projects.Commands;

public class DeleteProject
{
    public class Command : IRequest{
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var project = await context.Projects.FindAsync([request.Id], cancellationToken) 
                ?? throw new Exception("Cannot find project");

            context.Remove(project);

            await context.SaveChangesAsync(cancellationToken);
        }
    }
}
