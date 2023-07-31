import { useState } from "react";
import { addUserData, showUser, updateUser } from "../apis/apiClient";
import { useMutation, useQuery, useQueryClient } from "react-query";

const Main = () => {

  const queryClient = useQueryClient();

  const [account, setAccount] = useState({
    id : '',
    pw : '',
    name : ''
  });

  const [userdata, setUserdata] = useState();


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

  const updateData = useMutation(updateUser, {
    onSuccess: (userid,data) => {
      queryClient.invalidateQueries('dataList');
      // 필요한 경우 queryClient를 사용하여 데이터 업데이트
      queryClient.getQueryData('getUser', userid, data);
    }
  })

  // 회원정보 수정 (...ing)
  const upDateUser = () => {
    updateData.mutate('iym1511', {id: "iym1511", password:"ung831", name:"일윤"})
  }

  // 회원가입
  const AddUser = () => {
    addUser.mutate({id: "iym1511", password:"as61", name:"1윤"})
  }


  if (dataList.isLoading) return <div>로딩중</div>

  if (dataList.error) return <div>에러!</div>

  return (  
    <div>
      <button onClick={AddUser}>회원가입</button>
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