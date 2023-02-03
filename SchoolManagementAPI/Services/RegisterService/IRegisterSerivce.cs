using SchoolManagementAPI.Models.DTO;

namespace SchoolManagementAPI.Services.RegisterService
{
    public interface IRegisterService
    {
        public bool AddUser(UserRegisterDTO userDTO);
    }
}
