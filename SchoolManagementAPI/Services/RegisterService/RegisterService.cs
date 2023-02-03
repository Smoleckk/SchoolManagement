using SchoolManagementAPI.Data;
using SchoolManagementAPI.Models;
using SchoolManagementAPI.Models.DTO;
using System.Security.Cryptography;
using System.Text;

namespace SchoolManagementAPI.Services.RegisterService
{
    public class RegisterService : IRegisterService
    {

        private readonly DataContext _context;

        public RegisterService(DataContext context)
        {
            _context = context;
        }

        const int keySize = 64;
        const int iterations = 350000;
        HashAlgorithmName hashAlgorithm = HashAlgorithmName.SHA512;

        public bool AddUser(UserRegisterDTO userDTO)
        {
            if (_context.Users.FirstOrDefault(u => u.Email == userDTO.Email) != null)
            {
                return false;
            }
            if (_context.Institutions.FirstOrDefault(u => u.Name == userDTO.InstitutionName) == null)
            {
                return false;
            }
            User newUser = new User()
            {
                Name = userDTO.Name,
                Surname = userDTO.Surname,
                Email = userDTO.Email,
                Institution = _context.Institutions.FirstOrDefault(u => u.Name == userDTO.InstitutionName)
            };

            HashPasword(userDTO.Password, out byte[] passwordHash, out byte[] passwordSalt);
            newUser.PasswordHash = Convert.ToBase64String(passwordHash);
            newUser.PasswordSalt = Convert.ToBase64String(passwordSalt);

            _context.Users.Add(newUser);
            _context.SaveChanges();

            return true;
        }

        private void HashPasword(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            passwordSalt = RandomNumberGenerator.GetBytes(keySize);
            passwordHash = Rfc2898DeriveBytes.Pbkdf2(
                Encoding.UTF8.GetBytes(password),
                passwordSalt,
                iterations,
                hashAlgorithm,
                keySize);
        }

    }
}
