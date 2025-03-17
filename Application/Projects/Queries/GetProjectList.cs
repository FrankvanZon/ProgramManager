using System;
using Application.Projects.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Projects.Queries;

public class GetProjectList
{
    public class Query : IRequest<List<ProjectDto>> {}

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, List<ProjectDto>>
    {
        public async Task<List<ProjectDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            return await context.Projects
                .ProjectTo<ProjectDto>(mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);
        }
    }
}
