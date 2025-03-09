using System;
using Application.Projects.Commands;
using Application.Projects.DTOs;
using FluentValidation;

namespace Application.Projects.Validators;

public class CreateProjectValidator 
    : BaseProjectValidator<CreateProject.Command, CreateProjectDto>
{
    public CreateProjectValidator() : base(x => x.ProjectDto)
    {
    }
}
