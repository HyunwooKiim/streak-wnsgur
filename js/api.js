import CONFIG from "./config.js";

const key = `${CONFIG.part1}_${CONFIG.part2}${CONFIG.part3}${CONFIG.part4}`;

console.log("API Key:", key);

export async function fetchStartDate() {
    try {
        const response = await fetch(CONFIG.API_URL, {
            headers: {
                Authorization: `Bearer ${key}`, // API 키 주입
            },
        });

        // 요청이 실패하면 에러 처리
        if (!response.ok) {
            throw new Error(`GitHub API request failed with status ${response.status}`);
        }

        const data = await response.json();

        // Base64로 인코딩된 JSON 디코딩
        if (data.encoding === "base64") {
            const decodedContent = atob(data.content); // Base64 디코딩
            return JSON.parse(decodedContent); // JSON으로 변환
        } else {
            throw new Error("Unexpected encoding: " + data.encoding);
        }
    } catch (error) {
        console.error("Error fetching start date:", error);
        return null;
    }
}

export async function updateStartDate(newDate, message) {
    const { sha } = await fetchStartDate();
    const newContent = { startDate: newDate };

    try {
        await fetch(CONFIG.API_URL, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${key}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: message,
                content: btoa(JSON.stringify(newContent, null, 2)), // Base64 인코딩
                sha: sha,
            }),
        });
    } catch (error) {
        console.error(`Error updating start date with message "${message}":`, error);
    }
}