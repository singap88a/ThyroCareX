import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  User,
  Settings,
  Shield,
  BarChart3,
  Camera,
  Save,
  Eye,
  EyeOff,
  Download,
  Upload,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Activity,
  Clock,
  Users,
  Award,
  FileText,
  Calendar,
  Target,
  Star,
  Zap,
  Heart,
  PieChart,
  LineChart
} from 'lucide-react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [stats, setStats] = useState([
    { label: "إجمالي المرضى", value: 0, target: 156, change: "+12" },
    { label: "التشخيصات", value: 0, target: 289, change: "+23" },
    { label: "متوسط الدقة", value: 0, target: 92, change: "+2%" },
    { label: "الوقت المتوفر", value: 0, target: 45, change: "-5 دقائق" }
  ]);

  const [profileData, setProfileData] = useState({
    firstName: "محمد",
    lastName: "أحمد",
    email: "dr.mohamed@example.com",
    phone: "01234567890",
    licenseNumber: "MD123456",
    specialty: "طب الغدد الصماء",
    bio: "استشاري الغدد الصماء مع خبرة 15 سنة في تشخيص وعلاج أمراض الغدة الدرقية",
    hospital: "مستشفى الجامعة",
    address: "القاهرة، مصر"
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    diagnosticReminders: true,
    weeklyReports: true,
    language: "ar",
    theme: "light"
  });

  // تحريك الإحصائيات عند فتح الصفحة
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats(prevStats => 
        prevStats.map(stat => ({
          ...stat,
          value: stat.target
        }))
      );
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const showToast = (title, description, type = 'success') => {
    const id = Date.now();
    const newToast = { id, title, description, type };
    setToasts(prev => [...prev, newToast]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 5000);
  };

  const handleSaveProfile = () => {
    showToast("تم حفظ البيانات", "تم تحديث معلومات الملف الشخصي بنجاح");
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showToast("خطأ في كلمة المرور", "كلمة المرور الجديدة وتأكيدها غير متطابقتين", "error");
      return;
    }
    
    showToast("تم تغيير كلمة المرور", "تم تحديث كلمة المرور بنجاح");
    
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  const handleSavePreferences = () => {
    showToast("تم حفظ التفضيلات", "تم تحديث إعدادات النظام بنجاح");
  };

  const exportData = () => {
    showToast("تصدير البيانات", "سيتم إرسال ملف البيانات إلى بريدك الإلكتروني");
  };

  const tabs = [
    { id: 'personal', label: 'المعلومات الشخصية', icon: User },
    { id: 'security', label: 'الأمان', icon: Shield },
    { id: 'preferences', label: 'التفضيلات', icon: Settings },
    { id: 'statistics', label: 'الإحصائيات', icon: BarChart3 },
    { id: 'activity', label: 'النشاط', icon: Activity }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Toast Notifications */}
      <div className="fixed z-50 space-y-2 top-4 left-4">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`flex items-center p-4 rounded-lg shadow-lg transform transition-all duration-300 ${
              toast.type === 'error' 
                ? 'bg-red-50 border-r-4 border-red-500 text-red-800' 
                : 'bg-green-50 border-r-4 border-green-500 text-green-800'
            }`}
            style={{ minWidth: '300px' }}
          >
            <div className="flex-shrink-0">
              {toast.type === 'error' ? (
                <AlertCircle className="w-5 h-5 text-red-500" />
              ) : (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )}
            </div>
            <div className="mr-3">
              <div className="font-semibold">{toast.title}</div>
              <div className="text-sm">{toast.description}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4 space-x-reverse">
              <button className="p-2 transition-colors duration-200 rounded-lg hover:bg-gray-100">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">الملف الشخصي</h1>
                <p className="text-gray-600">إدارة معلوماتك الشخصية وإعدادات الحساب</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="p-6 mb-8 transition-all duration-300 border border-gray-200 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-md">
          <div className="flex flex-col items-center space-y-6 md:flex-row md:space-y-0 md:space-x-6 md:space-x-reverse">
            <div className="relative group">
              <div className="flex items-center justify-center w-24 h-24 rounded-full shadow-lg bg-gradient-to-br from-blue-500 to-purple-600">
                <User className="w-10 h-10 text-white" />
              </div>
              <button className="absolute flex items-center justify-center w-8 h-8 transition-colors duration-200 bg-white rounded-full shadow-md -bottom-2 -right-2 hover:bg-gray-50 group-hover:scale-110">
                <Camera className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            
            <div className="flex-1 text-center md:text-right">
              <h2 className="mb-1 text-2xl font-bold text-gray-900">
                د. {profileData.firstName} {profileData.lastName}
              </h2>
              <p className="mb-1 text-lg font-medium text-blue-600">{profileData.specialty}</p>
              <p className="text-gray-600">{profileData.hospital}</p>
            </div>
            
            <button className="flex items-center px-4 py-2 space-x-2 space-x-reverse transition-colors duration-200 bg-white border border-gray-300 shadow-sm rounded-xl hover:bg-gray-50">
              <Upload className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700">تحديث الصورة</span>
            </button>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="p-6 transition-all duration-300 transform border border-gray-200 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-md hover:-translate-y-1"
            >
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-gray-900">
                  {stat.label === 'متوسط الدقة' ? `${stat.value}%` : 
                   stat.label === 'الوقت المتوفر' ? `${stat.value} دقيقة` : stat.value}
                </div>
                <div className="mb-1 text-sm text-gray-600">{stat.label}</div>
                <div className={`text-xs font-medium ${
                  stat.change.includes('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </div>
              </div>
              
              {/* Progress Bar for Stats */}
              <div className="mt-4">
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 transition-all duration-1000 ease-out rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                    style={{ 
                      width: `${(stat.value / stat.target) * 100}%`,
                      transitionDelay: `${index * 200}ms`
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Tabs */}
        <div className="overflow-hidden border border-gray-200 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl">
          {/* Tab Headers */}
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 space-x-reverse px-6 py-4 border-b-2 transition-colors duration-200 whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600 bg-blue-50'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Personal Information Tab */}
            {activeTab === 'personal' && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">المعلومات الشخصية</h3>
                  <p className="text-gray-600">تحديث معلوماتك الشخصية والمهنية</p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">الاسم الأول</label>
                    <input
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                      className="w-full px-4 py-3 transition-colors duration-200 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">الاسم الأخير</label>
                    <input
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                      className="w-full px-4 py-3 transition-colors duration-200 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">البريد الإلكتروني</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 transition-colors duration-200 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">رقم الهاتف</label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-4 py-3 transition-colors duration-200 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">رقم الترخيص الطبي</label>
                    <input
                      type="text"
                      value={profileData.licenseNumber}
                      onChange={(e) => setProfileData(prev => ({ ...prev, licenseNumber: e.target.value }))}
                      className="w-full px-4 py-3 transition-colors duration-200 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">التخصص</label>
                    <select 
                      value={profileData.specialty}
                      onChange={(e) => setProfileData(prev => ({ ...prev, specialty: e.target.value }))}
                      className="w-full px-4 py-3 transition-colors duration-200 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="طب الغدد الصماء">طب الغدد الصماء</option>
                      <option value="الطب الباطني">الطب الباطني</option>
                      <option value="طب الأسرة">طب الأسرة</option>
                      <option value="الجراحة العامة">الجراحة العامة</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">نبذة مختصرة</label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-3 transition-colors duration-200 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">المستشفى/المؤسسة</label>
                    <input
                      type="text"
                      value={profileData.hospital}
                      onChange={(e) => setProfileData(prev => ({ ...prev, hospital: e.target.value }))}
                      className="w-full px-4 py-3 transition-colors duration-200 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">العنوان</label>
                    <input
                      type="text"
                      value={profileData.address}
                      onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                      className="w-full px-4 py-3 transition-colors duration-200 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <button 
                  onClick={handleSaveProfile}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 space-x-reverse"
                >
                  <Save className="w-5 h-5" />
                  <span>حفظ التغييرات</span>
                </button>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">الأمان وكلمة المرور</h3>
                  <p className="text-gray-600">إدارة كلمة المرور وإعدادات الأمان</p>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">كلمة المرور الحالية</label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                      className="w-full px-4 py-3 pr-12 transition-colors duration-200 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute text-gray-400 transition-colors duration-200 transform -translate-y-1/2 left-3 top-1/2 hover:text-gray-600"
                    >
                      {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">كلمة المرور الجديدة</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                      className="w-full px-4 py-3 pr-12 transition-colors duration-200 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute text-gray-400 transition-colors duration-200 transform -translate-y-1/2 left-3 top-1/2 hover:text-gray-600"
                    >
                      {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">تأكيد كلمة المرور الجديدة</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="w-full px-4 py-3 pr-12 transition-colors duration-200 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute text-gray-400 transition-colors duration-200 transform -translate-y-1/2 left-3 top-1/2 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <button 
                  onClick={handleChangePassword}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  تحديث كلمة المرور
                </button>

                <div className="pt-6 border-t border-gray-200">
                  <h4 className="mb-4 text-lg font-semibold text-gray-900">إعدادات الأمان الإضافية</h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-900">تسجيل الدخول بخطوتين</p>
                        <p className="text-sm text-gray-600">حماية إضافية للحساب</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-900">تنبيهات تسجيل الدخول</p>
                        <p className="text-sm text-gray-600">إشعار عند تسجيل الدخول من جهاز جديد</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">التفضيلات والإعدادات</h3>
                  <p className="text-gray-600">تخصيص إعدادات النظام والإشعارات</p>
                </div>

                <div>
                  <h4 className="mb-4 text-lg font-semibold text-gray-900">الإشعارات</h4>
                  <div className="space-y-4">
                    {[
                      { id: 'emailNotifications', title: 'إشعارات البريد الإلكتروني', description: 'تلقي التحديثات والتنبيهات', checked: preferences.emailNotifications },
                      { id: 'smsNotifications', title: 'إشعارات الرسائل النصية', description: 'تنبيهات عاجلة فقط', checked: preferences.smsNotifications },
                      { id: 'diagnosticReminders', title: 'تذكير التشخيص', description: 'تذكير بمتابعة الحالات', checked: preferences.diagnosticReminders },
                      { id: 'weeklyReports', title: 'التقارير الأسبوعية', description: 'ملخص النشاط الأسبوعي', checked: preferences.weeklyReports }
                    ].map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                          <p className="font-medium text-gray-900">{item.title}</p>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={item.checked}
                            onChange={(e) => setPreferences(prev => ({ ...prev, [item.id]: e.target.checked }))}
                            className="sr-only peer" 
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <h4 className="mb-4 text-lg font-semibold text-gray-900">إعدادات عامة</h4>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">اللغة</label>
                      <select 
                        value={preferences.language}
                        onChange={(e) => setPreferences(prev => ({ ...prev, language: e.target.value }))}
                        className="w-full px-4 py-3 transition-colors duration-200 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="ar">العربية</option>
                        <option value="en">English</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">المظهر</label>
                      <select 
                        value={preferences.theme}
                        onChange={(e) => setPreferences(prev => ({ ...prev, theme: e.target.value }))}
                        className="w-full px-4 py-3 transition-colors duration-200 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="light">فاتح</option>
                        <option value="dark">داكن</option>
                        <option value="auto">تلقائي</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleSavePreferences}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 space-x-reverse"
                >
                  <Save className="w-5 h-5" />
                  <span>حفظ التفضيلات</span>
                </button>
              </div>
            )}

            {/* Statistics Tab */}
            {activeTab === 'statistics' && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">الإحصائيات الشخصية</h3>
                  <p className="text-gray-600">تقرير مفصل عن نشاطك وأداءك في النظام</p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="p-6 text-center text-white transition-all duration-300 transform bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl hover:scale-105">
                    <div className="mb-2 text-3xl font-bold">156</div>
                    <div className="text-blue-100">إجمالي المرضى</div>
                  </div>
                  <div className="p-6 text-center text-white transition-all duration-300 transform bg-gradient-to-br from-green-500 to-green-600 rounded-2xl hover:scale-105">
                    <div className="mb-2 text-3xl font-bold">92%</div>
                    <div className="text-green-100">متوسط الدقة</div>
                  </div>
                  <div className="p-6 text-center text-white transition-all duration-300 transform bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl hover:scale-105">
                    <div className="mb-2 text-3xl font-bold">289</div>
                    <div className="text-purple-100">إجمالي التشخيصات</div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <h4 className="mb-4 text-lg font-semibold text-gray-900">تصدير البيانات</h4>
                  <div className="flex flex-col items-center justify-between p-6 border border-gray-200 sm:flex-row bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl">
                    <div>
                      <p className="text-lg font-medium text-gray-900">تصدير جميع البيانات</p>
                      <p className="mt-1 text-gray-600">تحميل نسخة من جميع بياناتك الشخصية والإحصائيات</p>
                    </div>
                    <button
                      onClick={exportData}
                      className="flex items-center px-6 py-3 mt-4 space-x-2 space-x-reverse font-medium text-gray-700 transition-colors duration-200 bg-white border border-gray-300 shadow-sm sm:mt-0 rounded-xl hover:bg-gray-50"
                    >
                      <Download className="w-5 h-5" />
                      <span>تصدير البيانات</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Activity Tab */}
            {activeTab === 'activity' && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">سجل النشاط</h3>
                  <p className="text-gray-600">تتبع جميع الأنشطة والعمليات الأخيرة في النظام</p>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      id: 1,
                      type: 'diagnosis',
                      title: 'تم إجراء تشخيص جديد',
                      description: 'تشخيص حالة قصور الغدة الدرقية للمريض أحمد محمد',
                      time: 'منذ 2 ساعات',
                      icon: Activity,
                      color: 'text-blue-600'
                    },
                    {
                      id: 2,
                      type: 'login',
                      title: 'تسجيل دخول',
                      description: 'تم تسجيل الدخول من جهاز Windows 11',
                      time: 'منذ 4 ساعات',
                      icon: Shield,
                      color: 'text-green-600'
                    },
                    {
                      id: 3,
                      type: 'report',
                      title: 'تم إنشاء تقرير',
                      description: 'تقرير شهري عن التشخيصات والأداء',
                      time: 'منذ يوم واحد',
                      icon: FileText,
                      color: 'text-purple-600'
                    },
                    {
                      id: 4,
                      type: 'patient',
                      title: 'إضافة مريض جديد',
                      description: 'تم إضافة المريض فاطمة علي إلى النظام',
                      time: 'منذ يومين',
                      icon: Users,
                      color: 'text-orange-600'
                    },
                    {
                      id: 5,
                      type: 'update',
                      title: 'تحديث الملف الشخصي',
                      description: 'تم تحديث معلومات الاتصال والتخصص',
                      time: 'منذ 3 أيام',
                      icon: User,
                      color: 'text-gray-600'
                    }
                  ].map((activity) => {
                    const Icon = activity.icon;
                    return (
                      <div key={activity.id} className="flex items-start p-4 space-x-4 space-x-reverse transition-colors duration-200 bg-gray-50 rounded-xl hover:bg-gray-100">
                        <div className={`flex-shrink-0 p-2 rounded-lg bg-white shadow-sm ${activity.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                            <p className="text-xs text-gray-500">{activity.time}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-600">{activity.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">فلترة النشاط</h4>
                      <p className="text-sm text-gray-600">عرض الأنشطة حسب النوع أو التاريخ</p>
                    </div>
                    <div className="flex space-x-2 space-x-reverse">
                      <select className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option value="all">جميع الأنشطة</option>
                        <option value="diagnosis">التشخيصات</option>
                        <option value="login">تسجيل الدخول</option>
                        <option value="reports">التقارير</option>
                        <option value="patients">المرضى</option>
                      </select>
                      <button className="px-4 py-2 text-sm font-medium text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700">
                        تصفية
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Profile;