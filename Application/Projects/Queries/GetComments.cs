using System;
using Application.Core;
using Application.Projects.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Projects.Queries;

public class GetComments
{
    public class Query : IRequest<Result<List<CommentDto>>>
    {
        public required string ProjectId { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, Result<List<CommentDto>>>
    {
        public async Task<Result<List<CommentDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var comments = await context.Comments
                .Where(x=> x.ProjectId == request.ProjectId)
                .OrderByDescending(x => x.CreatedAt)
                .ProjectTo<CommentDto>(mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            return Result<List<CommentDto>>.Success(comments);
        }
    }
}
