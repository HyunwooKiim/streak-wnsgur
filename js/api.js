import CONFIG from "./config.js";

const key = atob(CONFIG.API_KEY);

export async function fetchStartDate() {
    try {
        const response = await fetch(CONFIG.API_URL, {
            headers: { Authorization: `Bearer ${key}` },
        });
        const data = await response.json();
        const content = JSON.parse(atob(data.content));
        return { startDate: content.startDate, sha: data.sha };
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
                content: btoa(JSON.stringify(newContent, null, 2)),
                sha: sha,
            }),
        });
    } catch (error) {
        console.error(`Error updating start date with message "${message}":`, error);
    }
}