using Compass.Core.Entities;
using Compass.Core.Entities.Specification;
using Compass.Infrastructure.Configurations;
using Compass.Infrastructure.Initializers;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Compass.Infrastructure.Context
{
	public class AppDbContext : IdentityDbContext
	{
		public AppDbContext() : base() { }
		public AppDbContext(DbContextOptions options) : base(options) { }

		protected override void OnModelCreating(ModelBuilder builder)
		{
			base.OnModelCreating(builder);
			builder.SeedCategories();
			builder.SeedCourses();
			builder.ApplyConfiguration(new CategoryConfiguration());
			builder.ApplyConfiguration(new CourseConfiguration());
		}
		public DbSet<AppUser> AppUser { get; set; }
		public DbSet<RefreshToken> RefreshTokens { get; set; }
		public DbSet<Category> Categories { get; set; }
		public DbSet<Course> Courses { get; set; }
	}
}
