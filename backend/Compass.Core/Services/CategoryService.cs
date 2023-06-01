using AutoMapper;
using Compass.Core.DTO_s;
using Compass.Core.Entities;
using Compass.Core.Entities.Specification;
using Compass.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Compass.Core.Services
{
	public class CategoryService : ICategoryService
	{
		private readonly IRepository<Category> _categoryRepo;
		private readonly IRepository<Course> _courseRepo;

		private readonly IMapper _mapper;
		public CategoryService(IRepository<Category> categoryRepo, IRepository<Course> courseRepo, IMapper mapper)
		{
			_categoryRepo = categoryRepo;
			_courseRepo = courseRepo;
			_mapper = mapper;
		}
		public async Task<List<Category>> GetAll()
		{
			var result = await _categoryRepo.GetAll();
			return result.ToList();
		}
		public async Task<ServiceResponse> Create(Category category)
		{
			await _categoryRepo.Insert(category);
			await _categoryRepo.Save();
			return new ServiceResponse()
			{
				Success = true,
				Message = "Category created"
			};
		}
		public async Task Update(Category category)
		{
			var cat = await _categoryRepo.GetByID(category.Id);

			if(cat == null)
			{
				return;
			}

			cat.Name= category.Name;
			cat.Description= category.Description;

			await _categoryRepo.Update(cat);
			await _categoryRepo.Save();
		}
		public async Task<ServiceResponse> Delete(int id)
		{
			var res = await _courseRepo.GetListBySpec(new Courses.GetByCategoryId(id));
			if (res.Count() == 0)
			{
				await _categoryRepo.Delete(id);
				await _categoryRepo.Save();
				return new ServiceResponse
				{
					Success = true,
					Message = "Category deleted"
				};
			}
			else
			{
				return new ServiceResponse()
				{
					Success = false,
					Message = "Courses exists in this category"
				};
			}
		}
	}
}
