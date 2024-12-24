"use client"
import React, { useState, useEffect } from "react";

const ActiveTasksPage = () => {
    const [tasks, setTasks] = useState<Task[]>([]); // Array of tasks
    const [page, setPage] = useState(1); // Current page
    const [pageSize, setPageSize] = useState(15); // Items per page
    const [totalPages, setTotalPages] = useState(0); // Total number of pages
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [error, setError] = useState<any>(null); // Error state

    // Fetch data function
    const fetchTasks = async (): Promise<void> => {
        setIsLoading(true);
        setError(null);
      
        try {
          const options = { method: "GET", headers: { accept: "application/json" } };
          const response = await fetch(
            `https://api2.gib.work/explore?page=${page}&limit=${pageSize}`,
            options
          );
          const data: TasksResponse = await response.json(); // Add type here
      
          if (response.ok) {
            setTasks(data.results); // 'results' is an array of Task
            setTotalPages(data.lastPage); // 'lastPage' represents the total pages
          } else {
            throw new Error("Failed to fetch tasks");
          }
        } catch (err) {
          setError(err);
        } finally {
          setIsLoading(false);
        }
      };
      

    // Fetch tasks whenever `page` or `pageSize` changes
    useEffect(() => {
        fetchTasks();
    }, [page, pageSize]);

    // Handle page size change
    const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPageSize(Number(e.target.value));
        setPage(1); // Reset to the first page
    };

    // Handle page navigation
    const goToNextPage = () => {
        if (page < totalPages) setPage(page + 1);
    };

    const goToPreviousPage = () => {
        if (page > 1) setPage(page - 1);
    };

    return (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Tasks Table</h1>
    
          {/* Error Message */}
          {error && <p className="text-red-500">{error}</p>}
    
          {/* Loading Spinner */}
          {isLoading && <p className="text-blue-500">Loading...</p>}
    
          {/* Tasks Table */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">ID</th>
                  <th className="border border-gray-300 px-4 py-2">Title</th>
                  <th className="border border-gray-300 px-4 py-2">Created At</th>
                  <th className="border border-gray-300 px-4 py-2">Type</th>
                  <th className="border border-gray-300 px-4 py-2">Deadline</th>
                  <th className="border border-gray-300 px-4 py-2">Reward</th>
                  <th className="border border-gray-300 px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {tasks.length > 0 ? (
                  tasks.map((task) => (
                    <tr key={task.id} className="hover:bg-gray-100">
                      <td className="border border-gray-300 px-4 py-2">{task.id}</td>
                      <td className="border border-gray-300 px-4 py-2">{task.title}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        {new Date(task.createdAt).toLocaleDateString()}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">{task.type}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        {new Date(task.deadline).toLocaleDateString()}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {task.asset.reward} {task.asset.symbol}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">{task.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-center" colSpan={7}>
                      No tasks found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
    
          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <div>
              <label htmlFor="pageSize" className="mr-2">
                Page Size:
              </label>
              <select
                id="pageSize"
                className="border border-gray-300 p-2 rounded"
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
    
            <div className="flex items-center gap-2">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
              >
                Previous
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      );
};

export default ActiveTasksPage;
