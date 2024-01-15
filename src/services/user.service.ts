import { User } from '../interfaces/user';
import { httpService } from './http.service';
import { socketService } from './socket.service';

const URL_USER = 'user/';
const URL_AUTH = 'auth/';

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser';


export const userService = {
  getUsers,
  login,
  verifyUsername,
  signup,
  logout,
  getLoggedinUser,
  saveLocalUser,
  getById,
  remove,
  update,
};

async function login(creds: { email: string; password: string }) {
  const user = await httpService.post(URL_AUTH + 'login', creds);
  console.log(user);

  if (user) {
    // socketService.login(user._id);
    return saveLocalUser(user);
  }
}

async function logout(): Promise<void> {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER);
  socketService.logout();
  await httpService.post(URL_AUTH + 'logout');
}

// async function signup(creds: { username: string; password: string }): Promise<User> {
async function signup(creds: User) {
  await httpService.post(URL_AUTH + 'signup', creds);
  await login({ email: creds.email, password: creds.password })

  // socketService.login(user._id);
  // return saveLocalUser(user);
}

async function getUsers(filterBy: Object): Promise<User[]> {
  return httpService.get(URL_USER, filterBy);
}

async function getById(userId: string): Promise<User> {
  return httpService.get(URL_USER + userId);
}

async function verifyUsername(username: string): Promise<void> {
  const isVerified = await httpService.get(URL_AUTH + 'verifyUsername', {
    username,
  });
  if (!isVerified) throw new Error('NOT_FOUND');
}

async function remove(userId: string): Promise<void> {
  // Implement the logic to remove a user
}

async function update(user: User): Promise<User> {
  user = await httpService.put(`user/${user._id}`, user);
  const loggedInUser = getLoggedinUser();
  if (loggedInUser && loggedInUser._id === user._id) {
    saveLocalUser(user);
  }
  return user;
}

function saveLocalUser(user: User): User {
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user));
  return user;
}

function getLoggedinUser(): User | null {
  const userString = sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER);
  return userString ? JSON.parse(userString) : null;
}