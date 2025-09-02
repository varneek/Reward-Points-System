const apiBase = "https://localhost:7298/api";
let token = null;
let memberId = null;


function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById(screenId).classList.add("active");
}


async function register() {
    const body = {
        name: document.getElementById("regName").value,
        email: document.getElementById("regEmail").value,
        mobileNumber: document.getElementById("regMobile").value,
        password: document.getElementById("regPassword").value
    };

    const res = await fetch(`${apiBase}/Auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    const data = await res.json();
    document.getElementById("regResult").textContent =
        data.memberId
            ? `✅ Registered successfully! Your Member ID: ${data.memberId}`
            : `❌ Registration failed: ${data.message || "Unknown error"}`;
}

async function login() {
    const body = {
        mobileNumber: document.getElementById("loginMobile").value,
        password: document.getElementById("loginPassword").value
    };

    const res = await fetch(`${apiBase}/Auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    const data = await res.json();
    if (data.token) {
        token = data.token;
        memberId = data.memberId;
        localStorage.setItem("token", token);
        localStorage.setItem("memberId", memberId);
        document.getElementById("loginResult").textContent = "✅ Logged in successfully!";
        showScreen("dashboard");
    } else {
        document.getElementById("loginResult").textContent =
            `❌ Login failed: ${data.message || "Invalid credentials"}`;
    }
}

function logout() {
    token = null;
    memberId = null;
    localStorage.removeItem("token");
    localStorage.removeItem("memberId");
    document.getElementById("loginResult").textContent = "Logged out!";
    showScreen("authScreen");
}


async function addPoints() {
    if (!token) return alert("Please login first!");
    const amount = parseInt(document.getElementById("purchaseAmount").value);
    const body = { amount };

    const res = await fetch(`${apiBase}/Points/add/${memberId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(body)
    });

    const data = await res.json();
    document.getElementById("pointsResult").textContent =
        data.totalPoints !== undefined
            ? `✅ ₹${amount} purchase added. Current Points: ⭐ ${data.totalPoints}`
            : `❌ Error: ${data.message || "Unable to add points"}`;
}

async function viewPoints() {
    if (!token) return alert("Please login first!");

    const res = await fetch(`${apiBase}/Points/total/${memberId}`, {
        headers: { "Authorization": "Bearer " + token }
    });

    const data = await res.json();
    document.getElementById("viewResult").textContent =
        data.totalPoints !== undefined
            ? `❌ Error: ${data.message || "Unable to fetch points"}`
            : `⭐ Your Total Points: ${data.points}`;
}

async function redeemCoupon() {
    if (!token) return alert("Please login first!");
    const points = parseInt(document.getElementById("redeemOption").value);
    const body = { points };

    const res = await fetch(`${apiBase}/Coupon/redeem/${memberId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(body)
    });

    const data = await res.json();
    document.getElementById("redeemResult").textContent =
        data.couponValue
            ? `❌ Error: ${data.message || "Redeem failed"}`
            : `🎁 Coupon Redeemed: ₹${data.coupon} (Used ${points} points)`;
}

window.onload = () => {
    const savedToken = localStorage.getItem("token");
    const savedId = localStorage.getItem("memberId");

    if (savedToken && savedId) {
        token = savedToken;
        memberId = savedId;
        showScreen("dashboard");
        document.getElementById("loginResult").textContent = "Session restored ✅";
    } else {
        showScreen("authScreen");
    }
};
