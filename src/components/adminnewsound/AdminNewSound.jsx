import { useCategories } from "@/hooks/useCategories";
import { useTags } from "@/hooks/useTags";
import { useCreateSound } from "@/hooks/useCreateSound";
import { adminAPI } from "@/lib/apiServices";
import { useState, useRef } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { checkIfFilesExist } from "../../database/checkIfFileExists";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";

const AdminNewSound = (props) => {
  // React Query hooks
  const { data: categoriesData } = useCategories();
  const { data: tagsData } = useTags();
  const createSoundMutation = useCreateSound();
  const queryClient = useQueryClient();

  // Get categories and tags lists
  const categoriesList = categoriesData?.categories || [];
  const tagsList = tagsData?.tags || [];
  const categoryMap = categoriesData?.categoryMap || {};

  const [name, setName] = useState("");
  const [soundFile, setSoundFile] = useState(null);
  const [color, setColor] = useState("");
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef(null);

  // Map selected categories to IDs
  const getCategoryIds = (selectedCategories) => {
    return selectedCategories
      .map((cat) => {
        // If category has an ID property, use it
        if (cat.id) return cat.id;
        // Otherwise, look up by value (category name) in categoryMap
        return categoryMap[cat.value] || null;
      })
      .filter((id) => id !== null && id !== undefined);
  };

  // Map selected tags to IDs
  const getTagIds = (selectedTags) => {
    return selectedTags
      .map((tag) => {
        // If tag has an ID property, use it
        if (typeof tag === "object" && tag.id) return tag.id;
        // Otherwise, find it in tagsList
        const tagObj = tagsList.find(
          (t) =>
            t.label === tag ||
            (typeof tag === "object" && t.label === tag.label)
        );
        return tagObj?.id;
      })
      .filter((id) => id !== null && id !== undefined);
  };

  // Reset all form fields
  const resetForm = () => {
    setName("");
    setSoundFile(null);
    setColor("");
    setCategories([]);
    setDescription("");
    setTags([]);
    setSubmitted(false);
    // Clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  async function submitClicked(e) {
    e.preventDefault();

    if (!soundFile) {
      toast.error("Please select a sound file");
      return;
    }

    if (categories.length === 0) {
      toast.error("Please select at least one category");
      return;
    }

    setSubmitted(true);

    // Create sound object for duplicate check
    const soundObj = {
      name: name,
      color: color ? color : "#4285F4",
      category: categories.map((cat) => cat.value || cat),
      tags: tags.map((tag) => (typeof tag === "object" ? tag.label : tag)),
      description: description,
    };

    const { filesFound, existingFiles } = await checkIfFilesExist([soundObj]);

    if (filesFound) {
      Swal.fire({
        title: `${existingFiles.length} duplicate file found`,
        text: "A file with the same name already exists.",
        confirmButtonText: "Cancel",
        showCloseButton: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          setSubmitted(false);
        } else if (result.isDismissed) {
          setSubmitted(false);
        }
      });
    } else {
      try {
        // Map categories and tags to IDs
        const categoryIds = getCategoryIds(categories);
        const tagIds = getTagIds(tags);

        // Call mutation
        await createSoundMutation.mutateAsync(
          {
            file: soundFile,
            name: name.trim(),
            description: description.trim(),
            color: color || "#4285F4",
            categoryIds,
            tagIds,
          },
          {
            onSuccess: () => {
              props.newSoundSubmit();
              // Reset form
              resetForm();
            },
            onError: () => {
              setSubmitted(false);
            },
          }
        );
      } catch (error) {
        console.error("Error uploading file:", error);
        setSubmitted(false);
      }
    }
  }

  return (
    <div
      id={props.modalId}
      className="fixed flex opacity-0 justify-center duration-500 bg-black ease-in-out scale-50 items-center inset-0 backdrop-blur-xl bg-opacity-15 "
    >
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="flex flex-col w-full sm:w-[550px] text-gray-800 bg-white rounded-lg gap-4">
        <div className="flex flex-col relative gap-4 h-min">
          <div className="flex rounded-t-lg items-center justify-between px-6 py-3 bg-[#F9F7F7]">
            <h1 className="text-2xl font-semibold">Add New Sound</h1>
            <svg
              onClick={() => {
                resetForm();
                props.hideModal();
              }}
              className="hover:rotate-90 cursor-pointer duration-150"
              xmlns="http://www.w3.org/2000/svg"
              height="28px"
              viewBox="0 -960 960 960"
              width="28px"
              fill=""
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </div>

          <div className="p-4 pb-4 pt-0">
            <form onSubmit={(e) => submitClicked(e)} className="">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter name"
                  maxLength={30}
                />
              </div>

              <div className="grid grid-cols-3 gap-5">
                <div className="mb-4 col-span-2 w-full">
                  <label
                    htmlFor="soundFile"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Sound (.mp3 or .wav)
                  </label>
                  <input
                    ref={fileInputRef}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby="file_input_help"
                    type="file"
                    id="soundFile"
                    required
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (
                        file &&
                        (file.type === "audio/mpeg" ||
                          file.type === "audio/wav")
                      ) {
                        setSoundFile(file);
                      } else {
                        toast.warn("Only .mp3 or .wav are allowed");
                        e.target.value = null;
                      }
                    }}
                    accept=".mp3, .wav"
                  />
                  <p
                    className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                    id="file_input_help"
                  >
                    .mp3 (MAX. 1mb).
                  </p>
                </div>

                <div className="">
                  <label
                    htmlFor="color"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      className="h-[40px] w-[40px]"
                      type="color"
                      id="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                    />
                    {color && (
                      <p className="font-semibold shadow border px-4 p-1.5 ">
                        {color}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="categories"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Category
                </label>
                <Select
                  id="categories"
                  required
                  options={categoriesList}
                  isMulti
                  value={categories}
                  onChange={(selectedOptions) => {
                    setCategories(selectedOptions || []);
                  }}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="shadow resize-none appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows="2"
                  placeholder="Enter description"
                  maxLength={70}
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="tags"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Tags
                </label>
                <CreatableSelect
                  id="tags"
                  options={tagsList}
                  isMulti
                  value={tags}
                  onChange={async (selectedOptions) => {
                    // Handle new tag creation
                    const newTags = [];
                    const existingTags = [];

                    for (const option of selectedOptions || []) {
                      if (option.__isNew__) {
                        // Create new tag via API
                        try {
                          const response = await adminAPI.createTag({
                            name: option.label,
                          });
                          const createdTag = response.data;

                          // Format the created tag to match the expected structure
                          const tagObj = {
                            label: createdTag.name || option.label,
                            value:
                              createdTag.id || createdTag._id || option.label,
                            id: createdTag.id || createdTag._id,
                          };
                          newTags.push(tagObj);

                          // Invalidate tags query to refresh the list
                          queryClient.invalidateQueries({ queryKey: ["tags"] });

                          toast.success(
                            `Tag "${option.label}" created successfully`
                          );
                        } catch (error) {
                          console.error("Error creating tag:", error);
                          const errorMessage =
                            error?.response?.data?.message ||
                            error?.message ||
                            "Failed to create tag";
                          toast.error(errorMessage);
                          // Still add it as a temporary object so user doesn't lose their input
                          newTags.push({
                            label: option.label,
                            value: option.label,
                          });
                        }
                      } else {
                        // Use existing tag
                        existingTags.push(option);
                      }
                    }

                    // Combine new and existing tags
                    setTags([...existingTags, ...newTags]);
                  }}
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  disabled={submitted || createSoundMutation.isPending}
                  className="bg-blue-500 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed
                                    text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  {createSoundMutation.isPending ? "Creating..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNewSound;
