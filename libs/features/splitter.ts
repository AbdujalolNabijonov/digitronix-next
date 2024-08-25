export function numberSplitterHandler(
    number: number,
    every = 4,
    withChar = "-"
) {

    const regexPattern = `(?<=\\d)(?=(\\d{${every}})+(?!\\d))`;
    const regex = new RegExp(regexPattern, "g");
    return number.toString().replace(regex, withChar);
};