import CONFIG from "./config.js";
import { wnsgur } from "./wnsgur.js";

const key = `${wnsgur(CONFIG.part1)}_${wnsgur(CONFIG.part2)}${wnsgur(CONFIG.part3)}${wnsgur(CONFIG.part4)}`;
const value = wnsgur(CONFIG.API_URL);

export async function fetchStartDate() {
    try {
        const response = await fetch(value, {
            headers: {
                Authorization: `Bearer ${key}`,
            },
        });

        if (!response.ok) {
            throw new Error(`GitHub API request failed with status ${response.status}`);
        }

        const data = await response.json();

        if (data.encoding === "base64") {
            const decodedContent = atob(data.content);
            return JSON.parse(decodedContent);
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
        await fetch(value, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${key}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: message,
                content: btoa(JSON.stringify(newContent, null, 2)),
                sha: sha,
            }),
        });
    } catch (error) {
        console.error(`Error updating start date with message "${message}":`, error);
    }
}