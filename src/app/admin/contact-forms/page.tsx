'use client';
import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface ContactFormSubmission {
  _id: string;
  fullName: string;
  email: string;
  phone?: string;
  product?: string;
  message: string;
  createdAt: string;
}

export default function AdminContactForms() {
  const [submissions, setSubmissions] = useState<ContactFormSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSubmissions = async () => {
    try {
      const res = await fetch('/api/contact-form');
      const data = await res.json();
      if (data.success) setSubmissions(data.submissions || []);
    } catch (error) {
      toast.error('Failed to load submissions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;

    try {
      const res = await fetch(`/api/contact-form?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (data.success) {
        toast.success('Submission deleted');
        setSubmissions((prev) => prev.filter((item) => item._id !== id));
      } else {
        toast.error(data.message || 'Failed to delete');
      }
    } catch (error) {
      toast.error('Failed to delete submission');
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto font-quicksand">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-black text-[#2D3436]">
            Contact Form Submissions
          </h1>
          <p className="text-sm font-semibold text-gray-500 mt-1">
            View all incoming inquiries from the contact form
          </p>
        </div>
        <span className="bg-[#00C4B5]/10 text-[#00C4B5] border-2 border-[#2D3436] text-xs font-black px-4 py-1.5 rounded-full shadow-[2px_2px_0px_0px_#2D3436]">
          Total: {submissions.length}
        </span>
      </div>

      {loading ? (
        <div className="bg-white border-2 border-[#2D3436] p-8 rounded-2xl text-center text-gray-500 font-bold shadow-[4px_4px_0px_0px_#2D3436]">
          Loading submissions...
        </div>
      ) : submissions.length === 0 ? (
        <div className="bg-white border-2 border-[#2D3436] p-8 rounded-2xl text-center text-gray-500 font-bold shadow-[4px_4px_0px_0px_#2D3436]">
          No submissions received yet.
        </div>
      ) : (
        <div className="space-y-4">
          {submissions.map((item, index) => (
            <div
              key={item._id}
              className="bg-white border-2 border-[#2D3436] p-6 rounded-2xl shadow-[4px_4px_0px_0px_#2D3436]"
            >
              <div className="flex justify-between items-start flex-wrap gap-2 mb-3">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-xl bg-[#2D3436] text-white text-xs font-black flex items-center justify-center border-2 border-[#2D3436] shadow-[2px_2px_0px_0px_#2D3436] shrink-0">
                      {index + 1}
                    </span>
                    <h2 className="text-xl font-black text-[#2D3436]">{item.fullName}</h2>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-bold text-gray-600 mt-2 flex-wrap">
                    <span>📧 {item.email}</span>
                    {item.phone && <span>📞 {item.phone}</span>}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {item.product && (
                    <span className="bg-[#EAF8F9] text-[#00C4B5] border-2 border-[#2D3436] text-xs font-black px-3 py-1 rounded-full shadow-[2px_2px_0px_0px_#2D3436]">
                      📦 Product: {item.product}
                    </span>
                  )}
                  <button
                    onClick={() => handleDelete(item._id)}
                    title="Delete Submission"
                    className="p-2 text-red-500 hover:text-white hover:bg-red-500 border-2 border-[#2D3436] rounded-xl shadow-[2px_2px_0px_0px_#2D3436] transition-all cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="bg-[#EAF8F9]/50 border-2 border-[#2D3436]/20 p-4 rounded-xl mt-3">
                <p className="text-xs font-black text-[#2D3436] uppercase tracking-wider mb-1">
                  Message:
                </p>
                <p className="text-sm font-semibold text-[#2D3436] whitespace-pre-wrap leading-relaxed">
                  {item.message}
                </p>
              </div>

              <div className="text-xs font-bold text-gray-400 mt-4 flex items-center gap-1">
                <span>🕒 Submitted on:</span>
                <span>{new Date(item.createdAt).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
