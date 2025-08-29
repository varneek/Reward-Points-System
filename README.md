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
| Name | VARCHAR(100) | Member name |
| Email | VARCHAR(100) | Unique |
| MobileNumber | VARCHAR(10) | Unique |
| Password | VARCHAR(225) | Password |
| Otp | VARCHAR(10) | Dummy OTP for demo |
| Point | INT | Points earned |

# Sample Data 

INSERT INTO Members (Name, Email, MobileNumber, Password, Otp)

VALUES ('Test User', 'test@example.com', '9876543210', 'password', '1234');

# API Endpoints

POST /api/Auth/register → Register member

POST /api/Auth/login → Login & get JWT

POST /api/Points/add/{memberId} → Add points

GET /api/Points/total/{memberId} → View total points

POST /api/Coupon/redeem/{memberId} → Redeem points into coupons

