using System;
using Domain;
using MediatR;
using Persistence;

namespace Application.Projects.Commands;

public class CreateProject
{
    public class Command : IRequest<string>{
        public required Project Project { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, string>
    {
        public async Task<string> Handle(Command request, CancellationToken cancellationToken)
        {
            context.Projects.Add(request.Project);

            await context.SaveChangesAsync(cancellationToken);

            return request.Project.Id;
        }
    }
}
