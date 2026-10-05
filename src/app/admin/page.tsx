'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Lock,
  Mail,
  Key,
  ShieldCheck,
  Plus,
  Edit2,
  Trash2,
  LogOut,
  Car,
  Map,
  Check,
  AlertCircle,
  Upload,
  Image as ImageIcon,
  Star,
  X,
  ZoomIn,
  ZoomOut
} from 'lucide-react';

// Client-side image compression helper
function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 600;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        // Compress to JPEG with 0.7 quality
        const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
        resolve(dataUrl);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  // Login States
  const [loginStep, setLoginStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [otp, setOtp] = useState('');
  const [tempToken, setTempToken] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginInfo, setLoginInfo] = useState('');

  // Dashboard Active Tab
  const [activeTab, setActiveTab] = useState<'fleet' | 'routes' | 'reviews' | 'bookings' | 'rearrange'>('bookings');

  // Dynamic Data Lists
  const [fleet, setFleet] = useState<any[]>([]);
  const [routes, setRoutes] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);

  // CRUD States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'edit'>('create');
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [actionError, setActionError] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [isCompressing, setIsCompressing] = useState(false);

  // Crop Modal state
  const [cropImageIndex, setCropImageIndex] = useState<number | null>(null);
  const [isDraggingCrop, setIsDraggingCrop] = useState(false);
  const [cropDragStart, setCropDragStart] = useState({ x: 0, y: 0 });
  const [cropDragStartCoords, setCropDragStartCoords] = useState({ x: 50, y: 50 });
  const [cropImgRatio, setCropImgRatio] = useState(1);
  const [cropZoom, setCropZoom] = useState(1);
  const cropContainerRef = useRef<HTMLDivElement>(null);

  // Custom Category & Admin Filter states
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [customCategoryName, setCustomCategoryName] = useState('');
  const [adminFleetFilter, setAdminFleetFilter] = useState('All');

  // Form Fields State
  const [vehicleForm, setVehicleForm] = useState({
    id: '',
    name: '',
    type: 'Sedan',
    seats: 4,
    ac: true,
    luggage: 2,
    ratePerKm: 12,
    features: '',
    image: '',
    images: [] as string[],
    imageFit: 'cover' as 'cover' | 'contain',
    imageFits: [] as ('cover' | 'contain')[],
    imagePositions: [] as string[],
    imageScales: [] as number[],
    description: '',
    driverBata: '',
    minKmPerDay: '',
    ratePerKmAc: '',
    ratePerKmNonAc: '',
    acOnly: true,
    hasNonAcOption: false,
    drivingHours: '',
    priceDisplay: '',
    seatsDisplay: '',
    sortOrder: 0,
    showOnHome: true,
    homeCategory: '',
  });

  // Tracks if the user has made unsaved rearrange changes
  const [hasPendingRearrange, setHasPendingRearrange] = useState(false);
  const [isSavingRearrange, setIsSavingRearrange] = useState(false);

  const [routeForm, setRouteForm] = useState({
    from: '',
    to: '',
    distance: '',
    duration: '',
    estimatedPrice: '',
    imageUrl: '',
    tripType: 'Round Trip',
  });

  const [reviewForm, setReviewForm] = useState({
    name: '',
    location: '',
    rating: 5,
    text: '',
  });

  const updateImagePosition = useCallback((index: number, newX: number, newY: number) => {
    setVehicleForm(prev => {
      const imagesLength = prev.images?.length || 0;
      const positionsCopy = [...(prev.imagePositions || new Array(imagesLength).fill('50% 50%'))];
      positionsCopy[index] = `${newX}% ${newY}%`;
      return {
        ...prev,
        imagePositions: positionsCopy
      };
    });
  }, []);

  const openCropModal = (index: number) => {
    setCropImageIndex(index);
    setCropZoom(vehicleForm.imageScales?.[index] || 1);
    const imgUrl = vehicleForm.images[index];
    if (imgUrl) {
      const tempImg = new Image();
      tempImg.src = imgUrl;
      tempImg.onload = () => {
        setCropImgRatio(tempImg.naturalWidth / tempImg.naturalHeight);
      };
    }
  };

  const closeCropModal = () => {
    if (cropImageIndex !== null) {
      setVehicleForm(prev => {
        const scalesCopy = [...(prev.imageScales || new Array(prev.images?.length || 0).fill(1))];
        scalesCopy[cropImageIndex] = cropZoom;
        return {
          ...prev,
          imageScales: scalesCopy
        };
      });
    }
    setCropImageIndex(null);
  };

  // ─── LOCAL-ONLY reorder (no API call) — user must click Save Arrangement ───
  const moveVehicleInRow = (vehicleId: string, direction: 'left' | 'right') => {
    const vehicle = fleet.find(v => v._id === vehicleId);
    if (!vehicle) return;

    const sameCatVehicles = [...fleet]
      .filter(v => v.type === vehicle.type)
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

    const index = sameCatVehicles.findIndex(v => v._id === vehicleId);
    if (index === -1) return;
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sameCatVehicles.length) return;

    // Assign clean sequential sortOrders to the whole group, then swap
    sameCatVehicles.forEach((v, i) => { v.sortOrder = i; });
    const tmp = sameCatVehicles[index].sortOrder;
    sameCatVehicles[index].sortOrder = sameCatVehicles[targetIndex].sortOrder;
    sameCatVehicles[targetIndex].sortOrder = tmp;

    setFleet(prev => prev.map(item => {
      const updated = sameCatVehicles.find(v => v._id === item._id);
      return updated ? { ...item, sortOrder: updated.sortOrder } : item;
    }));
    setHasPendingRearrange(true);
  };

  // ─── LOCAL-ONLY category row move (no API call) ───
  const moveCategoryOrder = (category: string, direction: 'up' | 'down') => {
    const categoryMap: Record<string, number> = {};
    fleet.forEach((v: any) => {
      if (v.type && !(v.type in categoryMap)) {
        categoryMap[v.type] = v.categoryOrder ?? 0;
      }
    });
    const sortedCategories: string[] = Object.entries(categoryMap)
      .sort((a, b) => a[1] - b[1])
      .map(([cat]) => cat);

    const idx = sortedCategories.indexOf(category);
    if (idx === -1) return;
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= sortedCategories.length) return;

    const catA = sortedCategories[idx];
    const catB = sortedCategories[targetIdx];

    // Assign clean sequential categoryOrders to ALL, then swap
    sortedCategories.forEach((cat: string, i: number) => { categoryMap[cat] = i; });
    const tmpOrder = categoryMap[catA];
    categoryMap[catA] = categoryMap[catB];
    categoryMap[catB] = tmpOrder;

    setFleet(prev => prev.map((v: any) => ({
      ...v,
      categoryOrder: v.type in categoryMap ? categoryMap[v.type] : (v.categoryOrder ?? 0),
    })));
    setHasPendingRearrange(true);
  };

  // ─── BATCH SAVE — commits all pending arrangement changes to database ───
  const saveAllRearrangeChanges = async () => {
    setIsSavingRearrange(true);
    try {
      // Save all vehicles in a single bulk PUT call
      const bulkRes = await fetch('/api/fleet', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fleet.map((v: any) => ({
          ...v,
          features: Array.isArray(v.features) ? v.features.join(', ') : v.features,
        }))),
      });
      if (!bulkRes.ok) throw new Error('Bulk arrangement save failed');

      // Fetch fresh data (bypassing cache) to confirm what was stored
      const res = await fetch('/api/fleet', { cache: 'no-store' });
      if (res.ok) {
        const d = await res.json();
        setFleet(d.vehicles || []);
      }
      setHasPendingRearrange(false);
      alert('✅ Arrangement saved successfully!');
    } catch (err) {
      console.error('Save arrangement error:', err);
      alert('❌ Failed to save arrangement. Please try again.');
    } finally {
      setIsSavingRearrange(false);
    }
  };

  // Global mouse/touch gesture listener for drag-to-crop
  useEffect(() => {
    if (!isDraggingCrop || cropImageIndex === null) return;

    const handleMove = (clientX: number, clientY: number) => {
      const container = cropContainerRef.current;
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      const containerWidth = rect.width;
      const containerHeight = rect.height;

      const deltaX = clientX - cropDragStart.x;
      const deltaY = clientY - cropDragStart.y;

      let newX = cropDragStartCoords.x;
      let newY = cropDragStartCoords.y;

      const ratioThreshold = 16 / 9;
      let overflowWidth = 0;
      let overflowHeight = 0;

      if (cropImgRatio >= ratioThreshold) {
        overflowWidth = containerHeight * cropImgRatio * cropZoom - containerWidth;
        overflowHeight = containerHeight * cropZoom - containerHeight;
      } else {
        overflowWidth = containerWidth * cropZoom - containerWidth;
        overflowHeight = (containerWidth / cropImgRatio) * cropZoom - containerHeight;
      }

      if (overflowWidth > 0) {
        const deltaXPercent = (deltaX / overflowWidth) * 100;
        newX = Math.max(0, Math.min(100, cropDragStartCoords.x - deltaXPercent));
      } else {
        newX = 50;
      }

      if (overflowHeight > 0) {
        const deltaYPercent = (deltaY / overflowHeight) * 100;
        newY = Math.max(0, Math.min(100, cropDragStartCoords.y - deltaYPercent));
      } else {
        newY = 50;
      }

      updateImagePosition(cropImageIndex, Math.round(newX), Math.round(newY));
    };

    const onMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };

    const onMouseUp = () => {
      setIsDraggingCrop(false);
    };

    const onTouchEnd = () => {
      setIsDraggingCrop(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [isDraggingCrop, cropDragStart, cropDragStartCoords, cropImgRatio, cropZoom, cropImageIndex, updateImagePosition]);

  const fetchDashboardData = async () => {
    try {
      const [fleetRes, routesRes, reviewsRes, bookingsRes] = await Promise.all([
        fetch('/api/fleet'),
        fetch('/api/routes'),
        fetch('/api/reviews'),
        fetch('/api/bookings')
      ]);

      if (fleetRes.ok) {
         const d = await fleetRes.json();
         setFleet(d.vehicles || []);
      }
      if (routesRes.ok) {
         const d = await routesRes.json();
         setRoutes(d.routes || []);
      }
      if (reviewsRes.ok) {
         const d = await reviewsRes.json();
         setReviews(d.reviews || []);
      }
      if (bookingsRes.ok) {
         const d = await bookingsRes.json();
         setBookings(d.bookings || []);
      }
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    }
  };

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/admin/auth-check');
      if (res.ok) {
        const data = await res.json();
        if (data.authenticated) {
          setAuthenticated(true);
          fetchDashboardData();
        }
      }
    } catch (err) {
      console.error('Auth check error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Check authentication on load
  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Login handlers
  const handleLoginStep1 = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ step: 1, email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');

      setTempToken(data.tempToken);
      setLoginStep(2);
    } catch (err: any) {
      setLoginError(err.message);
    }
  };

  const handleLoginStep2 = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginInfo('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ step: 2, tempToken, secretKey })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Verification failed');

      setTempToken(data.tempToken);
      setLoginStep(3);
      if (data.emailNote) {
        setLoginInfo(data.emailNote);
      } else {
        setLoginInfo('OTP has been sent to your email.');
      }
    } catch (err: any) {
      setLoginError(err.message);
    }
  };

  const handleLoginStep3 = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ step: 3, tempToken, otp })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'OTP verification failed');

      setAuthenticated(true);
      fetchDashboardData();
    } catch (err: any) {
      setLoginError(err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      setAuthenticated(false);
      setLoginStep(1);
      setEmail('');
      setPassword('');
      setSecretKey('');
      setOtp('');
      setTempToken('');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Image Upload handler (resizes & compresses to Base64)
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsCompressing(true);
    try {
      const base64 = await compressImage(file);
      setImagePreview(base64);
      if (activeTab === 'fleet') {
        setVehicleForm({ ...vehicleForm, image: base64 });
      } else if (activeTab === 'routes') {
        setRouteForm({ ...routeForm, imageUrl: base64 });
      }
    } catch (err) {
      console.error('Image compression failed:', err);
      alert('Failed to compress image.');
    } finally {
      setIsCompressing(false);
    }
  };

  const handleVehicleImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsCompressing(true);
    try {
      const compressedList: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const base64 = await compressImage(files[i]);
        compressedList.push(base64);
      }
      
      const newImages = [...vehicleForm.images, ...compressedList];
      const newFits = [
        ...(vehicleForm.imageFits || []),
        ...compressedList.map(() => vehicleForm.imageFit || 'cover')
      ];
      const newPositions = [
        ...(vehicleForm.imagePositions || []),
        ...compressedList.map(() => '50% 50%')
      ];
      const newScales = [
        ...(vehicleForm.imageScales || []),
        ...compressedList.map(() => 1)
      ];
      setVehicleForm(prev => ({
        ...prev,
        images: newImages,
        imageFits: newFits,
        imagePositions: newPositions,
        imageScales: newScales,
        image: prev.image || compressedList[0] || '',
      }));
      
      if (!imagePreview && compressedList[0]) {
        setImagePreview(compressedList[0]);
      }
    } catch (err) {
      console.error('Multiple image compression failed:', err);
      alert('Failed to compress one or more images.');
    } finally {
      setIsCompressing(false);
    }
  };

  const removeVehicleImage = (index: number) => {
    const updatedImages = vehicleForm.images.filter((_, idx) => idx !== index);
    const updatedFits = (vehicleForm.imageFits || []).filter((_, idx) => idx !== index);
    const updatedPositions = (vehicleForm.imagePositions || []).filter((_, idx) => idx !== index);
    const updatedScales = (vehicleForm.imageScales || []).filter((_, idx) => idx !== index);
    const newPrimary = updatedImages[0] || '';
    setVehicleForm(prev => ({
      ...prev,
      images: updatedImages,
      imageFits: updatedFits,
      imagePositions: updatedPositions,
      imageScales: updatedScales,
      image: newPrimary,
    }));
    setImagePreview(newPrimary);
  };

  const makeVehicleImageCover = (index: number) => {
    if (index <= 0 || index >= vehicleForm.images.length) return;
    const imagesCopy = [...vehicleForm.images];
    const fitsCopy = [...(vehicleForm.imageFits || new Array(imagesCopy.length).fill(vehicleForm.imageFit || 'cover'))];
    const positionsCopy = [...(vehicleForm.imagePositions || new Array(imagesCopy.length).fill('50% 50%'))];
    const scalesCopy = [...(vehicleForm.imageScales || new Array(imagesCopy.length).fill(1))];
    
    const [selectedImage] = imagesCopy.splice(index, 1);
    const [selectedFit] = fitsCopy.splice(index, 1);
    const [selectedPosition] = positionsCopy.splice(index, 1);
    const [selectedScale] = scalesCopy.splice(index, 1);
    
    imagesCopy.unshift(selectedImage);
    fitsCopy.unshift(selectedFit);
    positionsCopy.unshift(selectedPosition);
    scalesCopy.unshift(selectedScale);
    
    setVehicleForm(prev => ({
      ...prev,
      images: imagesCopy,
      imageFits: fitsCopy,
      imagePositions: positionsCopy,
      imageScales: scalesCopy,
      image: imagesCopy[0] || '',
    }));
    setImagePreview(imagesCopy[0]);
  };

  const moveVehicleImage = (index: number, direction: 'left' | 'right') => {
    const imagesCopy = [...vehicleForm.images];
    const fitsCopy = [...(vehicleForm.imageFits || new Array(imagesCopy.length).fill(vehicleForm.imageFit || 'cover'))];
    const positionsCopy = [...(vehicleForm.imagePositions || new Array(imagesCopy.length).fill('50% 50%'))];
    const scalesCopy = [...(vehicleForm.imageScales || new Array(imagesCopy.length).fill(1))];
    const newIndex = direction === 'left' ? index - 1 : index + 1;
    
    if (newIndex < 0 || newIndex >= imagesCopy.length) return;
    
    const tempImage = imagesCopy[index];
    imagesCopy[index] = imagesCopy[newIndex];
    imagesCopy[newIndex] = tempImage;
    
    const tempFit = fitsCopy[index];
    fitsCopy[index] = fitsCopy[newIndex];
    fitsCopy[newIndex] = tempFit;
    
    const tempPosition = positionsCopy[index];
    positionsCopy[index] = positionsCopy[newIndex];
    positionsCopy[newIndex] = tempPosition;
    
    const tempScale = scalesCopy[index];
    scalesCopy[index] = scalesCopy[newIndex];
    scalesCopy[newIndex] = tempScale;
    
    setVehicleForm(prev => ({
      ...prev,
      images: imagesCopy,
      imageFits: fitsCopy,
      imagePositions: positionsCopy,
      imageScales: scalesCopy,
      image: imagesCopy[0] || '',
    }));
    setImagePreview(imagesCopy[0]);
  };

  const toggleVehicleImageFit = (index: number) => {
    const fitsCopy = [...(vehicleForm.imageFits || new Array(vehicleForm.images.length).fill(vehicleForm.imageFit || 'cover'))];
    fitsCopy[index] = fitsCopy[index] === 'contain' ? 'cover' : 'contain';
    
    setVehicleForm(prev => ({
      ...prev,
      imageFits: fitsCopy,
    }));
  };

  const getXandY = (posString?: string) => {
    if (!posString) return { x: 50, y: 50 };
    const parts = posString.split(' ');
    const x = parseInt(parts[0]) || 50;
    const y = parseInt(parts[1]) || 50;
    return { x, y };
  };



  // Open Create/Edit modal
  const openModal = (type: 'create' | 'edit', item: any = null) => {
    setModalType(type);
    setEditingItem(item);
    setActionError('');
    setImagePreview('');

    if (activeTab === 'fleet') {
      const defaultCategories = ['Sedan', 'SUV', 'Minivan', 'Tempo Traveller', 'Luxury', 'Bus'];
      if (type === 'edit' && item) {
        const isCustom = !defaultCategories.includes(item.type);
        setIsCustomCategory(isCustom);
        setCustomCategoryName(isCustom ? item.type : '');
        setVehicleForm({
          id: item.id,
          name: item.name,
          type: item.type,
          seats: item.seats,
          ac: item.ac,
          luggage: item.luggage,
          ratePerKm: item.ratePerKm,
          features: item.features.join(', '),
          image: item.image,
          images: (item.images && item.images.length > 0) ? item.images : (item.image ? [item.image] : []),
          imageFit: item.imageFit || 'cover',
          imageFits: item.imageFits || new Array((item.images && item.images.length > 0) ? item.images.length : (item.image ? 1 : 0)).fill(item.imageFit || 'cover'),
          imagePositions: item.imagePositions || new Array((item.images && item.images.length > 0) ? item.images.length : (item.image ? 1 : 0)).fill('50% 50%'),
          imageScales: item.imageScales || new Array((item.images && item.images.length > 0) ? item.images.length : (item.image ? 1 : 0)).fill(1),
          description: item.description,
          driverBata: item.driverBata ?? '',
          minKmPerDay: item.minKmPerDay ?? '',
          ratePerKmAc: item.ratePerKmAc ?? '',
          ratePerKmNonAc: item.ratePerKmNonAc ?? '',
          acOnly: item.acOnly ?? true,
          hasNonAcOption: item.hasNonAcOption ?? false,
          drivingHours: item.drivingHours || '',
          priceDisplay: item.priceDisplay || '',
          seatsDisplay: item.seatsDisplay || '',
          sortOrder: item.sortOrder || 0,
          showOnHome: item.showOnHome !== undefined ? item.showOnHome : true,
          homeCategory: item.homeCategory || '',
        });
        setImagePreview(item.image);
      } else {
        setIsCustomCategory(false);
        setCustomCategoryName('');
        setVehicleForm({
          id: '',
          name: '',
          type: 'Sedan',
          seats: 4,
          ac: true,
          luggage: 2,
          ratePerKm: 12,
          features: '',
          image: '',
          images: [] as string[],
          imageFit: 'cover',
          imageFits: [] as ('cover' | 'contain')[],
          imagePositions: [] as string[],
          imageScales: [] as number[],
          description: '',
          driverBata: '',
          minKmPerDay: '',
          ratePerKmAc: '',
          ratePerKmNonAc: '',
          acOnly: true,
          hasNonAcOption: false,
          drivingHours: '',
          priceDisplay: '',
          seatsDisplay: '',
          sortOrder: 0,
          showOnHome: true,
          homeCategory: '',
        });
      }
    } else if (activeTab === 'routes') {
      if (type === 'edit' && item) {
        setRouteForm({
          from: item.from,
          to: item.to,
          distance: item.distance,
          duration: item.duration,
          estimatedPrice: item.estimatedPrice,
          imageUrl: item.imageUrl,
          tripType: item.tripType || 'Round Trip',
        });
        setImagePreview(item.imageUrl);
      } else {
        setRouteForm({
          from: '',
          to: '',
          distance: '',
          duration: '',
          estimatedPrice: '',
          imageUrl: '',
          tripType: 'Round Trip',
        });
      }
    } else if (activeTab === 'reviews') {
      if (type === 'edit' && item) {
        setReviewForm({
          name: item.name,
          location: item.location,
          rating: item.rating,
          text: item.text,
        });
      } else {
        setReviewForm({
          name: '',
          location: '',
          rating: 5,
          text: '',
        });
      }
    }
    setIsModalOpen(true);
  };

  // Submit CRUD Operations
  const handleCrudSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionError('');

    let endpoint = '';
    const method = modalType === 'create' ? 'POST' : 'PUT';
    let bodyData: Record<string, unknown> = {};

    if (activeTab === 'fleet') {
      endpoint = '/api/fleet';
      bodyData = { ...vehicleForm };
      if (modalType === 'edit') bodyData._id = editingItem._id;
    } else if (activeTab === 'routes') {
      endpoint = '/api/routes';
      bodyData = { ...routeForm };
      if (modalType === 'edit') bodyData._id = editingItem._id;
    } else if (activeTab === 'reviews') {
      endpoint = '/api/reviews';
      bodyData = { ...reviewForm };
      if (modalType === 'edit') bodyData._id = editingItem._id;
    }

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData)
      });
      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || 'Action failed');

      setIsModalOpen(false);
      fetchDashboardData();
    } catch (err: any) {
      setActionError(err.message);
    }
  };

  // Delete Action
  const handleDeleteItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    let endpoint = '';
    if (activeTab === 'fleet') endpoint = `/api/fleet?id=${id}`;
    else if (activeTab === 'routes') endpoint = `/api/routes?id=${id}`;
    else if (activeTab === 'reviews') endpoint = `/api/reviews?id=${id}`;
    else if (activeTab === 'bookings') endpoint = `/api/bookings?id=${id}`;

    try {
      const res = await fetch(endpoint, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Delete failed');

      fetchDashboardData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Update Booking Status Action
  const handleUpdateBookingStatus = async (id: string, newStatus: 'Confirmed' | 'Cancelled') => {
    try {
      const res = await fetch('/api/bookings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: id, status: newStatus })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update booking status');

      fetchDashboardData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-navy font-semibold mt-4 text-xs tracking-wider uppercase">Verifying Authorization Session...</p>
      </div>
    );
  }

  // LOGIN PAGE LAYOUT
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-white border border-navy-light/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Header */}
          <div className="text-center mb-8 relative z-10">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-navy">Sushi Travels</h1>
            <p className="text-xs text-navy-light/85 uppercase tracking-widest mt-1">Admin Panel Security</p>
          </div>

          {/* Login Steps indicator */}
          <div className="flex items-center justify-between max-w-[240px] mx-auto mb-8 relative">
            <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-navy-light/10 -translate-y-1/2 -z-0" />
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs relative z-10 border transition-all duration-300 ${
                  loginStep === s
                    ? 'bg-primary border-primary text-white scale-110 shadow-md shadow-primary/30'
                    : loginStep > s
                    ? 'bg-navy border-navy text-white'
                    : 'bg-white border-navy-light/20 text-navy-light'
                }`}
              >
                {loginStep > s ? '✓' : s}
              </div>
            ))}
          </div>

          {/* Error Banner */}
          {loginError && (
            <div className="mb-6 bg-primary/10 border-l-4 border-primary p-3 rounded-r-xl text-xs text-primary-dark font-medium flex items-start">
              <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          {/* Notification Info */}
          {loginInfo && (
            <div className="mb-6 bg-[#E7F7EF] border-l-4 border-[#25D366] p-3 rounded-r-xl text-xs text-[#128C7E] font-medium flex items-start">
              <Check className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
              <span>{loginInfo}</span>
            </div>
          )}

          {/* Step 1 Form: Email/Password */}
          {loginStep === 1 && (
            <form onSubmit={handleLoginStep1} className="space-y-5">
              <div className="space-y-1">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-navy">Admin Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-light/60" />
                  <input
                    type="email"
                    required
                    placeholder="admin@sushitravels.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-cream border border-navy-light/15 rounded-xl pl-10 pr-4 py-3 text-sm text-navy outline-none focus:border-primary transition"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-navy">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-light/60" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-cream border border-navy-light/15 rounded-xl pl-10 pr-4 py-3 text-sm text-navy outline-none focus:border-primary transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-navy hover:bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-xl py-3.5 shadow-lg transition duration-200 mt-2"
              >
                Verify Credentials
              </button>
            </form>
          )}

          {/* Step 2 Form: Secret Key */}
          {loginStep === 2 && (
            <form onSubmit={handleLoginStep2} className="space-y-5">
              <p className="text-xs text-navy-light/80 text-center leading-relaxed">
                Step 1 completed. Please verify with the admin secret key set in the environment variables.
              </p>
              <div className="space-y-1">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-navy">Admin Secret Key</label>
                <div className="relative">
                  <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-light/60" />
                  <input
                    type="text"
                    required
                    placeholder="Enter Secret Key"
                    value={secretKey}
                    onChange={(e) => setSecretKey(e.target.value)}
                    className="w-full bg-cream border border-navy-light/15 rounded-xl pl-10 pr-4 py-3 text-sm text-navy outline-none focus:border-primary transition font-mono"
                  />
                </div>
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setLoginStep(1)}
                  className="w-1/3 border border-navy-light/25 hover:bg-cream text-navy text-xs font-bold uppercase tracking-wider rounded-xl py-3.5 transition"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-2/3 bg-navy hover:bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-xl py-3.5 shadow-lg transition"
                >
                  Verify Key & Send OTP
                </button>
              </div>
            </form>
          )}

          {/* Step 3 Form: OTP Verification */}
          {loginStep === 3 && (
            <form onSubmit={handleLoginStep3} className="space-y-5">
              <p className="text-xs text-navy-light/80 text-center leading-relaxed">
                We have generated a verification OTP for you. Check your admin inbox or your local server terminal log.
              </p>
              <div className="space-y-1">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-navy">One-Time Password (OTP)</label>
                <div className="relative">
                  <ShieldCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-light/60" />
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full bg-cream border border-navy-light/15 rounded-xl pl-10 pr-4 py-3 text-sm text-navy outline-none focus:border-primary transition text-center font-bold tracking-widest text-lg"
                  />
                </div>
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setLoginStep(2)}
                  className="w-1/3 border border-navy-light/25 hover:bg-cream text-navy text-xs font-bold uppercase tracking-wider rounded-xl py-3.5 transition"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-2/3 bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white text-xs font-bold uppercase tracking-wider rounded-xl py-3.5 shadow-lg transition"
                >
                  Complete Login
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }

  // AUTHENTICATED ADMIN DASHBOARD LAYOUT
  return (
    <div className="min-h-screen bg-cream pb-16">
      {/* Top Banner Bar */}
      <header className="bg-navy text-white py-5 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold tracking-wide">Sushi Travels Admin</h1>
            <p className="text-[10px] text-cream-warm/75 uppercase tracking-widest mt-0.5">Website Dynamic Management Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-cream-warm bg-navy-light/50 border border-navy-light/30 rounded-full px-3.5 py-1.5 font-semibold">
              Logged as: {email}
            </span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-full px-4 py-2 transition shadow"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Tabs Navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex border-b border-navy-light/10 pb-1 mb-8 gap-1 overflow-x-auto">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`flex items-center gap-2 px-5 py-3 text-xs font-bold transition-all border-b-2 shrink-0 ${
              activeTab === 'bookings'
                ? 'border-primary text-primary font-bold'
                : 'border-transparent text-navy hover:text-primary'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Manage Bookings</span>
          </button>
          <button
            onClick={() => setActiveTab('fleet')}
            className={`flex items-center gap-2 px-5 py-3 text-xs font-bold transition-all border-b-2 shrink-0 ${
              activeTab === 'fleet'
                ? 'border-primary text-primary font-bold'
                : 'border-transparent text-navy hover:text-primary'
            }`}
          >
            <Car className="w-4 h-4" />
            <span>Manage Rental Fleet</span>
          </button>
          <button
            onClick={() => setActiveTab('routes')}
            className={`flex items-center gap-2 px-5 py-3 text-xs font-bold transition-all border-b-2 shrink-0 ${
              activeTab === 'routes'
                ? 'border-primary text-primary font-bold'
                : 'border-transparent text-navy hover:text-primary'
            }`}
          >
            <Map className="w-4 h-4" />
            <span>Manage Holiday Routes</span>
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex items-center gap-2 px-5 py-3 text-xs font-bold transition-all border-b-2 shrink-0 ${
              activeTab === 'reviews'
                ? 'border-primary text-primary font-bold'
                : 'border-transparent text-navy hover:text-primary'
            }`}
          >
            <Star className="w-4 h-4" />
            <span>Manage Testimonials</span>
          </button>
          <button
            onClick={() => setActiveTab('rearrange')}
            className={`flex items-center gap-2 px-5 py-3 text-xs font-bold transition-all border-b-2 shrink-0 ${
              activeTab === 'rearrange'
                ? 'border-primary text-primary font-bold'
                : 'border-transparent text-navy hover:text-primary'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Rearrange Fleet Cards</span>
          </button>
        </div>

        {/* Dynamic header depending on active tab */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-navy capitalize">
              {activeTab === 'rearrange' ? 'Rearrange Vehicle Cards' : `Registered ${activeTab === 'fleet' ? 'Rental Vehicles' : activeTab === 'routes' ? 'Holiday Routes' : activeTab === 'reviews' ? 'Traveler Testimonials' : 'Customer Bookings'}`}
            </h2>
            <p className="text-xs text-navy-light/85">
              {activeTab === 'bookings'
                ? 'Review and manage chauffeur rental bookings placed by customers.'
                : activeTab === 'rearrange'
                ? 'Rearrange the visual order and rows (categories) of your vehicles.'
                : `Add new, update, or remove ${activeTab} shown on the live sushi travels platform.`}
            </p>
          </div>
          {activeTab !== 'bookings' && activeTab !== 'rearrange' && (
            <button
              onClick={() => openModal('create')}
              className="inline-flex items-center gap-1.5 bg-navy hover:bg-primary text-white text-xs font-bold rounded-full px-5 py-3 transition shadow"
            >
              <Plus className="w-4 h-4" />
              <span className="uppercase tracking-wider">Add New {activeTab === 'fleet' ? 'Vehicle' : activeTab === 'routes' ? 'Route' : 'Review'}</span>
            </button>
          )}
        </div>
        {/* Dynamic tables/grid cards for the lists */}

        {/* BOOKINGS LIST VIEW */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-2xl border border-navy-light/10 shadow-sm overflow-hidden">
            {bookings.length === 0 ? (
              <div className="p-16 text-center text-navy-light/85">No customer bookings found. Placed bookings will appear here.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-cream border-b border-navy-light/10 text-navy font-bold uppercase tracking-wider">
                      <th className="p-4">ID & Created At</th>
                      <th className="p-4">Lead Passenger</th>
                      <th className="p-4">Trip Route</th>
                      <th className="p-4">Schedule</th>
                      <th className="p-4">Vehicle & Pax</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-navy-light/5 text-navy">
                    {bookings.map((b) => (
                      <tr key={b._id} className="hover:bg-cream/40 transition">
                        <td className="p-4">
                          <div className="font-bold text-navy">{b.bookingId}</div>
                          <div className="text-[10px] text-navy-light/85 mt-0.5">
                            {new Date(b.createdAt).toLocaleString()}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="font-bold text-navy">{b.fullName}</div>
                          <div className="text-[10px] text-navy-light/80 font-mono mt-0.5">{b.mobile}</div>
                          <div className="text-[10px] text-navy-light/85">{b.email}</div>
                        </td>
                        <td className="p-4">
                          <span className="bg-navy/5 text-navy text-[10px] font-semibold px-2 py-0.5 rounded uppercase inline-block mb-1">
                            {b.tripType}
                          </span>
                          <div className="font-medium text-navy-light">
                            {b.pickupLocation} <span className="text-primary font-bold">→</span> {b.dropLocation}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="font-bold text-navy">{b.date}</div>
                          <div className="text-[10px] text-navy-light/85 mt-0.5">at {b.time}</div>
                        </td>
                        <td className="p-4">
                          <div className="font-medium">{b.vehicleType}</div>
                          <div className="text-[10px] text-navy-light/85 mt-0.5">{b.passengers} Passenger(s)</div>
                          {b.specialRequests && (
                            <div className="text-[10px] italic text-primary-dark/95 mt-1 max-w-xs truncate" title={b.specialRequests}>
                              &quot;{b.specialRequests}&quot;
                            </div>
                          )}
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase inline-block ${
                            b.status === 'New'
                              ? 'bg-amber-100 text-amber-800 border border-amber-200'
                              : b.status === 'Confirmed'
                              ? 'bg-teal-100 text-teal-800 border border-teal-200'
                              : 'bg-rose-100 text-rose-800 border border-rose-200'
                          }`}>
                            {b.status}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2 whitespace-nowrap">
                          {b.status === 'New' && (
                            <button
                              onClick={() => handleUpdateBookingStatus(b._id, 'Confirmed')}
                              className="p-1.5 bg-teal-50 text-teal-700 hover:bg-teal-100 rounded-full border border-teal-200 transition inline-flex items-center"
                              title="Confirm Booking"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {b.status !== 'Cancelled' && (
                            <button
                              onClick={() => handleUpdateBookingStatus(b._id, 'Cancelled')}
                              className="p-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-full border border-rose-200 transition inline-flex items-center"
                              title="Cancel Booking"
                            >
                              <AlertCircle className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteItem(b._id)}
                            className="p-1.5 text-primary hover:text-primary-dark transition inline-flex items-center"
                            title="Delete Record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* FLEET LIST VIEW */}
        {activeTab === 'fleet' && (
          <div className="bg-white rounded-2xl border border-navy-light/10 shadow-sm overflow-hidden">
            {fleet.length === 0 ? (
              <div className="p-16 text-center text-navy-light/85">No vehicles listed. Add some to get started.</div>
            ) : (
              <>
                {/* Visual Category Filtering & Sorting Options */}
                <div className="p-4 bg-cream/35 border-b border-navy-light/10 flex flex-wrap gap-4 items-center justify-between">
                  <div className="text-xs font-bold text-navy uppercase tracking-wider">
                    Chauffeur Rental Vehicles List ({fleet.length})
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] uppercase tracking-wider text-navy-light font-bold">Filter Category:</span>
                    <select
                      value={adminFleetFilter}
                      onChange={(e) => setAdminFleetFilter(e.target.value)}
                      className="bg-white border border-navy-light/15 rounded-xl px-3 py-1.5 text-xs outline-none text-navy focus:border-primary transition font-bold"
                    >
                      <option value="All">All Categories</option>
                      {Array.from(new Set(fleet.map(v => v.type).filter(Boolean))).map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-cream border-b border-navy-light/10 text-navy font-bold uppercase tracking-wider">
                        <th className="p-4 w-20">Image</th>
                        <th className="p-4">Vehicle Model</th>
                        <th className="p-4">ID / Type</th>
                        <th className="p-4">Capacity</th>
                        <th className="p-4">Rate/km</th>
                        <th className="p-4">AC Info</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-navy-light/5 text-navy">
                      {(() => {
                        const visibleVehicles = fleet
                          .filter(v => adminFleetFilter === 'All' || v.type === adminFleetFilter)
                          .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

                        return visibleVehicles.map((v) => (
                          <tr key={v._id} className="hover:bg-cream/40 transition">
                            <td className="p-4">
                              <div className="relative w-14 h-10 rounded overflow-hidden border border-navy-light/10 bg-cream">
                                {(v.image || (v.images && v.images.length > 0)) && (
                                  <img src={v.images?.[0] || v.image} alt={v.name} title={v.name} className="object-cover w-full h-full" />
                                )}
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="font-bold text-navy">{v.name}</div>
                              <div className="text-[10px] text-navy-light/85 mt-0.5 line-clamp-1 max-w-xs">{v.description}</div>
                            </td>
                            <td className="p-4">
                              <div className="font-mono text-[10px]">{v.id}</div>
                              <span className="bg-navy/5 text-navy text-[9px] font-semibold px-2 py-0.5 rounded uppercase mt-0.5 inline-block">{v.type}</span>
                            </td>
                            <td className="p-4 font-medium">
                              <div>{v.seatsDisplay || `${v.seats} Seats`}</div>
                              <div className="text-[10px] text-navy-light/85">{v.luggage} Bags Limit</div>
                            </td>
                            <td className="p-4 font-medium">
                              {v.priceDisplay || (v.ratePerKmNonAc && v.ratePerKmAc ? `₹${v.ratePerKmNonAc} (Non-AC) / ₹${v.ratePerKmAc} (AC)` : `₹${v.ratePerKm}/km`)}
                            </td>
                            <td className="p-4">
                              {v.acOnly ? (
                                <span className="text-teal-600 font-semibold">AC Only</span>
                              ) : v.hasNonAcOption ? (
                                <span className="text-blue-600 font-semibold">AC & Non-AC</span>
                              ) : (
                                <span>{v.ac ? 'AC Equipped' : 'Non-AC'}</span>
                              )}
                            </td>
                            <td className="p-4 text-right space-x-2">
                              <button
                                onClick={() => openModal('edit', v)}
                                className="p-1.5 text-navy hover:text-primary transition"
                                title="Edit Vehicle"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteItem(v._id)}
                                className="p-1.5 text-primary hover:text-primary-dark transition"
                                title="Delete Vehicle"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ));
                      })()}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        )}

        {/* ROUTES LIST VIEW */}
        {activeTab === 'routes' && (
          <div className="bg-white rounded-2xl border border-navy-light/10 shadow-sm overflow-hidden">
            {routes.length === 0 ? (
              <div className="p-16 text-center text-navy-light/85">No popular holiday routes defined yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-cream border-b border-navy-light/10 text-navy font-bold uppercase tracking-wider">
                      <th className="p-4 w-20">Route Image</th>
                      <th className="p-4">From → To</th>
                      <th className="p-4">Distance</th>
                      <th className="p-4">Duration</th>
                      <th className="p-4">Estimated Fare</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-navy-light/5 text-navy">
                    {routes.map((r) => (
                      <tr key={r._id} className="hover:bg-cream/40 transition">
                        <td className="p-4">
                          <div className="relative w-14 h-10 rounded overflow-hidden border border-navy-light/10 bg-cream">
                            {r.imageUrl && (
                              <img src={r.imageUrl} alt={`${r.from} to ${r.to}`} title={`${r.from} to ${r.to} route`} className="object-cover w-full h-full" />
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="font-bold text-navy">{r.from} to {r.to}</div>
                          <span className="bg-navy/5 text-navy text-[9px] font-semibold px-2.5 py-0.5 rounded uppercase mt-1 inline-block">{r.tripType || 'Round Trip'}</span>
                        </td>
                        <td className="p-4 font-semibold">{r.distance}</td>
                        <td className="p-4 font-medium text-navy-light">{r.duration}</td>
                        <td className="p-4 font-bold text-primary">₹{r.estimatedPrice}</td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => openModal('edit', r)}
                            className="p-1.5 text-navy hover:text-primary transition"
                            title="Edit Route"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(r._id)}
                            className="p-1.5 text-primary hover:text-primary-dark transition"
                            title="Delete Route"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* REVIEWS LIST VIEW */}
        {activeTab === 'reviews' && (
          <div className="bg-white rounded-2xl border border-navy-light/10 shadow-sm overflow-hidden">
            {reviews.length === 0 ? (
              <div className="p-16 text-center text-navy-light/85">No customer reviews found. Seed or create one.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-cream border-b border-navy-light/10 text-navy font-bold uppercase tracking-wider">
                      <th className="p-4">Customer Name</th>
                      <th className="p-4">Location</th>
                      <th className="p-4">Rating</th>
                      <th className="p-4">Testimonial Text</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-navy-light/5 text-navy">
                    {reviews.map((r) => (
                      <tr key={r._id} className="hover:bg-cream/40 transition">
                        <td className="p-4 font-bold">{r.name}</td>
                        <td className="p-4 font-medium text-navy-light">{r.location}</td>
                        <td className="p-4 text-amber-500 font-bold">{r.rating} ★</td>
                        <td className="p-4 max-w-sm text-navy-light leading-relaxed truncate">{r.text}</td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => openModal('edit', r)}
                            className="p-1.5 text-navy hover:text-primary transition"
                            title="Edit Review"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(r._id)}
                            className="p-1.5 text-primary hover:text-primary-dark transition"
                            title="Delete Review"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* REARRANGE VEHICLE CARDS VIEW */}
        {activeTab === 'rearrange' && (() => {
          // Build sorted category list by categoryOrder
          const categoryMap: Record<string, number> = {};
          fleet.forEach((v: any) => {
            if (v.type && !(v.type in categoryMap)) {
              categoryMap[v.type] = v.categoryOrder ?? 0;
            }
          });
          const sortedCategories: string[] = Object.entries(categoryMap)
            .sort((a, b) => a[1] - b[1])
            .map(([cat]) => cat);

          return (
            <div className="space-y-6">
              {/* Save Arrangement Bar */}
              {hasPendingRearrange ? (
                <div className="sticky top-0 z-30 bg-amber-50 border border-amber-300 rounded-2xl px-5 py-4 flex flex-wrap items-center justify-between gap-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-amber-400 animate-pulse inline-block" />
                    <div>
                      <p className="text-sm font-bold text-amber-800">You have unsaved arrangement changes</p>
                      <p className="text-[11px] text-amber-700/80">Rearrange as much as you want, then click Save to apply all changes at once.</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={saveAllRearrangeChanges}
                    disabled={isSavingRearrange}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-md ${
                      isSavingRearrange
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-navy hover:bg-primary text-white active:scale-95'
                    }`}
                  >
                    {isSavingRearrange ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
                        Saving Changes…
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        Confirm Changes
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="bg-navy/5 border border-navy-light/15 rounded-xl px-5 py-3.5 flex flex-wrap items-center justify-between gap-4 text-xs text-navy font-semibold">
                  <div className="flex flex-wrap gap-5">
                    <span className="flex items-center gap-1.5"><span className="font-bold text-primary">▲ ▼</span> Move row up/down</span>
                    <span className="flex items-center gap-1.5"><span className="font-bold text-navy">◀ ▶</span> Reorder cards within row</span>
                    <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded-full bg-primary"></span> Changes are reflected on home page after saving</span>
                  </div>
                  <span className="text-green-700 font-bold text-xs flex items-center gap-1">✓ All saved</span>
                </div>
              )}

              {sortedCategories.map((category, catIdx) => {
                const categoryVehicles = fleet
                  .filter(v => v.type === category)
                  .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
                const rowLabel = categoryVehicles[0]?.homeCategory?.trim() || category;
                const isFirst = catIdx === 0;
                const isLast = catIdx === sortedCategories.length - 1;

                return (
                  <div key={category} className="bg-white rounded-2xl border border-navy-light/10 shadow-sm overflow-hidden">
                    {/* Category Header with Row Move Buttons */}
                    <div className="bg-cream/40 border-b border-navy-light/10 px-6 py-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        {/* Row position badge */}
                        <div className="w-8 h-8 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center shadow-sm shrink-0">
                          {catIdx + 1}
                        </div>
                        <div>
                          <h3 className="text-base font-serif font-bold text-navy flex items-center gap-2">
                            <span className="w-1.5 h-5 bg-primary rounded-full inline-block" />
                            {rowLabel}
                          </h3>
                          <p className="text-[10px] text-navy-light/85 mt-0.5">
                            Category: <span className="font-mono font-bold">{category}</span> · {categoryVehicles.length} vehicle{categoryVehicles.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>

                      {/* Move Row Up / Down */}
                      <div className="flex flex-col gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => moveCategoryOrder(category, 'up')}
                          disabled={isFirst}
                          title="Move this row UP (display earlier)"
                          className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold transition ${
                            isFirst
                              ? 'bg-cream text-navy-light/30 cursor-not-allowed'
                              : 'bg-navy/5 hover:bg-primary hover:text-white text-navy'
                          }`}
                        >
                          ▲
                        </button>
                        <button
                          type="button"
                          onClick={() => moveCategoryOrder(category, 'down')}
                          disabled={isLast}
                          title="Move this row DOWN (display later)"
                          className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold transition ${
                            isLast
                              ? 'bg-cream text-navy-light/30 cursor-not-allowed'
                              : 'bg-navy/5 hover:bg-primary hover:text-white text-navy'
                          }`}
                        >
                          ▼
                        </button>
                      </div>
                    </div>

                    {/* Cards Grid */}
                    <div className="p-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {categoryVehicles.map((v, idx) => {
                          const imgUrl = v.images?.[0] || v.image;
                          return (
                            <div key={v._id} className="group bg-cream/15 rounded-xl border border-navy-light/10 overflow-hidden flex flex-col hover:shadow-md transition">
                              {/* Image Preview Container */}
                              <div className="relative aspect-video w-full overflow-hidden border-b border-navy-light/10 bg-cream">
                                {imgUrl && (
                                  <img
                                    src={imgUrl}
                                    alt={v.name}
                                    title={v.name}
                                    className="object-cover w-full h-full"
                                    style={{
                                      objectPosition: v.imagePositions?.[0] || '50% 50%',
                                      transform: `scale(${v.imageScales?.[0] || 1})`,
                                      transformOrigin: 'center'
                                    }}
                                  />
                                )}
                                <div className="absolute top-2 right-2 bg-navy/80 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase font-sans">
                                  Pos: {idx + 1}
                                </div>
                                {(v.showOnHome === false) && (
                                  <div className="absolute top-2 left-2 bg-rose-600/90 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                                    Hidden
                                  </div>
                                )}
                              </div>

                              {/* Card Content Details */}
                              <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                                <div>
                                  <div className="font-serif font-bold text-sm text-navy">{v.name}</div>
                                  <div className="text-[10px] text-navy-light/85 font-mono mt-0.5">ID: {v.id}</div>
                                </div>

                                {/* Show on Home Toggle */}
                                <label className="flex items-center gap-2 cursor-pointer select-none">
                                  <div
                                    className={`w-8 h-4 rounded-full transition-colors relative ${v.showOnHome !== false ? 'bg-primary' : 'bg-navy-light/20'}`}
                                    onClick={() => {
                                      const updated = { ...v, showOnHome: !(v.showOnHome !== false) };
                                      setFleet(prev => prev.map(item => item._id === v._id ? updated : item));
                                      setHasPendingRearrange(true);
                                    }}
                                  >
                                    <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow transition-all ${v.showOnHome !== false ? 'left-4' : 'left-0.5'}`} />
                                  </div>
                                  <span className={`text-[10px] font-bold ${v.showOnHome !== false ? 'text-primary' : 'text-navy-light/80'}`}>
                                    {v.showOnHome !== false ? 'Shown on Home' : 'Hidden from Home'}
                                  </span>
                                </label>

                                {/* Category Row Shifter */}
                                <div className="space-y-1">
                                  <label className="block text-[9px] font-bold uppercase text-navy-light/85 tracking-wider">Move to Row (Category)</label>
                                  <select
                                    value={v.type}
                                    onChange={(e) => {
                                      const newType = e.target.value;
                                      const newCatOrder = (categoryMap[newType] !== undefined ? categoryMap[newType] : 0);
                                      const updated = { ...v, type: newType, categoryOrder: newCatOrder };
                                      setFleet(prev => prev.map(item => item._id === v._id ? updated : item));
                                      setHasPendingRearrange(true);
                                    }}
                                    className="w-full bg-white border border-navy-light/15 rounded-lg px-2 py-1.5 text-[11px] font-semibold text-navy focus:border-primary outline-none transition cursor-pointer"
                                  >
                                    {sortedCategories.map((cat, ci) => (
                                      <option key={cat} value={cat}>Row {ci + 1}: {cat}</option>
                                    ))}
                                    {/* Also offer any custom categories not yet in sorted list */}
                                    {Array.from(new Set(fleet.map(item => item.type).filter(Boolean)))
                                      .filter(cat => !sortedCategories.includes(cat))
                                      .map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                      ))
                                    }
                                  </select>
                                </div>

                                {/* Placement Sorters Footer */}
                                <div className="border-t border-navy-light/5 pt-3 flex items-center justify-between gap-2">
                                  {/* Left / Right Position Shifters */}
                                  <div className="flex items-center gap-1">
                                    <button
                                      type="button"
                                      onClick={() => moveVehicleInRow(v._id, 'left')}
                                      disabled={idx === 0}
                                      className={`p-1.5 bg-navy/5 hover:bg-navy hover:text-white text-navy rounded-lg text-xs transition font-bold ${
                                        idx === 0 ? 'opacity-30 cursor-not-allowed' : ''
                                      }`}
                                      title="Move Left (Earlier)"
                                    >
                                      ◀
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => moveVehicleInRow(v._id, 'right')}
                                      disabled={idx === categoryVehicles.length - 1}
                                      className={`p-1.5 bg-navy/5 hover:bg-navy hover:text-white text-navy rounded-lg text-xs transition font-bold ${
                                        idx === categoryVehicles.length - 1 ? 'opacity-30 cursor-not-allowed' : ''
                                      }`}
                                      title="Move Right (Later)"
                                    >
                                      ▶
                                    </button>
                                  </div>

                                  {/* Direct Order Number Sorter */}
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-[10px] text-navy-light/85 font-semibold">Order:</span>
                                    <input
                                      type="number"
                                      value={v.sortOrder ?? 0}
                                      onChange={(e) => {
                                        const val = parseInt(e.target.value) || 0;
                                        setFleet(prev => prev.map(item => item._id === v._id ? { ...item, sortOrder: val } : item));
                                        setHasPendingRearrange(true);
                                      }}
                                      className="w-12 text-center border border-navy-light/15 rounded px-1.5 py-1 text-[11px] font-bold text-navy bg-white outline-none focus:border-primary transition"
                                      title="Direct rank index number"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })()}
      </div>

      {/* CREATE & EDIT FORM OVERLAY MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />

          {/* Modal Container */}
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-y-auto border border-navy-light/10 shadow-2xl relative z-10 p-6 sm:p-8 text-navy">
            <div className="border-b border-navy-light/10 pb-4 mb-6">
              <h3 className="text-xl sm:text-2xl font-serif font-bold capitalize text-navy">
                {modalType === 'create' ? 'Add New' : 'Modify'} {activeTab === 'fleet' ? 'Vehicle' : activeTab === 'routes' ? 'Holiday Route' : 'Traveler Testimonial'}
              </h3>
              <p className="text-xs text-navy-light/85">Fill in all fields. {activeTab !== 'reviews' && 'Compressed image will be saved directly in database.'}</p>
            </div>

            {actionError && (
              <div className="mb-6 bg-primary/10 border-l-4 border-primary p-3 rounded-r-xl text-xs text-primary-dark font-medium flex items-start">
                <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                <span>{actionError}</span>
              </div>
            )}

            <form onSubmit={handleCrudSubmit} className="space-y-6">

              {/* VEHICLE FLEET MULTI-IMAGE UPLOADER */}
              {activeTab === 'fleet' && (
                <div className="space-y-2 mb-6">
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy">
                    Vehicle Photo Gallery (Upload multiple photos)
                  </label>
                  <div className="space-y-4">
                    {/* File Upload Box */}
                    <div className="border-2 border-dashed border-navy-light/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary transition bg-cream/35 relative">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleVehicleImagesChange}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      <Upload className="w-6 h-6 text-navy-light/70 mb-2" />
                      <span className="text-xs font-bold text-navy">Select and Upload Multiple Vehicle Images</span>
                      <span className="text-[10px] text-navy-light/85 mt-1">Images resize to max 800x600 & compress automatically</span>
                    </div>

                    {/* Thumbnail Preview Grid */}
                    {vehicleForm.images && vehicleForm.images.length > 0 && (
                      <div className="space-y-3">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-navy-light">
                          Uploaded Photos ({vehicleForm.images.length}) - First photo is the main cover
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {vehicleForm.images.map((img, idx) => {
                            const imgFit = vehicleForm.imageFits?.[idx] || 'cover';
                            const { x, y } = getXandY(vehicleForm.imagePositions?.[idx]);
                            
                            return (
                              <div key={idx} className="bg-white rounded-2xl border border-navy-light/15 overflow-hidden shadow-sm flex flex-col group/thumb">
                                {/* 1. Aspect-Video Image Preview Area */}
                                <div 
                                  className={`relative aspect-video w-full bg-cream overflow-hidden ${imgFit === 'cover' ? 'cursor-pointer hover:opacity-95 transition-opacity' : ''}`}
                                  onClick={() => { if (imgFit === 'cover') openCropModal(idx); }}
                                  title={imgFit === 'cover' ? "Click to adjust crop center" : undefined}
                                >
                                  {imgFit === 'contain' ? (
                                    <div className="w-full h-full relative overflow-hidden bg-cream-warm/30">
                                      <img src={img} alt="" title="Background blur" className="object-cover w-full h-full blur-md opacity-45 scale-110" />
                                      <img src={img} alt={`Preview ${idx + 1}`} title={`Preview ${idx + 1}`} className="object-contain w-full h-full absolute inset-0 z-10 p-1" />
                                    </div>
                                  ) : (
                                    <div className="w-full h-full relative">
                                      <img 
                                        src={img} 
                                        alt={`Preview ${idx + 1}`}
                                        title={`Preview ${idx + 1}`}
                                        className="object-cover w-full h-full" 
                                        style={{
                                          objectPosition: `${x}% ${y}%`,
                                          transform: `scale(${vehicleForm.imageScales?.[idx] || 1})`,
                                          transformOrigin: 'center'
                                        }}
                                      />
                                      
                                      {/* Shaded crop helper overlay: show exactly what is kept vs what is cropped */}
                                      <div className="absolute inset-0 bg-black/25 pointer-events-none" />
                                      <div className="absolute inset-1.5 border border-dashed border-white/60 pointer-events-none rounded-md" />
                                      <span className="absolute bottom-1 right-1 bg-navy/80 text-[7px] text-white font-medium px-1 rounded uppercase tracking-wider">
                                        Crop Bounds
                                      </span>
                                    </div>
                                  )}
                                  
                                  {idx === 0 && (
                                    <span className="absolute top-1.5 left-1.5 bg-primary text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow z-20">
                                      Cover
                                    </span>
                                  )}
                                </div>

                                {/* 2. Control Bar below the image */}
                                <div className="p-2.5 bg-cream/30 border-t border-navy-light/10 space-y-2">
                                  {/* First row: Upload Full Photo Checkbox */}
                                  <label className="flex items-center space-x-2 cursor-pointer select-none">
                                    <input
                                      type="checkbox"
                                      checked={imgFit === 'contain'}
                                      onChange={() => toggleVehicleImageFit(idx)}
                                      className="w-3.5 h-3.5 accent-primary rounded cursor-pointer"
                                    />
                                    <span className="text-[10px] font-bold text-navy">Upload Full Photo</span>
                                  </label>

                                  {/* Crop Position - Adjust Crop button */}
                                  {imgFit === 'cover' && (
                                    <button
                                      type="button"
                                      onClick={() => openCropModal(idx)}
                                      className="w-full py-1.5 bg-navy/5 hover:bg-primary/10 text-navy font-bold rounded-xl text-[10px] transition uppercase tracking-wider"
                                    >
                                      Adjust Crop
                                    </button>
                                  )}

                                  {/* Third row: Action Buttons */}
                                  <div className="flex items-center justify-between gap-1 pt-1.5 border-t border-navy-light/5">
                                    {/* Reorder and Make Cover */}
                                    <div className="flex items-center space-x-1.5">
                                      {idx > 0 && (
                                        <button
                                          type="button"
                                          onClick={() => moveVehicleImage(idx, 'left')}
                                          className="p-1 bg-navy/5 hover:bg-primary hover:text-white text-navy rounded text-xs transition font-bold"
                                          title="Move Left"
                                        >
                                          ←
                                        </button>
                                      )}
                                      {idx < vehicleForm.images.length - 1 && (
                                        <button
                                          type="button"
                                          onClick={() => moveVehicleImage(idx, 'right')}
                                          className="p-1 bg-navy/5 hover:bg-primary hover:text-white text-navy rounded text-xs transition font-bold"
                                          title="Move Right"
                                        >
                                          →
                                        </button>
                                      )}
                                      
                                      {idx !== 0 && (
                                        <button
                                          type="button"
                                          onClick={() => makeVehicleImageCover(idx)}
                                          className="text-[9px] bg-navy/5 hover:bg-navy hover:text-white text-navy font-bold px-1.5 py-0.5 rounded transition uppercase tracking-wider"
                                        >
                                          Make Cover
                                        </button>
                                      )}
                                    </div>

                                    {/* Remove Button */}
                                    <button
                                      type="button"
                                      onClick={() => removeVehicleImage(idx)}
                                      className="p-1 text-rose-600 hover:text-rose-800 transition"
                                      title="Remove Photo"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* COMMON FIELD: Image Upload for routes */}
              {activeTab === 'routes' && (
                <div className="space-y-2 mb-6">
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy">
                    Image Attachment (compressed directly into database)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* File Upload Box */}
                    <div className="sm:col-span-2 border-2 border-dashed border-navy-light/20 rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary transition bg-cream/35 relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageFileChange(e)}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      <Upload className="w-6 h-6 text-navy-light/70 mb-2" />
                      <span className="text-xs font-bold text-navy">Upload / Replace Image File</span>
                      <span className="text-[10px] text-navy-light/85 mt-1">Image resizes to max 800x600 & compresses automatically</span>
                    </div>

                    {/* Preview box */}
                    <div className="border border-navy-light/10 rounded-2xl overflow-hidden flex items-center justify-center bg-cream relative aspect-video sm:aspect-auto">
                      {imagePreview ? (
                        <img src={imagePreview} alt="Upload Preview" title="Upload Preview" className="object-cover w-full h-full" />
                      ) : (
                        <div className="text-center p-4">
                          <ImageIcon className="w-5 h-5 text-navy-light/60 mx-auto mb-1.5" />
                          <span className="text-[10px] text-navy-light/85 font-medium block">No image</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* DYNAMIC FORM FIELDS BY TAB TYPE */}

              {/* FLEET FORM FIELDS */}
              {activeTab === 'fleet' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider">Vehicle ID (unique slug)</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. tempo-traveller-12"
                      value={vehicleForm.id}
                      onChange={(e) => setVehicleForm({ ...vehicleForm, id: e.target.value })}
                      className="w-full bg-cream border border-navy-light/15 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-primary transition font-mono"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="block text-[10px] font-bold uppercase tracking-wider">Vehicle Model Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tempo Traveller (12-Seater)"
                      value={vehicleForm.name}
                      onChange={(e) => setVehicleForm({ ...vehicleForm, name: e.target.value })}
                      className="w-full bg-cream border border-navy-light/15 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-primary transition"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider">Category Type</label>
                    <select
                      value={isCustomCategory ? '__custom__' : vehicleForm.type}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === '__custom__') {
                          setIsCustomCategory(true);
                          setVehicleForm({ ...vehicleForm, type: customCategoryName });
                        } else {
                          setIsCustomCategory(false);
                          setVehicleForm({ ...vehicleForm, type: val });
                        }
                      }}
                      className="w-full bg-cream border border-navy-light/15 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-primary transition font-medium"
                    >
                      {Array.from(new Set([
                        'Sedan', 'SUV', 'Minivan', 'Tempo Traveller', 'Luxury', 'Bus',
                        ...fleet.map(v => v.type).filter(Boolean)
                      ])).map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                      <option value="__custom__" className="text-primary font-bold">+ Create New Category</option>
                    </select>

                    {isCustomCategory && (
                      <div className="mt-2 space-y-1">
                        <label className="block text-[9px] font-bold uppercase tracking-wider text-primary">New Category Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Vintage, Limousine"
                          value={customCategoryName}
                          onChange={(e) => {
                            setCustomCategoryName(e.target.value);
                            setVehicleForm({ ...vehicleForm, type: e.target.value });
                          }}
                          className="w-full bg-cream border-2 border-primary/20 rounded-xl px-4 py-2 text-xs outline-none focus:border-primary transition"
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider">Seats count</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={vehicleForm.seats}
                      onChange={(e) => setVehicleForm({ ...vehicleForm, seats: Number(e.target.value) })}
                      className="w-full bg-cream border border-navy-light/15 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-primary transition"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider">Luggage Limit (Bags)</label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={vehicleForm.luggage}
                      onChange={(e) => setVehicleForm({ ...vehicleForm, luggage: Number(e.target.value) })}
                      className="w-full bg-cream border border-navy-light/15 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-primary transition"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider">Rate per KM (₹)</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={vehicleForm.ratePerKm}
                      onChange={(e) => setVehicleForm({ ...vehicleForm, ratePerKm: Number(e.target.value) })}
                      className="w-full bg-cream border border-navy-light/15 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-primary transition"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider">Driver Bata (₹ / day)</label>
                    <input
                      type="number"
                      placeholder="e.g. 500"
                      value={vehicleForm.driverBata}
                      onChange={(e) => setVehicleForm({ ...vehicleForm, driverBata: e.target.value })}
                      className="w-full bg-cream border border-navy-light/15 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-primary transition"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider">Min run KM/day</label>
                    <input
                      type="number"
                      placeholder="e.g. 300"
                      value={vehicleForm.minKmPerDay}
                      onChange={(e) => setVehicleForm({ ...vehicleForm, minKmPerDay: e.target.value })}
                      className="w-full bg-cream border border-navy-light/15 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-primary transition"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider">Rate AC (₹)</label>
                    <input
                      type="number"
                      placeholder="e.g. 22"
                      value={vehicleForm.ratePerKmAc}
                      onChange={(e) => setVehicleForm({ ...vehicleForm, ratePerKmAc: e.target.value })}
                      className="w-full bg-cream border border-navy-light/15 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-primary transition"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider">Rate Non-AC (₹)</label>
                    <input
                      type="number"
                      placeholder="e.g. 19"
                      value={vehicleForm.ratePerKmNonAc}
                      onChange={(e) => setVehicleForm({ ...vehicleForm, ratePerKmNonAc: e.target.value })}
                      className="w-full bg-cream border border-navy-light/15 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-primary transition"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider">Driving Max Hours</label>
                    <input
                      type="text"
                      placeholder="e.g. 12 hours"
                      value={vehicleForm.drivingHours}
                      onChange={(e) => setVehicleForm({ ...vehicleForm, drivingHours: e.target.value })}
                      className="w-full bg-cream border border-navy-light/15 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-primary transition"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider">Custom Price Display</label>
                    <input
                      type="text"
                      placeholder="e.g. Negotiable (leaves rate blank)"
                      value={vehicleForm.priceDisplay}
                      onChange={(e) => setVehicleForm({ ...vehicleForm, priceDisplay: e.target.value })}
                      className="w-full bg-cream border border-navy-light/15 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-primary transition"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider">Custom Seats Display</label>
                    <input
                      type="text"
                      placeholder="e.g. 21 - 45 seats"
                      value={vehicleForm.seatsDisplay}
                      onChange={(e) => setVehicleForm({ ...vehicleForm, seatsDisplay: e.target.value })}
                      className="w-full bg-cream border border-navy-light/15 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-primary transition"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider">Home Page Row Label</label>
                    <input
                      type="text"
                      placeholder="e.g. Tempo Traveller Luxury Fleet (leave blank to use category)"
                      value={(vehicleForm as any).homeCategory || ''}
                      onChange={(e) => setVehicleForm({ ...vehicleForm, homeCategory: e.target.value } as any)}
                      className="w-full bg-cream border border-navy-light/15 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-primary transition"
                    />
                    <p className="text-[9px] text-navy-light/85">Custom label shown as the row heading on the home page. Shared by all vehicles with the same category.</p>
                  </div>

                  <div className="sm:col-span-2 flex items-center py-2 gap-3 bg-amber-50/60 border border-amber-200/50 rounded-xl px-4">
                    <label className="flex items-center space-x-2 text-xs font-bold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(vehicleForm as any).showOnHome !== false}
                        onChange={(e) => setVehicleForm({ ...vehicleForm, showOnHome: e.target.checked } as any)}
                        className="w-4 h-4 accent-primary rounded border-navy-light/15 outline-none"
                      />
                      <span>Show on Home Page</span>
                    </label>
                    <span className="text-[9px] text-navy-light/85">When unchecked, this vehicle will be hidden from the homepage rows but still visible on the /fleet page.</span>
                  </div>



                  <div className="flex items-center space-x-6 py-2">
                    <label className="flex items-center space-x-2 text-xs font-bold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={vehicleForm.ac}
                        onChange={(e) => setVehicleForm({ ...vehicleForm, ac: e.target.checked })}
                        className="w-4 h-4 accent-primary rounded border-navy-light/15 outline-none"
                      />
                      <span>Is AC?</span>
                    </label>

                    <label className="flex items-center space-x-2 text-xs font-bold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={vehicleForm.acOnly}
                        onChange={(e) => setVehicleForm({ ...vehicleForm, acOnly: e.target.checked })}
                        className="w-4 h-4 accent-primary rounded border-navy-light/15 outline-none"
                      />
                      <span>AC Only?</span>
                    </label>
                  </div>

                  <div className="flex items-center py-2">
                    <label className="flex items-center space-x-2 text-xs font-bold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={vehicleForm.hasNonAcOption}
                        onChange={(e) => setVehicleForm({ ...vehicleForm, hasNonAcOption: e.target.checked })}
                        className="w-4 h-4 accent-primary rounded border-navy-light/15 outline-none"
                      />
                      <span>Has Non-AC option?</span>
                    </label>
                  </div>

                  <div className="sm:col-span-3 space-y-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider">Features list (comma separated)</label>
                    <input
                      type="text"
                      required
                      placeholder="Comfortable Seats, Safety Driver, clean cabin, AC vents..."
                      value={vehicleForm.features}
                      onChange={(e) => setVehicleForm({ ...vehicleForm, features: e.target.value })}
                      className="w-full bg-cream border border-navy-light/15 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-primary transition"
                    />
                  </div>

                  <div className="sm:col-span-3 space-y-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider">Vehicle Description</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Enter short description explaining vehicle highlights..."
                      value={vehicleForm.description}
                      onChange={(e) => setVehicleForm({ ...vehicleForm, description: e.target.value })}
                      className="w-full bg-cream border border-navy-light/15 rounded-xl px-4 py-3 text-xs outline-none focus:border-primary transition"
                    />
                  </div>
                </div>
              )}

              {/* ROUTES FORM FIELDS */}
              {activeTab === 'routes' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider">From Location</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bangalore"
                      value={routeForm.from}
                      onChange={(e) => setRouteForm({ ...routeForm, from: e.target.value })}
                      className="w-full bg-cream border border-navy-light/15 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-primary transition"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider">To Location</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Coorg"
                      value={routeForm.to}
                      onChange={(e) => setRouteForm({ ...routeForm, to: e.target.value })}
                      className="w-full bg-cream border border-navy-light/15 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-primary transition"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider">Distance</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 250 km"
                      value={routeForm.distance}
                      onChange={(e) => setRouteForm({ ...routeForm, distance: e.target.value })}
                      className="w-full bg-cream border border-navy-light/15 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-primary transition"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider">Travel Duration</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 5.5 hrs"
                      value={routeForm.duration}
                      onChange={(e) => setRouteForm({ ...routeForm, duration: e.target.value })}
                      className="w-full bg-cream border border-navy-light/15 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-primary transition"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider">Estimated Fare price (₹)</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 3,250 or Negotiable"
                      value={routeForm.estimatedPrice}
                      onChange={(e) => setRouteForm({ ...routeForm, estimatedPrice: e.target.value })}
                      className="w-full bg-cream border border-navy-light/15 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-primary transition"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider">Compulsory Trip Type</label>
                    <select
                      value={routeForm.tripType}
                      onChange={(e) => setRouteForm({ ...routeForm, tripType: e.target.value })}
                      className="w-full bg-cream border border-navy-light/15 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-primary transition"
                    >
                      <option value="Round Trip">Round Trip</option>
                      <option value="One Way">One Way</option>
                      <option value="Local Package">Local Package</option>
                    </select>
                  </div>
                </div>
              )}

              {/* REVIEWS FORM FIELDS */}
              {activeTab === 'reviews' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider">Customer Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Deshmukh"
                      value={reviewForm.name}
                      onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                      className="w-full bg-cream border border-navy-light/15 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-primary transition"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider">Customer Location</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Pune"
                      value={reviewForm.location}
                      onChange={(e) => setReviewForm({ ...reviewForm, location: e.target.value })}
                      className="w-full bg-cream border border-navy-light/15 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-primary transition"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider">Rating (1 to 5 Stars)</label>
                    <select
                      value={reviewForm.rating}
                      onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
                      className="w-full bg-cream border border-navy-light/15 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-primary transition"
                    >
                      <option value={5}>5 Stars</option>
                      <option value={4}>4 Stars</option>
                      <option value={3}>3 Stars</option>
                      <option value={2}>2 Stars</option>
                      <option value={1}>1 Star</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider">Testimonial Text</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Enter the customer review text..."
                      value={reviewForm.text}
                      onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
                      className="w-full bg-cream border border-navy-light/15 rounded-xl px-4 py-3 text-xs outline-none focus:border-primary transition"
                    />
                  </div>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="border-t border-navy-light/10 pt-5 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="border border-navy-light/25 hover:bg-cream text-navy text-xs font-bold uppercase tracking-wider rounded-xl px-6 py-3 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCompressing}
                  className={`bg-navy hover:bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-xl px-8 py-3 transition shadow-md ${isCompressing ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isCompressing ? 'Processing Image...' : (modalType === 'create' ? 'Save Item' : 'Update Item')}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {cropImageIndex !== null && (
        <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center p-4 bg-navy/95 backdrop-blur-md transition-opacity duration-300">
          {/* Modal Header */}
          <div className="w-full max-w-md flex justify-between items-center mb-6">
            <div>
              <h4 className="text-white text-lg font-serif font-bold">Adjust Crop Position</h4>
              <p className="text-white/60 text-xs mt-0.5">Drag the photo inside the guide to position it</p>
            </div>
            <button 
              type="button"
              onClick={closeCropModal}
              className="text-white/60 hover:text-white transition p-2 hover:bg-white/10 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Crop Viewport */}
          <div 
            ref={cropContainerRef}
            className="relative w-full max-w-md aspect-video bg-neutral-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center select-none cursor-grab active:cursor-grabbing"
            onMouseDown={(e) => {
              e.preventDefault();
              if (cropImageIndex === null) return;
              setIsDraggingCrop(true);
              setCropDragStart({ x: e.clientX, y: e.clientY });
              const { x, y } = getXandY(vehicleForm.imagePositions?.[cropImageIndex]);
              setCropDragStartCoords({ x, y });
            }}
            onTouchStart={(e) => {
              e.preventDefault();
              if (cropImageIndex === null || e.touches.length === 0) return;
              setIsDraggingCrop(true);
              setCropDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
              const { x, y } = getXandY(vehicleForm.imagePositions?.[cropImageIndex]);
              setCropDragStartCoords({ x, y });
            }}
          >
            {/* Dark background overlay */}
            <div className="absolute inset-0 bg-neutral-900 pointer-events-none" />

            <img
              src={vehicleForm.images[cropImageIndex]}
              alt="Crop target"
              title="Crop target"
              onLoad={(e) => {
                const { naturalWidth, naturalHeight } = e.currentTarget;
                setCropImgRatio(naturalWidth / naturalHeight);
              }}
              className="absolute w-full h-full object-cover pointer-events-none select-none"
              style={{
                transform: `scale(${cropZoom})`,
                transformOrigin: 'center',
                objectPosition: (() => {
                  const { x, y } = getXandY(vehicleForm.imagePositions?.[cropImageIndex]);
                  return `${x}% ${y}%`;
                })(),
              }}
            />

            {/* Grid Overlay */}
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
              <div className="border-r border-b border-white/20" />
              <div className="border-r border-b border-white/20" />
              <div className="border-b border-white/20" />
              
              <div className="border-r border-b border-white/20" />
              <div className="border-r border-b border-white/20" />
              <div className="border-b border-white/20" />
              
              <div className="border-r border-white/20" />
              <div className="border-r border-white/20" />
              <div />
            </div>

            {/* Corner Markers (White L-shapes) */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Top-Left */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-white rounded-tl-sm" />
              {/* Top-Right */}
              <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-white rounded-tr-sm" />
              {/* Bottom-Left */}
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-white rounded-bl-sm" />
              {/* Bottom-Right */}
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-white rounded-br-sm" />
            </div>

            {/* Drag helper text */}
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-[10px] text-white/90 px-3 py-1.5 rounded-full font-bold uppercase tracking-wider shadow border border-white/10 pointer-events-none">
              Drag image to crop
            </span>
          </div>

          {/* Zoom Control Slider */}
          <div className="w-full max-w-md mt-6 flex items-center space-x-3 px-2 text-white select-none">
            <ZoomOut className="w-4 h-4 text-white/50 shrink-0" />
            <input
              type="range"
              min="1"
              max="3"
              step="0.01"
              value={cropZoom}
              onChange={(e) => setCropZoom(parseFloat(e.target.value))}
              className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <ZoomIn className="w-4 h-4 text-white/50 shrink-0" />
          </div>

          {/* Save Button */}
          <div className="w-full max-w-md mt-8">
            <button
              type="button"
              onClick={closeCropModal}
              className="w-full py-3.5 bg-primary hover:bg-primary-dark text-white rounded-2xl font-bold transition shadow-lg text-sm uppercase tracking-wider"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
