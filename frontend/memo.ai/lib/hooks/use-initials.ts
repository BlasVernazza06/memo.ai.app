export const useInitials = (name: string) => {
    const initials = name
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase())
        .join("");
    return initials;
}