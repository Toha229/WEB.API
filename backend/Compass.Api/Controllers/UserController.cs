using Compass.Core.DTO_s;
using Compass.Core.Services;
using Compass.Core.Validation.Token;
using Compass.Core.Validation.User;
using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Compass.Api.Controllers
{
	[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
	[Route("api/[controller]")]
	[ApiController]
	public class UserController : ControllerBase
	{
		private readonly UserService _userService;
		public UserController(UserService userService)
		{
			_userService = userService;
		}

		[HttpPost("register")]
		public async Task<IActionResult> IncertAsync([FromBody] ResiterUserDto model)
		{
			var validator = new RegisterUserValidation();
			var validatinResult = await validator.ValidateAsync(model);
			if (validatinResult.IsValid)
			{
				var result = await _userService.IncertAsync(model);
				return Ok(result);
			}
			return BadRequest(validatinResult.Errors);
		}

		[AllowAnonymous]
		[HttpPost("ConfirmEmail")]
		public async Task<IActionResult> ConfirmEmailAsync([FromBody] ConfirmEmailDto model)
		{
			if (string.IsNullOrWhiteSpace(model.Id) || string.IsNullOrWhiteSpace(model.Token))
				return NotFound();

			var result = await _userService.ConfirmEmailAsync(model);

			if (result.Success)
			{
				return Ok(result);
			}
			return BadRequest(result);
		}

		[AllowAnonymous]
		[HttpPost("login")]
		public async Task<IActionResult> LoginAsync([FromBody] LoginUserDto model)
		{
			var validator = new LoginUserValidation();
			var validatinResult = await validator.ValidateAsync(model);
			if (validatinResult.IsValid)
			{
				var result = await _userService.LoginAsync(model);
				return Ok(result);
			}
			return BadRequest(validatinResult.Errors);
		}

		[HttpGet("logout")]
		public async Task<IActionResult> LogoutAsync(string userId)
		{
			var result = await _userService.LogoutAsync(userId);
			if (result.Success)
			{
				return Ok(result);
			}
			return BadRequest(result);
		}

		[HttpPost("Update")]
		public async Task<IActionResult> UpdateUserAsync([FromBody] UpdateUserDto model)
		{
			var validator = new UpdateUserValidation();
			var validatinResult = await validator.ValidateAsync(model);
			if (validatinResult.IsValid)
			{
				var result = await _userService.UpdateUserAsync(model);

				if (result.Success)
				{
					return Ok(result);
				}
				return BadRequest(result);
			}
			return BadRequest(validatinResult.Errors);
		}

		[HttpPost("EditUser")]
		public async Task<IActionResult> EditUserAsync([FromBody] EditUserDto model)
		{
			var validator = new EditUserValidation();
			var validatinResult = await validator.ValidateAsync(model);
			if (validatinResult.IsValid)
			{
				var result = await _userService.EditUserAsync(model);

				if (result.Success)
				{
					return Ok(result);
				}
				return BadRequest(result);
			}
			return BadRequest(validatinResult.Errors);
		}

		[HttpPost("ChangePassword")]
		public async Task<IActionResult> ChangePasswordAsync([FromBody] ChangePasswordDto model)
		{
			var validator = new ChangePasswordValidation();
			var validatinResult = await validator.ValidateAsync(model);
			if (validatinResult.IsValid)
			{
				var result = await _userService.ChangePasswordAsync(model);

				if (result.Success)
				{
					return Ok(result);
				}
				return BadRequest(result);
			}
			return BadRequest(validatinResult.Errors);
		}

		[HttpPost("DeleteUser")]
		public async Task<IActionResult> DeleteUserAsync([FromBody] string email)
		{
			var result = await _userService.DeleteUserAsync(email);

			if (result.Success)
			{
				return Ok(result);
			}
			return BadRequest(result);
		}

		[HttpPost("BlockUser")]
		public async Task<IActionResult> BlockUserAsync([FromBody] string email)
		{
			var result = await _userService.BlockUserAsync(email);

			if (result.Success)
			{
				return Ok(result);
			}
			return BadRequest(result);
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

		[HttpPost("users")]
		public async Task<IActionResult> GetUsersAsync()
		{
			var result = await _userService.GetAllUsersAsync();

			if (result.Success)
			{
				return Ok(result);
			}
			return BadRequest(result);
		}

		[HttpGet("profile")]
		public async Task<IActionResult> GetProfileAsync(string userId)
		{
			var result = await _userService.GetUserProfileAsync(userId);

			if (result.Success)
			{
				return Ok(result);
			}
			return BadRequest(result);
		}
	}
}
