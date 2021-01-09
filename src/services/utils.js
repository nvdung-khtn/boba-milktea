export const formatTime = (mongodbTime) => {
    const date = new Date(mongodbTime);
    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
        + " - " + date.getDate() + "/" + date.getMonth() + "/" + date.getYear()
}