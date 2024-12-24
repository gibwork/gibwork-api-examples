import React, { useState } from "react";

interface Token {
  mintAddress: string;
  amount: number;
}

interface FormData {
  title: string;
  content: string;
  requirements: string;
  tags: string[];
  payer: string;
  token: Token;
}

interface FormProps {
  onSubmit: (data: FormData) => void;
}

const FormComponent: React.FC<FormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
    requirements: "",
    tags: [""],
    payer: "",
    token: {
      mintAddress: "",
      amount: 0,
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name.startsWith("token.")) {
      const tokenKey = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        token: {
          ...prev.token,
          [tokenKey]: tokenKey === "amount" ? parseFloat(value) || 0 : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleTagsChange = (index: number, value: string) => {
    const newTags = [...formData.tags];
    newTags[index] = value;
    setFormData((prev) => ({ ...prev, tags: newTags }));
  };

  const addTagField = () => {
    setFormData((prev) => ({ ...prev, tags: [...prev.tags, ""] }));
  };

  const removeTagField = (index: number) => {
    const newTags = formData.tags.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, tags: newTags }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      className="max-w-xl mx-auto w-full bg-gray-100 p-6 rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Content</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Requirements</label>
        <textarea
          name="requirements"
          value={formData.requirements}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Tags</label>
        {formData.tags.map((tag, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={tag}
              onChange={(e) => handleTagsChange(index, e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              onClick={() => removeTagField(index)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addTagField}
          className="mt-2 text-blue-500 hover:text-blue-700"
        >
          Add Tag
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Payer</label>
        <input
          type="text"
          name="payer"
          value={formData.payer}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Token Mint Address</label>
        <input
          type="text"
          name="token.mintAddress"
          value={formData.token.mintAddress}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Token Amount</label>
        <input
          type="number"
          name="token.amount"
          value={formData.token.amount}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </form>
  );
};

export default FormComponent;
