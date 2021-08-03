import styled from "styled-components";
import useInput from "../hooks/useInput";
import { updateUserProfileInfo, signOut } from "../../model/firebase-config";
import FormButton from "../buttons/FormButton";
import UploadButton from "../buttons/UploadButton";
import { useState } from "react";
import useTranslation from "next-translate/useTranslation";

export default function ProfileForm(props) {
  const fname = useInput(props.data.first_name);
  const lname = useInput(props.data.last_name);
  const address_ = useInput(props.data.address);
  const age_ = useInput(props.data.age);
  const [editMode, setEditMode] = useState(true);
  let { t } = useTranslation();

  return (
    <Wrapper>
      <ImageWrapper>
        <img
          src={props.data.avatar_url}
          width={200}
          height={200}
          alt="profile picture"
          className="pp"
        />
      </ImageWrapper>
      <p>{props.email}</p>
      <UploadButton user_id={props.user_id} />
      <br />
      <ContentWrapper>
        <FormWrapper>
          <p>{t("forms:firstname")}: </p>
          <TextFieldForm {...fname} disabled={editMode} />
        </FormWrapper>
        <FormWrapper>
          <p>{t("forms:lastname")}: </p>
          <TextFieldForm {...lname} disabled={editMode} />
        </FormWrapper>
        <FormWrapper>
          <p>{t("forms:address")}: </p>
          <TextFieldForm {...address_} disabled={editMode} />
        </FormWrapper>
        <FormWrapper>
          <p>{t("forms:age")}: </p>
          <TextFieldForm {...age_} disabled={editMode} />
        </FormWrapper>
      </ContentWrapper>
      <FormButton
        onClick={() => {
          if (editMode) {
            setEditMode(!editMode);
          } else {
            updateUserProfileInfo(props.user_id, {
              first_name: fname.value,
              last_name: lname.value,
              address: address_.value,
              age: age_.value,
              avatar_url: props.data.avatar_url,
            });
            setEditMode(!editMode);
          }
        }}
        title={editMode ? t("forms:edit") : t("forms:save")}
      />
      <FormButton onClick={() => signOut()} title={t("forms:signout")} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  & .pp {
    border-radius: 50%;
  }
`;

const FormWrapper = styled.div`
  display: grid;
  grid-template-columns: 100px auto;
  @media only screen and (max-width: 600px) {
    grid-template-columns: auto;
  }
`;

const ContentWrapper = styled.div`
  padding: 10px;
`;

const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: #f0f0f0;
  padding: 20px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
  z-index: 2;
`;

const TextFieldForm = styled.input`
  background: white;
  border-radius: 10px;
  padding: 10px 20px;
  transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
  border: 1px solid gray;
  width: ${(props) => (props.width ? props.width : "200px")};
  @media only screen and (max-width: 600px) {
    height: 35px;
    width: 100%;
  }
  font-size: 15px;
  :focus {
    outline: none;
    border: thin solid #ffab40;
  }
`;
