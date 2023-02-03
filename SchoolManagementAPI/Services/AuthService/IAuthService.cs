using SchoolManagementAPI.Models.DTO;

namespace SchoolManagementAPI.Services.AuthService
{
    public interface IAuthService
    {
        public string LoginUser(UserLoginDTO userLogin);
    }
}
