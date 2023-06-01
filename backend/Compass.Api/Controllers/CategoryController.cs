using Ardalis.Specification.EntityFrameworkCore;
using AutoMapper;
using Compass.Core.DTO_s;
using Compass.Core.Entities;
using Compass.Core.Interfaces;
using Compass.Core.Services;
using Compass.Core.Validation.Token;
using Compass.Infrastructure.Context;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Compass.Api.Controllers
{
	[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
	[Route("api/[controller]")]
	[ApiController]
	public class CategoryController : ControllerBase
	{
		private readonly ICategoryService _categoryService;
		private readonly AppDbContext _context;
		private readonly IMapper _mapper;
		private readonly UserService _userService;
		public CategoryController(ICategoryService categoryService, AppDbContext context, IMapper mapper, UserService userService)
		{
			_categoryService = categoryService;
			_context = context;
			_mapper = mapper;
			_userService = userService;
		}

		[AllowAnonymous]
		[HttpGet("GetCategories")]
		public async Task<IActionResult> GetCategoriesAsync()
		{
			return Ok(
				new ServiceResponse()
				{
					Success = true,
					Message = "Categories loaded.",
					Payload = await _categoryService.GetAll()
				});
		}

		[HttpPost("CreateCategory")]
		public async Task<IActionResult> CreateCategoryAsync([FromBody] CategoryDto model)
		{
			var category = _mapper.Map<Category>(model);
			var res = await _categoryService.Create(category);
			if (res.Success)
			{
				return Ok("Created.");
			}
			return BadRequest(res.Errors);
		}

		[HttpPost("UpdateCategory")]
		public async Task<IActionResult> UpdateCategoryAsync([FromBody] Category model)
		{
			await _categoryService.Update(model);
			return Ok("Updated.");
		}

		[HttpGet("DeleteCategory")]
		public async Task<IActionResult> DeleteCategoryAsync(int id)
		{
			var res = await _categoryService.Delete(id);
			return Ok(res.Message);
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
