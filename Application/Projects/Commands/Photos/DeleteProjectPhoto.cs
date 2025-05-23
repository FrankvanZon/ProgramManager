using System;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Persistence;

namespace Application.Profiles.Commands;

public class DeleteProjectPhoto
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string PhotoId { get; set; }
        public required string ProjectId { get; set; }
    }

    public class Handler(AppDbContext context,
        IPhotoService photoService) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var photo = context.ProjectPhotos.FirstOrDefault(x => x.Id == request.PhotoId);

            if (photo == null) return Result<Unit>.Failure("Cannot find photo", 400);

            var project = await context.Projects.FindAsync([request.ProjectId], cancellationToken);

            if (project == null) return Result<Unit>.Failure("Cannot find project", 400);

            if (photo.Url == project.ImageUrl) return Result<Unit>.Failure("Cannot delete main photo", 400);

            await photoService.DeletePhoto(photo.PublicId);

            context.ProjectPhotos.Remove(photo);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            return result
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Problem deleting photo", 400);
        }
    }
}
