export const products = [
  // =========================
  // TOPCON PRODUCTS
  // =========================
  {
    id: 1,
    name: "Slit Lamp",
    brand: "Topcon",
    category: "Diagnostic",
    price: 4500,
    isBestSeller: true,
    description: "High precision slit lamp for anterior segment eye examination.",
    imageUrl: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1000"
  },
  {
    id: 2,
    name: "Auto Refractometer",
    brand: "Topcon",
    category: "Diagnostic",
    price: 7200,
    isBestSeller: true,
    description: "Advanced auto refractometer for fast and accurate vision assessment.",
    imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000"
  },
  {
    id: 3,
    name: "Auto Kerato-Refractometer",
    brand: "Topcon",
    category: "Diagnostic",
    price: 8500,
    isBestSeller: false,
    description: "Combined keratometry and refractometry system.",
    imageUrl: "https://images.unsplash.com/photo-1581595219319-7b7c12b3b7e1?q=80&w=1000"
  },
  {
    id: 4,
    name: "Non Contact Tonometer",
    brand: "Topcon",
    category: "Diagnostic",
    price: 6800,
    isBestSeller: false,
    description: "Air-puff tonometer for intraocular pressure measurement.",
    imageUrl: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?q=80&w=1000"
  },
  {
    id: 5,
    name: "OCT with Fundus",
    brand: "Topcon",
    category: "Imaging",
    price: 24000,
    isBestSeller: true,
    description: "Optical Coherence Tomography with integrated fundus imaging.",
    imageUrl: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1000"
  },
  {
    id: 6,
    name: "OCT Angiography",
    brand: "Topcon",
    category: "Imaging",
    price: 26000,
    isBestSeller: false,
    description: "Non-invasive OCT angiography for retinal vascular imaging.",
    imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000"
  },

  // =========================
  // BIOMEDIX PRODUCTS (1st Row)
  // =========================
  {
    id: 7,
    name: "A Scan Biometer",
    brand: "Biomedix",
    category: "Biometry",
    price: 5000,
    isBestSeller: false,
    description: "Ultrasound A-scan biometer for axial length measurement.",
    imageUrl: "https://images.unsplash.com/photo-1581595219319-7b7c12b3b7e1?q=80&w=1000"
  },
  {
    id: 8,
    name: "B Scan Biometer",
    brand: "Biomedix",
    category: "Biometry",
    price: 6200,
    isBestSeller: false,
    description: "High resolution B-scan ultrasound imaging system.",
    imageUrl: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1000"
  },
  {
    id: 9,
    name: "A/B Scan Biometer",
    brand: "Biomedix",
    category: "Biometry",
    price: 7800,
    isBestSeller: false,
    description: "Combined A-scan and B-scan ultrasound biometry system.",
    imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000"
  },
  {
    id: 10,
    name: "OCT with Fundus (Biomedix)",
    brand: "Biomedix",
    category: "Imaging",
    price: 21000,
    isBestSeller: false,
    description: "Biomedix OCT with integrated fundus camera.",
    imageUrl: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?q=80&w=1000"
  },
  {
    id: 11,
    name: "OCT Angiography (Biomedix)",
    brand: "Biomedix",
    category: "Imaging",
    price: 23000,
    isBestSeller: false,
    description: "Advanced angiography imaging system.",
    imageUrl: "https://images.unsplash.com/photo-1581595219319-7b7c12b3b7e1?q=80&w=1000"
  },
  {
    id: 12,
    name: "Visual Field Analyser",
    brand: "Biomedix",
    category: "Diagnostic",
    price: 15000,
    isBestSeller: false,
    description: "Perimetry system for glaucoma and visual field assessment.",
    imageUrl: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1000"
  },

  // =========================
  // BIOMEDIX (2nd Row)
  // =========================
  {
    id: 13,
    name: "Optical Biometer",
    brand: "Biomedix",
    category: "Biometry",
    price: 17000,
    isBestSeller: false,
    description: "Non-contact optical biometry system.",
    imageUrl: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?q=80&w=1000"
  },
  {
    id: 14,
    name: "Hand Held Tonometer",
    brand: "Biomedix",
    category: "Diagnostic",
    price: 4200,
    isBestSeller: false,
    description: "Portable tonometer for accurate intraocular pressure measurement.",
    imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000"
  },
  {
    id: 15,
    name: "Iridex Green Laser",
    brand: "Biomedix",
    category: "Laser",
    price: 19000,
    isBestSeller: false,
    description: "Green laser photocoagulation system for retinal procedures.",
    imageUrl: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1000"
  },

  // =========================
  // NIDEK PRODUCTS
  // =========================
  {
    id: 16,
    name: "YAG Laser",
    brand: "Nidek",
    category: "Laser",
    price: 25000,
    isBestSeller: true,
    description: "Precision YAG laser system for capsulotomy procedures.",
    imageUrl: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?q=80&w=1000"
  },
  {
    id: 17,
    name: "SOPHI",
    brand: "Nidek",
    category: "Surgical",
    price: 35000,
    isBestSeller: false,
    description: "Advanced ophthalmic surgical system.",
    imageUrl: "https://images.unsplash.com/photo-1581595219319-7b7c12b3b7e1?q=80&w=1000"
  },

  // =========================
  // AEON MEDITECH PRODUCTS
  // =========================
  {
    id: 18,
    name: "Green Laser (With LIO & Slit Lamp)",
    brand: "Aeon Meditech",
    category: "Laser",
    price: 22000,
    isBestSeller: false,
    description: "Integrated green laser system with LIO and slit lamp.",
    imageUrl: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1000"
  },
  {
    id: 19,
    name: "Red Laser",
    brand: "Aeon Meditech",
    category: "Laser",
    price: 21000,
    isBestSeller: false,
    description: "High precision red laser ophthalmic system.",
    imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000"
  },

  // =========================
  // PHACOEMULSIFICATION SYSTEM
  // =========================
  {
    id: 20,
    name: "Phacoemulsification System",
    brand: "Phaco Systems",
    category: "Surgical",
    price: 38000,
    isBestSeller: true,
    description: "Premium cataract surgical phaco system with fluidics control.",
    imageUrl: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?q=80&w=1000"
  }
];
