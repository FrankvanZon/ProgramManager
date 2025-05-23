using System;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Queries;

public class GetProjectPhotos
{
    public class Query : IRequest<Result<List<ProjectPhoto>>>
    {
        public required string ProjectId { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Query, Result<List<ProjectPhoto>>>
    {
        public async Task<Result<List<ProjectPhoto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var photos = await context.ProjectPhotos
                .Where(x => x.ProjectId == request.ProjectId)
                .ToListAsync(cancellationToken);

            return Result<List<ProjectPhoto>>.Success(photos);
        }
    }
}

