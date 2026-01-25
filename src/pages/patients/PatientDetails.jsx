import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  AlertCircle, 
  CircleCheck, 
  XCircle, 
  TrendingUp, 
  TrendingDown,
  Download,
  Share2,
  Printer,
  Clock,
  Calendar,
  User,
  Smartphone,
  Mail,
  Activity,
  Heart,
  Thermometer,
  Pill,
  Brain,
  Eye,
  Scan,
  Cpu,
  Shield,
  Target,
  BarChart3,
  ChevronRight,
  ExternalLink,
  Video,
  MessageSquare,
  Bell,
  Settings,
  Zap,
  Database,
  Layers,
  GitBranch,
  PieChart,
  LineChart,
  Target as TargetIcon,
  MapPin,
  Circle
} from 'lucide-react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

const ThyroidDiagnosisResult = ({ dashboardMode = false }) => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [is3DLoaded, setIs3DLoaded] = useState(false);
  const [scanRotation, setScanRotation] = useState(0);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  // Mock AI Diagnosis Result - All in English
  const mockDiagnosis = {
    patientInfo: {
      id: patientId || "THY-2024-001234",
      name: "Mohamed Ahmed",
      age: 42,
      gender: "Male",
      phone: "+20 100 123 4567",
      email: "mohamed.ahmed@example.com",
      registrationDate: "2024-02-15",
      lastScan: "2024-03-20",
      scanId: "SCAN-78901",
      aiModelVersion: "ThyroScan AI v3.2.1",
      patientNumber: "PAT-789456",
      address: "123 Medical Street, Cairo",
      bloodType: "O+",
      allergies: "None",
      weight: "75 kg",
      height: "175 cm",
      bmi: "24.5"
    },
    
    diagnosisSummary: {
      status: "MALIGNANT",
      confidence: 94.7,
      thyroidCondition: "Papillary Thyroid Carcinoma",
      severity: "Moderate",
      riskLevel: "High",
      recommendation: "Immediate surgical resection with radioactive iodine therapy",
      urgency: "HIGH"
    },
    
    noduleAnalysis: {
      totalNodules: 3,
      suspiciousNodules: 2,
      largestNodule: {
        size: "2.8 cm",
        location: "Right Lobe - Inferior",
        tiradsScore: 5,
        characteristics: ["Irregular", "Microcalcifications", "Heterogeneous", "Rapid Growth"]
      },
      nodules: [
        {
          id: "NOD-001",
          size: "2.8 cm",
          location: "Right Lobe",
          tirads: 5,
          malignancyProbability: 92,
          characteristics: ["Irregular", "Microcalcifications", "Rapid Growth"],
          coordinates: { x: 2.8, y: 0.5, z: 0.3 } // 3D coordinates for the tumor
        },
        {
          id: "NOD-002",
          size: "1.2 cm",
          location: "Left Lobe",
          tirads: 4,
          malignancyProbability: 65,
          characteristics: ["Heterogeneous", "Absent Halo"],
          coordinates: { x: -1.5, y: 0.3, z: 0.2 }
        },
        {
          id: "NOD-003",
          size: "0.8 cm",
          location: "Left Lobe",
          tirads: 2,
          malignancyProbability: 5,
          characteristics: ["Smooth", "Homogeneous"],
          coordinates: { x: -2.0, y: -0.2, z: 0.1 }
        }
      ]
    },
    
    aiMetrics: {
      accuracy: 96.3,
      sensitivity: 94.8,
      specificity: 97.1,
      processingTime: "3.2 seconds",
      modelConfidence: 98.7,
      dataPointsAnalyzed: 12500
    },
    
    biomarkers: {
      tsh: { value: 0.15, normalRange: "0.4-4.0", unit: "mIU/L", status: "Very Low" },
      t4: { value: 18.9, normalRange: "4.5-12.0", unit: "μg/dL", status: "Very High" },
      t3: { value: 325, normalRange: "80-200", unit: "ng/dL", status: "Very High" },
      calcitonin: { value: 45, normalRange: "0-10", unit: "pg/mL", status: "High" },
      thyroglobulin: { value: 380, normalRange: "0-40", unit: "ng/mL", status: "Very High" }
    },
    
    timeline: [
      {
        date: "2024-03-20",
        event: "AI Diagnosis",
        description: "Detected 3 nodules - 2 suspicious",
        status: "Diagnosis"
      },
      {
        date: "2024-03-15",
        event: "Ultrasound Examination",
        description: "Expert opinion: Suspected malignancy",
        status: "Examination"
      },
      {
        date: "2024-02-28",
        event: "First Symptom Appearance",
        description: "Neck swelling and difficulty swallowing",
        status: "Symptoms"
      },
      {
        date: "2024-02-15",
        event: "Initial Consultation",
        description: "Patient registration and initial tests",
        status: "Consultation"
      }
    ],
    
    recommendations: [
      {
        type: "Surgical",
        title: "Total Thyroidectomy",
        urgency: "Immediate",
        details: "Within 2-4 weeks",
        icon: "🔪"
      },
      {
        type: "Therapeutic",
        title: "Radioactive Iodine 131I Therapy",
        urgency: "Post-surgery",
        details: "High dosage treatment",
        icon: "☢️"
      },
      {
        type: "Laboratory",
        title: "Fine Needle Aspiration Biopsy",
        urgency: "Immediate",
        details: "For diagnosis confirmation",
        icon: "🔬"
      },
      {
        type: "Follow-up",
        title: "Regular 3-month checkups",
        urgency: "Continuous",
        details: "For 5 years duration",
        icon: "📅"
      }
    ],
    
    statistics: {
      survivalRate: { value: 98, description: "5-Year Survival Rate" },
      recurrenceRate: { value: 15, description: "Recurrence Rate" },
      treatmentSuccess: { value: 92, description: "Treatment Success Rate" },
      commonality: { value: 3.1, description: "Global Prevalence" }
    }
  };

  // Disease location number from ML model (hardcoded for testing - will come from backend)
  // Change this number (1-8) to test different marker positions on the thyroid
  const diseaseLocationNumber = 1;

  // Disease Location Mapping - Maps ML output numbers to 3D positions on the thyroid
  // Position 1 is now in the exact center of the thyroid for precise marking
  const DISEASE_LOCATION_MAP = {
    1: { position: { x: -0.40, y: -0.5, z: 0.3 }, label: "Thyroid Center", description: "Center of thyroid gland" },
    2: { position: { x: 0.5, y: 0.2, z: 0.25 }, label: "Right Lobe - Superior", description: "Upper right thyroid region" },
    3: { position: { x: 0.6, y: 0, z: 0.3 }, label: "Right Lobe - Middle", description: "Central right thyroid region" },
    4: { position: { x: 0.5, y: -0.2, z: 0.25 }, label: "Right Lobe - Inferior", description: "Lower right thyroid region" },
    5: { position: { x: -0.5, y: 0.2, z: 0.25 }, label: "Left Lobe - Superior", description: "Upper left thyroid region" },
    6: { position: { x: -0.6, y: 0, z: 0.3 }, label: "Left Lobe - Middle", description: "Central left thyroid region" },
    7: { position: { x: -0.5, y: -0.2, z: 0.25 }, label: "Left Lobe - Inferior", description: "Lower left thyroid region" },
    8: { position: { x: 0, y: 0.15, z: 0.2 }, label: "Isthmus", description: "Isthmus region" },
  };

  // Initialize 3D Thyroid Model with GLB Loading
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a1628); // Dark professional background
    
    const camera = new THREE.PerspectiveCamera(50, canvasRef.current.clientWidth / canvasRef.current.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 4);
    
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      antialias: true,
      alpha: true 
    });
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 2;
    controls.maxDistance = 8;
    controls.autoRotate = false; // User controls rotation manually
    
    // Professional lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);
    
    const fillLight = new THREE.DirectionalLight(0x4fc3f7, 0.6);
    fillLight.position.set(-5, 0, 5);
    scene.add(fillLight);
    
    const backLight = new THREE.DirectionalLight(0xff7043, 0.4);
    backLight.position.set(0, -5, -5);
    scene.add(backLight);

    // Add subtle environment lighting
    const hemisphereLight = new THREE.HemisphereLight(0x87ceeb, 0x1a237e, 0.3);
    scene.add(hemisphereLight);

    // Store animated objects for the animation loop
    let diseaseMarker = null;
    let pulseRing = null;
    let markerLabel = null;
    let thyroidModel = null;

    // Create professional disease marker
    const createDiseaseMarker = (locationData) => {
      const markerGroup = new THREE.Group();
      const pos = locationData.position;

      // Main marker sphere (glowing red/orange)
      const markerGeometry = new THREE.SphereGeometry(0.08, 32, 32);
      const markerMaterial = new THREE.MeshPhongMaterial({
        color: 0xff4444,
        emissive: 0xff2222,
        emissiveIntensity: 0.8,
        transparent: true,
        opacity: 0.95,
        shininess: 100
      });
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      marker.position.set(pos.x, pos.y, pos.z);
      markerGroup.add(marker);
      diseaseMarker = marker;

      // Outer pulse ring
      const ringGeometry = new THREE.RingGeometry(0.1, 0.15, 32);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0xff6666,
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.position.set(pos.x, pos.y, pos.z + 0.01);
      markerGroup.add(ring);
      pulseRing = ring;

      // Inner glow sphere
      const glowGeometry = new THREE.SphereGeometry(0.12, 32, 32);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xff4444,
        transparent: true,
        opacity: 0.3
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      glow.position.set(pos.x, pos.y, pos.z);
      markerGroup.add(glow);

      // Pointer line from marker
      const linePoints = [
        new THREE.Vector3(pos.x, pos.y, pos.z),
        new THREE.Vector3(pos.x + 0.5, pos.y + 0.4, pos.z + 0.3)
      ];
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);
      const lineMaterial = new THREE.LineBasicMaterial({ 
        color: 0xff6666, 
        linewidth: 2,
        transparent: true,
        opacity: 0.8
      });
      const line = new THREE.Line(lineGeometry, lineMaterial);
      markerGroup.add(line);

      // Create label at end of pointer line
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 512;
      canvas.height = 128;
      
      // Label background with gradient
      const gradient = context.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, 'rgba(239, 68, 68, 0.95)');
      gradient.addColorStop(1, 'rgba(234, 88, 12, 0.95)');
      context.fillStyle = gradient;
      context.beginPath();
      context.roundRect(10, 10, canvas.width - 20, canvas.height - 20, 15);
      context.fill();
      
      // Border
      context.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      context.lineWidth = 3;
      context.stroke();
      
      // Text
      context.fillStyle = '#ffffff';
      context.font = 'bold 32px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(locationData.label, canvas.width / 2, canvas.height / 2);

      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({ 
        map: texture,
        transparent: true 
      });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.position.set(pos.x + 0.5, pos.y + 0.4, pos.z + 0.3);
      sprite.scale.set(1.2, 0.3, 1);
      markerGroup.add(sprite);
      markerLabel = sprite;

      scene.add(markerGroup);
      return markerGroup;
    };

    // Load the thyroid GLB model
    const loader = new GLTFLoader();
    loader.load(
      '/models/thyroid.glb',
      (gltf) => {
        thyroidModel = gltf.scene;
        
        // Center and scale the model
        const box = new THREE.Box3().setFromObject(thyroidModel);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        // Calculate scale to fit nicely in view
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2 / maxDim;
        thyroidModel.scale.setScalar(scale);
        
        // Center the model
        thyroidModel.position.x = -center.x * scale;
        thyroidModel.position.y = -center.y * scale;
        thyroidModel.position.z = -center.z * scale;

        // Keep original GLB materials/colors - just enhance them
        thyroidModel.traverse((child) => {
          if (child.isMesh) {
            // Keep original material but enhance it
            if (child.material) {
              child.material.transparent = true;
              child.material.opacity = 0.9;
              child.material.needsUpdate = true;
            }
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        scene.add(thyroidModel);

        // Add disease marker based on the location number
        const locationData = DISEASE_LOCATION_MAP[diseaseLocationNumber];
        if (locationData) {
          createDiseaseMarker(locationData);
        }

        setIs3DLoaded(true);
      },
      (progress) => {
        // Loading progress
        console.log('Loading thyroid model:', (progress.loaded / progress.total * 100).toFixed(1) + '%');
      },
      (error) => {
        console.error('Error loading thyroid model:', error);
        // Fallback to simple representation if GLB fails
        const fallbackGeometry = new THREE.TorusGeometry(0.8, 0.3, 16, 100);
        const fallbackMaterial = new THREE.MeshPhongMaterial({
          color: 0x4a90d9,
          transparent: true,
          opacity: 0.85,
          shininess: 80
        });
        const fallbackMesh = new THREE.Mesh(fallbackGeometry, fallbackMaterial);
        fallbackMesh.rotation.x = Math.PI / 2;
        scene.add(fallbackMesh);
        
        // Still add marker
        const locationData = DISEASE_LOCATION_MAP[diseaseLocationNumber];
        if (locationData) {
          createDiseaseMarker(locationData);
        }
        
        setIs3DLoaded(true);
      }
    );

    // Add grid helper for depth perception
    const gridHelper = new THREE.GridHelper(4, 20, 0x1e3a5f, 0x0d1f3c);
    gridHelper.position.y = -1.5;
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.3;
    scene.add(gridHelper);

    // Animation loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      const time = Date.now() * 0.001;
      
      // Animate disease marker
      if (diseaseMarker) {
        // Pulsing scale effect
        const pulseScale = 1 + Math.sin(time * 3) * 0.2;
        diseaseMarker.scale.setScalar(pulseScale);
        
        // Glowing intensity variation
        if (diseaseMarker.material) {
          diseaseMarker.material.emissiveIntensity = 0.6 + Math.sin(time * 4) * 0.4;
        }
      }
      
      // Animate pulse ring
      if (pulseRing) {
        const ringScale = 1 + Math.sin(time * 2) * 0.3;
        pulseRing.scale.setScalar(ringScale);
        if (pulseRing.material) {
          pulseRing.material.opacity = 0.3 + Math.sin(time * 2) * 0.3;
        }
      }

      // Subtle model rotation (if not auto-rotating via controls)
      if (thyroidModel && !controls.autoRotate) {
        thyroidModel.rotation.y = Math.sin(time * 0.3) * 0.1;
      }
      
      controls.update();
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      if (!canvasRef.current) return;
      camera.aspect = canvasRef.current.clientWidth / canvasRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      scene.clear();
    };
  }, [diseaseLocationNumber]);

  // Animation for scan rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setScanRotation(prev => (prev + 1) % 360);
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  const handleDownloadReport = () => {
    // Implement download functionality
    console.log('Downloading report...');
    alert('Report download initiated');
  };

  const handleShareResults = () => {
    // Implement share functionality
    console.log('Sharing results...');
    alert('Share functionality triggered');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'MALIGNANT': return 'bg-gradient-to-r from-red-500 to-red-600 text-white';
      case 'BENIGN': return 'bg-gradient-to-r from-green-500 to-green-600 text-white';
      case 'SUSPICIOUS': return 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch(urgency) {
      case 'HIGH': return 'bg-gradient-to-r from-red-500 to-red-600';
      case 'MEDIUM': return 'bg-gradient-to-r from-yellow-500 to-yellow-600';
      case 'LOW': return 'bg-gradient-to-r from-green-500 to-green-600';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen overflow-hidden text-gray-800 bg-gradient-to-br from-gray-50 to-white">
      {!dashboardMode && (
        <>
          {/* Animated Background Elements */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 bg-primary/10 rounded-full w-96 h-96 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 rounded-full w-96 h-96 bg-primary/5 blur-3xl"></div>
          </div>
        </>
      )}

      <div className={`relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 ${dashboardMode ? 'pt-0 pb-8' : 'pt-8 pb-16'}`}>
        
        {/* Header - Only show if not in dashboardMode */}
        {!dashboardMode && (
          <div className="flex flex-col items-start justify-between mb-8 lg:flex-row lg:items-center" data-aos="fade-down">
            <div>
              <button 
                onClick={() => navigate(-1)}
                className="flex items-center mb-4 text-gray-600 transition-colors hover:text-gray-900 group"
              >
                <ArrowLeft className="w-5 h-5 mr-2 transition-transform transform group-hover:-translate-x-1" />
                Back
              </button>
              <h1 className="text-4xl font-bold text-primary ">
                Thyroid AI Diagnosis Results
              </h1>
              <p className="mt-2 text-gray-600">Advanced analysis using ThyroScan AI technology</p>
            </div>
            
            <div className="flex gap-3 mt-4 lg:mt-0">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownloadReport}
                className="flex items-center px-6 py-3 text-white transition-all bg-primary rounded-xl hover:shadow-lg "
              >
                <Download className="w-5 h-5 mr-2" />
                Download Report
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShareResults}
                className="flex items-center px-6 py-3 text-white transition-all bg-primaryHover shadow-lg shadow-primaryHover/20 rounded-xl hover:shadow-lg"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Share Results
              </motion.button>
            </div>
          </div>
        )}

        {/* Patient Information Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="p-6 mb-8 bg-white border border-gray-200 shadow-lg rounded-2xl"
        >
          <h2 className="flex items-center mb-6 text-2xl font-bold text-primary">
            <User className="w-6 h-6 mr-3 text-primary" />
            Patient Information
          </h2>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Patient Name</p>
                <p className="text-lg font-bold text-gray-800">{mockDiagnosis.patientInfo.name}</p>
                <p className="text-sm text-gray-500">Age: {mockDiagnosis.patientInfo.age} • {mockDiagnosis.patientInfo.gender}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <Smartphone className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Patient ID</p>
                <p className="text-lg font-bold text-gray-800 dir-ltr">{mockDiagnosis.patientInfo.id}</p>
                <p className="text-sm text-gray-500">{mockDiagnosis.patientInfo.phone}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Cpu className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">AI Model Version</p>
                <p className="text-lg font-bold text-gray-800">{mockDiagnosis.patientInfo.aiModelVersion}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-red-100 rounded-xl">
                <Calendar className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Diagnosis Date</p>
                <p className="text-lg font-bold text-gray-800">{mockDiagnosis.patientInfo.lastScan}</p>
              </div>
            </div>
          </div>
          
          {/* Additional Patient Details */}
          <div className="grid grid-cols-2 gap-4 mt-6 md:grid-cols-4">
            <div className="p-3 rounded-lg bg-gray-50">
              <p className="text-sm text-gray-500">Blood Type</p>
              <p className="font-bold text-gray-800">{mockDiagnosis.patientInfo.bloodType}</p>
            </div>
            <div className="p-3 rounded-lg bg-gray-50">
              <p className="text-sm text-gray-500">BMI</p>
              <p className="font-bold text-gray-800">{mockDiagnosis.patientInfo.bmi}</p>
            </div>
            <div className="p-3 rounded-lg bg-gray-50">
              <p className="text-sm text-gray-500">Weight/Height</p>
              <p className="font-bold text-gray-800">{mockDiagnosis.patientInfo.weight} / {mockDiagnosis.patientInfo.height}</p>
            </div>
            <div className="p-3 rounded-lg bg-gray-50">
              <p className="text-sm text-gray-500">Allergies</p>
              <p className="font-bold text-gray-800">{mockDiagnosis.patientInfo.allergies}</p>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          {/* Left Column - 3D Visualization & Diagnosis */}
          <div className="space-y-8 lg:col-span-2">
            
            {/* 3D Thyroid Visualization */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="p-6 bg-white border border-gray-200 shadow-lg rounded-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="flex items-center text-2xl font-bold text-primary">
                  <TargetIcon className="w-6 h-6 mr-2 text-primary" />
                  3D Thyroid Gland Visualization
                </h2>
                <div className="flex items-center text-green-600">
                  <div className="w-3 h-3 mr-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm">Live Model</span>
                </div>
              </div>
              
              <div className="relative overflow-hidden border border-gray-200 h-96 rounded-xl bg-gradient-to-b from-gray-50 to-white">
                <canvas 
                  ref={canvasRef} 
                  className="w-full h-full"
                />
                
                {!is3DLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
                      <p className="text-gray-600">Loading 3D Thyroid Model...</p>
                    </div>
                  </div>
                )}
                
                {/* Scan Animation */}
                <div className="absolute inset-0 pointer-events-none">
                  <div 
                    className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
                    style={{ 
                      top: `${Math.sin(scanRotation * Math.PI / 180) * 50 + 50}%`,
                      transform: `rotate(${scanRotation}deg)`
                    }}
                  ></div>
                </div>
                
                {/* Legend */}
                <div className="absolute p-4 bg-white border border-gray-200 rounded-lg shadow-lg bottom-4 left-4">
                  <h4 className="mb-3 font-bold text-gray-800">Visual Legend</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 mr-2 bg-primary rounded-full"></div>
                      <span className="text-sm text-gray-700">Healthy Tissue</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-2 text-red-500" />
                      <span className="text-sm text-gray-700">Tumor Location</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 mr-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-700">Suspicious Nodule</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 mr-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Benign Nodule</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-6 md:grid-cols-4">
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="p-4 border border-gray-200 bg-gray-50 rounded-xl"
                >
                  <div className="mb-1 text-sm text-gray-500">Total Nodules</div>
                  <div className="text-2xl font-bold text-primary">
                    <CountUp end={mockDiagnosis.noduleAnalysis.totalNodules} duration={2} />
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="p-4 border border-gray-200 bg-gray-50 rounded-xl"
                >
                  <div className="mb-1 text-sm text-gray-500">Suspicious Nodules</div>
                  <div className="text-2xl font-bold text-red-600">
                    <CountUp end={mockDiagnosis.noduleAnalysis.suspiciousNodules} duration={2} />
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="p-4 border border-gray-200 bg-gray-50 rounded-xl"
                >
                  <div className="mb-1 text-sm text-gray-500">Largest Nodule</div>
                  <div className="text-2xl font-bold text-yellow-600">
                    {mockDiagnosis.noduleAnalysis.largestNodule.size}
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="p-4 border border-gray-200 bg-gray-50 rounded-xl"
                >
                  <div className="mb-1 text-sm text-gray-500">TI-RADS Score</div>
                  <div className="text-2xl font-bold text-purple-600">
                    {mockDiagnosis.noduleAnalysis.largestNodule.tiradsScore}
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Diagnosis Result */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-2xl p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="flex items-center text-2xl font-bold">
                    <AlertCircle className="w-8 h-8 mr-3" />
                    Final Diagnosis Result
                  </h2>
                  <p className="mt-2 text-white/90">Advanced AI-powered analysis</p>
                </div>
                
                <div className="text-right">
                  <div className="text-sm opacity-90">AI Confidence Level</div>
                  <div className="text-4xl font-bold">
                    <CountUp end={mockDiagnosis.diagnosisSummary.confidence} decimals={1} suffix="%" duration={3} />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl">
                  <h3 className="mb-4 text-xl font-bold">Diagnosis Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white/90">Status:</span>
                      <span className={`px-4 py-2 font-bold rounded-full ${getStatusColor(mockDiagnosis.diagnosisSummary.status)}`}>
                        {mockDiagnosis.diagnosisSummary.status === 'MALIGNANT' ? 'MALIGNANT' : 'BENIGN'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/90">Cancer Type:</span>
                      <span className="font-bold">{mockDiagnosis.diagnosisSummary.thyroidCondition}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/90">Severity Level:</span>
                      <span className="font-bold">{mockDiagnosis.diagnosisSummary.severity}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/90">Risk Level:</span>
                      <span className="font-bold">{mockDiagnosis.diagnosisSummary.riskLevel}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl">
                  <h3 className="mb-4 text-xl font-bold">Immediate Recommendation</h3>
                  <p className="mb-4 text-white/90">{mockDiagnosis.diagnosisSummary.recommendation}</p>
                  <div className="flex items-center text-white/80">
                    <Clock className="w-5 h-5 mr-2" />
                    <span>Required Action: {mockDiagnosis.diagnosisSummary.urgency === 'HIGH' ? 'IMMEDIATE' : 'NON-URGENT'}</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Detailed Nodule Analysis */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="p-6 bg-white border border-gray-200 shadow-lg rounded-2xl"
            >
              <h2 className="flex items-center mb-6 text-2xl font-bold text-green-600">
                <Activity className="w-6 h-6 mr-2 text-green-600" />
                Detailed Nodule Analysis
              </h2>
              
              <div className="space-y-4">
                {mockDiagnosis.noduleAnalysis.nodules.map((nodule, index) => (
                  <motion.div 
                    key={nodule.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 transition-all border border-gray-200 bg-gray-50 rounded-xl hover:border-blue-200"
                  >
                    <div className="flex flex-col justify-between md:flex-row md:items-center">
                      <div>
                        <div className="flex items-center mb-2">
                          <div className={`w-4 h-4 rounded-full mr-3 ${
                            nodule.tirads >= 4 ? 'bg-red-500 animate-pulse' : 
                            nodule.tirads >= 3 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}></div>
                          <h3 className="text-lg font-bold text-gray-800">{nodule.id}</h3>
                          <span className="mr-3 text-gray-600">- {nodule.location}</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {nodule.characteristics.map((char, idx) => (
                            <span key={idx} className="px-3 py-1 text-sm text-gray-700 bg-gray-200 rounded-full">
                              {char}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-col md:items-end">
                        <div className="mb-2 text-2xl font-bold text-blue-600">{nodule.size}</div>
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <div className="text-sm text-gray-500">TI-RADS</div>
                            <div className="text-xl font-bold text-gray-800">{nodule.tirads}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-gray-500">Malignancy Probability</div>
                            <div className="text-xl font-bold text-red-600">
                              <CountUp end={nodule.malignancyProbability} suffix="%" duration={2} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Probability Bar */}
                    <div className="mt-4">
                      <div className="flex justify-between mb-1 text-sm text-gray-500">
                        <span>Malignancy Probability</span>
                        <span>{nodule.malignancyProbability}%</span>
                      </div>
                      <div className="h-2 overflow-hidden bg-gray-200 rounded-full">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${nodule.malignancyProbability}%` }}
                          transition={{ duration: 2, delay: index * 0.2 }}
                          className={`h-full rounded-full ${
                            nodule.malignancyProbability > 70 ? 'bg-gradient-to-r from-red-600 to-red-400' :
                            nodule.malignancyProbability > 30 ? 'bg-gradient-to-r from-yellow-600 to-yellow-400' :
                            'bg-gradient-to-r from-green-600 to-green-400'
                          }`}
                        ></motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* AI Analysis Images */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="p-6 mt-8 bg-white border border-gray-200 shadow-lg rounded-2xl"
            >
              <h2 className="flex items-center mb-6 text-2xl font-bold text-primary">
                <Scan className="w-6 h-6 mr-2 text-primary" />
                Thyroid Scan Analysis
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                 {[1, 2, 3].map((item) => (
                    <div key={item} className="relative overflow-hidden transition-all border border-gray-200 rounded-xl group hover:shadow-lg">
                      <div className="aspect-video bg-gray-100 relative">
                        {/* Placeholder for real ML images */}
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                          <Scan className="w-12 h-12 opacity-50" />
                        </div>
                        <img 
                          src={`/api/placeholder/400/300?text=Thyroid+Scan+${item}`}
                          alt={`Analysis ${item}`}
                          className="object-cover w-full h-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          onError={(e) => e.target.style.display = 'none'}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-4">
                           <p className="text-white font-medium">Nodule Segment {item}</p>
                        </div>
                      </div>
                      <div className="p-3 bg-white">
                        <div className="flex justify-between items-center mb-1">
                           <span className="text-xs font-bold text-red-500 uppercase">Suspicious</span>
                           <span className="text-xs text-gray-500">Confidence: 9{item}.5%</span>
                        </div>
                        <p className="text-sm text-gray-600">Automated segmentation detected irregular margins.</p>
                      </div>
                    </div>
                 ))}
              </div>
            </motion.div>


          </div>
          
          {/* Right Column - Stats & Recommendations */}
          <div className="space-y-8">
            
            {/* AI Performance Stats */}

            
            {/* Biomarkers */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-6 bg-white border border-gray-200 shadow-lg rounded-2xl"
            >
              <h2 className="flex items-center mb-6 text-2xl font-bold text-yellow-600">
                <Brain className="w-6 h-6 mr-2 text-yellow-600" />
                Biomarkers Analysis
              </h2>
              
              <div className="space-y-4">
                {Object.entries(mockDiagnosis.biomarkers).map(([key, biomarker], index) => (
                  <div key={key} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-800">{key.toUpperCase()}</span>
                      <div className="flex items-center">
                        <span className="mr-2 text-xl font-bold text-gray-800">
                          {typeof biomarker.value === 'number' ? biomarker.value.toFixed(2) : biomarker.value}
                        </span>
                        <span className="text-sm text-gray-500">{biomarker.unit}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between mb-2 text-sm">
                      <span className="text-gray-500">Normal Range: {biomarker.normalRange}</span>
                      <span className={
                        biomarker.status.includes('High') ? 'text-red-600 font-bold' :
                        biomarker.status.includes('Low') ? 'text-blue-600 font-bold' : 'text-green-600 font-bold'
                      }>
                        {biomarker.status}
                      </span>
                    </div>
                    
                    <div className="h-2 overflow-hidden bg-gray-200 rounded-full">
                      <div className={`h-full rounded-full ${
                        biomarker.status.includes('Very High') ? 'bg-gradient-to-r from-red-600 to-red-400' :
                        biomarker.status.includes('Very Low') ? 'bg-gradient-to-r from-blue-600 to-blue-400' :
                        biomarker.status.includes('High') ? 'bg-gradient-to-r from-orange-600 to-orange-400' :
                        biomarker.status.includes('Low') ? 'bg-gradient-to-r from-cyan-600 to-cyan-400' :
                        'bg-gradient-to-r from-green-600 to-green-400'
                      }`} style={{ 
                        width: typeof biomarker.value === 'number' 
                          ? `${Math.min(100, (biomarker.value / 20) * 100)}%` 
                          : '100%' 
                      }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Treatment Plan & Recommendations */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="p-6 bg-white border border-gray-200 shadow-lg rounded-2xl"
            >
              <h2 className="flex items-center mb-6 text-2xl font-bold text-gray-800">
                <Shield className="w-6 h-6 mr-2 text-cyan-600" />
                Treatment Plan & Recommendations
              </h2>
              
              <div className="space-y-4">
                {mockDiagnosis.recommendations.map((rec, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ x: 5 }}
                    className="p-4 border border-gray-200 bg-gradient-to-r from-gray-50 to-white rounded-xl"
                  >
                    <div className="flex items-center mb-3">
                      <span className="mr-3 text-2xl">{rec.icon}</span>
                      <div>
                        <div className="font-bold text-gray-800">{rec.title}</div>
                        <div className="text-sm text-gray-500">{rec.type}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{rec.details}</span>
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                        rec.urgency === 'Immediate' ? 'bg-red-100 text-red-800' :
                        rec.urgency === 'Post-surgery' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {rec.urgency}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Patient Tracking Section */}
              <div className="p-4 mt-6 border border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-blue-700">Patient Tracking Number:</span>
                  <span className="font-mono text-lg font-bold text-blue-800 dir-ltr">{mockDiagnosis.patientInfo.patientNumber}</span>
                </div>
                <p className="text-sm text-gray-600">
                  Patient can use this number to log into the app for follow-up and receive updates
                </p>
              </div>
            </motion.div>
            
                                {/* Diagnosis Timeline */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="p-6 mt-8 bg-white border border-gray-200 shadow-lg rounded-2xl"
        >
          <h2 className="mb-6 text-2xl font-bold text-primary">Diagnosis Timeline</h2>
          
          <div className="relative">
            <div className="absolute left-1 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-transparent"></div>
            
            <div className="space-y-8">
              {mockDiagnosis.timeline.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="relative flex items-center"
                >
                  <div className="absolute z-10 w-8 h-8 border-4 rounded-full border-[#e1e3e4] -left-3 bg-primary"></div>
                  
                  <div className="flex-1 p-3 ml-8 transition-all border border-gray-200 bg-gray-50 rounded-xl hover:border-blue-200">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-800">{item.event}</h3>
                    </div>
                    <p className="text-gray-600">{item.description}</p>
                    <div className="mt-3">
                      <span className="inline-block px-3 py-1 text-sm text-gray-700 bg-gray-200 rounded-full">
                        {item.status}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
 
          </div>
        </div>

  

        {/* Additional Notes */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="p-6 mt-8 border border-[#4695a5] bg-[#3fbdd61c] rounded-2xl"
        >
          <div className="flex items-center mb-4">
            <AlertCircle className="w-6 h-6 mr-3 text-primary" />
            <h3 className="text-lg font-bold text-primary">Important Notes</h3>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="p-4 bg-white rounded-lg">
              <h4 className="mb-2 font-bold text-gray-800">Next Steps</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <Circle className="w-2 h-2 mt-1 mr-2 text-blue-500" />
                  Schedule consultation with endocrinologist
                </li>
                <li className="flex items-start">
                  <Circle className="w-2 h-2 mt-1 mr-2 text-blue-500" />
                  Complete pre-surgical testing
                </li>
                <li className="flex items-start">
                  <Circle className="w-2 h-2 mt-1 mr-2 text-blue-500" />
                  Prepare for surgical procedure
                </li>
              </ul>
            </div>
            <div className="p-4 bg-white rounded-lg">
              <h4 className="mb-2 font-bold text-gray-800">Follow-up Schedule</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                  Initial follow-up: 2 weeks post-diagnosis
                </li>
                <li className="flex items-start">
                  <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                  Post-surgery check: 6 weeks after surgery
                </li>
                <li className="flex items-start">
                  <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                  Long-term monitoring: Every 3-6 months
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ThyroidDiagnosisResult;