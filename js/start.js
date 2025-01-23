const password = "wnsgur";
const submit = document.getElementById("submit");
const input = document.getElementById("password");
submit.addEventListener("click", () => {
    if (input.value === password) {
        window.location.href = "streak.html";
    } else {
        alert("비밀번호가 틀렸습니다!");
    }
});