
export async function fetchUsers() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
            throw new Error("network want ok");
        }

        const users = await response.json();
        return users;
    } catch (error) {
        console.error("error fetching users:", error);
    }
}
