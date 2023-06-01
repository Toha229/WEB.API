using Ardalis.Specification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Compass.Core.Entities.Specification
{
    public static class Courses
    {
        public class GetAll: Specification<Course>
        {
            public GetAll()
            {
                Query.Include(x => x.Category);
            }
        }

        public class ByCategory : Specification<Course>
        {
            public ByCategory(int categoryId)
            {
                Query
                    .Include(x => x.Category)
                    .Where(c => c.CategoryId == categoryId);
            }
        }
		public class GetByCategoryId : Specification<Course>
		{
			public GetByCategoryId(int categoryId)
			{
				Query.Where(x => x.CategoryId == categoryId).Include(x => x.Category);
			}
		}
	}
}
