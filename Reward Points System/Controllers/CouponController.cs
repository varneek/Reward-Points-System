using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Reward_Points_System.Data;
using Reward_Points_System.Dtos;
using System;

namespace Reward_Points_System.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class CouponController : ControllerBase
    {
        private readonly RewardDbContext _db;
        public CouponController(RewardDbContext db) => _db = db;

        [HttpPost("redeem/{memberId:int}")]
        public IActionResult Redeem ([FromRoute] int memberId, [FromBody] RedeemRequest rr)
        {
            var member = _db.Members.Find(memberId);
            if (member == null) return NotFound(new { Message = "Member not found" });

            if (member.Points >= rr.Points && rr.Points >= 100)
            {
                member.Points -= rr.Points;
                _db.SaveChanges();
                return Ok(new RedeemResponse
                {
                    Message = "Redeemed ₹"+rr.Points+" coupon",
                    Coupon = (rr.Points/100)*10,
                    RemainingPoints = member.Points
                });
            }

            return BadRequest(new RedeemResponse
            {
                Message = "Not enough points to redeem a coupon",
                Coupon = 0,
                RemainingPoints = member.Points
            });
        }
    }
}
