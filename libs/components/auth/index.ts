export function getJwtToken() {
    if (typeof window !== "undefined") {
        return localStorage.getItem("accessToken") ?? ""
    }
}