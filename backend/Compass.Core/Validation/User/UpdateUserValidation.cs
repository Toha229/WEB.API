﻿using Compass.Core.DTO_s;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Compass.Core.Validation.User
{
	public class UpdateUserValidation : AbstractValidator<UpdateUserDto>
	{
		public UpdateUserValidation()
		{
			RuleFor(r => r.Name).NotEmpty();
			RuleFor(r => r.Surname).NotEmpty();
			RuleFor(r => r.Email).NotEmpty().EmailAddress();
			RuleFor(r => r.PhoneNumber).NotEmpty();
			RuleFor(r => r.Password).NotEmpty().MinimumLength(6);
		}
	}
}
