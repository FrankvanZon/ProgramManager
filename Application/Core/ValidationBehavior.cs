using System;
using FluentValidation;
using MediatR;

namespace Application.Core;

public class ValidationBehavior<TReqest, TResponse>(IValidator<TReqest>? validator = null)
    : IPipelineBehavior<TReqest, TResponse> where TReqest : notnull
{
    public async Task<TResponse> Handle(TReqest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        if(validator == null) return await next();

        var validationResult = await validator.ValidateAsync(request, cancellationToken);

        if(!validationResult.IsValid)
        {
            throw new ValidationException(validationResult.Errors);
        }

        return await next();
    }
}
