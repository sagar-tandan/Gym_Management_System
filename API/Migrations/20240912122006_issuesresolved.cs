using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class issuesresolved : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5897ead9-c5b4-473f-a9b0-70184c221c94");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6aafc4b2-5f3d-43ca-9f6e-521545cd010e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9849341c-21ff-4272-9335-0ea0d3d58def");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "5897ead9-c5b4-473f-a9b0-70184c221c94", null, "User", "USER" },
                    { "6aafc4b2-5f3d-43ca-9f6e-521545cd010e", null, "Admin", "ADMIN" },
                    { "9849341c-21ff-4272-9335-0ea0d3d58def", null, "SuperAdmin", "SUPERADMIN" }
                });
        }
    }
}
