using System;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Projects.Commands;

public class EditProject
{
    public class Command : IRequest{
        
        public required Project Project { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var project = await context.Projects.FindAsync([request.Project.Id], cancellationToken) 
                ?? throw new Exception("Cannot find project");
            
            mapper.Map(request.Project, project);

            await context.SaveChangesAsync(cancellationToken);
        }
    }
}
