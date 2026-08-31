"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

interface IBlog {
  _id: string;
  title: string;
  slug: string;
  date: string;
  metaTitle?: string;
  metaDescription?: string;
  content: string;
  thumbnail?: {
    url: string;
    imageKey?: string;
  };
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<IBlog | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch blogs from API
  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/blog");
      if (data.success) setBlogs(data.blogs);
    } catch (err) {
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  // Delete blog
  const deleteBlog = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) return;
    try {
      const { data } = await axios.delete(`/api/blog/${id}`);
      if (data.success) {
        toast.success("Blog deleted successfully!");
        fetchBlogs();
      }
    } catch (err) {
      toast.error("Failed to delete blog");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Blogs</h1>
            <p className="text-gray-600 mt-1">Create, edit and delete blog posts</p>
          </div>
          <button
            onClick={() => {
              setEditingBlog(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 bg-[#00badb] text-white px-5 py-2.5 rounded-xl shadow hover:bg-[#009ab5] transition"
          >
            <Plus size={20} /> Add New Blog
          </button>
        </div>

        {/* Blog Cards Grid */}
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading blogs...</div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-12 text-gray-500 bg-white rounded-2xl border">
            No blogs found. Click "Add New Blog" to create one.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div key={blog._id} className="bg-white rounded-3xl overflow-hidden shadow p-4 space-y-4">
                <div className="h-48 w-full relative rounded-2xl overflow-hidden bg-gray-100">
                  <img
                    src={blog.thumbnail?.url}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-xs font-medium text-gray-400">
                  {new Date(blog.date).toLocaleDateString()}
                </div>
                <h3 className="font-bold text-lg text-gray-800 line-clamp-2">{blog.title}</h3>
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={() => {
                      setEditingBlog(blog);
                      setIsModalOpen(true);
                    }}
                    className="p-2 bg-emerald-100 text-emerald-600 rounded-lg hover:bg-emerald-200 transition"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => deleteBlog(blog._id)}
                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for Create / Edit */}
        {isModalOpen && (
          <CreateEditBlogModal
            editingBlog={editingBlog}
            onClose={() => {
              setIsModalOpen(false);
              setEditingBlog(null);
            }}
            onRefresh={fetchBlogs}
          />
        )}

      </div>
    </div>
  );
}

// Modal Component
function CreateEditBlogModal({
  editingBlog,
  onClose,
  onRefresh,
}: {
  editingBlog: IBlog | null;
  onClose: () => void;
  onRefresh: () => void;
}) {
  const [title, setTitle] = useState(editingBlog?.title || "");
  const [permalink, setPermalink] = useState(editingBlog?.slug || "");
  const [isEditingSlug, setIsEditingSlug] = useState(false);

  // Helper to convert text to clean URL slug
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-");
  };

  // Auto-generate permalink when title changes (unless user customizes it)
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isEditingSlug && !editingBlog) {
      setPermalink(generateSlug(val));
    }
  };
  const [date, setDate] = useState(
    editingBlog?.date
      ? new Date(editingBlog.date).toISOString().substring(0, 10)
      : new Date().toISOString().substring(0, 10)
  );
  const [metaTitle, setMetaTitle] = useState(editingBlog?.metaTitle || "");
  const [metaDescription, setMetaDescription] = useState(editingBlog?.metaDescription || "");
  const [content, setContent] = useState(editingBlog?.content || "");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(editingBlog?.thumbnail?.url || null);
  const [originalSize, setOriginalSize] = useState<number | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clear selected image / preview
  const handleRemoveImage = () => {
    setThumbnail(null);
    setPreviewUrl(null);
    setOriginalSize(null);
    setCompressedSize(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle file selection and client-side WebP compression estimation preview
  const handleFileChange = async (file: File | null) => {
    if (!file) {
      setThumbnail(null);
      setOriginalSize(null);
      setCompressedSize(null);
      setPreviewUrl(editingBlog?.thumbnail?.url || null);
      return;
    }

    setThumbnail(file);
    setOriginalSize(file.size);

    // Create object URL for instant preview
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    // Estimate compressed WebP size matching Sharp backend settings (Max 1200px, quality 0.75)
    try {
      const img = new Image();
      img.src = url;
      await new Promise((resolve) => (img.onload = resolve));

      const maxDim = 1200;
      let width = img.width;
      let height = img.height;

      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            setCompressedSize(blob.size);
          }
        },
        "image/webp",
        0.75
      );
    } catch {
      setCompressedSize(null);
    }
  };

  // Editor Config
  const editorConfig = useMemo(
    () => ({
      readonly: false,
      placeholder: "Write blog content here...",
      height: 320,
      minHeight: 250,
      maxHeight: 500,
      autoFocus: false,
      spellcheck: true,
      overflowY: "auto",
      buttons: [
        "source", "|",
        "bold", "italic", "underline", "strikethrough", "|",
        "font", "fontsize", "brush", "paragraph", "|",
        "image", "table", "link", "|",
        "align", "ul", "ol", "|",
        "undo", "redo", "hr", "|",
        "fullsize"
      ],
      statusbar: true,
      toolbarAdaptive: false,
    }),
    []
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("permalink", permalink);
    formData.append("date", date);
    formData.append("metaTitle", metaTitle);
    formData.append("metaDescription", metaDescription);
    formData.append("content", content);
    if (thumbnail) formData.append("thumbnail", thumbnail);

    try {
      const res = editingBlog
        ? await axios.put(`/api/blog/${editingBlog._id}`, formData)
        : await axios.post("/api/blog", formData);

      if (res.data.success) {
        toast.success(editingBlog ? "Blog updated!" : "Blog created!");
        onRefresh();
        onClose();
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to save blog");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-8 max-h-[90vh] overflow-y-auto space-y-6 relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-gray-900">
          {editingBlog ? "Edit Blog Post" : "Create Blog Post"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">Blog Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Enter title"
              required
              className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00badb]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-semibold text-gray-700">URL Slug / Permalink</label>
                <button
                  type="button"
                  onClick={() => setIsEditingSlug(!isEditingSlug)}
                  className="text-xs text-[#00badb] hover:underline font-semibold flex items-center gap-1"
                >
                  <Edit2 size={12} /> {isEditingSlug ? "Done" : "Edit Slug"}
                </button>
              </div>

              {isEditingSlug ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={permalink}
                    onChange={(e) => setPermalink(generateSlug(e.target.value))}
                    placeholder="my-blog-post-slug"
                    className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00badb]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPermalink(generateSlug(title));
                      setIsEditingSlug(false);
                    }}
                    className="px-3 py-3 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium whitespace-nowrap"
                  >
                    Reset
                  </button>
                </div>
              ) : (
                <div className="w-full border bg-gray-50 p-3 rounded-xl flex items-center justify-between text-gray-600 text-sm">
                  <span className="font-mono text-xs text-gray-700 truncate">
                    {permalink || generateSlug(title) || "blog-slug-preview"}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsEditingSlug(true)}
                    className="p-1 text-gray-400 hover:text-slate-700"
                    title="Edit custom slug"
                  >
                    <Edit2 size={14} />
                  </button>
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">Publish Date *</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00badb]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">Content *</label>
            <div className="rounded-xl overflow-hidden border border-gray-300" data-lenis-prevent>
              <JoditEditor
                value={content}
                config={editorConfig}
                onBlur={(newContent) => setContent(newContent)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              Thumbnail Image {editingBlog ? "(Leave blank to keep existing)" : "*"}
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
              required={!editingBlog && !previewUrl}
              className="w-full border p-2.5 rounded-xl bg-gray-50 mb-3"
            />

            {/* Image Preview & Compression Stats Box */}
            {previewUrl && (
              <div className="bg-slate-50 border rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4 relative group">
                <div className="w-32 h-24 relative rounded-xl overflow-hidden bg-gray-200 border flex-shrink-0">
                  <img
                    src={previewUrl}
                    alt="Thumbnail Preview"
                    className="w-full h-full object-cover"
                  />
                  {/* Red Cross Button to Remove Image */}
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    title="Remove image"
                    className="absolute top-1.5 right-1.5 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full shadow transition-all duration-200 cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 w-full">
                  <div className="font-semibold text-slate-800 text-sm flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>Thumbnail Preview</span>
                      {thumbnail && (
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-700 rounded-full">
                          WebP Auto-Compress
                        </span>
                      )}
                    </div>
                    {/* Secondary Red Remove Link */}
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="text-xs text-red-500 hover:text-red-700 font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <X size={14} /> Remove Image
                    </button>
                  </div>

                  {originalSize ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 border-t border-slate-200 mt-2">
                      <div>
                        <span className="text-gray-400 block text-[10px] uppercase font-bold">Original Size</span>
                        <span className="font-semibold text-slate-700">
                          {(originalSize / 1024).toFixed(1)} KB
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[10px] uppercase font-bold">Compressed (WebP)</span>
                        <span className="font-semibold text-emerald-600">
                          {compressedSize ? `${(compressedSize / 1024).toFixed(1)} KB` : "Calculating..."}
                        </span>
                      </div>
                      {originalSize && compressedSize && (
                        <div>
                          <span className="text-gray-400 block text-[10px] uppercase font-bold">Savings</span>
                          <span className="font-extrabold text-emerald-600">
                            {Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100))}% Smaller
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-400 italic">Current blog thumbnail loaded from storage.</p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 border-t space-y-3">
            <h3 className="font-semibold text-gray-800">SEO Settings (Optional)</h3>
            <input
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder="SEO Meta Title"
              className="w-full border p-3 rounded-xl"
            />
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="SEO Meta Description"
              rows={3}
              className="w-full border p-3 rounded-xl"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#00badb] text-white py-3.5 rounded-xl font-bold hover:bg-[#009ab5] transition disabled:opacity-50"
          >
            {submitting ? "Saving..." : editingBlog ? "Update Blog" : "Save Blog"}
          </button>
        </form>
      </div>
    </div>
  );
}
