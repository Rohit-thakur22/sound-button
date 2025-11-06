"use client";
import React from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useBanUser, useUnbanUser } from "@/hooks/useBanUser";

const Users = (props) => {
  // Use server-side search instead of local state
  const search = props.searchTerm || "";
  
  // React Query mutations for ban/unban
  const banUserMutation = useBanUser();
  const unbanUserMutation = useUnbanUser();

  const banUserClicked = async (id) => {
    Swal.fire({
      text: "Are you sure to ban this user?",
      icon: "warning",
      confirmButtonText: "Confirm",
      showCancelButton: true,
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        banUserMutation.mutate(id);
      }
    });
  };

  const revokeBan = async (id) => {
    Swal.fire({
      text: "Are you sure to revoke the ban on this user?",
      icon: "warning",
      confirmButtonText: "Confirm",
      showCancelButton: true,
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        unbanUserMutation.mutate(id);
      }
    });
  };

  const columns = [
    {
      name: "⇅ Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: false,
    },
    {
      name: "⇅ Rank",
      selector: (row) => row.rank,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.is_banned,
      sortable: true,
    },
    {
      name: "Actions",
      selector: (row) =>
        row.is_banned === "Banned" ? (
          <button
            type="button"
            onClick={() => revokeBan(row.id)}
            class="text-green-700 border-green-700 border bg-green-100 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-sm text-sm px-2 py-0.5 text-center  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Revoke Ban
          </button>
        ) : (
          <button
            onClick={() => banUserClicked(row.id)}
            type="button"
            class="text-red-700 border border-red-700 focus:outline-none focus:ring-4 my-auto focus:ring-red-300 font-medium rounded-sm bg-red-100 text-sm px-2 py-0.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Ban User
          </button>
        ),
      sortable: false,
    },
  ];

  // Handle API response structure - API returns isActive (false = banned, true = active)
  const data = props.allUsers?.map((item, index) => ({
    id: item?.id || item?.uid,
    name: item?.name ?? "--",
    email: item?.email ?? "--",
    rank: item?.rank ?? ((props.currentPage - 1) * 10 + index + 1), // Use API rank if available, otherwise calculate
    is_banned: item?.isActive === false ? "Banned" : "Active", // isActive: false means banned
    isActive: item?.isActive, // Keep original for reference
  })) || [];

  // Handle table page change
  const handleTableChange = (page) => {
    if (props.setCurrentPage) {
      props.setCurrentPage(page);
    }
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
      <div className="bg-white mt-5 border rounded-md">
        <div className="w-full flex justify-between pt-8 pb-5 px-5">
          <form class="flex items-center max-w-[300px] w-full">
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
                  const value = e.target.value;
                  if (props.setSearch) {
                    props.setSearch(value);
                  }
                }}
                type="text"
                id="simple-search"
                value={search}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search User name or email..."
              />
            </div>
          </form>
        </div>
        <div className="px-5 w-full">
          <DataTable
            className="scrollsettings max-h-[63vh]"
            columns={columns}
            data={data}
            fixedHeader
            pagination
            paginationServer
            paginationDefaultPage={props.currentPage || 1}
            onChangePage={handleTableChange}
            striped
            highlightOnHover
            responsive
            progressPending={props.loading}
            paginationTotalRows={props.totalCount || 0}
            paginationRowsPerPageOptions={[10]}
            paginationPerPage={10}
          />
        </div>
      </div>
    </div>
  );
};

export default Users;