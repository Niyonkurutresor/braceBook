/* eslint-disable import/prefer-default-export */
const arr = ['', ' ', null];
export function deleteEmetyObj(obj) {
  return Object.entries(obj)
    .filter(([_, v]) => !arr.includes(v))
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
}
