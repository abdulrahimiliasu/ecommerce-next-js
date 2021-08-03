import React, { useRef } from "react";
import {
  firebaseInstance,
  updateUserProfileInfo,
} from "../../model/firebase-config";
import FormButton from "./FormButton";
import cogoToast from "cogo-toast";
import useTranslation from "next-translate/useTranslation";

const UploadButton = (props) => {
  const ref = useRef(null);
  const handleClick = () => {
    if (ref) {
      return ref.current?.click();
    }
  };
  let { t } = useTranslation();

  const handleUpload = async (event) => {
    if (!firebaseInstance) return;

    const uploadedImage = event?.target.files[0];
    console.log(uploadedImage);
    if (!uploadedImage) return;

    cogoToast.loading(t("forms:uploadingandsaving"), { hideAfter: 1 });
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
          cogoToast.success(t("forms:successuploading"), {
            hideAfter: 1,
          })
        );
    } catch (error) {
      cogoToast.error(error.message);
    }
  };

  return (
    <div>
      <FormButton onClick={() => handleClick()} title={t("forms:upload")} />
      <input
        type="file"
        ref={ref}
        accept=".png, .jpg, .jpeg, .heic"
        hidden
        onChange={handleUpload}
      />
    </div>
  );
};

export default UploadButton;
