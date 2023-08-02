import axios from "axios";
import { BASE_URL } from "../constants/config";

const apiClient = axios.create({
  baseURL: BASE_URL,
});

// 가입된 유저 목록
export const showUser = async () => {
  const { data } = await apiClient.get('/join');
  return data;
}

// 로그인중인 유저 목록
export const showLoginUser = async () => {
  const { data } = await apiClient.get('/user');
  return data;
}

// 회원가입 
export const addUserData = async (param) => {
  const { data } = await apiClient.post('/join', param);
  return data;
}

// 로그인
export const loginUserData = async (param) => {
  const { data } = await apiClient.post('/user', param)
  return data;
}

// 회원정보 수정
export const updateUser = async ( param ) => {
  const { data } = await apiClient.put(`/join/${param.id}` , param)
  return data
}
