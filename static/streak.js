import { fetchStartDate } from "./api.js";

const messages = [
    "좋은인생 청년.",
    "오늘도 화이팅!",
    "술은 살을 더 빨리 늘리는 것이다.",
    "준혁행동 하지마라.",
    "스트릭만 지켜도 금주가 된다고??",
    "오늘도 황준혁은 금주다.",
    "오늘도 릌키비키한 황준혁이 되자.",
    "금주!",
    "술마시지마 준혁아.",
    "지금부터 술마시면 게이.",
];

export async function calculateStreak() {
    const data = await fetchStartDate();
    if (!data) return;

    const startDate = new Date(data.startDate);
    const today = new Date();
    const streak = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));

    document.getElementById("streak").textContent = streak;

    // 오늘의 메시지
    const todayIndex = today.getDate() % messages.length;
    document.getElementById("message").textContent = messages[todayIndex];
}