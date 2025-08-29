using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Reward_Points_System.Data;
using Reward_Points_System.Dtos;
using Reward_Points_System.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Reward_Points_System.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly RewardDbContext _db;
        private readonly IConfiguration _config;

        public AuthController(RewardDbContext db, IConfiguration config)
        {
            _db = db;
            _config = config;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterRequest req)
        {
            if (string.IsNullOrWhiteSpace(req.MobileNumber) || string.IsNullOrWhiteSpace(req.Password))
                return BadRequest(new { Message = "Mobile number and password are required" });

            if (_db.Members.Any(m => m.MobileNumber == req.MobileNumber))
                return Conflict(new { Message = "Mobile number already registered" });

            var member = new Member
            {
                Name = req.Name,
                Email = req.Email,
                MobileNumber = req.MobileNumber,
                Password = req.Password,
                Otp = "1234"
            };

            _db.Members.Add(member);
            _db.SaveChanges();

            return Ok(new { Message = "Member registered successfully", MemberId = member.Id, Otp = member.Otp });
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest req)
        {
            var member = _db.Members.FirstOrDefault(m =>
                m.MobileNumber == req.MobileNumber && m.Password == req.Password);

            if (member == null)
                return Unauthorized(new { Message = "Invalid credentials" });

            var token = GenerateJwtToken(member);
            return Ok(new AuthResponse
            {
                Token = token,
                MemberId = member.Id,
                Name = member.Name,
                Points = member.Points
            });
        }

        private string GenerateJwtToken(Member member)
        {
            var jwt = _config.GetSection("Jwt");

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, member.MobileNumber),
                new Claim("memberId", member.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, member.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt["Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: jwt["Issuer"],
                audience: jwt["Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(double.Parse(jwt["ExpireMinutes"]!)),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}