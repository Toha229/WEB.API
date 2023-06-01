using Compass.Core.AutoMapper;
using Compass.Core.Interfaces;
using Compass.Core.Services;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Compass.Core
{
    public static class ServiceExtensions
    {
        public static void AddCoreServices(this IServiceCollection services)
        {
            // User service
            services.AddTransient<UserService>();

            // Jwt Service
            services.AddTransient<JwtService>();

            services.AddTransient<EmailService>();

            services.AddTransient<ICategoryService, CategoryService>();

            services.AddTransient<ICourseService, CourseService>();
		}

		// Add automapper
		public static void AddAutoMapper(this IServiceCollection services)
        {
            services.AddAutoMapper(typeof(AutoMapperUserProfile));
            services.AddAutoMapper(typeof(AutoMapperCategoryProfile));
            services.AddAutoMapper(typeof(AutoMapperCourseProfile));
		}
    }
}
