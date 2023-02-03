using SchoolManagementAPI.Models.DTO;

namespace SchoolManagementAPI.Services.InstitutionService
{
    public interface IInstitutionService
    {
        public bool AddInstitution(InstitutionAddDTO institutionAddDTO);
    }
}
