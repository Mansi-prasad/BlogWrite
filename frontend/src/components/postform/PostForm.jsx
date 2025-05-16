import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Btn, Input, SelectField, RTE } from "../index";
import axios from "axios";
import { toast } from "react-toastify";
import { useOutletContext } from "react-router-dom";
const PostForm = ({ url, post }) => {
  const [postImage, setPostImage] = useState(null);
  const { token } = useOutletContext();
  const [previewImage, setPreviewImage] = useState(false);
  const { register, handleSubmit, watch, setValue, control, getValues, reset } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        postImage: post?.postImage || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    }); // provide so many features
  // console.log("postImage:", post.postImage);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if ("file") {
      setPreviewImage(file); // Set selected file
    }
  };
  const submit = async (data) => {
    try {
      const postData = new FormData();
      postData.append("title", data.title);
      postData.append("content", data.content);
      postData.append("slug", data.slug);
      postData.append("status", data.status);
      if (data.postImage?.[0]) {
        postData.append("postImage", data.postImage[0]);
      }
      // console.log("Submitted form data:", data);
      let res;
      if (post) {
        res = await axios.put(`${url}/api/post/update/${post._id}`, postData, {
          // identifies the currently logged-in user.
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data.success) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      } else {
        res = await axios.post(`${url}/api/post/create`, postData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      if (res.data.success) {
        toast.success(res.data.message);
        if (!post) {
          reset({
            title: "",
            content: "",
            slug: "",
            status: "",
          });
        }
        setPostImage(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Response:", error.response);
      toast.error("Somthing went wrong! Please try again.");
    }
  };
  const slugTransform = useCallback((val) => {
    if (val && typeof val === "string")
      return val
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]/g, "") // strip special chars
        .replace(/\s+/g, "-"); // replace spaces with dash
    return "";
  }, []);
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        const newSlug = slugTransform(value.title);
        setValue("slug", newSlug, { shouldValidate: true });
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <>
      <h1 className="text-center font-bold text-3xl">Post form</h1>
      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
          <Input
            label="Title: "
            placeholder="Title"
            className="mb-4"
            {...register("title", { required: true })}
          />
          <Input
            label="Slug: "
            placeholder="Slug"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />
          <RTE
            label="Content: "
            name="content"
            control={control}
            // defaultValues={getValues("content")}
          />
        </div>
        <div className="w-1/3 px-2">
          <Input
            label="Image: "
            type="file"
            name="postImage"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("postImage", { required: !post })}
            onChange={handleImageChange}
          />
          {post && (
            <div className="w-full mb-4">
              <img
                className="rounded-lg h-50"
                src={
                  previewImage
                    ? URL.createObjectURL(previewImage) // Show selected image if user uploads new one
                    : post?.postImage
                    ? post.postImage.startsWith("http")
                      ? post.postImage
                      : `${url}/images/${post.postImage}`
                    : ""
                }
                alt={post.title}
              />
            </div>
          )}
          <SelectField
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
          />
          <Btn
            type="submit"
            className="w-full"
            bgColor={post ? "bg-green-500" : undefined}
          >
            {post ? "Update" : "Submit"}
          </Btn>
        </div>
      </form>
    </>
  );
};
export default PostForm;
