import { useEffect, useState } from "react";
import { addUserData, showUser, updateUser } from "../apis/apiClient";
import { useMutation, useQuery, useQueryClient } from "react-query";

const Main = () => {

  const queryClient = useQueryClient();

  const [account, setAccount] = useState({
    id : '',
    password : '',
    name : ''
  });

  const isValid = {
    isId: account.id.length >= 5,
    isPassword: /\S+@/.test(account.password),
    isName: account.name !== '' 
  }

  const isDisabled = !(isValid.isId && isValid.isPassword && isValid.isName);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setAccount((prevAccount) => ({
      ...prevAccount,
      [name]: value, // 해당 name에 해당하는 속성을 새로운 value로 업데이트
    }));
  };

  const dataList = useQuery('dataList', showUser);

  const addUser = useMutation(addUserData, {
    onSuccess: () => {
      // 캐시가 있는 모든 쿼리 무효화
      // queryClient.invalidateQueries();

      // queryKey가 'dataList'로 시작하는 모든 쿼리 무효화
      queryClient.invalidateQueries('dataList');
    },
    onError: (error) => {
      alert(error)
    }
  });

  // 회원가입
  const AddUser = () => {
    addUser.mutate(account)
  }

  // 회원정보 수정 (...ing)
  const updateData = useMutation(updateUser, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('dataList');
      // // 필요한 경우 queryClient를 사용하여 데이터 업데이트
      // queryClient.getQueryData('getUser', data);
      console.log()
    }
  })

  // 회원정보 수정 (...ing)
  const upDateUser = () => {
    updateData.mutate({id: "iym1511", password:"변경한831", name:"변경일윤"})
  }


  if (dataList.isLoading) return <div>로딩중</div>

  if (dataList.error) return <div>에러!</div>

  return (  
    <div>
      <input type="email" name="id" value={account.id} onChange={handleChange} placeholder="아이디"/>
      <input type="text" name="password" value={account.password} onChange={handleChange} placeholder="비밀번호"/>
      <input type="text" name="name" value={account.name} onChange={handleChange} placeholder="이름"/>
      <button onClick={AddUser} disabled={isDisabled}>회원가입</button>
      <button onClick={upDateUser}>수정</button>
      {
        dataList.data?.map((a,i) => (
          <div key={i}>
            {a.password}
          </div>
        ))
      }
    </div>
  );
}

export default Main;