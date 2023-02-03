namespace SchoolManagementAPI.Models
{
    public class Child
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Surname { get; set; } = string.Empty;
        public string Group { get; set; } = string.Empty;
        public string Gender { get; set; } = string.Empty;
        public List<Event> events { get; set; } = new List<Event>();
        public User User { get; set; }
    }
}
