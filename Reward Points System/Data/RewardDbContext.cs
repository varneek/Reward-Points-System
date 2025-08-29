using Microsoft.EntityFrameworkCore;
using Reward_Points_System.Models;
using System.Collections.Generic;

namespace Reward_Points_System.Data
{
    public class RewardDbContext : DbContext
    {
        public RewardDbContext(DbContextOptions<RewardDbContext> options) : base(options) 
        { 
        }

        public DbSet<Member> Members { get; set; }
    }
}