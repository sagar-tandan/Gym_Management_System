using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class anscdkl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3c8cb5a6-e1e5-4976-bad5-dfb9b8dd82b6");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "674c6577-c4f3-4de3-af64-d351d1fae234");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1a1c5370-17b0-45c0-b2f6-6f24714e38ce", null, "Admin", "ADMIN" },
                    { "9f8a0473-f854-4801-9a20-920026dd41e6", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
                    { "3c8cb5a6-e1e5-4976-bad5-dfb9b8dd82b6", null, "User", "USER" },
                    { "674c6577-c4f3-4de3-af64-d351d1fae234", null, "Admin", "ADMIN" }
                });
        }
    }
}
