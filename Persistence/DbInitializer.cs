using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence;

public class DbInitializer
{
    public static async Task SeedData(AppDbContext context, UserManager<User> userManager)
    {

        if(!context.ProjectPhases.Any())
        {
            var projectPhases = new List<ProjectPhase>
            {
                new() {ProjectId= "2b28cbd6-461d-4efc-8112-0bc8b9fd0919", Phase = "NPDL", Required= true, StartQuarter=2501, FinishQuarter=2503},
                new() {ProjectId= "34dc3449-a499-439f-9870-46628796432c", Phase = "NPDL", Required= true, StartQuarter=2501, FinishQuarter=2503},
                new() {ProjectId= "39b632d6-df4a-4669-8acd-536b095dc236", Phase = "NPDL", Required= true, StartQuarter=2501, FinishQuarter=2503},
                new() {ProjectId= "1cbc1dbc-4c5a-4c6f-98c9-36cece2cbc4c", Phase = "NPDL", Required= true, StartQuarter=2501, FinishQuarter=2503},

            };

            context.ProjectPhases.AddRange(projectPhases);
            await context.SaveChangesAsync();
        }
        
        
        if(!userManager.Users.Any())
        {
            var users = new List<User>
            {
                new() {DisplayName = "Bob", UserName= "bob@test.com", Email="Bob@test.com"},
                new() {DisplayName = "Tom", UserName= "tom@test.com", Email="tom@test.com"},
                new() {DisplayName = "Frank", UserName= "frank.van.zon@signify.com", Email="frank.van.zon@signify.com"}
            };

            foreach (var user in users)
            {
                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }


        if (context.Projects.Any()) return;

        var projects = new List<Project>
        {
            new() {
                Name = "Project 1",
                ReleaseDate = DateTime.Now.AddMonths(-2),
                Description = "Test Project",
                Program = "Indoor",
                Category = "NPDL",
                Cluster = "Office",
                Team = "Team 1",
                TargetLaunchQuarter = 2504,
                MilestoneID = 4,
            },
            new() {
                Name = "Project 2",
                ReleaseDate = DateTime.Now.AddMonths(-1),
                Description = "Test Project",
                Program = "Indoor",
                Category = "NPDL",
                Cluster = "Retail",
                Team = "Team 1",
                TargetLaunchQuarter = 2504,
                MilestoneID = 4,
            },
            new() {
                Name = "Project 3",
                ReleaseDate = DateTime.Now.AddMonths(1),
                Description = "Test Project",
                Program = "Indoor",
                Category = "NPDL",
                Cluster = "Office",
                Team = "Team 2",
                TargetLaunchQuarter = 2504,
                MilestoneID = 4,
            },
            new() {
                Name = "Project 4",
                ReleaseDate = DateTime.Now.AddMonths(2),
                Description = "Test Project",
                Program = "Indoor",
                Category = "NPDL",
                Cluster = "Industry",
                Team = "Team 3",
                TargetLaunchQuarter = 2504,
                MilestoneID = 4,
            },
            new() {
                Name = "Project 5",
                ReleaseDate = DateTime.Now.AddMonths(3),
                Description = "Test Project",
                Program = "Indoor",
                Category = "NPDL",
                Cluster = "Trunking",
                Team = "Team 5",
                TargetLaunchQuarter = 2504,
                MilestoneID = 4,
            },
            new() {
                Name = "Project 6",
                ReleaseDate = DateTime.Now.AddMonths(4),
                Description = "Test Project",
                Program = "Indoor",
                Category = "NPDL",
                Cluster = "Office",
                Team = "Team 1",
                TargetLaunchQuarter = 2504,
                MilestoneID = 4,
            }
        };

        context.Projects.AddRange(projects);
        await context.SaveChangesAsync();
    }
}
