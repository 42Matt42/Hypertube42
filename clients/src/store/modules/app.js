import userService from "../../services/UserService";
import router from "../../router/index";
// import axios from 'axios'
const defaultPhoto =
  "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";

const getDefaultState = () => {
  return {
    appName: "Hypertube",
    Loading: false,
    langs: ["fr", "en"],
    error: null,
    userInfo: {
      token: "",
      exp: "",
      auth: false,
      username: "",
      email: "",
      firstame: "",
      lastname: "",
      language: "english",
      avatar: "",
      defaultPicture: true,
    },
  };
};

const state = {
  appName: "Hypertube",
  Loading: false,
  langs: ["fr", "en"],
  error: null,
  userInfo: {
    token: "",
    exp: "",
    auth: false,
    username: "",
    email: "",
    firstame: "",
    lastname: "",
    language: "english",
    avatar: "",
    defaultPicture: true,
  },
};

// mutations
const mutations = {
  SET_TOKEN: (state, token) => {
    state.userInfo.token = token.code;
    state.userInfo.exp = token.exp;
    state.userInfo.username = JSON.parse(
      atob(token.code.split(".")[1]),
    ).data.username;
  },
  SET_AUTH: (state, bool) => {
    state.userInfo.auth = bool;
  },
  SET_USERINFO: (state, data) => {
    state.userInfo.username = data.username;
    state.userInfo.email = data.email;
    state.userInfo.firstname = data.firstName;
    state.userInfo.lastname = data.lastName;
    state.userInfo.language = data.language;
    state.userInfo.avatar = data.photo;
  },
  PUT_USERINFO: (state, newUserInfo) => {
    state.userInfo.username = newUserInfo.username;
    state.userInfo.firstname = newUserInfo.firstname;
    state.userInfo.lastname = newUserInfo.lastname;
    state.userInfo.language = newUserInfo.language;
  },
  PUT_DEFAULT_PICTURE: (state, boolean) => {
    state.userInfo.defaultPicture = boolean;
  },
  PUT_USERNAME: (state, username) => {
    state.userInfo.username = username;
  },
  RESET_LOCALSTORAGE_USERNAME: (state, username, exp) => {
    state.userInfo.username = username;
    state.userInfo.exp = exp;
  },
  PUT_EMAIL: (state, newEmail) => {
    state.userInfo.email = newEmail;
  },
  PUT_TOKEN: (state, newToken) => {
    state.userInfo.token = newToken.code;
    state.userInfo.exp = newToken.exp;
  },
  TOKEN: (state, token) => {
    state.userInfo.token = token;
  },
  SET_ERROR: (state, error) => {
    state.error = error;
  },
  RESET_STATE(state) {
    Object.assign(state, getDefaultState());
  },
  //
};

