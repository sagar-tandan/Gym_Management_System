using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class ApplicationDbContext : IdentityDbContext<AppUser>
    {
        public ApplicationDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {

        }
        // Define your DbSets (tables) here
        //The DbSet property allows you to perform CRUD operations
        public DbSet<MemberRegistration> MemberRegistrations { get; set; }
        public DbSet<Plan> Plans { get; set; }
        public DbSet<Inventory> Inventories { get; set; }
        public DbSet<Payment> Payments { get; set; }
        // public DbSet<Attendence> Attendences { get; set; }

        // protected override void OnModelCreating(ModelBuilder builder)
        // {
        //     base.OnModelCreating(builder);

        //     List<IdentityRole> role = new List<IdentityRole> {
        //         new IdentityRole{
        //             Name = "Admin",
        //             NormalizedName = "ADMIN"
        //         },
        //         new IdentityRole{
        //             Name = "User",
        //             NormalizedName = "USER"
        //         },
        //         new IdentityRole{
        //             Name = "SuperAdmin",
        //             NormalizedName = "SUPERADMIN"
        //         }
        //     };

        //     builder.Entity<IdentityRole>().HasData(role);
        // }

    }


}