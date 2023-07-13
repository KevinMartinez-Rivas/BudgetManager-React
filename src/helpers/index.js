export const generateID = () => {
    const date = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2);

    return date + random;
}

export const reFormatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "2-digit"
    })
}