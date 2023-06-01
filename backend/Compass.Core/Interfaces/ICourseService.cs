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
    public interface ICourseService
    {
        Task<ServiceResponse> GetAll();
        Task<CourseDto?> Get(int id);
        Task Create(AddCourseDto course);
        Task Update(UpdCourseDto course);
        Task Delete(int id);
        Task<List<CourseDto>> GetByCategory(int id);
    }
}