// actions
const actions = {
  setUserInfo: ({ commit }, { data }) => {
    commit("SET_USERINFO", data);
  },
  resetState: ({ commit }) => {
    localStorage.removeItem("hypertube");
    commit("RESET_STATE");
  },
  putUserInfo: ({ commit }, { newUserInfo }) => {
    commit("PUT_USERINFO", newUserInfo);
  },
  putEmail: ({ commit }, newEmail) => {
    commit("PUT_EMAIL", newEmail);
  },
  putToken: ({ commit }, newToken) => {
    commit("PUT_TOKEN", newToken);
  },
  token: ({ commit }, token) => {
    commit("TOKEN", token);
  },
  setError: ({ commit }, error) => {
    commit("SET_ERROR", error);
  },

  // Called by the user in ../pages/Login.vue to sign in
  login: ({ dispatch, commit }, { username, password }) => {
    userService
      .login({ username, password })
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("hypertube", JSON.stringify(token));
        commit("SET_TOKEN", token);
        commit("SET_AUTH", true);
        commit("PUT_USERNAME", username);
        // apiClient.defaults.headers.common['x-access-token'] = token
        dispatch("getUser", "");
        const notification = {
          type: response.data.status,
          message: "Login successful",
        };
        dispatch("Notifications/add", notification, { root: true });
      })
      .catch((error) => {
        const notification = {
          type: "error",
          message: "Wrong login or password, please try again",
        };
        if (error.response) {
          if (error.response.status === 404) {
            dispatch("Notifications/add", notification, {
              root: true,
            });
            router.push({ name: "404", params: { resource: "login" } });
          } else if (
            error.response.status === 403 &&
            error.response.data.error === "User is disabled"
          ) {
            notification.message =
              "User Disabled, please activate your profile";
            dispatch("Notifications/add", notification, {
              root: true,
            });
          } else {
            dispatch("Notifications/add", notification, {
              root: true,
            });
          }
        } else {
          dispatch("Notifications/add", notification, {
            root: true,
          });
        }
      });
  },

  // GET userInfo
  getUser: ({ getters, dispatch, commit }, username) => {
    if (username === "") {
      username = getters.storeUsername;
    }
    userService
      .getuser({ username: username, token: getters.storeToken })
      .then((response) => {
        commit("SET_USERINFO", response.data.user);
        // const notification = {
        //   type: response.data.status,
        //   message: 'User information updated',
        // }
        // dispatch('Notifications/add', notification, { root: true })
        dispatch("redirectLogin");
      })
      .catch((error) => {
        // const notification = {
        //   type: 'error',
        //   message: 'There was a problem getting user info',
        // }
        if (error.response) {
          if (error.response.status === 404) {
            // dispatch('Notifications/add', notification, {
            //   root: true,
            // })
            router.push({
              name: "404",
              params: { resource: "getting user info" },
            });
          } else if (error.response.status === 403) {
            // dispatch('Notifications/add', notification, {
            //   root: true,
            // })
          }
        } else {
          // dispatch('Notifications/add', notification, {
          //   root: true,
          // })
        }
      });
  },

  // Redirect properly the user depending on the default profile picture
  redirectLogin: ({ getters, commit }) => {
    if (getters.storeDefaultPicture === true) {
      if (getters.storePhoto === defaultPhoto) {
        router.push({ name: "setpicture" });
      } else {
        commit("PUT_DEFAULT_PICTURE", false);
        router.push({ name: "movies" });
      }
    }
  },

  // Called by the user in ../pages/User.vue to modify user data
  updateUserInfo: ({ commit, dispatch }, { payloadPutUser }) => {
    userService
      .putuser({ payloadPutUser })
      .then((response) => {
        commit("PUT_TOKEN", response.data.token);
        commit("PUT_USERNAME", payloadPutUser.username);
        dispatch("getUser", "");
        const notification = {
          type: response.data.status,
          message: "Personal information updated !",
        };
        dispatch("Notifications/add", notification, { root: true });
        router.push({ name: "home" });
      })
      .catch((error) => {
        const notification = {
          type: "error",
          message: "Issue occured while updating your personal information",
        };
        if (error.response) {
          if (error.response.status === 404) {
            dispatch("Notifications/add", notification, {
              root: true,
            });
            router.push({
              name: "404",
              params: { resource: "updating user info" },
            });
          } else if (error.response.status === 403) {
            dispatch("Notifications/add", notification, {
              root: true,
            });
          }
        } else {
          dispatch("Notifications/add", notification, {
            root: true,
          });
        }
      });
  },

  // Called by the user in ../pages/User.vue to modify email address
  // Send a link to the new email address for the user to confirm change
  updateEmail: ({ dispatch }, { payloadPutEmail }) => {
    userService
      .putemail(payloadPutEmail)
      .then((response) => {
        const notification = {
          type: response.data.status,
          message: "Please, valid the message sent to your new email address",
        };
        dispatch("Notifications/add", notification, { root: true });
        dispatch("getUser", "");
        router.push({ name: "home" });
      })
      .catch((error) => {
        const notification = {
          type: "error",
          message: "Issue occured while changing your email",
        };
        if (error.response) {
          if (error.response.status === 404) {
            dispatch("Notifications/add", notification, {
              root: true,
            });
            router.push(
              { name: "404", params: { resource: "updating email" } },
            );
          } else if (error.response.status === 403) {
            dispatch("Notifications/add", notification, {
              root: true,
            });
          }
        } else {
          dispatch("Notifications/add", notification, {
            root: true,
          });
        }
        router.push({ name: "home" });
      });
  },

  // Called by the user in ../pages/ResetPasswordOnline.vue
  // in order to change the password while connected
  putOnlineNewPassword: ({ dispatch }, { onlineNewPassword }) => {
    userService
      .putonlinepass({ onlineNewPassword })
      .then((response) => {
        const notification = {
          type: response.data.status,
          message: "Your new password is set !",
        };
        dispatch("Notifications/add", notification, { root: true });
        dispatch("getUser", "");
        router.push({ name: "home" });
      })
      .catch((error) => {
        const notification = {
          type: "error",
          message: "Issue occured while changing your password",
        };
        if (error.response) {
          if (error.response.status === 404) {
            dispatch("Notifications/add", notification, {
              root: true,
            });
            router.push({
              name: "404",
              params: { resource: "modifying password" },
            });
          } else if (error.response.status === 403) {
            dispatch("Notifications/add", notification, {
              root: true,
            });
          }
        } else {
          dispatch("Notifications/add", notification, {
            root: true,
          });
        }
      });
  },
};

// getters
const getters = {
  token(state) {
    return state.userInfo.token;
  },
  isAuth: () => state.userInfo.auth,
  storeToken: (state) => {
    return state.userInfo.token;
  },
  storeUser: (state) => {
    const resUser = {};
    return Object.assign(resUser, state.userInfo);
  },
  storePhoto: (state) => {
    return state.userInfo.avatar;
  },
  storeDefaultPicture: (state) => {
    return state.userInfo.defaultPicture;
  },
  // storeUsername: state => state.userInfo.username
  storeAppName: (state) => {
    return state.appName;
  },
  storeLangs: (state) => {
    return state.langs;
  },
  storeUsername: (state) => {
    return state.userInfo.username;
  },
  storeEmail: (state) => {
    return state.userInfo.email;
  },
  storeLanguage: (state) => {
    return state.userInfo.language;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
