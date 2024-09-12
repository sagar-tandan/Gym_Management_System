using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class imagesUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6a3fd76a-ef09-47c1-a4fa-a49ed93a9972");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f696bb10-8fc4-41e5-afd2-6e8100d441e6");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f8cbd3ac-b459-471e-8892-bdfbfa7a48db");

            migrationBuilder.DropColumn(
                name: "Role",
                table: "AspNetUsers");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "AspNetUsers",
                type: "text",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "6a3fd76a-ef09-47c1-a4fa-a49ed93a9972", null, "SuperAdmin", "SUPERADMIN" },
                    { "f696bb10-8fc4-41e5-afd2-6e8100d441e6", null, "Admin", "ADMIN" },
                    { "f8cbd3ac-b459-471e-8892-bdfbfa7a48db", null, "User", "USER" }
                });
        }
    }
}
