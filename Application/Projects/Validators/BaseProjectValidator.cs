using System;
using Application.Projects.DTOs;
using FluentValidation;

namespace Application.Projects.Validators;

public class BaseProjectValidator<T, TDto> : AbstractValidator<T> 
    where TDto : BaseProjectDto
{
    public BaseProjectValidator(Func<T, TDto> selector)
    {
        RuleFor(x => selector(x).Name)
            .NotEmpty().WithMessage("Name is required")
            .MaximumLength(100).WithMessage("Name should not exceed 100 characters");
        
        RuleFor(x => selector(x).Description)
            .NotEmpty().WithMessage("Description is required");
        RuleFor(x => selector(x).Program)
            .NotEmpty().WithMessage("Program is required");  
        RuleFor(x => selector(x).Cluster)
            .NotEmpty().WithMessage("Cluster is required");        
        RuleFor(x => selector(x).Category)
            .NotEmpty().WithMessage("Category is required");

        RuleFor(x => selector(x).MilestoneID)
            .NotEmpty().WithMessage("Milestone is required");
    }
}
