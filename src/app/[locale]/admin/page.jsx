"use client";
import Users from "@/components/table/Users";
import { Dropdown } from "flowbite-react";
import { debounce } from "lodash";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import logo from "../../../assets/images/logo.png";
import { createUser } from "../../../database/createUser";
import { isAdmin } from "../../../database/isAdmin";
import AdminNewSound from "@/components/adminnewsound/AdminNewSound";
import BulkUpload from "@/components/bulkupload/BulkUpload";
import EditSound from "@/components/editsound/EditSound";
import { useDashboardSounds } from "@/hooks/useDashboardSounds";
import { useDashboardUsers } from "@/hooks/useDashboardUsers";
import { useCategories } from "@/hooks/useCategories";
import { useDeleteSound } from "@/hooks/useDeleteSound";
import { useQueryClient } from "@tanstack/react-query";

const Admin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [refreshKey, setRefreshKey] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showSoundsPanel, setShowSoundsPanel] = useState(true);
  const [usersCurrentPage, setUsersCurrentPage] = useState(1);
  const [usersSearchTerm, setUsersSearchTerm] = useState("");
  const [usersLocalSearch, setUsersLocalSearch] = useState("");

  const adminCheck = isAdmin();

  // Use React Query for categories
  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  const categories = categoriesData?.categories || [];
  const categoryMap = categoriesData?.categoryMap || {};

  // Use React Query hooks for data fetching with automatic caching
  const {
    data: soundsData,
    isLoading: loading,
    error: soundsError,
    refetch: refetchSounds,
  } = useDashboardSounds({
    page: currentPage,
    search: searchTerm,
    category: selectedCategory,
    categoryMap,
    enabled: showSoundsPanel, // Only fetch when sounds panel is visible
  });

  const {
    data: usersData,
    isLoading: usersLoading,
    error: usersError,
    refetch: refetchUsers,
  } = useDashboardUsers({
    page: usersCurrentPage,
    search: usersSearchTerm,
    enabled: !showSoundsPanel, // Only fetch when users panel is visible
  });

  // Extract data from React Query results
  const sounds = soundsData?.sounds || [];
  const totalCount = soundsData?.total || 0;
  const allUsers = usersData?.users || [];
  const usersTotalCount = usersData?.total || 0;


  // Handle categories error
  useEffect(() => {
    if (categoriesError) {
      console.error('Error fetching categories:', categoriesError);
      toast.error('Failed to load categories');
    }
  }, [categoriesError]);

  // Setup debounced search function for sounds
  const debouncedSearch = useCallback(
    debounce((query) => {
      setSearchTerm(query);
      setCurrentPage(1); // Reset to first page on search
    }, 500),
    []
  );

  // Handle category changes
  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page on category change
  }, []);

  // Handle refresh - invalidate queries to force refetch
  useEffect(() => {
    if (refreshKey > 0) {
      if (showSoundsPanel) {
        queryClient.invalidateQueries({ queryKey: ["dashboard-sounds"] });
        refetchSounds();
      } else {
        queryClient.invalidateQueries({ queryKey: ["dashboard-users"] });
        refetchUsers();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey, showSoundsPanel]);


  // Ref to track current search term for debounced function
  const usersSearchTermRef = useRef(usersSearchTerm);
  
  // Update ref when search term changes
  useEffect(() => {
    usersSearchTermRef.current = usersSearchTerm;
  }, [usersSearchTerm]);

  // Create debounced function using useRef to persist across renders
  const debouncedUsersSearchRef = useRef(
    debounce((query) => {
      setUsersSearchTerm(query);
      setUsersCurrentPage(1); // Reset to first page on search
    }, 500)
  );

  // Cleanup debounce on unmount
  useEffect(() => {
    const debouncedFn = debouncedUsersSearchRef.current;
    return () => {
      debouncedFn.cancel();
    };
  }, []);

  // Handle search input change - update local state immediately, debounce API call
  const handleUsersSearchChange = useCallback((value) => {
    setUsersLocalSearch(value);
    // Cancel previous debounced call and trigger new one
    debouncedUsersSearchRef.current.cancel();
    debouncedUsersSearchRef.current(value);
  }, []);

  // Panel toggle handler with optimized fetching
  const handlePanelToggle = useCallback(() => {
    setShowSoundsPanel(prev => {
      // Reset local search when switching to users panel
      if (!prev) {
        setUsersLocalSearch("");
      }
      return !prev;
    });
  }, []);

  // Handle errors
  useEffect(() => {
    if (soundsError) {
      console.error("Error fetching sounds:", soundsError);
      toast.error("Failed to load sounds");
    }
  }, [soundsError]);

  useEffect(() => {
    if (usersError) {
      console.error("Error fetching users:", usersError);
      toast.error("Failed to load users");
    }
  }, [usersError]);

  // // Admin check and redirect
  // if (adminCheck) {
  //   createUser();
  // } else {
  //   return router.replace("/admin/login");
  // }

  return (
    <div>
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
      <div className="flex w-full h-[60px] z-[9999] bg-[#F6F8FC] fixed top-0 dark:bg-gray-900 items-center px-10 justify-between">
        <Link href={"/"}>
          <div className="flex gap-3 items-center">
            <Image className="img w-10" src={logo} alt="logo" />
            <h6 className="gradtext font-semibold text-center hidden md:block drop-shadow-lg text-md md:text-2xl">
              Soundeffectbuttons
            </h6>
          </div>
        </Link>
        <div className="flex items-center justify-center">
          <button
            onClick={handlePanelToggle}
            type="button"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            {showSoundsPanel ? "All Users" : "All Sounds"}
          </button>
        </div>
      </div>
      <div key={refreshKey} className="mt-[60px] h-[calc(100vh-60px)]">
        {showSoundsPanel ? (
          <Table
            setRefreshKey={setRefreshKey}
            selectedCategory={selectedCategory}
            setSelectedCategory={handleCategoryChange}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            adminCheck={adminCheck}
            showSoundsPanel={showSoundsPanel}
            allSounds={sounds}
            loading={loading}
            totalCount={totalCount}
            setSearch={debouncedSearch}
            category={categories}
          />
        ) : (
          <Users 
            setRefreshKey={setRefreshKey} 
            allUsers={allUsers}
            loading={usersLoading}
            totalCount={usersTotalCount}
            currentPage={usersCurrentPage}
            setCurrentPage={setUsersCurrentPage}
            setSearch={handleUsersSearchChange}
            searchTerm={usersLocalSearch}
          />
        )}
      </div>
    </div>
  );
};

export default Admin;





const Table = (props) => {
  const [soundData, setSoundData] = useState("");
  const [update, setUpdate] = useState(0);
  const [editCaregoryValue, setEditCategoryValue] = useState();
  const [editCaregoryLabel, setEditCategoryLabel] = useState();
  const [dropdownLabel, setDropdownLabel] = useState()
  
  // Categories from props (React Query cached)
  const allCats = props.category || [];
  
  // React Query mutation for deleting sounds
  const deleteSoundMutation = useDeleteSound();
  const hideModal = () => {
    document
      .getElementById("modalId")
      .classList.add("-z-50", "scale-50", "opacity-0", "hidden");
    document
      .getElementById("modalId")
      .classList.remove("z-[100]", "opacity-100", "scale-100", "flex");
  };
  const showModal = () => {
    document
      .getElementById("modalId")
      .classList.add("z-[100]", "scale-100", "opacity-100", "flex");
    document
      .getElementById("modalId")
      .classList.remove("scale-50", "opacity-0", "-z-50", "hidden");
  };

  const hideEditModal = () => {
    document
      .getElementById("editModalId")
      .classList.add("-z-50", "scale-50", "opacity-0", "hidden");
    document
      .getElementById("editModalId")
      .classList.remove("z-[100]", "opacity-100", "scale-100", "flex");
    setSoundData();
  };
  const showEditModal = (data) => {
    setSoundData(data);
  };

  const hideBulkModal = () => {
    document
      .getElementById("bulkModalId")
      .classList.add("-z-50", "scale-50", "opacity-0", "hidden");
    document
      .getElementById("bulkModalId")
      .classList.remove("z-[100]", "opacity-100", "scale-100", "flex");
  };
  const showBulkModal = () => {
    document
      .getElementById("bulkModalId")
      .classList.add("z-[100]", "scale-100", "opacity-100", "flex");
    document
      .getElementById("bulkModalId")
      .classList.remove("scale-50", "opacity-0", "-z-50", "hidden");
  };

  function editModalPopUp() {
    document
      .getElementById("editModalId")
      .classList.add("z-[99999]", "scale-100", "opacity-100");
    document
      .getElementById("editModalId")
      .classList.remove("scale-50", "opacity-0", "-z-50");
  }

  function editCategoryModalPopUp() {
    document
      .getElementById("editCategoryModalId")
      .classList.add("z-[99999]", "scale-100", "opacity-100");
    document
      .getElementById("editCategoryModalId")
      .classList.remove("scale-50", "opacity-0", "-z-50");
  }

  useEffect(() => {
    if (soundData) {
      editModalPopUp();
    }
  }, [soundData]);

  useEffect(() => {
    if (editCaregoryLabel && editCaregoryValue) {
      editCategoryModalPopUp();
    }
  }, [editCaregoryLabel, editCaregoryValue]);

  function deleteClicked(id) {
    Swal.fire({
      text: "Do you want to continue?",
      icon: "warning",
      confirmButtonText: "Delete",
      showCancelButton: true,
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSoundMutation.mutate(id);
      }
    });
  }

  const [search, setSearch] = useState("");

  const columns = [
    {
      name: "⇅ Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Downloads",
      selector: (row) => row.downloads,
      sortable: false,
    },
    {
      name: "Favourites",
      selector: (row) => row.favourites,
      sortable: false,
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "Tags",
      selector: (row) => row.tags,
      sortable: false,
    },
    {
      name: "Actions",
      selector: (row) => row.actions,
      sortable: false,
    },
  ];

  const data =
    props.allSounds &&
    props.allSounds.map((item) => {
      // Handle categories - API returns 'categories' array (could be objects or strings)
      const categories = item.categories || item.category || [];
      const categoryNames = categories.map(cat => 
        typeof cat === 'object' ? (cat.name || cat.label || cat.id) : cat
      );
      const firstCategory = categoryNames[0] || "-";
      
      // Handle tags - API returns 'tags' array (could be objects or strings)
      const tags = item.tags || [];
      const tagNames = tags.map(tag => 
        typeof tag === 'object' ? (tag.name || tag.label || tag.id) : tag
      );
      
      return {
        id: item.id || item.uid,
        name: item.name,
        downloads: item.downloads || 0,
        favourites: item.favorites !== undefined ? item.favorites : (item.favourites || 0),
        categoryType: firstCategory,
        category: (
          <div className="inline-flex gap-2 overflow-hidden">
            {categoryNames.length > 0 ? (
              categoryNames.map((cate, index) => (
                <div
                  key={index}
                  className="bg-blue-100 rounded-sm text-blue-800 px-2 py-1 truncate"
                >
                  {cate}
                </div>
              ))
            ) : (
              <div>No Category</div>
            )}
          </div>
        ),
        tags: (
          <div className="inline-flex gap-2 overflow-hidden">
            {tagNames.length > 0 ? (
              tagNames.map((tag, index) => (
                <div
                  key={index}
                  className="bg-blue-100 rounded-sm text-blue-800 px-2 py-1 truncate"
                >
                  {tag}
                </div>
              ))
            ) : (
              <div>No Tags</div>
            )}
          </div>
        ),
      actions: (
        <div className="flex gap-3">
          <svg
            onClick={() => showEditModal(item)}
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#EAA94F"
          >
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z" />
          </svg>
          <svg
            onClick={() => deleteClicked(item.id)}
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#D95150"
          >
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
          </svg>
        </div>
      ),
      };
    });
  const sortedData =
    data &&
    data.filter((sound) => {
      if (!props.selectedCategory || props.selectedCategory === "") {
        return true;
      }
      return (
        sound.categoryType &&

        // sound.category.props.children.some(
        //   (cate) => cate.props.children === props.selectedCategory
        // )
        sound.categoryType === props.selectedCategory
      );
    });

  const filteredData =
    sortedData &&
    sortedData.filter((sounds) => {
      if (search === "") {
        return sounds;
      } else if (
        (sounds.name &&
          sounds.name.toLowerCase().includes(search.toLowerCase())) ||
        (sounds.user &&
          sounds.user.toLowerCase().includes(search.toLowerCase()))
      ) {
        return sounds;
      }
    });

  const newSoundSubmit = (e) => {
    hideModal();
    props.setRefreshKey((prevKey) => prevKey + 1);
    toast.success("Sound added successfully");
  };

  const editSoundSubmit = () => {
    hideEditModal();
    props.setRefreshKey((prevKey) => prevKey + 1);
    toast.success("Sound edited successfully");
  };

  const bulkSoundSubmit = (e) => {
    hideBulkModal();
    props.setRefreshKey((prevKey) => prevKey + 1);
    toast.success("Sounds added successfully");
  };

  const handleTableChange = (page) => {
    props.setCurrentPage(page);
  };

  return (
    <div className="bg-[#F3F4F6] px-8 py-6">
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
      <h1 className="text-3xl text-bold">
        {props.showSoundsPanel ? "All Sounds" : "All Users"}
      </h1>
      <div className=" mt-5 flex justify-between items-center">
        <div>
          <Dropdown
            placement="right-start"
            label={dropdownLabel ? dropdownLabel : "All Categories"}
            dismissOnClick={true}
          >
            <div className="grid grid-cols-2 gap-2 p-2">
              <Dropdown.Item onClick={() => {
                setDropdownLabel('All Categories')
                props.setSelectedCategory('')
              }}>
                All Categories
              </Dropdown.Item>
              {allCats &&
                allCats.map((item, index) => (
                  <Dropdown.Item
                    onClick={() => {
                      props.setSelectedCategory(item.value)
                      setDropdownLabel(item.label)
                    }}
                    key={index}
                  >
                    <div className="flex w-full items-center justify-between gap-10">
                      <span>{item.label}</span>
                    </div>
                  </Dropdown.Item>
                ))}
            </div>
          </Dropdown>
        </div>
      </div>
      <div className="bg-white mt-5 border rounded-md">
        <div className="w-full flex justify-between pt-8 pb-5 px-5">
          <div className="flex gap-5">
            <button
              onClick={showModal}
              type="button"
              class="text-white cursor-pointer bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Add new sound
            </button>
            <button
              onClick={showBulkModal}
              type="button"
              class="text-white cursor-pointer bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Bulk Sound Upload
            </button>
          </div>
          <form class="flex items-center max-w-[300px] w-full"
            onSubmit={(e) => e.preventDefault()}

          >
            <label for="simple-search" class="sr-only">
              Search
            </label>
            <div class="relative w-full">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    strokeWidth="2"
                    d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                  />
                </svg>
              </div>
              <input
                onChange={(e) => {
                  e.preventDefault()
                  props.setSearch(e.target.value)
                }}
                type="text"
                id="simple-search"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search sound name..."
                required

              />
            </div>
          </form>
        </div>
        <div className="px-5 w-full">
          <DataTable
            className="scrollsettings max-h-[63vh]"
            columns={columns}
            data={filteredData}
            fixedHeader
            paginationDefaultPage={props.currentPage}
            onChangePage={handleTableChange}
            striped
            highlightOnHover
            responsive
            paginationRowsPerPageOptions={[10]}
            progressPending={props.loading}
            pagination
            paginationServer
            paginationTotalRows={props.totalCount}
          />
        </div>
      </div>
      <AdminNewSound
        newSoundSubmit={newSoundSubmit}
        hideModal={hideModal}
        modalId={"modalId"}
        func={hideModal}
      />
      <BulkUpload
        bulkSoundSubmit={bulkSoundSubmit}
        adminCheck={props.adminCheck}
        func={hideBulkModal}
        modalId={"bulkModalId"}
        hideBulkModal={hideBulkModal}
      />
      {soundData && (
        <EditSound
          editSoundSubmit={editSoundSubmit}
          soundData={soundData}
          hideEditModal={hideEditModal}
          editModalId={"editModalId"}
          func={hideEditModal}
        />
      )}
    </div>
  );
};

;