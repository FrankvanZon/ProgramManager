using Application.Projects.Commands;
using Application.Projects.DTOs;
using Application.Projects.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Differencing;

namespace API.Controllers;

public class ProjectsController : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Project>>> GetProjects(){
        return await Mediator.Send(new GetProjectList.Query());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Project>> GetProjectDetails(string id){
        return HandleResult(await Mediator.Send(new GetProjectDetails.Query{Id = id}));
    }

    [HttpPost]
    public async Task<ActionResult<string>> CreateProject(CreateProjectDto projectDto){
        return HandleResult(await Mediator.Send(new CreateProject.Command{ProjectDto = projectDto}));
    }

    [HttpPut]
    public async Task<ActionResult> EditProject(EditProjectDto project){
        return HandleResult(await Mediator.Send(new EditProject.Command{ProjectDto = project}));
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteProject(string id){
        return HandleResult(await Mediator.Send(new DeleteProject.Command{Id = id}));
    }
}
