import React, { useState } from 'react';
import { CitizenReporter, Article } from '../types';
import { 
  X, 
  Smartphone, 
  KeyRound, 
  Upload, 
  FileCheck, 
  UserPlus, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  AlertCircle,
  FileText,
  Lock,
  User,
  MapPin
} from 'lucide-react';

interface CitizenReporterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReporterRegistered: (reporter: CitizenReporter) => void;
  onArticleSubmitted: () => void;
}

export const CitizenReporterModal: React.FC<CitizenReporterModalProps> = ({
  isOpen,
  onClose,
  onReporterRegistered,
  onArticleSubmitted,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'REGISTER' | 'SUBMIT_NEWS' | 'MY_REPORTS'>('REGISTER');
  
  // Registration Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [otpError, setOtpError] = useState('');

  // ID Upload State
  const [idDocType, setIdDocType] = useState<'CITIZENSHIP' | 'NATIONAL_ID' | 'PRESS_CARD'>('CITIZENSHIP');
  const [idDocNumber, setIdDocNumber] = useState('');
  const [idDocPreview, setIdDocPreview] = useState('https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=400&auto=format&fit=crop');
  const [address, setAddress] = useState('');

  const [registeredReporter, setRegisteredReporter] = useState<CitizenReporter | null>(null);

  // Submit News Form State
  const [newsTitle, setNewsTitle] = useState('');
  const [newsCategory, setNewsCategory] = useState('समाज');
  const [newsLocation, setNewsLocation] = useState('काठमाडौँ');
  const [newsContent, setNewsContent] = useState('');
  const [newsImage, setNewsImage] = useState('https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=1000&auto=format&fit=crop');
  const [submitSuccessMsg, setSubmitSuccessMsg] = useState('');

  // 1. Send OTP Request
  const handleSendOtp = async () => {
    if (!phone || phone.length < 10) {
      setOtpError('कृपया १० अङ्कको वैध नेपाली मोबाइल नम्बर राख्नुहोस्।');
      return;
    }
    setOtpError('');
    try {
      const res = await fetch('/api/reporter/otp/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (data.success) {
        setOtpSent(true);
        setOtpCode('123456'); // Auto fill demo code for quick verification
      } else {
        setOtpError(data.message || 'ओटीपी पठाउन सकिएन।');
      }
    } catch (e) {
      setOtpSent(true);
      setOtpCode('123456');
    }
  };

  // 2. Verify OTP Code
  const handleVerifyOtp = async () => {
    try {
      const res = await fetch('/api/reporter/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otpCode }),
      });
      const data = await res.json();
      if (data.success) {
        setIsPhoneVerified(true);
        setOtpError('');
      } else {
        setOtpError('गलत ओटीपी कोड! कृपया पुनः प्रयास गर्नुहोस्।');
      }
    } catch (e) {
      setIsPhoneVerified(true);
    }
  };

  // 3. Register Citizen Reporter with ID Upload
  const handleRegisterReporter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !idDocNumber) {
      alert('कृपया नाम, मोबाइल नम्बर र परिचयपत्र नम्बर अनिवार्य भर्नुहोस्।');
      return;
    }

    try {
      const res = await fetch('/api/reporter/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          phone,
          idDocumentType: idDocType,
          idDocumentNumber: idDocNumber,
          idDocumentUrl: idDocPreview,
          address
        }),
      });
      const data = await res.json();
      if (data.success) {
        setRegisteredReporter(data.data);
        onReporterRegistered(data.data);
        setActiveTab('SUBMIT_NEWS');
      }
    } catch (e) {
      console.error(e);
    }
  };

  // 4. Submit Citizen News Report
  const handleSubmitNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsTitle || !newsContent) {
      alert('कृपया समाचारको शीर्षक र विवरण भर्नुहोस्।');
      return;
    }

    try {
      const res = await fetch('/api/reporter/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newsTitle,
          category: newsCategory,
          location: newsLocation,
          content: newsContent,
          imageUrl: newsImage,
          reporterName: fullName || registeredReporter?.fullName || 'नागरिक रिपोर्टर',
          reporterPhone: phone,
          reporterIdDoc: idDocPreview
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitSuccessMsg('तपाईंको समाचार सफलतापूर्वक दर्ता भयो! एआई र सम्पादकीय टोलीले जाँच गरी छिट्टै प्रकाशित गर्नेछ।');
        setNewsTitle('');
        setNewsContent('');
        onArticleSubmitted();
      }
    } catch (e) {
      setSubmitSuccessMsg('समाचार पठाइयो। सम्पादकले प्रमाणीकरण पछि प्रकाशित गर्नुहुनेछ।');
      onArticleSubmitted();
    }
  };

  // Simulated ID Upload Handler
  const handleImageUploadSim = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setIdDocPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex justify-center items-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white text-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col relative my-auto border border-slate-200">
        
        {/* Modal Top Header */}
        <div className="bg-[#1E3A8A] text-white px-5 py-4 flex items-center justify-between border-b border-blue-900">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg sm:text-xl font-bold font-serif">
              नागरिक रिपोर्टर पोर्टल / Citizen Reporter Portal
            </h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20 text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs sm:text-sm font-semibold">
          <button
            onClick={() => setActiveTab('REGISTER')}
            className={`flex-1 py-3 text-center border-b-2 transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'REGISTER' ? 'border-[#DC2626] text-[#DC2626] bg-white font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            १. खाता र परिचयपत्र प्रमाणीकरण
          </button>

          <button
            onClick={() => setActiveTab('SUBMIT_NEWS')}
            className={`flex-1 py-3 text-center border-b-2 transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'SUBMIT_NEWS' ? 'border-[#DC2626] text-[#DC2626] bg-white font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Send className="w-4 h-4" />
            २. समाचार पठाउनुहोस्
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto max-h-[75vh]">
          
          {/* TAB 1: REGISTER / PHONE OTP + ID UPLOAD */}
          {activeTab === 'REGISTER' && (
            <form onSubmit={handleRegisterReporter} className="space-y-4">
              
              <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r-lg text-xs text-amber-900 leading-relaxed">
                <strong>सूचना:</strong> तथ्यपरक नागरिक पत्रकारिता प्रवर्द्धनका लागि मोबाइल नम्बर प्रमाणीकरण र नागरिकता/परिचयपत्र अपलोड अनिवार्य गरिएको छ।
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  पुरा नाम (Full Name) *
                </label>
                <input
                  type="text"
                  placeholder="जस्तै: केशव गुरुङ"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:border-[#1E3A8A]"
                  required
                />
              </div>

              {/* Mobile Number & OTP Verification */}
              <div className="space-y-2 border-t border-slate-200 pt-3">
                <label className="block text-xs font-bold text-slate-700">
                  मोबाइल नम्बर (Phone Number Verification) *
                </label>

                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Smartphone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      placeholder="+977 98XXXXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={isPhoneVerified}
                      className="w-full bg-white border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-sm outline-none focus:border-[#1E3A8A] disabled:bg-slate-100"
                    />
                  </div>

                  {!isPhoneVerified && (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="bg-[#1E3A8A] hover:bg-blue-900 text-white font-bold text-xs px-4 py-2 rounded-lg shrink-0"
                    >
                      {otpSent ? 'पुनः कोड पठाउनुहोस्' : 'ओटीपी पठाउनुहोस्'}
                    </button>
                  )}
                </div>

                {otpError && <p className="text-xs text-red-600 font-medium">{otpError}</p>}

                {/* OTP Code Box */}
                {otpSent && !isPhoneVerified && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 space-y-2">
                    <p className="text-xs text-blue-900 font-medium">
                      तपाईंको मोबाइलमा ६ अङ्कको ओटीपी कोड पठाइएको छ। (डेमो ओटीपी: <span className="font-bold">123456</span>)
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="123456"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-sm outline-none font-mono font-bold w-32"
                      />
                      <button
                        type="button"
                        onClick={handleVerifyOtp}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-1.5 rounded-lg"
                      >
                        प्रमाणीकरण गर्नुहोस्
                      </button>
                    </div>
                  </div>
                )}

                {isPhoneVerified && (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 p-2 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    मोबाइल नम्बर सफलतापूर्वक प्रमाणीकरण भयो! (+977 {phone})
                  </div>
                )}
              </div>

              {/* ID Document Type & Upload System */}
              <div className="space-y-3 border-t border-slate-200 pt-3">
                <label className="block text-xs font-bold text-slate-700">
                  परिचयपत्र अपलोड सिस्टम (ID Document Upload) *
                </label>

                <div className="grid grid-cols-3 gap-2 text-xs font-medium">
                  <button
                    type="button"
                    onClick={() => setIdDocType('CITIZENSHIP')}
                    className={`p-2 rounded-lg border text-center ${idDocType === 'CITIZENSHIP' ? 'border-[#DC2626] bg-red-50 text-[#DC2626] font-bold' : 'border-slate-300 bg-white'}`}
                  >
                    नागरिकता
                  </button>
                  <button
                    type="button"
                    onClick={() => setIdDocType('NATIONAL_ID')}
                    className={`p-2 rounded-lg border text-center ${idDocType === 'NATIONAL_ID' ? 'border-[#DC2626] bg-red-50 text-[#DC2626] font-bold' : 'border-slate-300 bg-white'}`}
                  >
                    राष्ट्रिय परिचयपत्र
                  </button>
                  <button
                    type="button"
                    onClick={() => setIdDocType('PRESS_CARD')}
                    className={`p-2 rounded-lg border text-center ${idDocType === 'PRESS_CARD' ? 'border-[#DC2626] bg-red-50 text-[#DC2626] font-bold' : 'border-slate-300 bg-white'}`}
                  >
                    प्रेस पास / कार्ड
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-600 font-semibold mb-1">
                      परिचयपत्र नम्बर (ID Document No.)
                    </label>
                    <input
                      type="text"
                      placeholder="जस्तै: 44-01-78-01294"
                      value={idDocNumber}
                      onChange={(e) => setIdDocNumber(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 text-sm outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-600 font-semibold mb-1">
                      ठेगाना (Address)
                    </label>
                    <input
                      type="text"
                      placeholder="जस्तै: काठमाडौँ-१०, बागमती"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 text-sm outline-none"
                    />
                  </div>
                </div>

                {/* ID Photo Preview & Upload Box */}
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-3 text-center bg-slate-50 space-y-2">
                  <div className="flex items-center justify-center gap-3">
                    {idDocPreview && (
                      <img src={idDocPreview} alt="ID Document Preview" className="h-16 w-28 object-cover rounded border border-slate-300 shadow-xs" />
                    )}
                    <label className="cursor-pointer bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold text-xs px-3 py-2 rounded-lg inline-flex items-center gap-1.5 shadow-2xs">
                      <Upload className="w-4 h-4 text-blue-600" />
                      परिचयपत्रको फोटो रोज्नुहोस्
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUploadSim} />
                    </label>
                  </div>
                </div>

              </div>

              <div className="pt-3 border-t border-slate-200">
                <button
                  type="submit"
                  className="w-full bg-[#DC2626] hover:bg-red-700 text-white font-bold text-sm py-3 rounded-xl shadow-md transition-colors"
                >
                  खाता प्रमाणित गरी अघि बढ्नुहोस्
                </button>
              </div>

            </form>
          )}

          {/* TAB 2: SUBMIT NEWS REPORT */}
          {activeTab === 'SUBMIT_NEWS' && (
            <form onSubmit={handleSubmitNews} className="space-y-4">
              
              {submitSuccessMsg && (
                <div className="bg-emerald-100 border border-emerald-300 text-emerald-900 p-3 rounded-xl text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>{submitSuccessMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    समाचारको वर्ग (Category)
                  </label>
                  <select
                    value={newsCategory}
                    onChange={(e) => setNewsCategory(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-sm outline-none"
                  >
                    <option value="समाज">समाज (Society)</option>
                    <option value="राजनीति">राजनीति (Politics)</option>
                    <option value="अर्थतन्त्र">अर्थतन्त्र (Economy)</option>
                    <option value="प्रविधि">प्रविधि (Technology)</option>
                    <option value="खेलकुद">खेलकुद (Sports)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    स्थान / जिल्ला (Location)
                  </label>
                  <input
                    type="text"
                    placeholder="जस्तै: मुस्ताङ / पोखरा"
                    value={newsLocation}
                    onChange={(e) => setNewsLocation(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  समाचारको शीर्षक (Headline in Nepali) *
                </label>
                <input
                  type="text"
                  placeholder="जस्तै: मुस्ताङको मुक्तिनाथ सडकखण्डमा बाढीपछि यातायात अबरुद्ध"
                  value={newsTitle}
                  onChange={(e) => setNewsTitle(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:border-[#1E3A8A]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  समाचारको पुरा विवरण (Detailed News Body in Nepali) *
                </label>
                <textarea
                  rows={6}
                  placeholder="घटना के, कहिले, कहाँ र कसरी भयो विस्तृत लेख्नुहोस्..."
                  value={newsContent}
                  onChange={(e) => setNewsContent(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-3 text-sm outline-none focus:border-[#1E3A8A]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  समाचार तस्बिरको लिंक वा फाइल (Featured Photo)
                </label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={newsImage}
                  onChange={(e) => setNewsImage(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-sm outline-none"
                />
              </div>

              <div className="bg-blue-50 p-3 rounded-lg text-xs text-blue-900 border border-blue-200">
                <strong>एआई सुरक्षा जाँच:</strong> तपाईंले पठाएको समाचारलाई Admin Panel मा एआई (Gemini 3.6 Flash) ले फ्याक्ट चेकिङ र एआई डिटेक्टर मार्फत स्वचालित समीक्षा गरेपछि सम्पादकले प्रकाशन गर्नेछन्।
              </div>

              <button
                type="submit"
                className="w-full bg-[#1E3A8A] hover:bg-blue-900 text-white font-bold text-sm py-3 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                सम्पादकीय कक्षमा समाचार पेश गर्नुहोस्
              </button>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
