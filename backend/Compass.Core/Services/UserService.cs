using AutoMapper;
using Compass.Core.DTO_s;
using Compass.Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Compass.Core.Services
{
	public class UserService
	{
		private readonly UserManager<AppUser> _userManager;
		private readonly JwtService _jwtService;
		private readonly SignInManager<AppUser> _signInManager;
		private readonly IMapper _mapper;
		private readonly IConfiguration _configuration;
		private readonly EmailService _emailService;

		public UserService(JwtService jwtService, UserManager<AppUser> userManager, IMapper mapper, SignInManager<AppUser> signInManager, IConfiguration configuration, EmailService emailService)
		{
			_userManager = userManager;
			_mapper = mapper;
			_signInManager = signInManager;
			_jwtService = jwtService;
			_configuration = configuration;
			_emailService = emailService;
		}
		public async Task<ServiceResponse> IncertAsync(ResiterUserDto model)
		{
			var mappedUser = _mapper.Map<AppUser>(model);
			var result = await _userManager.CreateAsync(mappedUser, model.Password);
			if (result.Succeeded)
			{
				await _userManager.AddToRoleAsync(mappedUser, model.Role);
				await SendConfirmationEmailAsync(mappedUser);

				return new ServiceResponse
				{
					Success = true,
					Message = "User successfully created."
				};
			}
			else
			{

				return new ServiceResponse
				{
					Success = false,
					Message = result.Errors.Select(e => e.Description).FirstOrDefault()
				};
			}
		}

		public async Task SendConfirmationEmailAsync(AppUser newUser)
		{
			var token = await _userManager.GenerateEmailConfirmationTokenAsync(newUser);

			var encodedEmailToken = Encoding.UTF8.GetBytes(token);
			var validEmailToken = WebEncoders.Base64UrlEncode(encodedEmailToken);



			string url = $"{_configuration["HostSettings:URL"]}/confirmEmail?userid={newUser.Id}&token={validEmailToken}";

			string emailBody = $"<h1>Confirm your email</h1> <a href='{url}'>Confirm now</a>";
			await _emailService.SendEmailAsync(newUser.Email, "Email confirmation.", emailBody);
		}

		public async Task<ServiceResponse> LoginAsync(LoginUserDto model)
		{
			var user = await _userManager.FindByEmailAsync(model.Email);
			if (user == null)
			{
				return new ServiceResponse
				{
					Success = false,
					Message = "Login or password incorrect."
				};
			}

			var signInResult = await _signInManager.PasswordSignInAsync(user, model.Password, model.RememberMe, lockoutOnFailure: true);
			if (signInResult.Succeeded)
			{

				var tokens = await _jwtService.GenerateJwtTokenAsync(user);

				return new ServiceResponse
				{
					AccessToken = tokens.token,
					RefreshToken = tokens.refreshToken.Token,
					Success = true,
					Message = "User logged in successfully."
				};
			}
			else if (signInResult.IsNotAllowed)
			{
				return new ServiceResponse
				{
					Success = false,
					Message = "Confirm your email."
				};
			}
			else if (signInResult.IsLockedOut)
			{
				return new ServiceResponse
				{
					Success = false,
					Message = "User is blocked."
				};
			}
			else
			{
				return new ServiceResponse
				{
					Success = false,
					Message = "Login or password incorrect."
				};
			}
		}

		public async Task<ServiceResponse> LogoutAsync(string userId)
		{
			var user = await _userManager.FindByIdAsync(userId);
			if (user == null)
			{
				return new ServiceResponse
				{
					Success = false,
					Message = "User not found."
				};
			}
			IEnumerable<RefreshToken> tokens = await _jwtService.GetAll();
			foreach (RefreshToken token in tokens)
			{
				await _jwtService.Delete(token);
			}

			return new ServiceResponse
			{
				Success = true,
				Message = "User successfully logged out."
			};
		}

		public async Task<ServiceResponse> RefreshTokenAsync(TokenRequestDto model)
		{
			return await _jwtService.VerifyTokenAsync(model);
		}
		public async Task<ServiceResponse> GetAllUsersAsync()
		{
			List<AppUser> users = await _userManager.Users.ToListAsync();
			List<GetUsersDto> mappedUsers = users.Select(u => _mapper.Map<AppUser, GetUsersDto>(u)).ToList();
			for (int i = 0; i < users.Count; i++)
			{
				mappedUsers[i].Role = (await _userManager.GetRolesAsync(users[i])).First();
			}

			return new ServiceResponse
			{
				Success = true,
				Message = "All users loaded.",
				Payload = mappedUsers
			};
		}

		public async Task<ServiceResponse> GetUserProfileAsync(string id)
		{
			var user = await _userManager.FindByIdAsync(id);
			if (user == null)
			{
				return new ServiceResponse
				{
					Success = false,
					Message = "User not found."
				};
			}

			GetUsersDto mapped = _mapper.Map<AppUser, GetUsersDto>(user);
			mapped.Role = (await _userManager.GetRolesAsync(user)).First();

			return new ServiceResponse
			{
				Success = true,
				Message = "Profile successfully loaded.",
				Payload = mapped
			};
		}

		public async Task<ServiceResponse> UpdateUserAsync(UpdateUserDto model)
		{
			var user = await _userManager.FindByIdAsync(model.Id);
			if (user == null)
			{
				return new ServiceResponse
				{
					Success = false,
					Message = "User not found."
				};
			}

			var checkPassword = await _userManager.CheckPasswordAsync(user, model.Password);
			if (checkPassword == false)
			{
				return new ServiceResponse
				{
					Success = false,
					Message = "Incorrect password."
				};
			}

			user.Name = model.Name;
			user.Surname = model.Surname;
			user.Email = model.Email;
			user.PhoneNumber = model.PhoneNumber;

			await _userManager.UpdateAsync(user);

			return new ServiceResponse
			{
				Success = true,
				Message = "Profile updated!"
			};
		}

		public async Task<ServiceResponse> EditUserAsync(EditUserDto model)
		{
			var user = await _userManager.FindByEmailAsync(model.Email);
			if (user == null)
			{
				return new ServiceResponse
				{
					Success = false,
					Message = "User not found."
				};
			}

			user.Name = model.Name;
			user.Surname = model.Surname;
			user.Email = model.Email;
			user.PhoneNumber = model.PhoneNumber;

			await _userManager.UpdateAsync(user);

			return new ServiceResponse
			{
				Success = true,
				Message = "Profile updated!"
			};
		}

		public async Task<ServiceResponse> ChangePasswordAsync(ChangePasswordDto model)
		{
			var user = await _userManager.FindByIdAsync(model.Id);
			if (user == null)
			{
				return new ServiceResponse
				{
					Success = false,
					Message = "User not found."
				};
			}

			var res = await _userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);
			if (res.Succeeded)
			{
				return new ServiceResponse
				{
					Success = true,
					Message = "Password changed."
				};
			}
			else
			{
				return new ServiceResponse
				{
					Success = false,
					Message = "Incorrect password."
				};
			}
		}

		public async Task<ServiceResponse> DeleteUserAsync(string email)
		{
			var user = await _userManager.FindByEmailAsync(email);
			if (user == null)
			{
				return new ServiceResponse
				{
					Success = false,
					Message = "User not found."
				};
			}

			var res = await _userManager.DeleteAsync(user);

			return new ServiceResponse
			{
				Success = true,
				Message = "User deleted."
			};
		}

		public async Task<ServiceResponse> ConfirmEmailAsync(ConfirmEmailDto model)
		{
			var user = await _userManager.FindByIdAsync(model.Id);
			if (user == null)
			{
				return new ServiceResponse
				{
					Success = false,
					Message = "User not found."
				};
			}

			var token = WebEncoders.Base64UrlDecode(model.Token);
			var stoken = Encoding.UTF8.GetString(token);

			var res = await _userManager.ConfirmEmailAsync(user, stoken);
			if (res.Succeeded)
			{
				return new ServiceResponse
				{
					Success = true,
					Message = "Email confirmed!"
				};
			}
			return new ServiceResponse
			{
				Success = false,
				Message = "Invalid token."
			};
		}
	}
}
