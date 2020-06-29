import axios from 'axios'

const apiClientEmail = axios.create({
  baseURL: `${process.env.VUE_APP_BACKEND_URL}users`,
  // baseURL: 'https://hypertube42.herokuapp.com/',
  // baseURL: 'http://localhost:3000',
  withCredentials: false, // default value
  timeout: 5000,
})

export default {
  // Querries where the user receives an email
  // OR where the user uses a link from an email

  // A-1) Sign up
  register({ username, email, firstName, lastName, password }) {
    return apiClientEmail.post('/user', {
      username,
      email,
      firstName,
      lastName,
      password,
    })
  },
  // A-2-a) Validate a new account (10min duration)
  getactivationtoken(activationToken) {
    return apiClientEmail.get('/activation/' + activationToken)
  },
  // A-2-b) Resend an activation link to confirm account creation
  putactivationtoken(activationEmail) {
    return apiClientEmail.put('/activation', {
      email: activationEmail,
    })
  },

  // B) Validate an email change
  getemailtoken(emailToken) {
    return apiClientEmail.get('/email/' + emailToken)
  },

  // C) Reset password while disconnected with an email link
  // C-1) The user types his email and receives an a clickable link
  postresetpassword(emailResetPassword) {
    return apiClientEmail.post('/password/reset', {
      email: emailResetPassword,
    })
  },
  // C-2) The user valids his new password thanks to the passwordToken
  putdscresetpassword({ dscNewPassword }) {
    return apiClientEmail.put('/password/reset', {
      token: dscNewPassword.token,
      new_password: dscNewPassword.new_password,
    })
    // contains 2 fields { token, new_password })
  },
}
