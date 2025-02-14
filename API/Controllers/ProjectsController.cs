using Application.Projects.Commands;
using Application.Projects.Queries;
using Domain;
using MediatR;
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
        return await Mediator.Send(new GetProjectDetails.Query{Id = id});
    }

    [HttpPost]
    public async Task<ActionResult<string>> CreateProject(Project project){
        return await Mediator.Send(new CreateProject.Command{Project = project});
    }

    [HttpPut]
    public async Task<ActionResult> EditProject(Project project){
        await Mediator.Send(new EditProject.Command{Project = project});
        return NoContent ();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteProject(string id){
        await Mediator.Send(new DeleteProject.Command{Id = id});
        return Ok();
    }
}
