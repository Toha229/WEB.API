using Compass.Core.DTO_s;
using Compass.Core.Interfaces;
using Compass.Core.Services;
using Compass.Core.Validation.Course;
using Compass.Core.Validation.Token;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Compass.Api.Controllers
{
	[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
	[Route("api/[controller]")]
	[ApiController]
	public class CourseController : ControllerBase
	{
		private readonly ICourseService _coursesService;
		private readonly UserService _userService;
		public CourseController(ICourseService coursesService, UserService userService)
		{
			_coursesService = coursesService;
			_userService = userService;
		}

		[AllowAnonymous]
		[HttpGet("courses")]
		public async Task<IActionResult> Index()
		{
			var result = await _coursesService.GetAll();
			return Ok(result);
		}

		[AllowAnonymous]
		[HttpGet("course")]
		public async Task<IActionResult> GetCourse(int id)
		{
			var result = await _coursesService.Get(id);
			return Ok(result);
		}

		[HttpPost("addcourses")]
		public async Task<IActionResult> Create(AddCourseDto model)
		{
			await _coursesService.Create(model);
			return Ok("Created.");
		}

		[HttpPost("updcourse")]
		public async Task<IActionResult> Update(UpdCourseDto model)
		{
			await _coursesService.Update(model);
			return Ok("Updated.");
		}

		[HttpGet("delete")]
		public async Task<IActionResult> Delete(int id)
		{
			await _coursesService.Delete(id);
			return Ok("Deleted.");
		}

		[AllowAnonymous]
		[HttpPost("RefreshToken")]
		public async Task<IActionResult> RefreshToken([FromBody] TokenRequestDto model)
		{
			var validator = new TokenRequestValidation();
			var validatinResult = await validator.ValidateAsync(model);
			if (validatinResult.IsValid)
			{
				var result = await _userService.RefreshTokenAsync(model);
				if (result.Success)
				{
					return Ok(result);
				}
				return BadRequest(result);
			}
			else
			{
				return BadRequest(validatinResult.Errors);
			}
		}
	}

}
