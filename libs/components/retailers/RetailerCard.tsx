import { RemoveRedEyeRounded } from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
import { Devices } from "@phosphor-icons/react";
import React from "react";
import styled from "styled-components";
import LikeButton from "../others/LikeButton";
import { Member } from "@/libs/types/member/member";
import { serverApi } from "@/libs/config";
import { useRouter } from "next/router";

interface RetailerCard {
  member: Member;
  likeTargetHandler: any;
}

const RetailerCard = (props: RetailerCard) => {
  const { member, likeTargetHandler } = props;
  const router = useRouter();
  const img_url = member.memberImage
    ? `${serverApi}/${member.memberImage}`
    : "/img/profile/defaultUser.svg";
  return (
    <StyledWrapper>
      <div className="card">
        <div className="card__img">
          <img src={img_url} alt="user img" />
        </div>
        <div className="card__avatar mb-3">
          <img src={img_url} alt="" />
        </div>
        <div className="card__title mt-4">{member.memberNick}</div>
        <div className="card__wrapper">
          <button
            className="p-1 bg-gray-200 rounded cursor-pointer w-[200px] mt-2 tracking-wider uppercase hover:bg-gray-400"
            onClick={() => {
              router.push(`/retailers/detail/?id=${member._id}`);
            }}
          >
            explore
          </button>
        </div>
        <Stack
          flexDirection={"row"}
          className="mt-2"
          justifyContent={"space-evenly"}
          gap={"10px"}
        >
          <Stack
            className="p-2 px-3"
            justifyContent={"center"}
            alignItems={"center"}
          >
            <RemoveRedEyeRounded sx={{ fill: "white" }} />
            <Box className="text-white">{member.memberViews}</Box>
          </Stack>
          <Stack
            className=" p-2 px-3"
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Devices size={25} style={{ fill: "white" }} />
            <Box className="text-white">{member.memberProducts}</Box>
          </Stack>
          <Stack
            className=" py-1 px-3"
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box onClick={(e: any) => likeTargetHandler(e, member._id)}>
              <LikeButton
                checked={
                  member.meLiked && member.meLiked[0]?.myFavorite ? true : false
                }
              />
            </Box>
            <Box className="text-white">{member.memberLikes}</Box>
          </Stack>
        </Stack>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    --main-color: #000;
    --submain-color: #78858f;
    --bg-color: #fff;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
    position: relative;
    width: 300px;
    height: 404px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    background: rgb(68, 68, 68);
    overflow: hidden;
  }

  .card__img {
    height: 210px;
    width: 100%;
    overflow: hidden;
    background-color: gray;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card__img svg {
    height: 100%;
    border-radius: 20px 20px 0 0;
  }

  .card__avatar {
    position: absolute;
    width: 100px;
    height: 100px;
    background: var(--bg-color);
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    top: calc(50% - 70px);
    overflow: hidden;
  }

  .card__avatar img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
  }

  .card__title {
    margin-top: 60px;
    font-weight: 500;
    font-size: 18px;
    color: white;
  }

  .card__subtitle {
    margin-top: 10px;
    font-weight: 400;
    font-size: 15px;
    color: var(--submain-color);
  }

  .card__btn-solid {
    background: var(--main-color);
    color: var(--bg-color);
  }

  .card__btn:hover {
    background: var(--main-color);
    color: var(--bg-color);
  }

  .card__btn-solid:hover {
    background: var(--bg-color);
    color: var(--main-color);
  }
`;

export default RetailerCard;
