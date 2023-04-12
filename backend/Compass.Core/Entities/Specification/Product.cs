using Ardalis.Specification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Compass.Core.Entities.Specification
{
	public class Product : IEntity<int>
	{
		public int Id { get; set; }
		public string Name { get; set; } = string.Empty;
		public string Description { get; set; } = string.Empty;
		public virtual Category? Category { get; set; }
		public decimal Price { get; set; }
		public int? Discount { get; set; }
		public int Count { get; set; }
	}
}
