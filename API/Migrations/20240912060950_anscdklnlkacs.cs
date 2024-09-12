using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class anscdklnlkacs : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1a1c5370-17b0-45c0-b2f6-6f24714e38ce");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9f8a0473-f854-4801-9a20-920026dd41e6");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1a1c5370-17b0-45c0-b2f6-6f24714e38ce", null, "Admin", "ADMIN" },
                    { "9f8a0473-f854-4801-9a20-920026dd41e6", null, "User", "USER" }
                });
        }
    }
}
