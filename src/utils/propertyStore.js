// Simple localStorage-based property store

const KEY = 'admin_properties';

export const getProperties = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch { return []; }
};

export const saveProperties = (list) => {
  localStorage.setItem(KEY, JSON.stringify(list));
};

export const addProperty = (prop) => {
  const list = getProperties();
  const entry = { ...prop, id: Date.now() };
  list.unshift(entry);
  saveProperties(list);
  return entry;
};

export const updateProperty = (id, data) => {
  const list = getProperties().map(p => p.id === id ? { ...p, ...data } : p);
  saveProperties(list);
};

export const deleteProperty = (id) => {
  saveProperties(getProperties().filter(p => p.id !== id));
};

// Seed with default properties if empty
export const seedDefaults = () => {
  if (getProperties().length > 0) return;
  const defaults = [
    {
      id: 1001,
      title: 'Shiv Prasad Apartment',
      location: 'Airoli, Mumbai',
      price: '₹16.5K/sq.ft',
      area: '651 - 842 sq ft',
      type: 'sale',
      bhk: '1, 2 BHK',
      description: 'Premium apartment in Airoli with modern amenities.',
      imageUrl: '/shiv-prasad.jpg',
      videoUrl: '',
    },
    {
      id: 1002,
      title: 'Premium 2BHK',
      location: 'Matunga East, Mumbai',
      price: '₹4.55 Cr',
      area: '1066 sq ft',
      type: 'sale',
      bhk: '2 BHK',
      description: 'Luxury 2BHK in prime Matunga East location.',
      imageUrl: '/lodha.png',
      videoUrl: '',
    },
    {
      id: 1003,
      title: 'Furnished 1BHK',
      location: 'Sion, Mumbai',
      price: '₹28,000/month',
      area: '550 sq ft',
      type: 'rent',
      bhk: '1 BHK',
      description: 'Fully furnished 1BHK available for immediate rent.',
      imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      videoUrl: '',
    },
  ];
  saveProperties(defaults);
};
