using System;
using System.Text.Json.Serialization;

namespace Domain;

public class ProjectPhoto
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string Url { get; set; }
    public required string PublicId { get; set; }

    //nav properties
    public required string ProjectId { get; set; }

    [JsonIgnore]
    public Project Project { get; set; } = null!;

}