using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolManagementAPI.Models.DTO;
using SchoolManagementAPI.Services.InstitutionService;

namespace SchoolManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InstitutionController : ControllerBase
    {
        private readonly IInstitutionService _institutionService;

        public InstitutionController(IInstitutionService institutionService)
        {
            _institutionService = institutionService;
        }

        [HttpPost("/add-institution")]
        public IActionResult Login(InstitutionAddDTO institutionAddDTO)
        {
            var institution = _institutionService.AddInstitution(institutionAddDTO);
            if (institution == false)
            {
                return BadRequest("Invalid institution");
            }
            return Ok(institution);
        }
    }
}
