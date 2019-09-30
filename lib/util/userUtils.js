export function userCan (permission, user) {
  if (user.loggedIn == true) {
    if (user.data.permissions !== undefined && JSON.stringify(user.data.permissions).indexOf(permission) > -1) {
      return true
    } else {
      return false
    }
  }
  return false
}