# Reward Points System

##Features

### 1. Member Management

  Register member with Name, Email, Mobile, Password (dummy OTP verification stored in DB).
  Login using Mobile + Password.
  JWT-based authentication.

### 2. Points Management

  Add points for purchases (₹100 = 10 points).
  View total reward points for a member.

### 3. Coupons 

  Redeem points for coupons:
    100 points → ₹10 coupon
    
# Database Schema

| Column | Type | Notes |
| :--- | :---: | ---: |
| MemberId (PK) | INT (Identity) | Auto-increment primary key |
| Name | 5 | $0.75 |
| Banana | 12 | $0.50 |
