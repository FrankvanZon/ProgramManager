using System;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Projects.Queries;

public class GetProjectList
{
    public class Query : IRequest<List<Project>> {}

    public class Handler(AppDbContext context) : IRequestHandler<Query, List<Project>>
    {
        public async Task<List<Project>> Handle(Query request, CancellationToken cancellationToken)
        {
            return await context.Projects.ToListAsync(cancellationToken);
        }
    }
}
