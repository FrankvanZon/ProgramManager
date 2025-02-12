using System;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

public class ProjectsController(AppDbContext context) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Project>>> GetProjects()
    {
        return await context.Projects.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Project>> GetProjectDetails(string id)
    {
        var project = await context.Projects.FindAsync(id);
        if (project == null) return NotFound();
        return project;
    }
}
