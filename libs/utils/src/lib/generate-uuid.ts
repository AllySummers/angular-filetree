/**
 * Taken from below StackOverflow link ("Modernized snippet for ES6")
 * @see https://stackoverflow.com/a/8809472
 */
export function generateUUID() {
  let d = new Date().getTime();
  let d2 = performance?.now?.() * 1000 ?? 0;

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, char => {
    let r = Math.random() * 16;
    if (d > 0) {
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (char == 'x' ? r : r & 0x7 | 0x8).toString(16);
  });
}
