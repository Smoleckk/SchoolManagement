using Microsoft.EntityFrameworkCore;
using SchoolManagementAPI.Models.DTO;
using SchoolManagementAPI.Models;
using SchoolManagementAPI.Data;

namespace SchoolManagementAPI.Services.InstitutionService
{
    public class InstitutionService : IInstitutionService
    {
        private readonly DataContext _context;

        public InstitutionService(DataContext context)
        {
            _context = context;
        }

        public bool AddInstitution(InstitutionAddDTO institutionAddDTO)
        {
            if (_context.Institutions.FirstOrDefault(u => u.Name == institutionAddDTO.Name) != null)
            {
                return false;
            }

            Institution newInstitution = new Institution()
            {
                Name = institutionAddDTO.Name,
                Description = institutionAddDTO.Description,
                Users = new List<User>()
            };

            _context.Institutions.Add(newInstitution);
            _context.SaveChangesAsync();

            return true;
        }
    }
}
