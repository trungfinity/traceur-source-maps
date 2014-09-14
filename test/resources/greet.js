export function hey() {
  hi();
}

export function hi() {
  throw new Error('Call me maybe!');
}
