// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { axiosInstance } from '../../config/axiosInstance';
import { formatDistanceToNow } from 'date-fns';
const App = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch posts on component mount
  useEffect(() => {
  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get('/tour/getall');
      console.log(response);

      // Use actual posts with real images from backend
      const postsWithImages = response.data.posts.map(post => ({
        ...post,
        images: post.images || [] // fallback to empty array if no images
      }));

      setPosts(postsWithImages);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchPosts();
}, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Travel Blog Manager</h1>
          <p className="text-gray-600">Create, view, and manage your travel posts</p>
        </header>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="flex border-b">
            <button
              className={`flex-1 py-4 px-6 font-medium ${activeTab === 'create' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
              onClick={() => setActiveTab('create')}
            >
              Create Post
            </button>
            <button
              className={`flex-1 py-4 px-6 font-medium ${activeTab === 'view' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
              onClick={() => setActiveTab('view')}
            >
              View Posts
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'create' ? (
              <CreatePostForm setActiveTab={setActiveTab} setPosts={setPosts} />
            ) : (
              <PostGallery 
                posts={posts} 
                setPosts={setPosts} 
                isLoading={isLoading} 
              />
            )}
          </div>
        </div>

        <footer className="text-center text-gray-500 text-sm">
          <p>© 2023 Travel Blog Manager | Created with React and Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
};

// Create Post Form Component
const CreatePostForm = ({ setActiveTab, setPosts }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    images: []
  });
  const [previewUrls, setPreviewUrls] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Create preview URLs
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
    
    // Update form data
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const removeImage = (index) => {
    const newImages = [...formData.images];
    const newPreviews = [...previewUrls];
    
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setFormData(prev => ({ ...prev, images: newImages }));
    setPreviewUrls(newPreviews);
  };



const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setMessage({ type: '', content: '' });

  try {
    // Prepare form data to send to backend
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);

    // Append each image file to formData
    formData.images.forEach((image) => {
      formDataToSend.append('images', image); // Backend should accept multiple files as 'images'
    });

    // Send to backend
    const response = await axiosInstance.post('/tour/create', formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true // optional: include cookies if your backend requires it
    });

    const newPost = response.data;

    // Update posts state
    setPosts(prev => [newPost, ...prev]);

    setMessage({
      type: 'success',
      content: 'Post created successfully! Redirecting to gallery...'
    });

    // Reset form
    setFormData({ title: '', description: '', images: [] });
    setPreviewUrls([]);

    // Switch to view tab after 2 seconds
    setTimeout(() => setActiveTab('view'), 2000);

  } catch (error) {
    console.error('Error creating post:', error);
    setMessage({
      type: 'error',
      content: 'Failed to create post. Please try again.'
    });
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Travel Post</h2>
        <p className="text-gray-600 mb-6">Share your travel experiences with the world</p>
      </div>

      {message.content && (
        <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {message.content}
        </div>
      )}

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="title">
          Post Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Amazing Trip to Mountains"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Share your travel experience..."
          value={formData.description}
          onChange={handleInputChange}
          rows="5"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div className="mb-8">
        <label className="block text-gray-700 font-medium mb-2">
          Upload Images (Max 6)
        </label>
        
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, GIF (MAX. 10MB each)</p>
            </div>
            <input 
              type="file" 
              multiple 
              accept="image/*" 
              onChange={handleImageChange} 
              className="hidden" 
              disabled={formData.images.length >= 4}
            />
          </label>
        </div>
        
        {/* Image Previews */}
        <div className="mt-6">
          <h3 className="text-gray-700 font-medium mb-3">Selected Images:</h3>
          <div className="flex flex-wrap gap-4">
            {previewUrls.map((url, index) => (
              <div key={index} className="relative group">
                <img 
                  src={url} 
                  alt={`Preview ${index}`} 
                  className="w-32 h-32 object-cover rounded-lg border shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setActiveTab('view')}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          View All Posts
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-8 py-3 rounded-lg text-white font-medium ${
            isSubmitting 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating...
            </span>
          ) : (
            'Create Post'
          )}
        </button>
      </div>
    </form>
  );
};

// Post Gallery Component
const PostGallery = ({ posts, setPosts, isLoading }) => {
  const [deleteConfirm, setDeleteConfirm] = useState(null);

console.log("df",posts);


const handleDelete = async (postId) => {
  try {
    const response = await axiosInstance.delete(`/tour/delete/${postId}`); // Adjust endpoint as needed

    if (response.status === 200) {
      // Remove deleted post from state
      setPosts(prev => prev.filter(post => post._id !== postId)); // or post.id if that's your key
      setDeleteConfirm(null);
    }
  } catch (error) {
    console.error("Failed to delete post:", error);
    setDeleteConfirm(null);
  }
};

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4" />
        <h3 className="text-xl font-medium text-gray-700 mb-2">No posts yet</h3>
        <p className="text-gray-500 mb-6">Create your first travel post to get started</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Travel Posts</h2>
          <p className="text-gray-600">Browse all your travel experiences</p>
        </div>
        <div className="text-gray-500">
          Showing {posts.length} {posts.length === 1 ? 'post' : 'posts'}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map(post => (
          <div key={post.id} className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative">
              {/* Image gallery */}
              <div className="h-48 overflow-hidden">
                {post.images && post.images.length > 0 ? (
                  <img 
                    src={post.images[0]} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
              </div>
              
              <div className="absolute top-4 right-4 flex gap-2">
                <button 
                  onClick={() => setDeleteConfirm(post.id)}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
              
              {/* Delete confirmation */}
              {deleteConfirm === post.id && (
                <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4">
                  <div className="bg-white rounded-lg p-6 max-w-sm">
                    <h3 className="font-bold text-lg mb-2">Confirm Delete</h3>
                    <p className="text-gray-600 mb-4">Are you sure you want to delete this post? This action cannot be undone.</p>
                    <div className="flex justify-end gap-3">
                      <button 
                        onClick={() => setDeleteConfirm(null)}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={() => handleDelete(post._id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-5">
              <h3 className="font-bold text-xl text-gray-800 mb-2 line-clamp-1">{post.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{post.body || post.description}</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8" />
                  <span className="ml-2 text-sm text-gray-500">Posted by You</span>
                </div>
               <span className="text-sm text-gray-500">
  {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
</span>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;