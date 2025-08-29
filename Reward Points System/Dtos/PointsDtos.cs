namespace Reward_Points_System.Dtos
{
    public class AddPointsRequest
    {
        public decimal Amount { get; set; } 
    }
    public class RedeemRequest
    {
        public int Points { get; set; } 
    }

    public class RedeemResponse
    {
        public string Message { get; set; } = string.Empty;
        public int Coupon { get; set; } 
        public int RemainingPoints { get; set; }
    }
}
