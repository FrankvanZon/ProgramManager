using System;
using Application.Core;
using Application.Projects.DTOs;
using MediatR;
using Persistence;

namespace Application.Projects.Commands;

public class UpdateCommercialPresentationUrl
{
    public class Command : IRequest<Result<Unit>>{

        public required ProjectCommercialPresentationDTO CommercialPresentationUrl { get; set; }
        
    }

    public class Handler(AppDbContext context)
        : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var project = await context.Projects
                .FindAsync([request.CommercialPresentationUrl.Id], cancellationToken);
            
            if(project == null) return Result<Unit>.Failure("Project not found", 404);

            if(request.CommercialPresentationUrl.Url == null) return Result<Unit>.Failure("No Url included", 404);

            project.CommercialPresentationUrl = request.CommercialPresentationUrl.Url;

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<Unit>.Failure("Failed to update the Url", 400);

            return Result<Unit>.Success(Unit.Value);
            
        }
    }
}


