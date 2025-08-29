namespace Reward_Points_System.Models
{
    public class Member
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string MobileNumber { get; set; } = string.Empty;
        public string Otp { get; set; } = "1234"; 
        public int Points { get; set; } = 0;
        public string Password { get; set; } = string.Empty;
    }
}
