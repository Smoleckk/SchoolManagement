using AutoMapper;
using SchoolManagementAPI.Data;
using SchoolManagementAPI.Models;
using SchoolManagementAPI.Models.DTO;

namespace SchoolManagementAPI.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public UserService(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public List<UserDTO> GetUsers()
        {
            List<UserDTO> users = _context.Users.Select(u => _mapper.Map<UserDTO>(u)).ToList();
            return users;
        }
        public UserDTO GetUser(int id)
        {
            UserDTO user = _context.Users.Where(u => u.Id == id).Select(u => _mapper.Map<UserDTO>(u)).FirstOrDefault();
            return user;
        }
    }
}
