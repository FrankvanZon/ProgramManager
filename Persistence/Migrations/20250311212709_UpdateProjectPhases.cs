using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class UpdateProjectPhases : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "VPC",
                table: "Projects",
                newName: "ProjectPhaseVPC");

            migrationBuilder.RenameColumn(
                name: "NPDL",
                table: "Projects",
                newName: "ProjectPhaseNPDL");

            migrationBuilder.RenameColumn(
                name: "APC",
                table: "Projects",
                newName: "ProjectPhaseAPC");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ProjectPhaseVPC",
                table: "Projects",
                newName: "VPC");

            migrationBuilder.RenameColumn(
                name: "ProjectPhaseNPDL",
                table: "Projects",
                newName: "NPDL");

            migrationBuilder.RenameColumn(
                name: "ProjectPhaseAPC",
                table: "Projects",
                newName: "APC");
        }
    }
}
