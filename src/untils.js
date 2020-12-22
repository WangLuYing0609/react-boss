export function redirectRoute({ type, avatar }) {
  let url = type === 'boss' ? '/boss' : '/genius'
  if (!avatar) {
    url += 'info'
  }
  return url
}

export function getChatId(userid, formId) {
  return [userid, formId].sort().join('_')

}

