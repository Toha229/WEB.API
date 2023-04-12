using Compass.Core.Entities.Specification;
using Compass.Core.Entities;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Compass.Infrastructure.Context;

namespace Compass.Infrastructure.DbInitializers
{
	public class ProductInitializer
	{
		public static async Task Seed(IApplicationBuilder applicationBuilder)
		{
			using (var serviceScope = applicationBuilder.ApplicationServices.CreateScope())
			{
				var _context = serviceScope.ServiceProvider.GetService<AppDbContext>();
				if (_context.Categories.FirstOrDefault() == null)
				{
					var dig = new Category()
					{
						Name = "Digital"
					};
					var deco = new Category()
					{
						Name = "Decorations"
					};
					var food = new Category()
					{
						Name = "Food"
					};
					await _context.Categories.AddRangeAsync(dig, deco, food);

					await _context.Products.AddRangeAsync(
						new Product()
						{
							Name = "Fitnes Watch",
							Category = dig,
							Price = 20,
						},
						new Product()
						{
							Name = "Wireless Headphones",
							Category = dig,
							Price = 15,
						},
						new Product()
						{
							Name = "Camera 4k",
							Category = dig,
							Price = 100,
						}
					);
					await _context.Products.AddRangeAsync(
						new Product()
						{
							Name = "Sofa",
							Category = deco,
							Price = 1000,
						},
						new Product()
						{
							Name = "Bed",
							Category = deco,
							Price = 1200,
						},
						new Product()
						{
							Name = "Looker",
							Category = deco,
							Price = 700,
						}
					);
					await _context.Products.AddRangeAsync(
						new Product()
						{
							Name = "Schweppes",
							Category = food,
							Price = 2,
						},
						new Product()
						{
							Name = "Burger",
							Category = food,
							Price = 3,
						},
					new Product()
					{
							Name = "Piззa",
							Category = food,
							Price = 5,
						}
					);
					await _context.SaveChangesAsync();
				}
			}
		}
	}
}
