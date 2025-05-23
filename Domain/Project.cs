using Microsoft.EntityFrameworkCore;

namespace Domain;
//To update the domain entity in the APP + Database, from main folder
//dotnet ef migrations add "update project object and project cost to phases" -p Persistence -s API
//dotnet ef migrations remove -p Persistence -s API
//dotnet ef database update -p Persistence -s API

//Update the DTO objects and index.d.ts object

//dotnet ef database drop -p Persistence -s API


[Index(nameof(MilestoneID))]
public class Project
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string Name { get; set; }
    public required string Description { get; set; }



    // project details
    public required string Category { get; set; }
    public required string Cluster { get; set; }
    public required string Program { get; set; }
    public string Team { get; set; } = "";
    public required double MilestoneID { get; set; } = 0;
    public string ProgramStatus { get; set; } ="New";
    public string ImageUrl { get; set; } = "";
    public string InnovationType { get; set; } = "";
    public string LaunchClassification { get; set; } = "C";
    public string Factory { get; set; } = "";
   

    //navigation properties
    public ICollection<ProjectPhase> Phases { get; set; } = [];
    public ICollection<ProjectFollowers> Followers { get; set; } = [];
    public ICollection<ProjectPhoto> Photos { get; set; } = [];
    public ICollection<Comment> Comments { get; set; } = [];
}
