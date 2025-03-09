using System;
using Application.Projects.Commands;
using Application.Projects.DTOs;
using FluentValidation;

namespace Application.Projects.Validators;

public class EditProjectValidator : BaseProjectValidator<EditProject.Command, EditProjectDto>
{
    public EditProjectValidator() : base(x => x.ProjectDto)
    {
        RuleFor(x => x.ProjectDto.Id)
            .NotEmpty().WithMessage("Id is required");
    }
}
