export const formatTime = (mongodbTime) => {
    const date = new Date(mongodbTime);
    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
        + " - " + date.getDate() + "/" + (1 + date.getMonth()) + "/" + (1900 + date.getYear())
}