import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { actions } from "../../actions";
import AddPhotoIcon from "../../assets/icons/addPhoto.svg";
import useAuth from "../../hooks/useAuth.js";
import useAxios from "../../hooks/useAxios.js";
import usePost from "../../hooks/usePost.js";
import useProfile from "../../hooks/useProfile.js";
import Field from "../Field";

const PostEntry = ({ onCreate, editPost = null }) => {
  const { auth } = useAuth();
  const { dispatch } = usePost();
  const { api } = useAxios();
  const { state: profile } = useProfile();
  const fileUploadRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const isEditing = !!editPost;

  const user = profile?.user ?? auth?.user;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  // Populate form with edit data when editPost changes
  useEffect(() => {
    if (editPost) {
      setValue("content", editPost.content || editPost.body || "");

      // If editing post has an image, show preview
      if (editPost.image) {
        const imageUrl = editPost.image.startsWith("http")
          ? editPost.image
          : `${import.meta.env.VITE_SERVER_BASE_URL}/${editPost.image}`;
        setImagePreview(imageUrl);
      }
    }
  }, [editPost, setValue]);

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
      const apiUrl = isEditing
        ? `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${editPost.id}`
        : `${import.meta.env.VITE_SERVER_BASE_URL}/posts`;

      if (selectedImage) {
        // Create FormData for image upload
        const postFormData = new FormData();
        postFormData.append("postType", "image");
        postFormData.append("content", formData.content);
        postFormData.append("image", selectedImage);

        response = isEditing
          ? await api.patch(apiUrl, postFormData)
          : await api.post(apiUrl, postFormData);
      } else {
        // Send JSON for text-only posts
        const postData = {
          postType: imagePreview && !selectedImage ? "image" : "text",
          content: formData.content,
        };

        // If editing and there's an existing image but no new image selected, keep the image
        if (isEditing && editPost.image && !selectedImage) {
          postData.postType = "image";
          postData.image = editPost.image;
        }

        response = isEditing
          ? await api.patch(apiUrl, postData, {
              headers: { "Content-Type": "application/json" },
            })
          : await api.post(apiUrl, postData, {
              headers: { "Content-Type": "application/json" },
            });
      }

      if (response.status === 200 || response.status === 201) {
        const actionType = isEditing
          ? actions.post.POST_UPDATED
          : actions.post.DATA_CREATED;
        dispatch({
          type: actionType,
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
      console.error(
        `Error ${isEditing ? "updating" : "creating"} post:`,
        error
      );
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
        {isEditing ? "Edit Post" : "Create Post"}
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
            {isEditing ? "Update Post" : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostEntry;
