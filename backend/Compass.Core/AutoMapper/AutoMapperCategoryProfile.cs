using AutoMapper;
using Compass.Core.DTO_s;
using Compass.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Compass.Core.AutoMapper
{
	public class AutoMapperCategoryProfile : Profile
	{
		public AutoMapperCategoryProfile()
		{
			CreateMap<CategoryDto, Category>().ReverseMap();
		}
	}
}
