import { calculateStreak } from "./streak.js";
import { updateStartDate } from "./api.js";
import PASS from "./password.js";

const PASSWORD = PASS.password;

document.getElementById("set-button").addEventListener("click", async () => {
    const userPassword = prompt("비밀번호를 입력하세요:");

    if (userPassword !== PASSWORD) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
    }

    const currentDate = new Date().toISOString().split("T")[0];
    await updateStartDate(currentDate, "Set start date to today");
    calculateStreak();
});

// 초기화
calculateStreak();