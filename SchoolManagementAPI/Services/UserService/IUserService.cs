using SchoolManagementAPI.Models;
using SchoolManagementAPI.Models.DTO;

namespace SchoolManagementAPI.Services.UserService
{
    public interface IUserService
    {
        public List<UserDTO> GetUsers();
        public UserDTO GetUser(int id);
    }
}
