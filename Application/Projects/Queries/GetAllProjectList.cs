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

public class GetAllProjectList
{
    public class Query : IRequest<Result<List<ProjectDto>>>
    {
        public string? FilterByCluster { get; set; }
        public string? FilterByProgram { get; set; }
        public int? FilterByMilestoneMin { get; set; }
        public int? FilterByMilestoneMax { get; set; }

    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, Result<List<ProjectDto>>>
    {
        public async Task<Result<List<ProjectDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var query = context.Projects
                .Include(p => p.Phases)
                .ThenInclude(pp => pp.Milestones)
                .Where(x => x.ProgramStatus != "Cancelled")
                .OrderByDescending(x => x.MilestoneID)  // First, order by MilestoneID in descending order
                .ThenBy(x => x.Name)                    // Then, order by Name in ascending order
                .AsQueryable();


            if (!string.IsNullOrEmpty(request.FilterByProgram))
            {
                if (request.FilterByProgram != "all")
                {
                    query = query.Where(x => x.Program == request.FilterByProgram);
                }
            }

            if (!string.IsNullOrEmpty(request.FilterByCluster))
            {
                if (request.FilterByCluster != "all")
                {
                    query = query.Where(x => x.Cluster == request.FilterByCluster);
                }
            }


            if (request.FilterByMilestoneMin.HasValue)
            {
                query = query.Where(p => p.MilestoneID >= request.FilterByMilestoneMin.Value);
            }

            if (request.FilterByMilestoneMax.HasValue)
            {
                query = query.Where(p => p.MilestoneID <= request.FilterByMilestoneMax.Value);
            }


            var projectList = await query
                .ProjectTo<ProjectDto>(mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            return Result<List<ProjectDto>>.Success(projectList);
        }
    }
}