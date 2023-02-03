using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolManagementAPI.Models.DTO;
using SchoolManagementAPI.Services.RegisterService;

namespace SchoolManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly IRegisterService _registerService;

        public RegisterController(IRegisterService registerService)
        {
            _registerService = registerService;
        }

        [HttpPost("/register")]
        public IActionResult RegisterUser(UserRegisterDTO userDTO)
        {
            bool isAdded = _registerService.AddUser(userDTO);
            if (isAdded)
            {
                return Ok(userDTO);
            }
            return BadRequest();

        }
    }
}
