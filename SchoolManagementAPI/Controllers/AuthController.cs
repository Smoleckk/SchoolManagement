using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolManagementAPI.Models.DTO;
using SchoolManagementAPI.Services.AuthService;

namespace SchoolManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("/login")]
        public IActionResult Login(UserLoginDTO userDTO)
        {
            string jwt = _authService.LoginUser(userDTO);
            if (jwt == null)
            {
                return BadRequest("Invalid user data");
            }
            return Ok(jwt);
        }
    }
}
