using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Reward_Points_System.Data;
using Reward_Points_System.Dtos;

namespace Reward_Points_System.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class PointsController : ControllerBase
    {
        private readonly RewardDbContext _db;
        public PointsController(RewardDbContext db) => _db = db;

        [HttpPost("add/{memberId:int}")]
        public IActionResult AddPoints([FromRoute] int memberId, [FromBody] AddPointsRequest req)
        {
            var member = _db.Members.Find(memberId);
            if (member == null) return NotFound(new { Message = "Member not found" });

            var pointsToAdd = (int)(req.Amount / 100m) * 10; 
            member.Points += pointsToAdd;
            _db.SaveChanges();

            return Ok(new { Message = $"Added {pointsToAdd} points", TotalPoints = member.Points });
        }

        [HttpGet("total/{memberId:int}")]
        public IActionResult GetTotal([FromRoute] int memberId)
        {
            var member = _db.Members.Find(memberId);
            if (member == null) return NotFound(new { Message = "Member not found" });

            return Ok(new { MemberId = member.Id, MemberName = member.Name, Points = member.Points });
        }
    }
}
