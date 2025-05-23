using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class updateprojectobjectandprojectcosttophases : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsCancelled",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "TargetLaunchQuarter",
                table: "Projects");

            migrationBuilder.RenameColumn(
                name: "UpdatedBy",
                table: "Projects",
                newName: "LaunchClassification");

            migrationBuilder.RenameColumn(
                name: "ReleaseDate",
                table: "Projects",
                newName: "InnovationType");

            migrationBuilder.AddColumn<string>(
                name: "Factory",
                table: "Projects",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Projects",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<double>(
                name: "Capex",
                table: "ProjectPhases",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "Complexity",
                table: "ProjectPhases",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<double>(
                name: "FteRunRate",
                table: "ProjectPhases",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "PhaseCost",
                table: "ProjectPhases",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Factory",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "Capex",
                table: "ProjectPhases");

            migrationBuilder.DropColumn(
                name: "Complexity",
                table: "ProjectPhases");

            migrationBuilder.DropColumn(
                name: "FteRunRate",
                table: "ProjectPhases");

            migrationBuilder.DropColumn(
                name: "PhaseCost",
                table: "ProjectPhases");

            migrationBuilder.RenameColumn(
                name: "LaunchClassification",
                table: "Projects",
                newName: "UpdatedBy");

            migrationBuilder.RenameColumn(
                name: "InnovationType",
                table: "Projects",
                newName: "ReleaseDate");

            migrationBuilder.AddColumn<bool>(
                name: "IsCancelled",
                table: "Projects",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<double>(
                name: "TargetLaunchQuarter",
                table: "Projects",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
