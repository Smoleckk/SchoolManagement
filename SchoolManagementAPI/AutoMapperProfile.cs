using AutoMapper;
using SchoolManagementAPI.Models;
using SchoolManagementAPI.Models.DTO;

namespace SchoolManagementAPI
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserDTO>();
        }
    }
}
