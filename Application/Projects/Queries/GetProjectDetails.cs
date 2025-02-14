using System;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Persistence;

namespace Application.Projects.Queries;

public class GetProjectDetails
{
    public class Query : IRequest<Project>{
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Query, Project>
    {
        public async Task<Project> Handle(Query request, CancellationToken cancellationToken)
        {
            var project = await context.Projects.FindAsync([request.Id], cancellationToken);
            
            if(project == null) throw new Exception("Activity not found");
            
            return project;
        }
    }
}
