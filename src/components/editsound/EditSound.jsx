import { createTag } from '../../database/createTag';
import { useCategories } from '@/hooks/useCategories';
import { useTags } from '@/hooks/useTags';
import { useEditSound } from '@/hooks/useEditSound';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

const EditSound = (props) => {
    // React Query hooks for categories and tags
    const { data: categoriesData } = useCategories();
    const { data: tagsData } = useTags();
    const editSoundMutation = useEditSound();

    // Get categories and tags lists
    const categoriesList = categoriesData?.categories || [];
    const tagsList = tagsData?.tags || [];
    const categoryMap = categoriesData?.categoryMap || {};
    const rawCategories = categoriesData?.rawCategories || [];
    
    // Helper to get category ID from name
    const getCategoryId = (categoryName) => {
        const category = rawCategories.find(cat => cat.name === categoryName);
        return category?.id;
    };

    // Helper to get tag ID from name or use existing ID
    const getTagId = (tag) => {
        if (typeof tag === 'object' && tag.id) return tag.id;
        const tagObj = tagsData?.rawTags?.find(t => t.name === tag);
        return tagObj?.id;
    };

    // Initialize state from props - handle API response format
    const [name, setName] = useState('');
    const [color, setColor] = useState('#4285F4');
    const [categories, setCategories] = useState([]);
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState([]);

    // Initialize form data from props when soundData changes
    useEffect(() => {
        if (props.soundData) {
            setName(props.soundData.name || '');
            setColor(props.soundData.color || '#4285F4');
            setDescription(props.soundData.description || '');
        }
    }, [props.soundData]);

    // Map categories when categories list and sound data are available
    useEffect(() => {
        if (categoriesList.length > 0 && props.soundData) {
            const soundCategories = props.soundData?.categories || props.soundData?.category || [];
            const mapped = soundCategories.map(cat => {
                const categoryName = typeof cat === 'object' ? (cat.name || cat.label) : cat;
                const found = categoriesList.find(c => c.value === categoryName);
                if (found) return found;
                // If not found, create temporary option (will be resolved when categories load)
                return { value: categoryName, label: categoryName };
            }).filter(Boolean);
            setCategories(mapped);
        }
    }, [categoriesList, props.soundData]);

    // Map tags when tags list and sound data are available
    useEffect(() => {
        if (tagsList.length > 0 && props.soundData) {
            const soundTags = props.soundData?.tags || [];
            const mapped = soundTags.map(tag => {
                const tagName = typeof tag === 'object' ? (tag.name || tag.label) : tag;
                const found = tagsList.find(t => t.label === tagName || t.id === (typeof tag === 'object' ? tag.id : undefined));
                if (found) return found;
                // If not found, create temporary option
                return { label: tagName, value: tagName };
            }).filter(Boolean);
            setTags(mapped);
        }
    }, [tagsList, props.soundData]);

    async function submitClicked(e) {
        e.preventDefault();
        
        // Map categories to IDs
        const categoryIds = categories.map(cat => {
            // If category has ID, use it
            if (cat.id) return cat.id;
            // Otherwise, look it up in categoryMap
            return categoryMap[cat.value] || getCategoryId(cat.value);
        }).filter(id => id !== undefined);

        // Map tags to IDs
        const tagIds = tags.map(tag => {
            // If tag has ID, use it
            if (tag.id) return tag.id;
            // Otherwise, find it in tagsList
            const tagObj = tagsList.find(t => t.label === tag.label || t.value === tag.value);
            return tagObj?.id;
        }).filter(id => id !== undefined);

        // Prepare API payload
        const soundData = {
            name: name.trim(),
            description: description.trim(),
            color: color,
            categoryIds: categoryIds,
            tagIds: tagIds,
        };

        // Call mutation
        editSoundMutation.mutate(
            { soundId: props.soundData.id, soundData },
            {
                onSuccess: () => {
                    props.editSoundSubmit();
                }
            }
        );
    }

    return (
        <div id={props.editModalId} className="fixed flex -z-50 opacity-0 justify-center duration-500 bg-black ease-in-out scale-50 items-center inset-0 backdrop-blur-xl bg-opacity-15 ">
            <div className="flex flex-col w-full sm:w-[550px] text-gray-800 bg-white rounded-lg gap-4">
                <div className="flex flex-col relative gap-4 h-min">
                    <div className="flex rounded-t-lg items-center justify-between px-6 py-3 bg-[#F9F7F7]">
                        <h1 className="text-2xl font-semibold">Edit Sound</h1>
                        <svg onClick={props.hideEditModal} className="hover:rotate-90 cursor-pointer duration-150" xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill=""><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                    </div>

                    <div className="p-4 pb-4 pt-0">
                        <form onSubmit={(e) => submitClicked(e)} className="">
                            {/* Name input */}
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter name"
                                />
                            </div>

                            <div className='grid grid-cols-3 gap-5'>
                                {/* Sound input (mp3) */}
                                {/* <div className="mb-4 col-span-2 w-full">
                                    <label htmlFor="soundFile" className="block text-gray-700 text-sm font-bold mb-2">Sound (mp3)</label>
                                    <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" type="file"
                                        id="soundFile"
                                        value={soundFile}
                                        onChange={(e) => setSoundFile(e.target.files[0])}
                                        accept=".mp3" />
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">.mp3 (MAX. 1mb).</p>
                                </div> */}

                                {/* Colour input */}
                                <div className="mb-4">
                                    <label htmlFor="color" className="block text-gray-700 text-sm font-bold mb-2">Color</label>
                                    <div className='flex items-center gap-3'>
                                        <input
                                            className='h-[40px] w-[40px]'
                                            type="color"
                                            id="color"
                                            value={color}
                                            onChange={(e) => setColor(e.target.value)}
                                        />
                                        {color &&
                                            <p className='font-semibold shadow border px-4 p-1.5 '>{color}</p>
                                        }

                                    </div>
                                </div>
                            </div>

                            {/* Category input (React Select) */}
                            <div className="mb-4">
                                <label htmlFor="categories" className="block text-gray-700 text-sm font-bold mb-2">Category</label>
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

                            {/* Description input */}
                            <div className="mb-4">
                                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                                <textarea

                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="shadow resize-none appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    rows="2"
                                    placeholder="Enter description"
                                />
                            </div>

                            {/* Tags input (React Select) */}
                            <div className="mb-6">
                                <label htmlFor="tags" className="block text-gray-700 text-sm font-bold mb-2">Tags</label>
                                <CreatableSelect
                                    id="tags"
                                    options={tagsList}
                                    isMulti
                                    value={tags}
                                    onChange={(selectedOptions) => {
                                        // Handle new tag creation
                                        selectedOptions?.forEach(option => {
                                            if (option.__isNew__) {
                                                createTag(option.label);
                                            }
                                        });
                                        // Map to format with IDs
                                        const values = selectedOptions ? selectedOptions.map(option => {
                                            // If it's a new tag, create a temporary object
                                            if (option.__isNew__) {
                                                return { label: option.label, value: option.label };
                                            }
                                            // Otherwise use the existing tag object
                                            return option;
                                        }) : [];
                                        setTags(values);
                                    }}
                                />
                            </div>

                            {/* Submit button */}
                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    disabled={editSoundMutation.isPending}
                                    className="bg-blue-500 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    {editSoundMutation.isPending ? 'Updating...' : 'Submit'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditSound;
