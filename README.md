# Reward Points System

## Features

#### 1. Member Management

  Register member with Name, Email, Mobile, Password (dummy OTP verification stored in DB).
  
  Login using Mobile + Password.
  
  JWT-based authentication.

#### 2. Points Management

  Add points for purchases (₹100 = 10 points).
  
  View total reward points for a member.

#### 3. Coupons 

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

# How to Run

## Clone repo:

git clone https://github.com/varneek/Reward-Points-System.git

cd RewardPointsSystem

## Configure database in appsettings.json

"ConnectionStrings": {

  "DefaultConnection": "Host=localhost;Database=RewardDb;Username=youruser;Password=yourpassword"
  
}

## Run migrations & update DB:

Add-Migration InitialCreate

Update-Database

### Start project:

### API runs at: 

https://localhost:7298

# Postman Collection

### A Postman collection is included:

[https://ram-s-team-17.postman.co/workspace/Ram's-Workspace~06a92b38-355c-465c-811c-cbbc2303454c/request/47923558-3724ae71-14fe-4ecd-aeef-077d9638000f](https://ram-s-team-17.postman.co/workspace/Ram's-Workspace~06a92b38-355c-465c-811c-cbbc2303454c/example/47923558-b3aa2af6-521d-46ff-adf4-c8033f4dfc9b)



# Functional Flow Diagram

<img width="383" height="482" alt="image" src="https://github.com/user-attachments/assets/b10937d5-0c06-40c0-ba45-b98e978e93e8" />

# Notes

### JWT token must be included in request headers:

Authorization: Bearer <your_token>

### Default rule:

₹100 purchase = 10 points
100 points = ₹10 coupon



