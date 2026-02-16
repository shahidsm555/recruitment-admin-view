export const fetchIcons = async (): Promise<string[]> => {
    try {
        const response = await fetch('https://cdn.jsdelivr.net/npm/lucide-static/tags.json');
        if (!response.ok) {
            throw new Error('Failed to fetch icons');
        }
        const tags = await response.json();
        const iconNames = Object.keys(tags);
        return iconNames;
    } catch (error) {
        console.error("Error fetching icons:", error);
        return [];
    }
};
