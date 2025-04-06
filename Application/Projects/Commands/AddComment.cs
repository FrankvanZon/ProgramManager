using System;
using Application.Core;
using Application.Interfaces;
using Application.Projects.DTOs;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Projects.Commands;

public class AddComment
{
    public class Command : IRequest<Result<CommentDto>>
    {
        public required string Body { get; set; }
        public required string ProjectId { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor)
        : IRequestHandler<Command, Result<CommentDto>>
    {
        public async Task<Result<CommentDto>> Handle(Command request, CancellationToken cancellationToken)
        {
            var project = await context.Projects
                .Include(x => x.Comments)
                .ThenInclude(x => x.User)
                .FirstOrDefaultAsync(x => x.Id == request.ProjectId, cancellationToken);

            if (project == null) return Result<CommentDto>.Failure("Could not find project",404);

            var user = await userAccessor.GetUserAsync();

            var comment = new Comment
            {
                UserId = user.Id,
                ProjectId = project.Id,
                Body = request.Body
            };

            project.Comments.Add(comment);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            return result
                ? Result<CommentDto>.Success(mapper.Map<CommentDto>(comment))
                : Result<CommentDto>.Failure("Failed to add comment", 400);
        }
    }
}
