import { wnsgur } from "./wnsgur.js";

const password = "d25zZ3Vy";
const submit = document.getElementById("submit");
const input = document.getElementById("password");
submit.addEventListener("click", () => {
    if (input.value === wnsgur(password)) {
        window.location.href = "streak.html";
    } else {
        alert("비밀번호가 틀렸습니다!");
    }
});