using Compass.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Compass.Core.Entities
{
    public class Course : IEntity
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string? ImagePath { get; set; } = "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png";
		public int CategoryId { get; set; }
        public virtual Category? Category { get; set; }

    }
}
