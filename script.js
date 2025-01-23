console.log('자바스크립트 로드 완료');
fetch('./env.js')
    .then((response) => response.text())
    .then((envData) => {
        const CONFIG = Object.fromEntries(
            envData
                .split('\n')
                .filter((line) => line.trim() !== '' && !line.startsWith('#'))
                .map((line) => line.split('='))
        );

        const API_KEY = CONFIG.API_KEY;
        const API_URL = CONFIG.API_URL;

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
            "지금부터 술마시면 게이."
        ];

        async function fetchStartDate() {
            try {
                const response = await fetch(API_URL, {
                    headers: { Authorization: `Bearer ${API_KEY}` },
                });
                const data = await response.json();
                const content = JSON.parse(atob(data.content));
                return { startDate: content.startDate, sha: data.sha };
            } catch (error) {
                console.error("Error fetching start date:", error);
                return null;
            }
        }
        async function updateStartDate() {
            const today = new Date().toISOString().split('T')[0];
            const { sha } = await fetchStartDate();

            const newContent = {
                startDate: today,
            };

            try {
                await fetch(API_URL, {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: 'Update start date',
                        content: btoa(JSON.stringify(newContent, null, 2)),
                        sha: sha,
                    }),
                });

                calculateStreak();
            } catch (error) {
                console.error("Error updating start date:", error);
            }
        }
        async function updateStartDate() {
            const today = new Date().toISOString().split('T')[0];
            const { sha } = await fetchStartDate();

            const newContent = {
                startDate: today,
            };

            try {
                await fetch(API_URL, {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: 'Update start date',
                        content: btoa(JSON.stringify(newContent, null, 2)), // Base64 인코딩
                        sha: sha,
                    }),
                });

                calculateStreak(); // UI 업데이트
            } catch (error) {
                console.error("Error updating start date:", error);
            }
        }
        
        async function calculateStreak() {
            const data = await fetchStartDate();
            if (!data) return;

            const startDate = new Date(data.startDate);
            const today = new Date();
            const streak = Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) + 1;

            document.getElementById('streak').textContent = streak;
            const todayIndex = today.getDate() % messages.length;
            document.getElementById('message').textContent = messages[todayIndex];
        }
        calculateStreak();
    });