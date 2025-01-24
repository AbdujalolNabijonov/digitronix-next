export function numberSplitterHandler(
    number: number,
    every = 4,
    withChar = "-"
) {

    const regexPattern = `(?<=\\d)(?=(\\d{${every}})+(?!\\d))`;
    const regex = new RegExp(regexPattern, "g");
    return String(number).replace(regex, withChar);
};


export const stringSplitterHandler = (
    context: string = "",
    withChar: string = "_"
) => {
    const regex = new RegExp(withChar, "g")
    return String(context).replace(regex, " ");
}