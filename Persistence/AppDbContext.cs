using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Persistence;

public class AppDbContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
    public required DbSet<Project> Projects { get; set; }
    public required DbSet<ProjectPhase> ProjectPhases { get; set; }
    public required DbSet<ProjectFollowers> ProjectFollowers { get; set; }
    public required DbSet<Photo> Photos { get; set; }
    public required DbSet<Comment> Comments { get; set; }
    public required DbSet<Milestone> Milestones { get; set; }
    public required DbSet<ProjectPhoto> ProjectPhotos { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<ProjectFollowers>(x => x.HasKey(a => new {a.ProjectId, a.UserId}));

        builder.Entity<ProjectFollowers>()
            .HasOne(x=> x.User)
            .WithMany(x => x.Projects)
            .HasForeignKey(x => x.UserId);

        builder.Entity<ProjectFollowers>()
            .HasOne(x=> x.Project)
            .WithMany(x => x.Followers)
            .HasForeignKey(x => x.ProjectId);

        var dateTimeConverter = new ValueConverter<DateTime, DateTime>(
            v => v.ToUniversalTime(),
            v => DateTime.SpecifyKind(v, DateTimeKind.Utc)
        );

        foreach (var entityType in builder.Model.GetEntityTypes())
        {
            foreach (var property in entityType.GetProperties())
            {
                if (property.ClrType == typeof(DateTime))
                {
                    property.SetValueConverter(dateTimeConverter);
                }
            }
        }
    }

}
