const apiBase = "https://localhost:7298/api";
let token = null;
let memberId = null;

// ---------- SCREEN MANAGEMENT ----------
function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById(screenId).classList.add("active");

    // toggle nav
    if (screenId === "dashboard") {
        document.getElementById("navMenu").classList.remove("hidden");
    } else {
        document.getElementById("navMenu").classList.add("hidden");
    }
}

// ---------- AUTH ----------
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
    document.getElementById("regResult").textContent = data.message || JSON.stringify(data);
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
        document.getElementById("loginResult").textContent = "✅ Logged in!";
        showScreen("dashboard");
    } else {
        document.getElementById("loginResult").textContent = data.message || "❌ Login failed";
    }
}

function logout() {
    token = null;
    memberId = null;
    localStorage.removeItem("token");
    localStorage.removeItem("memberId");
    showScreen("loginScreen");
}

// ---------- POINTS ----------
async function addPoints() {
    if (!token) return alert("Please login first!");
    const body = { amount: parseInt(document.getElementById("purchaseAmount").value) };

    const res = await fetch(`${apiBase}/Points/add/${memberId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(body)
    });

    const data = await res.json();
    document.getElementById("pointsResult").textContent = `${data.message} | Total: ${data.totalPoints}`;
}

async function viewPoints() {
    if (!token) return alert("Please login first!");
    const res = await fetch(`${apiBase}/Points/total/${memberId}`, {
        headers: { "Authorization": "Bearer " + token }
    });

    const data = await res.json();
    document.getElementById("viewResult").textContent = `👤 ${data.memberName} | ⭐ Points: ${data.points}`;
}

async function redeemCoupon() {
    if (!token) return alert("Please login first!");
    const body = { points: parseInt(document.getElementById("redeemOption").value) };

    const res = await fetch(`${apiBase}/Coupon/redeem/${memberId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(body)
    });

    const data = await res.json();
    document.getElementById("redeemResult").textContent = `${data.message} | Remaining: ${data.remainingPoints}`;
}

// ---------- SESSION RESTORE ----------
window.onload = () => {
    const savedToken = localStorage.getItem("token");
    const savedId = localStorage.getItem("memberId");

    if (savedToken && savedId) {
        token = savedToken;
        memberId = savedId;
        showScreen("dashboard");
        document.getElementById("loginResult").textContent = "Session restored ✅";
    } else {
        showScreen("loginScreen");
    }
};
