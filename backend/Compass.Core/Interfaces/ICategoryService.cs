using Compass.Core.DTO_s;
using Compass.Core.Entities;
using Compass.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Compass.Core.Interfaces
{
	public interface ICategoryService
	{
		Task<List<Category>> GetAll();
		Task<ServiceResponse> Create(Category category);
		Task Update(Category category);
		Task<ServiceResponse> Delete(int id);
	}
}
