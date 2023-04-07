using Compass.Core.DTO_s;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Compass.Core.Validation.User
{
	public class ChangePasswordValidation : AbstractValidator<ChangePasswordDto>
	{
		public ChangePasswordValidation()
		{
			RuleFor(r => r.OldPassword).NotEmpty().MinimumLength(6);
			RuleFor(r => r.NewPassword).NotEmpty().MinimumLength(6);
			RuleFor(r => r.NewPassword).NotEqual(x=>x.OldPassword);
			RuleFor(r => r.ConfirmPassword).NotEmpty().MinimumLength(6);
			RuleFor(r => r.ConfirmPassword).Equal(x => x.NewPassword);
		}
	}
}
