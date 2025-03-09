using System;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Persistence;

namespace Application.Projects.Queries;

public class GetProjectDetails
{
    public class Query : IRequest<Result<Project>>{
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Query, Result<Project>>
    {
        public async Task<Result<Project>> Handle(Query request, CancellationToken cancellationToken)
        {
            var project = await context.Projects.FindAsync([request.Id], cancellationToken);
            
            if(project == null) return Result<Project>.Failure("Project not found", 404);
            
            return Result<Project>.Success(project);
        }
    }
}
