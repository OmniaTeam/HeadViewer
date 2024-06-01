export const yearHandler = (years: number) => {
    if (years === 1) {
        return `${years} год`;
    } else if (years > 1 && years < 5) {
        return `${years} года`;
    } else {
        return `${years} лет`;
    }
}