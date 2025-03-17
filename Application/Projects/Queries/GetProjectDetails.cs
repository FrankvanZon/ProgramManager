using System;
using Application.Core;
using Application.Projects.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Projects.Queries;

public class GetProjectDetails
{
    public class Query : IRequest<Result<ProjectDto>>{
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, Result<ProjectDto>>
    {
        public async Task<Result<ProjectDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var project = await context.Projects
                .ProjectTo<ProjectDto>(mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => request.Id == x.Id, cancellationToken);
            
            if(project == null) return Result<ProjectDto>.Failure("Project not found", 404);
            
            return Result<ProjectDto>.Success(project);
        }
    }
}
