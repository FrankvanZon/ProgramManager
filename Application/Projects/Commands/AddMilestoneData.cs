using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Profiles.DTOs;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Projects.Commands
{
    public class AddMilestoneData
    {
        public class Command : IRequest<Result<Unit>>
        {
            public required MilestoneDTO[] Milestones { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly AppDbContext _context;
            private readonly IMapper _mapper;

            public Handler(AppDbContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                foreach (var milestone in request.Milestones)
                {
                    if (string.IsNullOrEmpty(milestone.Id))
                    {
                        var newMilestone = _mapper.Map<Milestone>(milestone);
                        newMilestone.Id = Guid.NewGuid().ToString(); // Ensure ID is set

                        if (newMilestone.Realized <= newMilestone.Target && newMilestone.Realized != 0)
                            newMilestone.OnTime = 1;
                        else if (newMilestone.Realized > newMilestone.Target && newMilestone.Realized != 0)
                            newMilestone.OnTime = -1;
                        else
                            newMilestone.OnTime = 0;

                        _context.Milestones.Add(newMilestone);
                    }
                    else
                    {
                        var existingMilestone = await _context.Milestones.FindAsync(new object[] { milestone.Id }, cancellationToken);

                        if (existingMilestone != null)
                        {
                            if (existingMilestone.Realized <= existingMilestone.Target && existingMilestone.Realized != 0)
                                existingMilestone.OnTime = 1;
                            else if (existingMilestone.Realized > existingMilestone.Target && existingMilestone.Realized != 0)
                                existingMilestone.OnTime = -1;
                            else
                                existingMilestone.OnTime = 0;

                            _mapper.Map(milestone, existingMilestone);
                        }
                        else
                        {
                            var newMilestone = _mapper.Map<Milestone>(milestone);
                            newMilestone.Id = Guid.NewGuid().ToString(); // Ensure ID is set

                            if (newMilestone.Realized <= newMilestone.Target && newMilestone.Realized != 0)
                                newMilestone.OnTime = 1;
                            else if (newMilestone.Realized > newMilestone.Target && newMilestone.Realized != 0)
                                newMilestone.OnTime = -1;
                            else
                                newMilestone.OnTime = 0;

                            _context.Milestones.Add(newMilestone);
                        }
                    }
                }

                var result = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (!result) return Result<Unit>.Failure("Failed to update the milestones", 400);

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
