using Application.Core;
using Application.Profiles.DTOs;
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
    public async Task<ActionResult<PagedList<ProjectDto, string?>>> GetProjects(
            [FromQuery]ProjectParams projectParams){
        return HandleResult(await Mediator.Send(new GetProjectList.Query{Params = projectParams}));
    }

    [HttpGet("all")]
    public async Task<ActionResult<List<ProjectDto>>> GetAllProjects(string? cluster, string? program, int? milestoneMin, int? milestoneMax){
        return HandleResult(await Mediator.Send(new GetAllProjectList.Query{
            FilterByCluster = cluster,
            FilterByProgram = program,
            FilterByMilestoneMin = milestoneMin,
            FilterByMilestoneMax = milestoneMax
            }));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ProjectDto>> GetProjectDetails(string id){
        return HandleResult(await Mediator.Send(new GetProjectDetails.Query{Id = id}));
    }

    [HttpPost]
    public async Task<ActionResult<string>> CreateProject(CreateProjectDto projectDto){
        return HandleResult(await Mediator.Send(new CreateProject.Command{ProjectDto = projectDto}));
    }

    [HttpPut("{id}")]
    // [Authorize(Policy = "IsProjectOwner")]
    public async Task<ActionResult> EditProject(string id, EditProjectDto project){
        project.Id = id;
        return HandleResult(await Mediator.Send(new EditProject.Command{ProjectDto = project}));
    }

    [HttpDelete("{id}")]
    //[Authorize(Policy = "IsProjectOwner")]
    public async Task<ActionResult> DeleteProject(string id){
        return HandleResult(await Mediator.Send(new DeleteProject.Command{Id = id}));
    }

    [HttpPost("{id}/follow")]
    public async Task<ActionResult> Follow(string id){
        return HandleResult(await Mediator.Send(new UpdateFollowing.Command{Id = id}));
    }

    [HttpPost("{id}/projectphase")]
    public async Task<ActionResult> SetProjectPhase(ProjectPhase projectPhase){
        return HandleResult(await Mediator.
        Send(new EnableProjectPhase.Command{NewProjectPhase = projectPhase}));
    }

    [HttpPut("{id}/projectphase")]
    public async Task<ActionResult> UpdateProjectPhase(ProjectPhase projectPhase){
        return HandleResult(await Mediator.
        Send(new UpdateProjectPhase.Command{ProjectPhase = projectPhase}));
    }

    [HttpPut("{id}/milestone")]
    public async Task<ActionResult> SetProjectMilestone(MilestoneUpdateDTO milestoneUpdateDTO){
        return HandleResult(await Mediator.
        Send(new UpdateMilestone.Command{MilestoneUpdateDTO = milestoneUpdateDTO}));
    }

    [HttpPut("milestoneUpdate")]
    public async Task<ActionResult> AddMilestoneData(MilestoneDTO[] milestones){
        return HandleResult(await Mediator.
        Send(new AddMilestoneData.Command { Milestones = milestones }));
    }
    
}
