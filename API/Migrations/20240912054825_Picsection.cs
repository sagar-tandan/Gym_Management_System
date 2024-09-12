using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class Picsection : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "771a7fd8-8f50-465b-ab49-a104bdb81ef7");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fe48f064-b8f7-4d2b-9b05-411ba18fe069");

            migrationBuilder.AddColumn<string>(
                name: "CoverPic",
                table: "AspNetUsers",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProfilePic",
                table: "AspNetUsers",
                type: "text",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1f43d6df-9a9f-425f-a106-ed4f18d1f884", null, "User", "USER" },
                    { "9ec00401-6b20-4813-a29b-f6a1b59abf1c", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1f43d6df-9a9f-425f-a106-ed4f18d1f884");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9ec00401-6b20-4813-a29b-f6a1b59abf1c");

            migrationBuilder.DropColumn(
                name: "CoverPic",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "ProfilePic",
                table: "AspNetUsers");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "771a7fd8-8f50-465b-ab49-a104bdb81ef7", null, "User", "USER" },
                    { "fe48f064-b8f7-4d2b-9b05-411ba18fe069", null, "Admin", "ADMIN" }
                });
        }
    }
}
