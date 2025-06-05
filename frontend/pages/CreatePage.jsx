import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";

const CreatePage = () => {
  const [media, setMedia] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const navigate = useNavigate();
  const getAI = async () => {
    if (!content.trim()) {
      toast.error("Please type some content first.");
      return;
    }

    setAiLoading(true);

    try {
      const res = await api.post("/notes/predict", { prompt: content });
      const suggestion = res.data.suggestion;
      setContent((prev) => prev + " " + suggestion);
      toast.success("AI suggestion added!");
    } catch (error) {
      console.error("AI error:", error);
      if (error.response?.status === 429) {
        toast.error("OpenAI rate limit exceeded. Please try again later.");
      }
      toast.error("Failed to get AI suggestion");
    } finally {
      setAiLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (media) formData.append("media", media);
    setLoading(true);
    try {
      await api.post("/notes", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Note created with media");
      navigate("/");
    } catch (error) {
      console.log("Error creating note", error);
      if (error.response.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon aria-label="back to homepage" className="size-5" />
            Back to Notes
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              <form onSubmit={handleSubmit} aria-label="Create Note Form">
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered h-32"
                    value={content}
                    aria-required="true"
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                  <button
                    type="button"
                    className="btn border-t-cyan-300"
                    disabled={aiLoading}
                    onClick={getAI}
                  >
                    {aiLoading ? "Getting..." : "Get AI Suggestion"}
                  </button>
                </div>
                <div className="form-control mb-4 mt-2">
                  <label className="label">
                    <span className="label-text">Upload Image/Video</span>
                  </label>
                  <input
                    type="file"
                    className="file-input file-input-bordered"
                    accept="image/*,video/*"
                    onChange={(e) => setMedia(e.target.files[0])}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreatePage;
