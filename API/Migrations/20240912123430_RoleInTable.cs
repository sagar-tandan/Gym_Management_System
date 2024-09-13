using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class RoleInTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2706a73c-f364-4995-b150-677f1ed72424");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c12fa9a8-b1b6-4a79-9ee4-6486944a9e7e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d3ad6ad9-14a9-4b07-bcb6-207e5028e936");

            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "AspNetUsers",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Role",
                table: "AspNetUsers");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2706a73c-f364-4995-b150-677f1ed72424", null, "User", "USER" },
                    { "c12fa9a8-b1b6-4a79-9ee4-6486944a9e7e", null, "SuperAdmin", "SUPERADMIN" },
                    { "d3ad6ad9-14a9-4b07-bcb6-207e5028e936", null, "Admin", "ADMIN" }
                });
        }
    }
}
