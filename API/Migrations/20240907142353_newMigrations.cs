using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class newMigrations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RegistrationDate",
                table: "MemberRegistrations");

            migrationBuilder.RenameColumn(
                name: "FullName",
                table: "MemberRegistrations",
                newName: "MemberName");

            migrationBuilder.RenameColumn(
                name: "ContactNumber",
                table: "MemberRegistrations",
                newName: "ExpiryDate");

            migrationBuilder.AddColumn<int>(
                name: "CardNo",
                table: "MemberRegistrations",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Contact",
                table: "MemberRegistrations",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EnrolledDate",
                table: "MemberRegistrations",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "MemberRegistrations",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CardNo",
                table: "MemberRegistrations");

            migrationBuilder.DropColumn(
                name: "Contact",
                table: "MemberRegistrations");

            migrationBuilder.DropColumn(
                name: "EnrolledDate",
                table: "MemberRegistrations");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "MemberRegistrations");

            migrationBuilder.RenameColumn(
                name: "MemberName",
                table: "MemberRegistrations",
                newName: "FullName");

            migrationBuilder.RenameColumn(
                name: "ExpiryDate",
                table: "MemberRegistrations",
                newName: "ContactNumber");

            migrationBuilder.AddColumn<DateTime>(
                name: "RegistrationDate",
                table: "MemberRegistrations",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
