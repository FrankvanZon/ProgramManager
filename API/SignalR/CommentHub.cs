using System;
using Application.Projects.Commands;
using Application.Projects.Queries;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR;

public class CommentHub(IMediator mediator) : Hub
{
    public async Task SendComment(AddComment.Command command)
    {
        var comment = await mediator.Send(command);

        await Clients.Group(command.ProjectId).SendAsync("RecieveComment", comment.Value);
    }


    public override async Task OnConnectedAsync()
    {
        var httpContext = Context.GetHttpContext();
        var projectId = httpContext?.Request.Query["projectId"];

        if (string.IsNullOrEmpty(projectId)) throw new HubException("No project with this Id");

        await Groups.AddToGroupAsync(Context.ConnectionId, projectId!);

        var result = await mediator.Send(new GetComments.Query{ProjectId = projectId!});

        await Clients.Caller.SendAsync("LoadComments", result.Value);
    }
}
