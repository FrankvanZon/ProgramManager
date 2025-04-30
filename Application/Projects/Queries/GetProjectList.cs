using System;
using Application.Core;
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


    public class Query : IRequest<Result<PagedList<ProjectDto, string?>>>
    {
        public required ProjectParams Params { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, Result<PagedList<ProjectDto, string?>>>
    {
        public async Task<Result<PagedList<ProjectDto, string?>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var query = context.Projects
                .OrderBy(x => x.Id)
                .AsQueryable();

            if (!string.IsNullOrEmpty(request.Params.Cursor))
            {
                // Ensure that your Id is of type string and the comparison is lexicographical
                query = query.Where(x => string.Compare(x.Id, request.Params.Cursor) > 0);
            }

            if (!string.IsNullOrEmpty(request.Params.FilterByProgram))
            {
                if (request.Params.FilterByProgram != "all")
                {
                    query = query.Where(x => x.Program == request.Params.FilterByProgram);
                }
            }

            if (!string.IsNullOrEmpty(request.Params.FilterByCluster))
            {
                if (request.Params.FilterByCluster != "all")
                {
                    query = query.Where(x => x.Cluster == request.Params.FilterByCluster);
                }
            }


            {
                query = query.Where(x => x.MilestoneID >= request.Params.FilterByMilestoneMin && x.MilestoneID <= request.Params.FilterByMilestoneMax);
            }

            var projectedProjects = query.ProjectTo<ProjectDto>(mapper.ConfigurationProvider);

            var projects = await projectedProjects
                .Take(request.Params.PageSize + 1)
                .ToListAsync(cancellationToken);

            string? nextCursor = null;
            if (projects.Count > request.Params.PageSize)
            {
                nextCursor = projects.Last().Id;
                projects.RemoveAt(projects.Count - 1);
            }

            return Result<PagedList<ProjectDto, string?>>.Success(
                new PagedList<ProjectDto, string?>
                {
                    Items = projects,
                    NextCursor = nextCursor
                }
            );
        }
    }
}
