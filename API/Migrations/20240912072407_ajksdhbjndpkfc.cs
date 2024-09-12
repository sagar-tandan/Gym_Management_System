using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class ajksdhbjndpkfc : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "80ee892c-969c-49b1-a6e4-f897c1253567");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "99261ec4-af71-4892-b031-44cd6565267f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "adb6953b-a29d-439c-978b-f351d1e51155");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
                    { "80ee892c-969c-49b1-a6e4-f897c1253567", null, "Admin", "ADMIN" },
                    { "99261ec4-af71-4892-b031-44cd6565267f", null, "SuperAdmin", "SUPERADMIN" },
                    { "adb6953b-a29d-439c-978b-f351d1e51155", null, "User", "USER" }
                });
        }
    }
}
