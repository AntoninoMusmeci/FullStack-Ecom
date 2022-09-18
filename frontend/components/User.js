import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/router";
import styled from "styled-components";
function user({ user }) {
console.log(user)
  const route = useRouter();
  return !user ? (

    <div
      onClick={() => {
        route.push("/api/auth/login");
      }}
    >
      <FaUserCircle />
      <h3> Profile </h3>
    </div>
  ) : (
    <Profile onClick = {() => {route.push("/profile")}}>
      <img src={user?.picture} alt={user?.name} />
      <h3> {user?.name}</h3>
    </Profile>
  );
}

const Profile = styled.div`
  img {
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export default user;
