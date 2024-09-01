using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        // Define your DbSets (tables) here
        //The DbSet property allows you to perform CRUD operations
        public DbSet<MemberRegistration> MemberRegistrations { get; set; }

    }
}