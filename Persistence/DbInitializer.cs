using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence;

public class DbInitializer
{
    public static async Task SeedData(AppDbContext context, UserManager<User> userManager)
    {

        
        
        
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
                Description = "Test Project",
                Program = "Indoor",
                Category = "NPDL",
                Cluster = "Office",
                Team = "Team 1",
                MilestoneID = 0,
            },
            
        };

        context.Projects.AddRange(projects);
        await context.SaveChangesAsync();
    }
}
