using System;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Persistence;

namespace Application.Profiles.Commands;

public class SetMainProjectPhoto
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string PhotoId { get; set; }
        public required string ProjectId { get; set; }
    }

    public class Handler(AppDbContext context) 
        : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var project = await context.Projects.FindAsync([request.ProjectId], cancellationToken);

            if (project == null) return Result<Unit>.Failure("Cannot find project", 400);

            var photo = context.ProjectPhotos.FirstOrDefault(x => x.Id == request.PhotoId);

            if (photo == null) return Result<Unit>.Failure("Cannot find photo", 400);

            project.ImageUrl = photo.Url;

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            return result
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Problem updating your photo", 400);
        }
    }
}
