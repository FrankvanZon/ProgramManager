using System;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Projects.Commands;

public class UpdateFollowing
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string Id { get; set; }
    }

    public class Handler(IUserAccessor userAccessor, AppDbContext context) 
        : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var project = await context.Projects
                .Include(x => x.Followers)
                .ThenInclude(x => x.User)
                .SingleOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            if (project == null) return Result<Unit>.Failure("Project not found", 404);

            var user = await userAccessor.GetUserAsync();

            var following = project.Followers.FirstOrDefault(x => x.UserId == user.Id);
            var isOwner = project.Followers.Any(x => x.IsOwner && x.UserId == user.Id);

            if (following!= null)
            {
                project.Followers.Remove(following);
            }
            else
            {
                project.Followers.Add(new ProjectFollowers
                {
                    UserId = user.Id,
                    ProjectId = project.Id,
                    IsOwner = false
                });
            }

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            return result
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Problem updating the DB", 400);
        }
    }
}
