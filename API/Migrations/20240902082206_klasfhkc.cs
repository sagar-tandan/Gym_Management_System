using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class klasfhkc : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_MemberRegistrations",
                table: "MemberRegistrations");

            migrationBuilder.DropColumn(
                name: "Contact",
                table: "MemberRegistrations");

            migrationBuilder.DropColumn(
                name: "EmailAddress",
                table: "MemberRegistrations");

            migrationBuilder.DropColumn(
                name: "JoiningDate",
                table: "MemberRegistrations");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "MemberRegistrations");

            migrationBuilder.RenameColumn(
                name: "Plan",
                table: "MemberRegistrations",
                newName: "FullName");

            migrationBuilder.RenameColumn(
                name: "MemberName",
                table: "MemberRegistrations",
                newName: "ContactNumber");

            migrationBuilder.RenameColumn(
                name: "MemberId",
                table: "MemberRegistrations",
                newName: "PlanId");

            migrationBuilder.AlterColumn<int>(
                name: "PlanId",
                table: "MemberRegistrations",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "MemberRegistrations",
                type: "integer",
                nullable: false,
                defaultValue: 0)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<DateTime>(
                name: "RegistrationDate",
                table: "MemberRegistrations",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddPrimaryKey(
                name: "PK_MemberRegistrations",
                table: "MemberRegistrations",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Inventories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ImageUrl = table.Column<string>(type: "text", nullable: true),
                    ItemName = table.Column<string>(type: "text", nullable: true),
                    Quantity = table.Column<int>(type: "integer", nullable: false),
                    Price = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Inventories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Payments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Amount = table.Column<decimal>(type: "numeric", nullable: false),
                    PaymentDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    MemberRegistrationId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Payments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Payments_MemberRegistrations_MemberRegistrationId",
                        column: x => x.MemberRegistrationId,
                        principalTable: "MemberRegistrations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Plans",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true),
                    DurationInMonths = table.Column<int>(type: "integer", nullable: false),
                    Cost = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Plans", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MemberRegistrations_PlanId",
                table: "MemberRegistrations",
                column: "PlanId");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_MemberRegistrationId",
                table: "Payments",
                column: "MemberRegistrationId");

            migrationBuilder.AddForeignKey(
                name: "FK_MemberRegistrations_Plans_PlanId",
                table: "MemberRegistrations",
                column: "PlanId",
                principalTable: "Plans",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MemberRegistrations_Plans_PlanId",
                table: "MemberRegistrations");

            migrationBuilder.DropTable(
                name: "Inventories");

            migrationBuilder.DropTable(
                name: "Payments");

            migrationBuilder.DropTable(
                name: "Plans");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MemberRegistrations",
                table: "MemberRegistrations");

            migrationBuilder.DropIndex(
                name: "IX_MemberRegistrations_PlanId",
                table: "MemberRegistrations");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "MemberRegistrations");

            migrationBuilder.DropColumn(
                name: "RegistrationDate",
                table: "MemberRegistrations");

            migrationBuilder.RenameColumn(
                name: "PlanId",
                table: "MemberRegistrations",
                newName: "MemberId");

            migrationBuilder.RenameColumn(
                name: "FullName",
                table: "MemberRegistrations",
                newName: "Plan");

            migrationBuilder.RenameColumn(
                name: "ContactNumber",
                table: "MemberRegistrations",
                newName: "MemberName");

            migrationBuilder.AlterColumn<int>(
                name: "MemberId",
                table: "MemberRegistrations",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<string>(
                name: "Contact",
                table: "MemberRegistrations",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EmailAddress",
                table: "MemberRegistrations",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "JoiningDate",
                table: "MemberRegistrations",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Price",
                table: "MemberRegistrations",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddPrimaryKey(
                name: "PK_MemberRegistrations",
                table: "MemberRegistrations",
                column: "MemberId");
        }
    }
}
