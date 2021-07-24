import React, { useRef } from "react";
import { firebaseInstance, updateUserProfileInfo } from "../../model/Firebase";
import FormButton from "./FormButton";
import cogoToast from "cogo-toast";
import { useRouter } from "next/dist/client/router";

const UploadButton = (props) => {
  const ref = useRef(null);
  const router = useRouter();
  const handleClick = () => {
    if (ref) {
      return ref.current?.click();
    }
  };

  const handleUpload = async (event) => {
    if (!firebaseInstance) return;

    const uploadedImage = event?.target.files[0];
    console.log(uploadedImage);
    if (!uploadedImage) return;

    cogoToast.loading("Uploading and Saving Picture", { hideAfter: 1 });
    const storage = firebaseInstance.storage();
    const storageRef = storage.ref("avatars");

    try {
      await storageRef.child(props.user_id).put(uploadedImage);
      var userAvaterRef = storageRef
        .child(props.user_id)
        .getDownloadURL()
        .then((url) => {
          updateUserProfileInfo(props.user_id, { avatar_url: url });
        })
        .then(
          cogoToast.success("Successfully Uploaded Profile Picture", {
            hideAfter: 1,
          })
        );
      // .then(router.reload("/account"));
    } catch (error) {
      cogoToast.error(error.message);
    }
  };

  return (
    <div>
      <FormButton
        onClick={() => handleClick()}
        title="Upload Profile Picture"
      />
      <input
        type="file"
        ref={ref}
        accept=".png, .jpg, .jpeg"
        hidden
        onChange={handleUpload}
      />
    </div>
  );
};

export default UploadButton;
