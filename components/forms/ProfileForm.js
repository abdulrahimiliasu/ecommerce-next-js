import styled from "styled-components";
import useInput from "../hooks/useInput";
import { updateUserProfileInfo, signOut } from "../../model/firebase/Firebase";
import FormButton from "../buttons/FormButton";
import UploadButton from "../buttons/UploadButton";
import Image from "next/image";
import cogoToast from "cogo-toast";

export default function ProfileForm(props) {
  const fname = useInput(props.data.first_name);
  const lname = useInput(props.data.last_name);
  const address_ = useInput(props.data.address);
  const age_ = useInput(props.data.age);
  if (!props.account_verified)
    cogoToast.warn("Please check your email inbox for verification.", {
      heading: "Account Not Verified !",
    });

  return (
    <Wrapper>
      <ImageWrapper>
        <Image
          src={props.data.avatar_url}
          width={220}
          height={220}
          alt="profile picture"
          className="pp"
        />
      </ImageWrapper>
      <p>{props.email}</p>
      <UploadButton user_id={props.user_id} />
      <hr />
      <ContentWrapper>
        <FormWrapper>
          <p>First Name: </p>
          <TextFieldForm {...fname} />
        </FormWrapper>
        <FormWrapper>
          <p>Last Name: </p>
          <TextFieldForm {...lname} />
        </FormWrapper>
        <FormWrapper>
          <p>Address: </p>
          <TextFieldForm {...address_} />
        </FormWrapper>
        <FormWrapper>
          <p>Age: </p>
          <TextFieldForm {...age_} />
        </FormWrapper>
      </ContentWrapper>
      <FormButton
        onClick={() =>
          updateUserProfileInfo(props.user_id, {
            first_name: fname.value,
            last_name: lname.value,
            address: address_.value,
            age: age_.value,
            avatar_url: props.data.avatar_url,
          })
        }
        title="Save"
      />
      <FormButton onClick={() => signOut()} title="Sign out" />
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
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: #f0f0f0;
  padding: 20px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
  z-index: -1;
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
    border: 5px solid #ffab40;
  }
`;
