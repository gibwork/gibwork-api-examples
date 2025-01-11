"use client";

import { useState } from "react";
import { createTask } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

export default function CreateTaskForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentTag.trim()) {
      e.preventDefault();
      if (!tags.includes(currentTag.trim())) {
        setTags([...tags, currentTag.trim()]);
      }
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const taskData = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      requirements: formData.get("requirements") as string,
      tags: tags,
      payer: formData.get("payer") as string,
      token: {
        mintAddress: formData.get("mintAddress") as string,
        amount: formData.get("amount") as string,
      },
    };

    try {
      await createTask(taskData);
      router.refresh();
      (e.target as HTMLFormElement).reset();
      setTags([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create task");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="Task Title"
          required
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          name="content"
          placeholder="Task Content"
          required
          className="w-full"
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="requirements">Requirements</Label>
        <Textarea
          id="requirements"
          name="requirements"
          placeholder="Task Requirements"
          required
          className="w-full"
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label>Tags</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 px-2 py-1 rounded-md flex items-center gap-1"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
        <Input
          value={currentTag}
          onChange={(e) => setCurrentTag(e.target.value)}
          onKeyDown={handleAddTag}
          placeholder="Type a tag and press Enter"
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="payer">Payer</Label>
        <Input
          id="payer"
          name="payer"
          placeholder="Payer Address"
          required
          className="w-full"
        />
      </div>

      <div className="space-y-4">
        <Label>Token Details</Label>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="mintAddress">Mint Address</Label>
            <Input
              id="mintAddress"
              name="mintAddress"
              placeholder="Token Mint Address"
              required
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              placeholder="Token Amount"
              required
              className="w-full"
            />
          </div>
        </div>
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Creating..." : "Create Task"}
      </Button>
    </form>
  );
}
