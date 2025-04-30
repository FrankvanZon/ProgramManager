using Microsoft.EntityFrameworkCore;

namespace Domain;
//To update the domain entity in the APP + Database, from main folder
//dotnet ef migrations add "program field" -p Persistence -s API
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


    // Add isProgrammed

    public bool IsCancelled { get; set; }

    // project details
    public required string Category { get; set; }
    public required string Cluster { get; set; }
    public required string Program { get; set; }
    public string Team { get; set; } = "";
    public required double MilestoneID { get; set; } = 4;
    public string ProgramStatus { get; set; } ="New";
    public string UpdatedBy { get; set; } = "";
   
    public DateTime ReleaseDate { get; set; }
    public double TargetLaunchQuarter { get; set; }

    //navigation properties
    public ICollection<ProjectPhase> Phases { get; set; } = [];
    public ICollection<ProjectFollowers> Followers { get; set; } = [];
    
    //public ICollection<ProjectPhoto> Photos { get; set; } = [];
    public ICollection<Comment> Comments { get; set; } = [];
}
