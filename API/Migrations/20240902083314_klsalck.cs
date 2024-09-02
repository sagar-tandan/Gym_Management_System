using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class klsalck : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MemberRegistrations_Plans_PlanId",
                table: "MemberRegistrations");

            migrationBuilder.AlterColumn<int>(
                name: "PlanId",
                table: "MemberRegistrations",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "MemberRegistrations",
                type: "text",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_MemberRegistrations_Plans_PlanId",
                table: "MemberRegistrations",
                column: "PlanId",
                principalTable: "Plans",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MemberRegistrations_Plans_PlanId",
                table: "MemberRegistrations");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "MemberRegistrations");

            migrationBuilder.AlterColumn<int>(
                name: "PlanId",
                table: "MemberRegistrations",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_MemberRegistrations_Plans_PlanId",
                table: "MemberRegistrations",
                column: "PlanId",
                principalTable: "Plans",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
