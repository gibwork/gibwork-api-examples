"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchTasks } from "@/lib/api";
import { Task, PaginatedResponse } from "@/types/task";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function TaskList() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<PaginatedResponse | null>(null);

  const fetchPage = useCallback(async (page: number) => {
    setLoading(true);
    try {
      const result = await fetchTasks(page);
      setData(result);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPage(currentPage);
  }, [currentPage, fetchPage]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  if (!data?.results?.length) {
    return <div className="text-center py-8">No tasks found</div>;
  }

  return (
    <div className="space-y-6">
      {loading && <div className="text-center">Loading...</div>}

      <div className="divide-y">
        {data.results.map((task: Task) => (
          <div key={task.id} className="py-4">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold">{task.title}</h3>
              <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                {task.asset.price} {task.asset.symbol}
              </div>
            </div>
            <p className="text-gray-600 mt-1">{task.content}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {task.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="mt-2 text-sm text-gray-500">
              <span>Status: {task.status}</span>
              <span className="mx-2">•</span>
              <span>
                Created: {new Date(task.createdAt).toLocaleDateString()}
              </span>
              <span className="mx-2">•</span>
              <span>
                Submission Deadline:{" "}
                {new Date(task.deadline).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-500">
          Showing page {data.page} of {data.lastPage} ({data.total} total items)
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1 || loading}
            variant="outline"
          >
            Previous
          </Button>

          {data.lastPage > 2 && (
            <div className="flex items-center gap-1">
              {[...Array(Math.min(5, data.lastPage))].map((_, index) => {
                const pageNumber = index + 1;
                return (
                  <Button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    variant={currentPage === pageNumber ? "default" : "outline"}
                    className="w-10"
                  >
                    {pageNumber}
                  </Button>
                );
              })}
              {data.lastPage > 5 && <span className="px-2">...</span>}
            </div>
          )}

          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= data.lastPage || loading}
            variant="outline"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
