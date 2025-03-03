using Domain;

namespace Persistence;

public class DbInitializer
{
    public static async Task SeedData(AppDbContext context)
    {
        if (context.Projects.Any()) return;

        var projects = new List<Project>
        {
            new() {
                Name = "Project 1",
                ReleaseDate = DateTime.Now.AddMonths(-2),
                Description = "Test Project",
                Category = "NPDL",
                Cluster = "Office",
                Team = "Team 1",
                StartQuarter = 2501,
                LaunchQuarter = 2504,
                Milestone = "PS",
                MilestoneID = 4,
            },
            new() {
                Name = "Project 2",
                ReleaseDate = DateTime.Now.AddMonths(-1),
                Description = "Test Project",
                Category = "NPDL",
                Cluster = "Retail",
                Team = "Team 1",
                StartQuarter = 2501,
                LaunchQuarter = 2504,
                Milestone = "PS",
                MilestoneID = 4,
            },
            new() {
                Name = "Project 3",
                ReleaseDate = DateTime.Now.AddMonths(1),
                Description = "Test Project",
                Category = "NPDL",
                Cluster = "Office",
                Team = "Team 2",
                StartQuarter = 2501,
                LaunchQuarter = 2504,
                Milestone = "PS",
                 MilestoneID = 4,
            },
            new() {
                Name = "Project 4",
                ReleaseDate = DateTime.Now.AddMonths(2),
                Description = "Test Project",
                Category = "NPDL",
                Cluster = "Industry",
                Team = "Team 3",
                StartQuarter = 2501,
                LaunchQuarter = 2504,
                Milestone = "PS",
                 MilestoneID = 4,
            },
            new() {
                Name = "Project 5",
                ReleaseDate = DateTime.Now.AddMonths(3),
                Description = "Test Project",
                Category = "NPDL",
                Cluster = "Trunking",
                Team = "Team 5",
                StartQuarter = 2501,
                LaunchQuarter = 2504,
                Milestone = "PS",
                 MilestoneID = 4,
            },
            new() {
                Name = "Project 6",
                ReleaseDate = DateTime.Now.AddMonths(4),
                Description = "Test Project",
                Category = "NPDL",
                Cluster = "Office",
                Team = "Team 1",
                StartQuarter = 2501,
                LaunchQuarter = 2504,
                Milestone = "PS",
                 MilestoneID = 4,
            }
        };

        context.Projects.AddRange(projects);
        await context.SaveChangesAsync();
    }
}
