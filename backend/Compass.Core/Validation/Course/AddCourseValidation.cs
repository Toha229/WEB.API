using Compass.Core.DTO_s;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Compass.Core.Validation.Course
{
    public class AddCourseValidation : AbstractValidator<CourseDto>
    {
        public AddCourseValidation()
        {
            RuleFor(r => r.Title).NotEmpty();
            RuleFor(r => r.Description).NotEmpty();
            RuleFor(r => r.Price).NotEmpty().GreaterThanOrEqualTo(0).LessThanOrEqualTo(100000);
            RuleFor(r => r.CategoryId).NotEmpty();
        }
    }
}
