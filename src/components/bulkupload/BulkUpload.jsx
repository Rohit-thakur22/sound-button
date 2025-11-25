
import { useBulkUploadSounds } from '@/hooks/useBulkUploadSounds';
import { useCategories } from '@/hooks/useCategories';
import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { checkIfFilesExist } from '../../database/checkIfFileExists';
import Swal from 'sweetalert2';


const BulkUpload = (props) => {
    const [submitted, setSubmitted] = useState(false)
    const [files, setFiles] = useState()
    const [categories, setCategories] = useState([]);
    const fileInputRef = useRef(null);
    
    // React Query hooks
    const { data: categoriesData } = useCategories();
    const bulkUploadMutation = useBulkUploadSounds();

    // Get categories list and category map
    const categoriesList = categoriesData?.categories || [];
    const categoryMap = categoriesData?.categoryMap || {};



    // Map selected categories to IDs
    const getCategoryIds = (selectedCategories) => {
        return selectedCategories.map(cat => {
            // If category has an ID property, use it
            if (cat.id) return cat.id;
            // Otherwise, look up by value (category name) in categoryMap
            return categoryMap[cat.value] || null;
        }).filter(id => id !== null && id !== undefined);
    };

    // Reset all form fields
    const resetForm = () => {
        setFiles();
        setCategories([]);
        setSubmitted(false);
        // Clear file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    async function submitClicked(e) {
        e.preventDefault()
        
        if (!files || files.length === 0) {
            toast.error('No file selected');
            return;
        }

        setSubmitted(true)

        const { filesFound, existingFiles } = await checkIfFilesExist(files);
        
        const handleUpload = async (filesToUpload) => {
            try {
                // Map category names to IDs
                const categoryIds = getCategoryIds(categories);
                
                if (categoryIds.length === 0) {
                    toast.error('Please select at least one category');
                    setSubmitted(false);
                    return;
                }

                // Call mutation
                await bulkUploadMutation.mutateAsync(
                    { files: filesToUpload, categoryIds },
                    {
                        onSuccess: () => {
                            props.bulkSoundSubmit();
                            // Reset form
                            resetForm();
                        },
                        onError: () => {
                            setSubmitted(false);
                        }
                    }
                );
            } catch (error) {
                console.error('Error uploading files:', error);
                setSubmitted(false);
            }
        };

        if (filesFound) {
            Swal.fire({
                title: existingFiles.length + " duplicate files found",
                text: "Files with the same name already exists",
                showDenyButton: true,
                confirmButtonText: "Skip duplicate files",
                denyButtonText: `Cancel`,
                denyButtonColor: '#2A8BD7',
                showCloseButton: true,
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const existingFileNames = existingFiles.flatMap(file => {
                        const nameWithoutExtension = file.name.replace(/\.(mp3|wav)$/, '');

                        return [
                            nameWithoutExtension,
                            `${nameWithoutExtension}.mp3`,
                            `${nameWithoutExtension}.wav`
                        ];
                    });

                    const filteredFiles = Object.keys(files)
                        .filter(key => !existingFileNames.includes(files[key].name))
                        .map(key => files[key]);
                    
                    await handleUpload(filteredFiles);
                } else if (result.isDenied) {
                    resetForm();
                    props.hideBulkModal();
                }
            });
        } else {
            await handleUpload(files);
        }
    }


    return (
        <div id={props.modalId} className="fixed flex opacity-0 justify-center duration-500 bg-black ease-in-out scale-50 items-center inset-0 backdrop-blur-xl bg-opacity-15 ">
            <div className="flex flex-col w-full sm:w-[530px] text-gray-800 bg-white rounded-lg gap-4">
                <div className="flex flex-col relative gap-4 h-min">
                    <div className="flex rounded-t-lg items-center justify-between px-6 py-3 bg-[#F9F7F7]">
                        <h1 className="text-2xl font-semibold">Add Bulk Sounds</h1>
                        <svg onClick={() => {
                            resetForm();
                            props.hideBulkModal();
                        }} className="hover:rotate-90 cursor-pointer duration-150" xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill=""><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                    </div>

                    <div className="p-4 pb-4 pt-0">
                        <form onSubmit={(e) => submitClicked(e)}>
                            <div className="mb-4">
                                <input
                                    className=""
                                    ref={fileInputRef}
                                    aria-describedby="file_input_help"
                                    type="file"
                                    id="soundFile"
                                    multiple
                                    onChange={(e) => setFiles(e.target.files)}
                                    accept=".mp3, .wav"
                                />
                            </div>

                            <div className="mb-4">
                                <Select
                                    id="categories"
                                    placeholder="Select Categories"
                                    required
                                    options={categoriesList}
                                    isMulti
                                    value={categories}
                                    onChange={(selectedOptions) => {
                                        setCategories(selectedOptions || []);
                                    }}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <button
                                    type='submit'
                                    disabled={submitted || bulkUploadMutation.isPending}
                                    className="bg-blue-500 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed
                                    text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
                                >
                                    {bulkUploadMutation.isPending ? 'Uploading...' : 'Submit'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BulkUpload;
