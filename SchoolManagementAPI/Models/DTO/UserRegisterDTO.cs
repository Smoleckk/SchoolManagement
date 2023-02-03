using System.ComponentModel.DataAnnotations;

namespace SchoolManagementAPI.Models.DTO
{
    public class UserRegisterDTO
    {
        public string Name { get; set; } = string.Empty;
        public string Surname { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string InstitutionName { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;

        [Required, Compare("Password")]
        public string ConfirmPassword { get; set; } = string.Empty;
    }
}
