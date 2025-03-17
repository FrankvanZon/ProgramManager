using System;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security;

public class IsOwnerRequirement : IAuthorizationRequirement
{

}

public class IsOwnerRequirementHandler(AppDbContext dbContext, IHttpContextAccessor httpContextAccessor) 
    : AuthorizationHandler<IsOwnerRequirement>
{
    protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, 
        IsOwnerRequirement requirement)
    {
        var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null) return;

        var HttpContext = httpContextAccessor.HttpContext;

        // Check the HttpContext id is available and assign it to projectId, if not availble return with error
        if (HttpContext?.GetRouteValue("id") is not string projectId) return;

        var follower = await dbContext.ProjectFollowers
            .SingleOrDefaultAsync(
            x => x.UserId == userId && x.ProjectId == projectId);
        
        if (follower == null) return;

        if (follower.IsOwner) context.Succeed(requirement);
    }
}