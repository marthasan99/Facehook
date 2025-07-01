import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { actions } from "../../actions";
import AddPhotoIcon from "../../assets/icons/addPhoto.svg";
import useAuth from "../../hooks/useAuth.js";
import useAxios from "../../hooks/useAxios.js";
import usePost from "../../hooks/usePost.js";
import useProfile from "../../hooks/useProfile.js";
import Field from "../Field";

const PostEntry = ({ onCreate }) => {
  const { auth } = useAuth();
  const { dispatch } = usePost();
  const { api } = useAxios();
  const { state: profile } = useProfile();
  const fileUploadRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const user = profile?.user ?? auth?.user;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Handle image upload click - similar to ProfileImage
  const handleImageUploadClick = (e) => {
    e.preventDefault();
    fileUploadRef.current?.click();
  };

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove selected image
  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileUploadRef.current) {
      fileUploadRef.current.value = "";
    }
  };

  const handlePostSubmit = async (formData) => {
    console.log("Form data:", formData);
    dispatch({ type: actions.post.DATA_FETCHING });

    try {
      let response;

      if (selectedImage) {
        // Create FormData for image upload - similar to ProfileImage
        const postFormData = new FormData();
        postFormData.append("postType", "image");
        postFormData.append("body", formData.content);
        postFormData.append("image", selectedImage);

        response = await api.post(
          `${import.meta.env.VITE_SERVER_BASE_URL}/posts`,
          postFormData
        );
      } else {
        // Send JSON for text-only posts
        response = await api.post(
          `${import.meta.env.VITE_SERVER_BASE_URL}/posts`,
          {
            postType: "text",
            body: formData.content,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }

      if (response.status === 200 || response.status === 201) {
        dispatch({
          type: actions.post.DATA_CREATED,
          data: response.data,
        });

        // Reset form and image state
        reset();
        setSelectedImage(null);
        setImagePreview(null);

        // Close this UI
        onCreate();
      }
    } catch (error) {
      console.error("Error creating post:", error);
      console.error("Error response:", error.response?.data);
      dispatch({
        type: actions.post.DATA_FETCH_ERROR,
        error: error,
      });
    }
  };

  return (
    <div className="card relative">
      <h6 className="mb-3 text-center text-lg font-bold lg:text-xl">
        Create Post
      </h6>
      <form onSubmit={handleSubmit(handlePostSubmit)}>
        <div className="mb-3 flex items-center justify-between gap-2 lg:mb-6 lg:gap-4">
          <div className="flex items-center gap-3">
            <img
              className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
              src={`${import.meta.env.VITE_SERVER_BASE_URL}/${user?.avatar}`}
              alt="avatar"
            />
            <div>
              <h6 className="text-lg lg:text-xl">
                {user?.firstName} {user?.lastName}{" "}
              </h6>

              <span className="text-sm text-gray-400 lg:text-base">Public</span>
            </div>
          </div>

          <button
            type="button"
            className="btn-primary cursor-pointer !text-gray-100"
            onClick={handleImageUploadClick}
          >
            <img src={AddPhotoIcon} alt="Add Photo" />
            Add Photo
          </button>
          <input
            type="file"
            ref={fileUploadRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="mb-4 relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full max-h-64 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              ×
            </button>
          </div>
        )}

        <Field label="" error={errors.content}>
          <textarea
            {...register("content", {
              required: "Adding some text is mandatory!",
            })}
            name="content"
            id="content"
            placeholder="Share your thoughts..."
            className="h-[120px] w-full bg-transparent focus:outline-none lg:h-[160px]"
          ></textarea>
        </Field>
        <div className="border-t border-[#3F3F3F] pt-4 lg:pt-6">
          <button
            className="auth-input bg-lws-green font-bold text-deep-dark transition-all hover:opacity-90"
            type="submit"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostEntry;
