import React, { useEffect, useState,useCallback } from "react";
import { useForm } from "react-hook-form";
import { Btn, Input, SelectField, RTE } from "../index";
import axios from "axios";
import { toast } from "react-toastify";

const PostForm = ({ url, post }) => {
  const [postImage, setPostImage] = useState(false);
  const { register, handleSubmit, watch, setValue, control, getValues, reset } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    }); // provide so many features
  const submit = async (data) => {
    try {
      const postData = new FormData();
      postData.append("title", data.title);
      postData.append("content", data.content);
      postData.append("slug", data.slug);
      postData.append("status", data.status);
      if (data.image?.[0]) {
        postData.append("image", data.image[0]);
      }
      let res;
      if (post) {
        res = await axios.put(`${url}/api/post/update/${post._id}`, postData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
      <h1>post form</h1>
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
            defaultValues={getValues("content")}
          />
        </div>
        <div className="w-1/3 px-2">
          <Input
            label="Featured Image: "
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />
          {post && (
            <div className="w-full mb-4">
              <img
                className="rounded-lg"
                src={
                  post.postImage.startsWith("http")
                    ? post.postImage
                    : `${url}/${post.postImage}`
                }
                alt={post.title}
              />
            </div>
          )}
          <SelectField
            options={["actiove", "inactive"]}
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
