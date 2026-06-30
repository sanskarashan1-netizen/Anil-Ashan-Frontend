import { useState, useEffect, useRef } from 'react';
import { 
  Search, Clock, MapPin, Phone, Package, Trash2, Plus, Edit, 
  User, FileText, CheckCircle2, Lock, LogOut, Home, Building2, 
  UploadCloud, Clipboard, Check 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = 'http://localhost:5000/api';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('inquiries'); // 'inquiries', 'listings', or 'videos'
  const [inquiries, setInquiries] = useState([]);
  const [listings, setListings] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('admin_token');
  });
  const [username, setUsername] = useState('anil ashan');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Video URL Input States
  const [showcaseInput, setShowcaseInput] = useState('');
  const [walkthroughInput, setWalkthroughInput] = useState('');
  const [showVideoPasteModal, setShowVideoPasteModal] = useState(false);
  const [pastedVideoFile, setPastedVideoFile] = useState(null);
  const [pastedVideoUrl, setPastedVideoUrl] = useState('');

  // Gallery URL & Image States
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryShowcase, setGalleryShowcase] = useState('');
  const [showGalleryPasteModal, setShowGalleryPasteModal] = useState(false);
  const [pastedGalleryFile, setPastedGalleryFile] = useState(null);
  const [pastedGalleryUrl, setPastedGalleryUrl] = useState('');

  // Listing Form States (for Add/Edit Modal)
  const [showListingModal, setShowListingModal] = useState(false);
  const [editingListing, setEditingListing] = useState(null);
  const [listingTitle, setListingTitle] = useState('');
  const [listingPrice, setListingPrice] = useState('');
  const [listingLocation, setListingLocation] = useState('');
  const [listingArea, setListingArea] = useState('');
  const [listingType, setListingType] = useState('');
  const [listingDescription, setListingDescription] = useState('');
  const [listingImage, setListingImage] = useState(''); // holds base64 or URL
  const [listingStatus, setListingStatus] = useState('Available');
  const [selectedFile, setSelectedFile] = useState(null);

  // Add/Edit Video Modal States
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [selectedVideoFile, setSelectedVideoFile] = useState(null);

  const fileRef = useRef(null);

  const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
  });

  const fetchInquiries = async () => {
    try {
      const res = await fetch(`${API_URL}/inquiries`, { headers: getHeaders() });
      if (res.ok) {
        const data = await res.json();
        setInquiries(data);
      } else if (res.status === 401) {
        logout();
      }
    } catch (err) {
      console.error("Failed to fetch inquiries:", err);
    } finally {
      if (activeTab === 'inquiries') setLoading(false);
    }
  };

  const fetchListings = async () => {
    try {
      const res = await fetch(`${API_URL}/listings`);
      if (res.ok) {
        const data = await res.json();
        setListings(data);
      }
    } catch (err) {
      console.error("Failed to fetch listings:", err);
    } finally {
      if (activeTab === 'listings') setLoading(false);
    }
  };

  const fetchVideos = async () => {
    try {
      const res = await fetch(`${API_URL}/videos`);
      if (res.ok) {
        const data = await res.json();
        setVideos(data);
      }
    } catch (err) {
      console.error("Failed to fetch videos:", err);
    } finally {
      if (activeTab === 'videos') setLoading(false);
    }
  };

  const fetchGallery = async () => {
    try {
      const res = await fetch(`${API_URL}/gallery`);
      if (res.ok) {
        const data = await res.json();
        setGalleryImages(data.images || []);
        setGalleryShowcase(data.showcaseImg || '');
      }
    } catch (err) {
      console.error("Failed to fetch gallery:", err);
    } finally {
      if (activeTab === 'gallery') setLoading(false);
    }
  };

  useEffect(() => {
    if (videos.length > 0) {
      const showObj = videos.find(v => v.key === 'showcase');
      const walkObj = videos.find(v => v.key === 'walkthrough');
      if (showObj) setShowcaseInput(showObj.url);
      if (walkObj) setWalkthroughInput(walkObj.url);
    }
  }, [videos]);

  useEffect(() => {
    if (isAuthenticated) {
      setLoading(true);
      Promise.all([fetchInquiries(), fetchListings(), fetchVideos(), fetchGallery()]).finally(() => setLoading(false));

      // Auto-refresh every 5 seconds for real-time updates (leads and properties)
      const interval = setInterval(() => {
        fetchInquiries();
        fetchListings();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('admin_token', data.token);
        setIsAuthenticated(true);
        setError('');
      } else {
        setError(data.message || 'Invalid username or password');
      }
    } catch (err) {
      setError('Failed to connect to backend server');
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
    setUsername('anil ashan');
    setPassword('');
  };

  const handleInquiryDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      try {
        const res = await fetch(`${API_URL}/inquiries/${id}`, {
          method: 'DELETE',
          headers: getHeaders()
        });
        if (res.ok) {
          setInquiries(inquiries.filter(item => item._id !== id));
        }
      } catch (err) {
        console.error("Failed to delete inquiry:", err);
      }
    }
  };

  const handleClearAllInquiries = async () => {
    if (window.confirm("Are you sure you want to delete ALL inquiries? This cannot be undone!")) {
      try {
        const res = await fetch(`${API_URL}/inquiries`, {
          method: 'DELETE',
          headers: getHeaders()
        });
        if (res.ok) {
          setInquiries([]);
        }
      } catch (err) {
        console.error("Failed to clear inquiries:", err);
      }
    }
  };

  const openAddListingModal = () => {
    setEditingListing(null);
    setListingTitle('');
    setListingPrice('');
    setListingLocation('');
    setListingArea('');
    setListingType('');
    setListingDescription('');
    setListingImage('');
    setListingStatus('Available');
    setSelectedFile(null);
    setShowListingModal(true);
  };

  const openEditListingModal = (listing) => {
    setEditingListing(listing);
    setListingTitle(listing.title);
    setListingPrice(listing.price);
    setListingLocation(listing.location || '');
    setListingArea(listing.area || '');
    setListingType(listing.type || '');
    setListingDescription(listing.description || '');
    setListingImage(listing.imageUrl || '');
    setListingStatus(listing.status || 'Available');
    setSelectedFile(null);
    setShowListingModal(true);
  };

  // Converts Base64 dataURL to standard File Object for backend upload
  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[arr.length - 1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const handleListingSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalImageUrl = listingImage;

      // Handle image upload to backend if file/pasted-base64 is available
      let fileToUpload = selectedFile;
      if (!fileToUpload && listingImage.startsWith('data:image/')) {
        fileToUpload = dataURLtoFile(listingImage, 'pasted-image.png');
      }

      if (fileToUpload) {
        const formData = new FormData();
        formData.append('image', fileToUpload);

        const uploadRes = await fetch(`${API_URL}/upload`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
          },
          body: formData,
        });

        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          finalImageUrl = uploadData.imageUrl;
        } else {
          alert('Image upload failed, using fallback or empty image');
        }
      } else if (listingImage && listingImage.startsWith('http') && !listingImage.includes('cloudinary.com')) {
        // Upload pasted external image link to Cloudinary on submit
        try {
          const uploadRes = await fetch(`${API_URL}/upload`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
            },
            body: JSON.stringify({ imageUrl: listingImage })
          });
          if (uploadRes.ok) {
            const uploadData = await uploadRes.json();
            finalImageUrl = uploadData.imageUrl;
          }
        } catch (err) {
          console.error("Error uploading pasted listing image link:", err);
        }
      }

      const payload = {
        title: listingTitle,
        price: listingPrice,
        location: listingLocation,
        area: listingArea,
        type: listingType,
        description: listingDescription,
        imageUrl: finalImageUrl,
        status: listingStatus
      };

      let response;
      if (editingListing) {
        response = await fetch(`${API_URL}/listings/${editingListing._id}`, {
          method: 'PUT',
          headers: getHeaders(),
          body: JSON.stringify(payload)
        });
      } else {
        response = await fetch(`${API_URL}/listings`, {
          method: 'POST',
          headers: getHeaders(),
          body: JSON.stringify(payload)
        });
      }

      if (response.ok) {
        const savedListing = await response.json();
        if (editingListing) {
          setListings(listings.map(l => l._id === editingListing._id ? savedListing : l));
        } else {
          setListings([savedListing, ...listings]);
        }
        setShowListingModal(false);
      } else {
        const errData = await response.json();
        alert(`Error: ${errData.message || 'Failed to save listing'}`);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to connect to backend');
    } finally {
      setLoading(false);
    }
  };

  const handleListingDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        const res = await fetch(`${API_URL}/listings/${id}`, {
          method: 'DELETE',
          headers: getHeaders()
        });
        if (res.ok) {
          setListings(listings.filter(l => l._id !== id));
        } else {
          alert('Failed to delete property.');
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const nextStatus = currentStatus === 'Available' ? 'Sold' : 'Available';
      const res = await fetch(`${API_URL}/listings/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ status: nextStatus }),
      });
      if (res.ok) {
        setListings(listings.map(l => l._id === id ? { ...l, status: nextStatus } : l));
      } else {
        alert('Failed to update status');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveVideo = async (key, url) => {
    try {
      const res = await fetch(`${API_URL}/videos/${key}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ url })
      });
      if (res.ok) {
        alert('Video updated successfully!');
        fetchVideos();
      } else {
        alert('Failed to update video.');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating video.');
    }
  };

  const handleVideoUpload = async (key, file) => {
    if (!file) return;
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        },
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (key === 'showcase') {
          setShowcaseInput(data.imageUrl);
          await handleSaveVideo('showcase', data.imageUrl);
        } else {
          setWalkthroughInput(data.imageUrl);
          await handleSaveVideo('walkthrough', data.imageUrl);
        }
      } else {
        const errorData = await res.json();
        alert(`Upload failed: ${errorData.message}`);
      }
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const openAddVideoModal = () => {
    setEditingVideo(null);
    setVideoTitle('');
    setVideoUrl('');
    setSelectedVideoFile(null);
    setShowVideoModal(true);
  };

  const openEditVideoModal = (video) => {
    setEditingVideo(video);
    setVideoTitle(video.title);
    setVideoUrl(video.url);
    setSelectedVideoFile(null);
    setShowVideoModal(true);
  };

  const handleVideoSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalUrl = videoUrl;

      if (selectedVideoFile) {
        const formData = new FormData();
        formData.append('image', selectedVideoFile);

        const uploadRes = await fetch(`${API_URL}/upload`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
          },
          body: formData,
        });

        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          finalUrl = uploadData.imageUrl;
        } else {
          alert('Video upload failed');
          setLoading(false);
          return;
        }
      }

      const payload = {
        title: videoTitle,
        url: finalUrl
      };

      let response;
      if (editingVideo) {
        response = await fetch(`${API_URL}/videos/${editingVideo.key}`, {
          method: 'PUT',
          headers: getHeaders(),
          body: JSON.stringify(payload)
        });
      } else {
        response = await fetch(`${API_URL}/videos`, {
          method: 'POST',
          headers: getHeaders(),
          body: JSON.stringify(payload)
        });
      }

      if (response.ok) {
        setShowVideoModal(false);
        fetchVideos();
        alert('Video saved successfully!');
      } else {
        const errData = await response.json();
        alert(`Error: ${errData.message || 'Failed to save video'}`);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to connect to backend');
    } finally {
      setLoading(false);
    }
  };

  const handleVideoDelete = async (id, key) => {
    if (key === 'showcase' || key === 'walkthrough') {
      alert('Cannot delete default showcase or walkthrough videos.');
      return;
    }
    if (window.confirm("Are you sure you want to delete this walkthrough video?")) {
      try {
        const res = await fetch(`${API_URL}/videos/${id}`, {
          method: 'DELETE',
          headers: getHeaders()
        });
        if (res.ok) {
          fetchVideos();
        } else {
          alert('Failed to delete video.');
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleVideoModalPaste = (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('video') !== -1) {
        const file = items[i].getAsFile();
        setSelectedVideoFile(file);
        setVideoUrl('');
        e.preventDefault();
        return;
      }
    }
    const text = e.clipboardData.getData('text');
    if (text && (text.startsWith('http') || text.startsWith('/') || text.endsWith('.mp4') || text.endsWith('.webm') || text.endsWith('.mov') || text.includes('youtube.com') || text.includes('youtu.be'))) {
      setVideoUrl(text);
      setSelectedVideoFile(null);
      e.preventDefault();
    }
  };

  const handleSaveGallery = async (updatedImages, updatedShowcase) => {
    try {
      const res = await fetch(`${API_URL}/gallery`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({
          images: updatedImages,
          showcaseImg: updatedShowcase
        })
      });
      if (res.ok) {
        const data = await res.json();
        setGalleryImages(data.images);
        setGalleryShowcase(data.showcaseImg);
        alert('Gallery updated successfully!');
      } else {
        alert('Failed to update gallery.');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving gallery.');
    }
  };

  const handleGalleryImageUpload = async (index, file) => {
    if (!file) return;
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        },
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (index === 'showcase') {
          await handleSaveGallery(galleryImages, data.imageUrl);
        } else {
          const newImages = [...galleryImages];
          newImages[index] = data.imageUrl;
          await handleSaveGallery(newImages, galleryShowcase);
        }
      } else {
        alert('Upload failed.');
      }
    } catch (err) {
      console.error(err);
      alert('Upload failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleGalleryUrlSave = async (index, url) => {
    let finalUrl = url;

    // Upload external link to Cloudinary if it doesn't already belong to Cloudinary
    if (url && url.startsWith('http') && !url.includes('cloudinary.com')) {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/upload`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
          },
          body: JSON.stringify({ imageUrl: url })
        });
        if (res.ok) {
          const data = await res.json();
          finalUrl = data.imageUrl;
        } else {
          console.warn("Cloudinary link upload failed, saving raw URL.");
        }
      } catch (err) {
        console.error("Error uploading pasted gallery image link:", err);
      } finally {
        setLoading(false);
      }
    }

    if (index === 'showcase') {
      await handleSaveGallery(galleryImages, finalUrl);
    } else {
      const newImages = [...galleryImages];
      newImages[index] = finalUrl;
      await handleSaveGallery(newImages, galleryShowcase);
    }
  };

  // Image Drag & Drop / Paste utilities
  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setListingImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const handleGlobalPaste = (e) => {
      // Check if user is authenticated first
      if (!isAuthenticated) return;

      const items = e.clipboardData?.items;
      if (!items) return;

      if (activeTab === 'videos') {
        // Handle pasted video files
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf('video') !== -1) {
            const file = items[i].getAsFile();
            setPastedVideoFile(file);
            setPastedVideoUrl('');
            setShowVideoPasteModal(true);
            e.preventDefault();
            return;
          }
        }

        // Handle pasted text (like a video link/URL)
        const text = e.clipboardData.getData('text');
        if (text && (text.startsWith('http') || text.startsWith('/') || text.endsWith('.mp4') || text.endsWith('.webm') || text.endsWith('.mov') || text.includes('youtube.com') || text.includes('youtu.be'))) {
          setPastedVideoUrl(text);
          setPastedVideoFile(null);
          setShowVideoPasteModal(true);
          e.preventDefault();
          return;
        }
        
        return;
      }

      if (activeTab === 'gallery') {
        // Handle pasted images for gallery (files)
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf('image') !== -1) {
            const file = items[i].getAsFile();
            setPastedGalleryFile(file);
            setPastedGalleryUrl('');
            setShowGalleryPasteModal(true);
            e.preventDefault();
            return;
          }
        }

        // Handle pasted image links (URLs)
        const text = e.clipboardData.getData('text');
        if (text && (text.startsWith('http') || text.startsWith('/') || text.endsWith('.png') || text.endsWith('.jpg') || text.endsWith('.jpeg') || text.endsWith('.webp') || text.endsWith('.gif'))) {
          setPastedGalleryUrl(text);
          setPastedGalleryFile(null);
          setShowGalleryPasteModal(true);
          e.preventDefault();
          return;
        }

        return;
      }

      // Handle pasted listing images
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          setSelectedFile(file);
          const reader = new FileReader();
          reader.onload = (event) => {
            setListingImage(event.target.result);
          };
          reader.readAsDataURL(file);

          // If the modal isn't open yet, initialize it as a new property and open it!
          if (!showListingModal) {
            setEditingListing(null);
            setListingTitle('');
            setListingPrice('');
            setListingLocation('');
            setListingArea('');
            setListingType('');
            setListingDescription('');
            setListingStatus('Available');
            setShowListingModal(true);
          }

          e.preventDefault();
          return;
        }
      }
    };

    window.addEventListener('paste', handleGlobalPaste);
    return () => {
      window.removeEventListener('paste', handleGlobalPaste);
    };
  }, [isAuthenticated, showListingModal, activeTab]);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setListingImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getImgUrl = (url) => {
    if (!url) return '';
    return url.startsWith('data:') || url.startsWith('http') ? url : `${API_URL.replace('/api', '')}${url}`;
  };

  // Real-time search filters
  const filteredInquiries = inquiries.filter(item => {
    const q = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.phone.includes(q) ||
      (item.message && item.message.toLowerCase().includes(q))
    );
  });

  const filteredListings = listings.filter(item => {
    const q = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      (item.location && item.location.toLowerCase().includes(q)) ||
      (item.type && item.type.toLowerCase().includes(q))
    );
  });

  // Login page layout
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020408] flex items-center justify-center p-4 font-sans selection:bg-[#c9a84c] selection:text-[#020408]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#060d1a] border border-[#c9a84c]/20 shadow-2xl rounded-3xl p-8 max-w-md w-full relative overflow-hidden"
        >
          {/* Glowing radial backdrops */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#c9a84c]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#a07830]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center mb-8 relative z-10">
            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#a07830] to-[#e8c97a] flex items-center justify-center mx-auto mb-4 text-luxury-black font-heading font-bold text-2xl"
              style={{ color: '#020408' }}
            >
              A
            </motion.div>
            <h2 className="text-2xl font-heading font-bold text-[#f5f0e8] tracking-wide">Anil Ashan CMS</h2>
            <p className="text-[#8a8070] text-sm mt-1 uppercase tracking-widest text-[10px]">Real Estate Control Center</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#8a8070] tracking-wider uppercase">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#020408] border border-[#c9a84c]/20 rounded-xl px-4 py-3 text-[#f5f0e8] placeholder:text-[#8a8070]/30 focus:outline-none focus:border-[#c9a84c] transition-colors font-medium text-sm"
                placeholder="Enter admin username"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#8a8070] tracking-wider uppercase">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#020408] border border-[#c9a84c]/20 rounded-xl px-4 py-3 text-[#f5f0e8] placeholder:text-[#8a8070]/30 focus:outline-none focus:border-[#c9a84c] transition-colors font-medium text-sm"
                placeholder="Enter password"
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-[#a07830] via-[#c9a84c] to-[#a07830] text-[#020408] font-bold py-3.5 px-6 rounded-xl shadow-lg hover:shadow-[#c9a84c]/20 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest"
            >
              Sign In to CMS
            </motion.button>
          </form>
        </motion.div>
      </div>
    );
  }

  // Dashboard CMS view
  return (
    <div className="min-h-screen bg-[#020408] p-6 md:p-10 font-sans text-[#f5f0e8] selection:bg-[#c9a84c] selection:text-[#020408]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#a07830] to-[#e8c97a] flex items-center justify-center text-luxury-black font-heading font-bold text-xl shadow-lg border border-[#c9a84c]/30" style={{ color: '#020408' }}>
              A
            </div>
            <div>
              <h1 className="text-3xl font-heading font-bold text-[#f5f0e8] tracking-wide">Anil Ashan CMS</h1>
              <p className="text-[#8a8070] text-sm">Control listings and view real estate leads / contact forms.</p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500/10 hover:bg-red-500/25 text-red-400 rounded-xl text-xs font-semibold tracking-widest uppercase transition-colors border border-red-500/20 flex items-center gap-1.5"
            >
              <LogOut size={13} /> Sign Out
            </button>
            
            {activeTab === 'inquiries' ? (
              <>
                <div className="bg-[#060d1a] border border-[#c9a84c]/10 shadow-2xl rounded-2xl px-5 py-2.5 flex items-center gap-4">
                  <User className="text-[#c9a84c]" size={20} />
                  <div>
                    <p className="text-[9px] text-[#8a8070] font-semibold uppercase tracking-widest">Leads</p>
                    <p className="text-lg font-bold text-[#f5f0e8]">{inquiries.length}</p>
                  </div>
                </div>
                <button
                  onClick={handleClearAllInquiries}
                  disabled={inquiries.length === 0}
                  className="px-4 py-3 bg-red-500/15 border border-red-500/35 hover:bg-red-500/30 text-red-400 font-semibold text-xs tracking-wider uppercase rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Clear All Leads
                </button>
              </>
            ) : activeTab === 'listings' ? (
              <>
                <div className="bg-[#060d1a] border border-[#c9a84c]/10 shadow-2xl rounded-2xl px-5 py-2.5 flex items-center gap-4">
                  <Building2 className="text-[#c9a84c]" size={20} />
                  <div>
                    <p className="text-[9px] text-[#8a8070] font-semibold uppercase tracking-widest">Total</p>
                    <p className="text-lg font-bold text-[#f5f0e8]">{listings.length}</p>
                  </div>
                </div>
                <div className="bg-[#060d1a] border border-[#c9a84c]/10 shadow-2xl rounded-2xl px-5 py-2.5 flex items-center gap-4">
                  <CheckCircle2 className="text-green-400" size={20} />
                  <div>
                    <p className="text-[9px] text-[#8a8070] font-semibold uppercase tracking-widest">Active</p>
                    <p className="text-lg font-bold text-[#f5f0e8]">{listings.filter(l => l.status === 'Available').length}</p>
                  </div>
                </div>
                <button
                  onClick={openAddListingModal}
                  className="bg-gradient-to-r from-[#a07830] via-[#c9a84c] to-[#a07830] hover:shadow-[#c9a84c]/10 hover:shadow-lg text-[#020408] font-bold py-3.5 px-6 rounded-xl transition-all flex items-center gap-2 text-xs uppercase tracking-widest"
                >
                  <Plus size={14} /> Add Property
                </button>
              </>
            ) : activeTab === 'videos' ? (
              <>
                <div className="bg-[#060d1a] border border-[#c9a84c]/10 shadow-2xl rounded-2xl px-5 py-2.5 flex items-center gap-4">
                  <span className="text-xl">📹</span>
                  <div>
                    <p className="text-[9px] text-[#8a8070] font-semibold uppercase tracking-widest">Total Videos</p>
                    <p className="text-lg font-bold text-[#f5f0e8]">{videos.length}</p>
                  </div>
                </div>
                <button
                  onClick={openAddVideoModal}
                  className="bg-gradient-to-r from-[#a07830] via-[#c9a84c] to-[#a07830] hover:shadow-[#c9a84c]/10 hover:shadow-lg text-[#020408] font-bold py-3.5 px-6 rounded-xl transition-all flex items-center gap-2 text-xs uppercase tracking-widest"
                >
                  <Plus size={14} /> Add Video
                </button>
              </>
            ) : (
              <>
                <div className="bg-[#060d1a] border border-[#c9a84c]/10 shadow-2xl rounded-2xl px-5 py-2.5 flex items-center gap-4">
                  <span className="text-xl">🖼️</span>
                  <div>
                    <p className="text-[9px] text-[#8a8070] font-semibold uppercase tracking-widest">Gallery Images</p>
                    <p className="text-lg font-bold text-[#f5f0e8]">{galleryImages.length + 1}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Tab Selector & Search bar */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 border-b border-[#c9a84c]/10 pb-4 mb-8">
          <div className="flex gap-2">
            <button
              onClick={() => { setActiveTab('inquiries'); setSearchQuery(''); }}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-all ${activeTab === 'inquiries' ? 'bg-[#c9a84c]/12 text-[#c9a84c] border border-[#c9a84c]/30 shadow-md' : 'text-[#8a8070] hover:text-[#f5f0e8] border border-transparent'}`}
            >
              Customer Leads ({inquiries.length})
            </button>
            <button
              onClick={() => { setActiveTab('listings'); setSearchQuery(''); }}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-all ${activeTab === 'listings' ? 'bg-[#c9a84c]/12 text-[#c9a84c] border border-[#c9a84c]/30 shadow-md' : 'text-[#8a8070] hover:text-[#f5f0e8] border border-transparent'}`}
            >
              Property Listings ({listings.length})
            </button>
            <button
              onClick={() => { setActiveTab('videos'); setSearchQuery(''); }}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-all ${activeTab === 'videos' ? 'bg-[#c9a84c]/12 text-[#c9a84c] border border-[#c9a84c]/30 shadow-md' : 'text-[#8a8070] hover:text-[#f5f0e8] border border-transparent'}`}
            >
              Walkthrough Videos ({videos.length})
            </button>
            <button
              onClick={() => { setActiveTab('gallery'); setSearchQuery(''); }}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-all ${activeTab === 'gallery' ? 'bg-[#c9a84c]/12 text-[#c9a84c] border border-[#c9a84c]/30 shadow-md' : 'text-[#8a8070] hover:text-[#f5f0e8] border border-transparent'}`}
            >
              Gallery Photos ({galleryImages.length + 1})
            </button>
          </div>
          
          <div className="relative md:max-w-xs w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8a8070]" size={16} />
            <input
              type="text"
              placeholder={activeTab === 'inquiries' ? "Search leads..." : activeTab === 'listings' ? "Search properties..." : activeTab === 'videos' ? "Search videos..." : "Search gallery..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#060d1a] border border-[#c9a84c]/15 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#f5f0e8] placeholder:text-[#8a8070]/30 focus:outline-none focus:border-[#c9a84c] transition-colors"
            />
          </div>
        </div>

        {/* Main Content Area */}
        {loading ? (
          <div className="p-16 text-center text-[#8a8070] bg-[#060d1a] rounded-3xl border border-[#c9a84c]/10 shadow-2xl">
            Connecting to database...
          </div>
        ) : activeTab === 'inquiries' ? (
          
          /* Leads List */
          <div className="bg-[#060d1a] rounded-3xl border border-[#c9a84c]/10 shadow-2xl overflow-hidden">
            {filteredInquiries.length === 0 ? (
              <div className="p-16 text-center text-[#8a8070]">
                <FileText size={48} className="mx-auto mb-4 opacity-30 text-[#c9a84c]" />
                <p className="font-heading text-lg font-semibold text-[#f5f0e8]">No Inquiries Found</p>
                <p className="text-xs font-light mt-1">Leads from the contact form will show up here automatically.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#020408]/60 text-[#8a8070] border-b border-[#c9a84c]/10">
                      <th className="p-5 font-medium text-xs uppercase tracking-widest">Leads Details</th>
                      <th className="p-5 font-medium text-xs uppercase tracking-widest">Contact Number</th>
                      <th className="p-5 font-medium text-xs uppercase tracking-widest">Message Left</th>
                      <th className="p-5 font-medium text-xs uppercase tracking-widest">Received Date</th>
                      <th className="p-5 font-medium text-xs uppercase tracking-widest text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#c9a84c]/10">
                    {filteredInquiries.map((item) => (
                      <motion.tr 
                        key={item._id} 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-[#020408]/30 transition-colors group"
                      >
                        <td className="p-5">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/20 flex items-center justify-center text-[#c9a84c]">
                              <User size={14} />
                            </div>
                            <div className="font-heading font-bold text-[#f5f0e8] text-sm">{item.name}</div>
                          </div>
                        </td>
                        <td className="p-5 font-mono text-sm text-[#d4cfc6]">
                          <div className="flex items-center gap-2">
                            <Phone size={11} className="text-[#c9a84c]/70" />
                            {item.phone}
                          </div>
                        </td>
                        <td className="p-5 max-w-md">
                          <p className="text-sm font-light text-[#d4cfc6] leading-relaxed break-words whitespace-pre-wrap">
                            {item.message || <span className="italic text-[#8a8070] text-xs">No message provided. Quick callback requested.</span>}
                          </p>
                        </td>
                        <td className="p-5 text-xs text-[#8a8070]">
                          <div className="flex items-center gap-1.5">
                            <Clock size={12} />
                            {item.date || new Date(item.createdAt).toLocaleString('en-IN')}
                          </div>
                        </td>
                        <td className="p-5 text-center">
                          <button 
                            onClick={() => handleInquiryDelete(item._id)}
                            className="p-2 text-[#8a8070] hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                            title="Delete Lead"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : activeTab === 'listings' ? (
          
          /* Property Catalog Grid */
          <div>
            {filteredListings.length === 0 ? (
              <div className="p-16 text-center text-[#8a8070] bg-[#060d1a] rounded-3xl border border-[#c9a84c]/10 shadow-2xl">
                <Home size={48} className="mx-auto mb-4 opacity-30 text-[#c9a84c]" />
                <p className="font-heading text-lg font-semibold text-[#f5f0e8]">No Properties Found</p>
                <p className="text-xs font-light mt-1">Please add a new property listing to see it in your catalog.</p>
                <button
                  onClick={openAddListingModal}
                  className="mt-6 inline-flex items-center gap-2 bg-[#c9a84c]/10 hover:bg-[#c9a84c]/20 border border-[#c9a84c]/30 text-[#c9a84c] font-bold py-2.5 px-5 rounded-xl transition-all shadow-md text-xs uppercase tracking-widest"
                >
                  <Plus size={14} /> Add Property
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredListings.map((l) => (
                  <div key={l._id} className="bg-[#060d1a] border border-[#c9a84c]/15 rounded-3xl shadow-xl overflow-hidden flex flex-col h-full group hover:shadow-[#c9a84c]/5 transition-all">
                    
                    {/* Card Media Preview */}
                    <div className="relative h-44 overflow-hidden bg-[#020408] shrink-0 border-b border-[#c9a84c]/10">
                      {l.imageUrl ? (
                        <img src={getImgUrl(l.imageUrl)} alt={l.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#c9a84c]/3">
                          <Home className="text-[#c9a84c]/20" size={32} />
                        </div>
                      )}
                      
                      {/* Status Badges */}
                      <div className="absolute top-3 left-3">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border ${l.status === 'Sold' ? 'bg-red-500/15 border-red-500/30 text-red-400' : 'bg-green-500/15 border-green-500/30 text-green-400'}`}>
                          {l.status}
                        </span>
                      </div>
                      
                      {/* Price Badge */}
                      <div className="absolute bottom-3 right-3 bg-[#020408]/90 backdrop-blur-sm px-3 py-1 rounded-xl text-xs font-heading font-bold text-[#c9a84c] border border-[#c9a84c]/30">
                        {l.price}
                      </div>
                    </div>
                    
                    {/* Card details */}
                    <div className="p-5 flex flex-col flex-grow justify-between gap-4">
                      <div>
                        <h3 className="text-base font-heading font-bold text-[#f5f0e8] mb-1.5 group-hover:text-[#c9a84c] transition-colors line-clamp-1">{l.title}</h3>
                        <div className="flex flex-col gap-1 mb-2.5 text-xs text-[#8a8070]">
                          {l.location && (
                            <span className="flex items-center gap-1">
                              <MapPin size={11} className="text-[#c9a84c]/70" /> {l.location}
                            </span>
                          )}
                          <div className="flex gap-3 mt-0.5">
                            {l.type && <span>Type: {l.type}</span>}
                            {l.area && <span>Area: {l.area}</span>}
                          </div>
                        </div>
                        <p className="text-[#d4cfc6] text-xs font-light leading-relaxed line-clamp-3 opacity-80">{l.description || 'No description provided.'}</p>
                      </div>
                      
                      {/* Card actions */}
                      <div className="flex gap-2 justify-end border-t border-[#c9a84c]/10 pt-4">
                        <button
                          onClick={() => handleToggleStatus(l._id, l.status)}
                          className={`px-3 py-2 text-[10px] font-bold uppercase tracking-widest rounded-xl border transition-colors ${l.status === 'Available' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400 hover:bg-amber-500/20' : 'bg-green-500/10 border-green-500/20 text-green-400 hover:bg-green-500/20'}`}
                        >
                          Mark {l.status === 'Available' ? 'Sold' : 'Available'}
                        </button>
                        <button
                          onClick={() => openEditListingModal(l)}
                          className="px-3 py-2 bg-[#c9a84c]/10 hover:bg-[#c9a84c]/20 text-[#c9a84c] text-[10px] font-bold uppercase tracking-widest rounded-xl transition-colors border border-[#c9a84c]/20 flex items-center gap-1"
                        >
                          <Edit size={10} /> Edit
                        </button>
                        <button
                          onClick={() => handleListingDelete(l._id)}
                          className="px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-colors border border-red-500/20 flex items-center gap-1"
                        >
                          <Trash2 size={10} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : activeTab === 'videos' ? (
          /* Walkthrough Videos Catalog */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((vid) => (
              <div key={vid._id} className="bg-[#060d1a] border border-[#c9a84c]/15 rounded-3xl shadow-xl p-5 flex flex-col justify-between h-full group hover:shadow-[#c9a84c]/5 transition-all">
                
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-base font-heading font-bold text-[#f5f0e8] group-hover:text-[#c9a84c] transition-colors truncate max-w-[180px]">{vid.title}</h3>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#c9a84c]">
                      {vid.key === 'showcase' || vid.key === 'walkthrough' ? `Default: ${vid.key}` : 'Custom'}
                    </span>
                  </div>
                  
                  {/* Video Player */}
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-[#020408] border border-[#c9a84c]/10 mb-4 flex items-center justify-center">
                    {vid.url ? (
                      <video 
                        key={vid.url}
                        src={getImgUrl(vid.url)} 
                        controls 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xs text-[#8a8070]">No Video Path Set</span>
                    )}
                  </div>

                  <p className="text-xs text-[#8a8070] font-mono break-all line-clamp-1 mb-4">{vid.url}</p>
                </div>

                <div className="flex gap-2 justify-end border-t border-[#c9a84c]/10 pt-4 mt-auto">
                  <button
                    onClick={() => openEditVideoModal(vid)}
                    className="px-3 py-2 bg-[#c9a84c]/10 hover:bg-[#c9a84c]/20 text-[#c9a84c] text-[10px] font-bold uppercase tracking-widest rounded-xl transition-colors border border-[#c9a84c]/20 flex items-center gap-1"
                  >
                    <Edit size={10} /> Edit
                  </button>
                  {vid.key !== 'showcase' && vid.key !== 'walkthrough' && (
                    <button
                      onClick={() => handleVideoDelete(vid._id, vid.key)}
                      className="px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-colors border border-red-500/20 flex items-center gap-1"
                    >
                      <Trash2 size={10} /> Delete
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>
        ) : (
          /* Gallery Photos Tab */
          <div className="space-y-8">
            {/* Cinematic Showcase Banner Card */}
            <div className="bg-[#060d1a] border border-[#c9a84c]/15 rounded-3xl shadow-xl p-6 relative overflow-hidden group hover:shadow-[#c9a84c]/5 transition-all">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-5 border-b border-[#c9a84c]/10 pb-4">
                <div>
                  <h3 className="text-xl font-heading font-bold text-[#f5f0e8] group-hover:text-[#c9a84c] transition-colors">Cinematic Showcase Banner</h3>
                  <p className="text-xs text-[#8a8070] mt-1">This is the wide full-width image displayed in the middle of the gallery section.</p>
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#c9a84c] self-start sm:self-auto shrink-0">
                  Showcase Image
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Image Preview */}
                <div className="md:col-span-1 relative aspect-[16/7] md:aspect-auto md:h-44 rounded-2xl overflow-hidden bg-[#020408] border border-[#c9a84c]/10 flex items-center justify-center">
                  {galleryShowcase ? (
                    <img 
                      src={getImgUrl(galleryShowcase)} 
                      alt="Showcase Banner Preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs text-[#8a8070]">No Image Selected</span>
                  )}
                </div>

                <div className="md:col-span-2 flex flex-col justify-between gap-4">
                  {/* Direct Link Input */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-[#8a8070] uppercase tracking-wider block font-semibold">Direct Image URL / Path</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={galleryShowcase}
                        onChange={(e) => setGalleryShowcase(e.target.value)}
                        placeholder="e.g. /uploads/image-123.png or direct image link"
                        className="flex-1 bg-[#020408] border border-[#c9a84c]/20 rounded-xl px-4 py-2.5 text-xs text-[#f5f0e8] placeholder:text-[#8a8070]/30 focus:outline-none focus:border-[#c9a84c] transition-colors"
                      />
                      <button 
                        type="button"
                        onClick={() => handleGalleryUrlSave('showcase', galleryShowcase)}
                        className="bg-gradient-to-r from-[#a07830] to-[#c9a84c] text-[#020408] font-bold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider hover:opacity-90 transition-all shrink-0"
                      >
                        Save Link
                      </button>
                    </div>
                  </div>

                  {/* Upload box */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-[#8a8070] uppercase tracking-wider block font-semibold">Upload Showcase Image</label>
                    <div 
                      onDragOver={handleDragOver}
                      onDrop={(e) => {
                        e.preventDefault();
                        const file = e.dataTransfer.files?.[0];
                        if (file && file.type.startsWith('image/')) {
                          handleGalleryImageUpload('showcase', file);
                        } else {
                          alert('Please drop a valid image file');
                        }
                      }}
                      onPaste={(e) => {
                        const items = e.clipboardData?.items;
                        if (!items) return;
                        for (let i = 0; i < items.length; i++) {
                          if (items[i].type.indexOf('image') !== -1) {
                            const file = items[i].getAsFile();
                            handleGalleryImageUpload('showcase', file);
                            e.preventDefault();
                            return;
                          }
                        }
                      }}
                      tabIndex={0}
                      className="border border-dashed border-[#c9a84c]/15 hover:border-[#c9a84c]/40 bg-[#020408] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-300 focus:outline-none focus:border-[#c9a84c]/40 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <UploadCloud className="text-[#c9a84c]/40 shrink-0" size={24} />
                        <div className="text-left">
                          <p className="text-[11px] font-semibold text-[#f5f0e8]">Drag & Drop, Paste, or Choose File</p>
                          <p className="text-[9px] text-[#8a8070]">Supports PNG, JPG, WEBP</p>
                        </div>
                      </div>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleGalleryImageUpload('showcase', file);
                        }}
                        className="hidden" 
                        id="showcase-gallery-upload"
                      />
                      <label 
                        htmlFor="showcase-gallery-upload"
                        className="px-3.5 py-1.5 border border-[#c9a84c]/30 hover:bg-[#c9a84c]/10 text-[#c9a84c] text-[10px] font-bold uppercase rounded-xl transition-all cursor-pointer shrink-0"
                      >
                        Choose File
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 8 Gallery Photos Grid */}
            <div className="bg-[#060d1a] border border-[#c9a84c]/15 rounded-3xl shadow-xl p-6">
              <div className="border-b border-[#c9a84c]/10 pb-4 mb-6">
                <h3 className="text-xl font-heading font-bold text-[#f5f0e8]">Property Visits Grid (8 Photos)</h3>
                <p className="text-xs text-[#8a8070] mt-1">Configure the 8 images that make up the main visitor gallery section.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, idx) => {
                  const currentImgVal = galleryImages[idx] || '';
                  const imageLabelMap = [
                    '#1 (Left Top Large)',
                    '#2 (Right Top Large)',
                    '#3 (Left Middle)',
                    '#4 (Center Middle)',
                    '#5 (Right Middle)',
                    '#6 (Left Bottom)',
                    '#7 (Center Bottom)',
                    '#8 (Right Bottom)'
                  ];
                  return (
                    <div key={idx} className="bg-[#020408]/40 border border-[#c9a84c]/10 rounded-2xl p-4 flex flex-col justify-between gap-4 group/item hover:border-[#c9a84c]/30 transition-all">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-[#c9a84c] uppercase tracking-wider">
                            Photo {imageLabelMap[idx]}
                          </span>
                        </div>

                        {/* Preview */}
                        <div className="relative aspect-video rounded-xl overflow-hidden bg-[#020408] border border-[#c9a84c]/10 flex items-center justify-center">
                          {currentImgVal ? (
                            <img 
                              src={getImgUrl(currentImgVal)} 
                              alt={`Gallery Grid Preview ${idx + 1}`} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-[10px] text-[#8a8070]">No Image Set</span>
                          )}
                        </div>

                        {/* URL input */}
                        <div className="space-y-1">
                          <input 
                            type="text"
                            value={currentImgVal}
                            onChange={(e) => {
                              const newImages = [...galleryImages];
                              newImages[idx] = e.target.value;
                              setGalleryImages(newImages);
                            }}
                            placeholder="Direct image link..."
                            className="w-full bg-[#020408] border border-[#c9a84c]/15 rounded-lg px-2.5 py-1.5 text-[10px] text-[#f5f0e8] placeholder:text-[#8a8070]/20 focus:outline-none focus:border-[#c9a84c] transition-colors"
                          />
                          <button
                            type="button"
                            onClick={() => handleGalleryUrlSave(idx, galleryImages[idx] || '')}
                            className="w-full bg-[#c9a84c]/10 hover:bg-[#c9a84c]/20 border border-[#c9a84c]/20 text-[#c9a84c] text-[9px] font-bold uppercase rounded-lg py-1 transition-all"
                          >
                            Save Link
                          </button>
                        </div>
                      </div>

                      {/* File Upload Zone */}
                      <div 
                        onDragOver={handleDragOver}
                        onDrop={(e) => {
                          e.preventDefault();
                          const file = e.dataTransfer.files?.[0];
                          if (file && file.type.startsWith('image/')) {
                            handleGalleryImageUpload(idx, file);
                          } else {
                            alert('Please drop an image file');
                          }
                        }}
                        onPaste={(e) => {
                          const items = e.clipboardData?.items;
                          if (!items) return;
                          for (let i = 0; i < items.length; i++) {
                            if (items[i].type.indexOf('image') !== -1) {
                              const file = items[i].getAsFile();
                              handleGalleryImageUpload(idx, file);
                              e.preventDefault();
                              return;
                            }
                          }
                        }}
                        tabIndex={0}
                        className="border border-dashed border-[#c9a84c]/10 hover:border-[#c9a84c]/20 bg-[#020408] rounded-xl p-3 flex flex-col items-center justify-center transition-all focus:outline-none focus:border-[#c9a84c]/30 cursor-pointer"
                      >
                        <UploadCloud className="text-[#c9a84c]/20 mb-1" size={16} />
                        <span className="text-[8px] text-[#8a8070] text-center mb-2">Drag, paste or click</span>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleGalleryImageUpload(idx, file);
                          }}
                          className="hidden" 
                          id={`gallery-photo-file-${idx}`}
                        />
                        <label 
                          htmlFor={`gallery-photo-file-${idx}`}
                          className="px-2.5 py-1 bg-[#020408] border border-[#c9a84c]/30 hover:bg-[#c9a84c]/10 text-[#c9a84c] text-[8px] font-bold uppercase rounded-md transition-all cursor-pointer"
                        >
                          Choose
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Property Add/Edit Modal Container */}
      <AnimatePresence>
        {showListingModal && (
          <div className="fixed inset-0 bg-[#020408]/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#060d1a] border border-[#c9a84c]/20 rounded-3xl p-6 md:p-8 max-w-xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-2xl font-heading font-bold text-[#c9a84c] mb-6">
                {editingListing ? 'Edit Property Details' : 'Add New Property'}
              </h2>
              
              <form onSubmit={handleListingSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-[#8a8070] uppercase tracking-wider">Property Title *</label>
                    <input
                      type="text"
                      value={listingTitle}
                      onChange={(e) => setListingTitle(e.target.value)}
                      className="w-full bg-[#020408] border border-[#c9a84c]/20 rounded-xl px-4 py-2.5 text-[#f5f0e8] placeholder:text-[#8a8070]/30 focus:outline-none focus:border-[#c9a84c] transition-colors text-sm font-medium"
                      placeholder="e.g. Shiv Prasad Apartment"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-[#8a8070] uppercase tracking-wider">Price (e.g. ₹ 4.55 Cr / 16.5K/sq.ft) *</label>
                    <input
                      type="text"
                      value={listingPrice}
                      onChange={(e) => setListingPrice(e.target.value)}
                      className="w-full bg-[#020408] border border-[#c9a84c]/20 rounded-xl px-4 py-2.5 text-[#f5f0e8] placeholder:text-[#8a8070]/30 focus:outline-none focus:border-[#c9a84c] transition-colors text-sm font-medium"
                      placeholder="e.g. ₹ 4.55 Cr"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-[#8a8070] uppercase tracking-wider">Location</label>
                    <input
                      type="text"
                      value={listingLocation}
                      onChange={(e) => setListingLocation(e.target.value)}
                      className="w-full bg-[#020408] border border-[#c9a84c]/20 rounded-xl px-4 py-2.5 text-[#f5f0e8] placeholder:text-[#8a8070]/30 focus:outline-none focus:border-[#c9a84c] transition-colors text-sm font-medium"
                      placeholder="e.g. Matunga East, Mumbai"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-[#8a8070] uppercase tracking-wider">Area / Size</label>
                    <input
                      type="text"
                      value={listingArea}
                      onChange={(e) => setListingArea(e.target.value)}
                      className="w-full bg-[#020408] border border-[#c9a84c]/20 rounded-xl px-4 py-2.5 text-[#f5f0e8] placeholder:text-[#8a8070]/30 focus:outline-none focus:border-[#c9a84c] transition-colors text-sm font-medium"
                      placeholder="e.g. 1066 sq ft"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-[#8a8070] uppercase tracking-wider">Type / Configuration</label>
                    <input
                      type="text"
                      value={listingType}
                      onChange={(e) => setListingType(e.target.value)}
                      className="w-full bg-[#020408] border border-[#c9a84c]/20 rounded-xl px-4 py-2.5 text-[#f5f0e8] placeholder:text-[#8a8070]/30 focus:outline-none focus:border-[#c9a84c] transition-colors text-sm font-medium"
                      placeholder="e.g. 2 BHK"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#8a8070] uppercase tracking-wider">Status</label>
                  <select
                    value={listingStatus}
                    onChange={(e) => setListingStatus(e.target.value)}
                    className="w-full bg-[#020408] border border-[#c9a84c]/20 rounded-xl px-4 py-2.5 text-[#f5f0e8] focus:outline-none focus:border-[#c9a84c] transition-colors text-sm font-medium cursor-pointer"
                  >
                    <option value="Available">Available (Visible on Site)</option>
                    <option value="Sold">Sold (Hidden from Site)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#8a8070] uppercase tracking-wider">Description</label>
                  <textarea
                    value={listingDescription}
                    onChange={(e) => setListingDescription(e.target.value)}
                    rows={3}
                    className="w-full bg-[#020408] border border-[#c9a84c]/20 rounded-xl px-4 py-2.5 text-[#f5f0e8] placeholder:text-[#8a8070]/30 focus:outline-none focus:border-[#c9a84c] transition-colors text-sm resize-none font-medium"
                    placeholder="Provide details about amenities, floor numbers, flat views, etc."
                  />
                </div>

                {/* Upload Section - Drag/Drop and Paste Clipboard */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#8a8070] uppercase tracking-wider">Property Photo</label>
                  
                  <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className={`w-full bg-[#020408] border-2 border-dashed ${listingImage ? 'border-[#c9a84c]/40' : 'border-[#c9a84c]/15'} rounded-2xl p-4 flex flex-col items-center justify-center transition-all duration-300 relative min-h-[160px]`}
                  >
                    {listingImage ? (
                      <div className="w-full relative">
                        <img 
                          src={getImgUrl(listingImage)} 
                          alt="Listing Preview" 
                          className="w-full max-h-48 object-cover rounded-xl border border-[#c9a84c]/10" 
                        />
                        <button
                          type="button"
                          onClick={() => { setListingImage(''); setSelectedFile(null); }}
                          className="absolute top-2 right-2 bg-red-500/90 hover:bg-red-600 text-white px-3 py-1.5 rounded-xl shadow-md transition-colors text-xs font-bold"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="text-center py-4 flex flex-col items-center">
                        <UploadCloud className="text-[#c9a84c]/40 mb-2" size={32} />
                        <p className="text-sm font-semibold text-[#f5f0e8]">Paste Image or Drag File Here</p>
                        <p className="text-xs text-[#8a8070] mt-1 mb-3">Copy image and press <kbd className="bg-white/5 px-1.5 py-0.5 rounded border border-white/10 font-mono text-[9px]">Ctrl+V</kbd>, or drop photo</p>
                        
                        <input 
                          ref={fileRef} 
                          type="file" 
                          accept="image/*" 
                          onChange={handleFileSelect} 
                          className="hidden" 
                        />
                        <button
                          type="button"
                          onClick={() => fileRef.current.click()}
                          className="px-4 py-2 border border-[#c9a84c]/30 hover:bg-[#c9a84c]/10 text-[#c9a84c] text-xs font-bold uppercase rounded-xl transition-all"
                        >
                          Select Image File
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {/* Fallback direct URL input */}
                  <div className="pt-2">
                    <input
                      type="text"
                      value={listingImage.startsWith('data:image/') ? '[Pasted Image File]' : listingImage}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === '') {
                          setListingImage('');
                          setSelectedFile(null);
                        } else if (val !== '[Pasted Image File]') {
                          setListingImage(val);
                          setSelectedFile(null);
                        }
                      }}
                      placeholder="Or paste direct image URL here..."
                      className="w-full bg-[#020408] border border-[#c9a84c]/10 rounded-xl px-4 py-2 text-xs text-[#8a8070] placeholder:text-[#8a8070]/25 focus:outline-none focus:border-[#c9a84c] transition-colors font-medium"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-[#c9a84c]/10">
                  <button
                    type="button"
                    onClick={() => { setShowListingModal(false); setListingImage(''); setSelectedFile(null); }}
                    className="flex-1 py-3 border border-[#c9a84c]/20 text-[#8a8070] hover:text-[#f5f0e8] hover:bg-white/5 rounded-xl font-semibold text-xs uppercase tracking-wider transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-gradient-to-r from-[#a07830] via-[#c9a84c] to-[#a07830] text-[#020408] rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-md"
                  >
                    {editingListing ? 'Save Changes' : 'Create Listing'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Video Add/Edit Modal Container */}
        {showVideoModal && (
          <div className="fixed inset-0 bg-[#020408]/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#060d1a] border border-[#c9a84c]/20 rounded-3xl p-6 md:p-8 max-w-xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-2xl font-heading font-bold text-[#c9a84c] mb-6">
                {editingVideo ? 'Edit Walkthrough Video' : 'Add Walkthrough Video'}
              </h2>
              
              <form onSubmit={handleVideoSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#8a8070] uppercase tracking-wider">Video Title *</label>
                  <input
                    type="text"
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    className="w-full bg-[#020408] border border-[#c9a84c]/20 rounded-xl px-4 py-2.5 text-[#f5f0e8] placeholder:text-[#8a8070]/30 focus:outline-none focus:border-[#c9a84c] transition-colors text-sm font-medium"
                    placeholder="e.g. Lobby Walkthrough"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#8a8070] uppercase tracking-wider">Direct Video URL / Path (or Paste Link)</label>
                  <input
                    type="text"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="w-full bg-[#020408] border border-[#c9a84c]/20 rounded-xl px-4 py-2.5 text-[#f5f0e8] placeholder:text-[#8a8070]/30 focus:outline-none focus:border-[#c9a84c] transition-colors text-sm font-medium"
                    placeholder="e.g. /uploads/video-123.mp4 or direct video link"
                  />
                </div>

                {/* Upload Section - Drag/Drop and Paste Clipboard */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#8a8070] uppercase tracking-wider">Video File Upload</label>
                  
                  <div
                    onDragOver={handleDragOver}
                    onDrop={(e) => {
                      e.preventDefault();
                      const file = e.dataTransfer.files?.[0];
                      if (file && file.type.startsWith('video/')) {
                        setSelectedVideoFile(file);
                        setVideoUrl('');
                      } else {
                        alert('Please drop a valid video file');
                      }
                    }}
                    onPaste={handleVideoModalPaste}
                    tabIndex={0}
                    className={`w-full bg-[#020408] border-2 border-dashed ${selectedVideoFile || videoUrl ? 'border-[#c9a84c]/40' : 'border-[#c9a84c]/15'} rounded-2xl p-4 flex flex-col items-center justify-center transition-all duration-300 relative min-h-[160px] focus:outline-none focus:border-[#c9a84c]/30`}
                  >
                    {selectedVideoFile || videoUrl ? (
                      <div className="w-full relative">
                        <div className="relative aspect-video rounded-xl overflow-hidden bg-[#020408] border border-[#c9a84c]/10">
                          {selectedVideoFile ? (
                            <video 
                              key={URL.createObjectURL(selectedVideoFile)}
                              src={URL.createObjectURL(selectedVideoFile)} 
                              controls 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <video 
                              key={videoUrl}
                              src={getImgUrl(videoUrl)} 
                              controls 
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => { setVideoUrl(''); setSelectedVideoFile(null); }}
                          className="absolute top-2 right-2 bg-red-500/90 hover:bg-red-600 text-white px-3 py-1.5 rounded-xl shadow-md transition-colors text-xs font-bold z-10"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="text-center py-4 flex flex-col items-center">
                        <UploadCloud className="text-[#c9a84c]/40 mb-2" size={32} />
                        <p className="text-sm font-semibold text-[#f5f0e8]">Paste Video Link or Drag File Here</p>
                        <p className="text-xs text-[#8a8070] mt-1 mb-3">Copy link/file and press <kbd className="bg-white/5 px-1.5 py-0.5 rounded border border-white/10 font-mono text-[9px]">Ctrl+V</kbd></p>
                        
                        <input 
                          type="file" 
                          accept="video/*" 
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setSelectedVideoFile(file);
                              setVideoUrl('');
                            }
                          }} 
                          className="hidden" 
                          id="modal-video-file-upload"
                        />
                        <label
                          htmlFor="modal-video-file-upload"
                          className="px-4 py-2 border border-[#c9a84c]/30 hover:bg-[#c9a84c]/10 text-[#c9a84c] text-xs font-bold uppercase rounded-xl transition-all cursor-pointer"
                        >
                          Choose Video File
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-[#c9a84c]/10">
                  <button
                    type="button"
                    onClick={() => setShowVideoModal(false)}
                    className="flex-1 py-3 border border-[#c9a84c]/20 text-[#8a8070] hover:text-[#f5f0e8] hover:bg-white/5 rounded-xl font-semibold text-xs uppercase tracking-wider transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-gradient-to-r from-[#a07830] via-[#c9a84c] to-[#a07830] text-[#020408] rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-md"
                  >
                    {editingVideo ? 'Save Changes' : 'Add Video'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Walkthrough Video Paste Target Selector Modal */}
        {showVideoPasteModal && (
          <div className="fixed inset-0 bg-[#020408]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#060d1a] border border-[#c9a84c]/20 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative"
            >
              <div className="text-center mb-6">
                <span className="text-3xl">📋</span>
                <h3 className="text-xl font-heading font-bold text-[#c9a84c] mt-2">Clipboard Video Detected</h3>
                <p className="text-xs text-[#8a8070] mt-1">Select which walkthrough slot to update with this clipboard item.</p>
              </div>

              {/* Clipboard Item Detail Box */}
              <div className="bg-[#020408] border border-[#c9a84c]/10 rounded-2xl p-4 mb-6">
                <p className="text-[10px] font-bold text-[#8a8070] uppercase tracking-wider mb-1.5">Pasted Content:</p>
                {pastedVideoFile ? (
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-semibold text-[#f5f0e8] break-all">{pastedVideoFile.name}</p>
                    <p className="text-xs text-[#8a8070]">File Size: {(pastedVideoFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                ) : (
                  <p className="text-xs font-mono text-[#d4cfc6] break-all max-h-24 overflow-y-auto leading-relaxed">{pastedVideoUrl}</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={async () => {
                    setShowVideoPasteModal(false);
                    if (pastedVideoFile) {
                      await handleVideoUpload('showcase', pastedVideoFile);
                    } else if (pastedVideoUrl) {
                      await handleSaveVideo('showcase', pastedVideoUrl);
                    }
                  }}
                  className="w-full py-3.5 bg-gradient-to-r from-[#a07830] via-[#c9a84c] to-[#a07830] text-[#020408] rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-md hover:opacity-90 active:scale-98 flex items-center justify-center gap-2"
                >
                  Apply to Left Video (showcase)
                </button>
                
                <button
                  type="button"
                  onClick={async () => {
                    setShowVideoPasteModal(false);
                    if (pastedVideoFile) {
                      await handleVideoUpload('walkthrough', pastedVideoFile);
                    } else if (pastedVideoUrl) {
                      await handleSaveVideo('walkthrough', pastedVideoUrl);
                    }
                  }}
                  className="w-full py-3.5 bg-gradient-to-r from-[#a07830] via-[#c9a84c] to-[#a07830] text-[#020408] rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-md hover:opacity-90 active:scale-98 flex items-center justify-center gap-2"
                >
                  Apply to Right Video (walkthrough)
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowVideoPasteModal(false);
                    setEditingVideo(null);
                    setVideoTitle('');
                    if (pastedVideoFile) {
                      setSelectedVideoFile(pastedVideoFile);
                      setVideoUrl('');
                    } else if (pastedVideoUrl) {
                      setVideoUrl(pastedVideoUrl);
                      setSelectedVideoFile(null);
                    }
                    setShowVideoModal(true);
                  }}
                  className="w-full py-3.5 bg-[#060d1a] border border-[#c9a84c]/25 text-[#c9a84c] rounded-xl font-semibold text-xs uppercase tracking-wider hover:bg-[#c9a84c]/10 transition-all text-center flex items-center justify-center gap-2"
                >
                  Create a New Walkthrough Video
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowVideoPasteModal(false);
                    setPastedVideoFile(null);
                    setPastedVideoUrl('');
                  }}
                  className="w-full py-3 border border-[#c9a84c]/20 text-[#8a8070] hover:text-[#f5f0e8] hover:bg-white/5 rounded-xl font-semibold text-xs uppercase tracking-wider transition-colors"
                >
                  Cancel & Dismiss
                </button>
              </div>
            </motion.div>
          </div>
        )}


        {/* Gallery Image Paste Target Selector Modal */}
        {showGalleryPasteModal && (
          <div className="fixed inset-0 bg-[#020408]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#060d1a] border border-[#c9a84c]/20 rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <div className="text-center mb-6">
                <span className="text-3xl">📋</span>
                <h3 className="text-xl font-heading font-bold text-[#c9a84c] mt-2">Clipboard Image Detected</h3>
                <p className="text-xs text-[#8a8070] mt-1">Select which gallery slot to update with this clipboard item.</p>
              </div>

              {/* Clipboard Item Detail Box */}
              <div className="bg-[#020408] border border-[#c9a84c]/10 rounded-2xl p-4 mb-6">
                <p className="text-[10px] font-bold text-[#8a8070] uppercase tracking-wider mb-1.5">Pasted Content:</p>
                {pastedGalleryFile ? (
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-semibold text-[#f5f0e8] break-all">{pastedGalleryFile.name}</p>
                    <p className="text-xs text-[#8a8070]">File Size: {(pastedGalleryFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                ) : (
                  <p className="text-xs font-mono text-[#d4cfc6] break-all max-h-24 overflow-y-auto leading-relaxed">{pastedGalleryUrl}</p>
                )}
              </div>

              {/* Action Buttons Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <button
                  type="button"
                  onClick={async () => {
                    setShowGalleryPasteModal(false);
                    if (pastedGalleryFile) {
                      await handleGalleryImageUpload('showcase', pastedGalleryFile);
                    } else if (pastedGalleryUrl) {
                      await handleGalleryUrlSave('showcase', pastedGalleryUrl);
                    }
                  }}
                  className="py-3 bg-gradient-to-r from-[#a07830] to-[#c9a84c] text-[#020408] rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-md sm:col-span-2"
                >
                  Apply to Showcase Banner
                </button>

                {[
                  '#1 (Left Top Large)',
                  '#2 (Right Top Large)',
                  '#3 (Left Middle)',
                  '#4 (Center Middle)',
                  '#5 (Right Middle)',
                  '#6 (Left Bottom)',
                  '#7 (Center Bottom)',
                  '#8 (Right Bottom)'
                ].map((label, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={async () => {
                      setShowGalleryPasteModal(false);
                      if (pastedGalleryFile) {
                        await handleGalleryImageUpload(idx, pastedGalleryFile);
                      } else if (pastedGalleryUrl) {
                        await handleGalleryUrlSave(idx, pastedGalleryUrl);
                      }
                    }}
                    className="py-2.5 bg-[#060d1a] border border-[#c9a84c]/25 text-[#c9a84c] rounded-xl font-semibold text-[10px] uppercase tracking-wider hover:bg-[#c9a84c]/10 transition-all text-center"
                  >
                    Apply to Photo {label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowGalleryPasteModal(false);
                  setPastedGalleryFile(null);
                  setPastedGalleryUrl('');
                }}
                className="w-full py-3 border border-[#c9a84c]/20 text-[#8a8070] hover:text-[#f5f0e8] hover:bg-white/5 rounded-xl font-semibold text-xs uppercase tracking-wider transition-colors"
              >
                Cancel & Dismiss
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
