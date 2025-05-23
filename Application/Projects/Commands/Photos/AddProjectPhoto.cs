using System;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Application.Profiles.Commands;

public class AddProjectPhoto
{
    public class Command : IRequest<Result<ProjectPhoto>>
    {
        public required IFormFile File { get; set; }
        public required string ProjectId { get; set; }
    }

    public class Handler(AppDbContext context, IPhotoService photoService) : IRequestHandler<Command, Result<ProjectPhoto>>
    {
        public async Task<Result<ProjectPhoto>> Handle(Command request, CancellationToken cancellationToken)
        {
            var uploadResult = await photoService.UploadPhoto(request.File);

            if (uploadResult == null) return Result<ProjectPhoto>.Failure("Failure to upload photo", 400);

            var project = await context.Projects.FindAsync([request.ProjectId], cancellationToken);

            if (project == null) return Result<ProjectPhoto>.Failure("Failure to upload photo", 400);

            var photo = new ProjectPhoto
            {
                Url = uploadResult.Url,
                PublicId = uploadResult.PublicId,
                ProjectId = request.ProjectId
            };

            project.ImageUrl ??=  photo.Url;

            context.ProjectPhotos.Add(photo);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            return result
                ? Result<ProjectPhoto>.Success(photo)
                : Result<ProjectPhoto>.Failure("Problem saving photo to DB", 400);
        }
    }
}
