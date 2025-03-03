namespace Domain;
//To update the domain entity in the APP + Database, from main folder
//dotnet ef migrations add "AddMilestoneID" -p Persistence -s API
//dotnet ef database update -p Persistence -s API
//dotnet ef database drop -p Persistence -s API

public class Project
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string Name { get; set; }
    public DateTime ReleaseDate { get; set; }
    public required string Description { get; set; }
    public required string Category { get; set; }
    public bool IsCancelled { get; set; }

    // project details
    public required string Cluster { get; set; }
    public string Team { get; set; } = "";
    public double StartQuarter { get; set; }
    public double LaunchQuarter { get; set; }
    public string Milestone { get; set; } = "<PI";

    public required double MilestoneID { get; set; } = 4;
    
}
