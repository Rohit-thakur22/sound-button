
import { editCategory } from '../../database/editCategory';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const EditCategory = (props) => {
    const [submitted, setSubmitted] = useState(false)
    const [newCategoryName, setNewCategoryName] = useState(props.category)

    async function submitClicked() {
        setSubmitted(true)
        const result = await editCategory(props.categoryId, newCategoryName);
        if (result) {
            props.setRefreshKey(prevKey => prevKey + 1)
            props.hideEditCategoryModal()
            setNewCategoryName()
            toast.success('Category Edited Successfully')
        }
    }

    return (
        <div id={props.editCategoryModalId} className="fixed flex -z-50 opacity-0 justify-center duration-500 bg-black ease-in-out scale-50 items-center inset-0 backdrop-blur-xl bg-opacity-15 ">
            <div className="flex flex-col w-full sm:w-[550px] text-gray-800 bg-white rounded-lg gap-4">
                <div className="flex flex-col relative gap-4 h-min">
                    <div className="flex rounded-t-lg items-center justify-between px-6 py-3 bg-[#F9F7F7]">
                        <h1 className="text-2xl font-semibold">Edit Category</h1>
                        <svg onClick={props.hideEditCategoryModal} className="hover:rotate-90 cursor-pointer duration-150" xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill=""><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                    </div>

                    <div className="p-4 pb-4 pt-0">
                        <form onSubmit={(e) => {
                            e.preventDefault(); // Prevent default form submission
                            submitClicked();
                        }}>
                            <div className="mb-4">
                                <input
                                    className=""
                                    type="text"
                                    required
                                    value={newCategoryName}
                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <button

                                    disabled={submitted}
                                    className="bg-blue-500 hover:bg-blue-700 disabled:cursor-not-allowed
                                    text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditCategory;
