using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class updatesss : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a26b94cd-9ee8-4c26-86e9-2f10214c2d90");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d1481377-e061-4650-9fde-e5c60a416cad");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ecbf9d75-320e-4a06-b8f3-d6f79c894e49");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
                    { "a26b94cd-9ee8-4c26-86e9-2f10214c2d90", null, "SuperAdmin", "SUPERADMIN" },
                    { "d1481377-e061-4650-9fde-e5c60a416cad", null, "Admin", "ADMIN" },
                    { "ecbf9d75-320e-4a06-b8f3-d6f79c894e49", null, "User", "USER" }
                });
        }
    }
}
