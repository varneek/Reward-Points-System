const apiBase = "https://localhost:7298/api";
let token = null;
let memberId = null;

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
    document.getElementById("regResult").textContent = JSON.stringify(await res.json(), null, 2);
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
        document.getElementById("loginResult").textContent = "Logged in! Token saved.";
    } else {
        document.getElementById("loginResult").textContent = JSON.stringify(data, null, 2);
    }
}


function logout() {
    token = null;
    memberId = null;
    localStorage.removeItem("token");
    localStorage.removeItem("memberId");
    document.getElementById("loginResult").textContent = "Logged out!";
}


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
    document.getElementById("pointsResult").textContent = JSON.stringify(await res.json(), null, 2);
}


async function viewPoints() {
    if (!token) return alert("Please login first!");
    const res = await fetch(`${apiBase}/Points/total/${memberId}`, {
        headers: { "Authorization": "Bearer " + token }
    });
    document.getElementById("viewResult").textContent = JSON.stringify(await res.json(), null, 2);
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
    document.getElementById("redeemResult").textContent = JSON.stringify(await res.json(), null, 2);
}


window.onload = () => {
    const savedToken = localStorage.getItem("token");
    const savedId = localStorage.getItem("memberId");
    if (savedToken != null && savedId !=null) {
        token = savedToken;
        memberId = savedId;
        document.getElementById("loginResult").textContent = "Session restored, logged in!";
    }
};
