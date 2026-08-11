import React from 'react';
import { BrandLogo } from './BrandLogo';
import { CategoryItem, LogoSettings } from '../types';
import { MapPin, Phone, Mail, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  categories: CategoryItem[];
  onSelectCategory: (cat: string) => void;
  onOpenCitizenPortal: () => void;
  onOpenAdminPanel: () => void;
  logoSettings?: LogoSettings;
}

export const Footer: React.FC<FooterProps> = ({
  categories,
  onSelectCategory,
  onOpenCitizenPortal,
  onOpenAdminPanel,
  logoSettings,
}) => {
  const activeCategories = categories
    .filter(c => c.isActive !== false)
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  return (
    <footer className="bg-[#0F172A] text-slate-300 pt-12 pb-8 border-t-4 border-[#DC2626]">
      <div className="max-w-7xl mx-auto px-4 space-y-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Press Reg Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="bg-white p-3 rounded-xl inline-block shadow-md">
              <BrandLogo size="md" settings={logoSettings} />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-serif">
              यथार्थ खबर (Yathartha Khabar) सत्य, निष्पक्ष र उत्तरदायी पत्रकारिताका लागि समर्पित डिजिटल न्यूज पोर्टल हो।
            </p>
            <div className="space-y-1 text-xs text-slate-400 font-medium">
              <p>सूचना तथा प्रसारण विभाग दर्ता नं: ४१२५/२०८०</p>
              <p>प्रेस काउन्सिल नेपाल सूचीकरण नं: ५३०१/२०८०</p>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-[#DC2626] pl-2">
              समाचार वर्ग
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {activeCategories.slice(0, 10).map((cat) => (
                <button
                  key={cat.id || cat.nameNepali}
                  onClick={() => onSelectCategory(cat.nameNepali)}
                  className="text-left text-slate-400 hover:text-amber-400 transition-colors"
                >
                  {cat.nameNepali}
                </button>
              ))}
            </div>
          </div>

          {/* Col 3: Portals & Access */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-blue-500 pl-2">
              नागरिक र सम्पादकीय पोर्टल
            </h4>
            <div className="space-y-2 text-xs">
              <button
                onClick={onOpenCitizenPortal}
                className="w-full text-left bg-slate-800 hover:bg-slate-700 text-slate-200 p-2.5 rounded-lg flex items-center justify-between"
              >
                <span>नागरिक रिपोर्टर खाता दर्ता</span>
                <span className="text-[#DC2626] font-bold">Sign Up</span>
              </button>

              <button
                onClick={onOpenAdminPanel}
                className="w-full text-left bg-slate-800 hover:bg-slate-700 text-slate-200 p-2.5 rounded-lg flex items-center justify-between"
              >
                <span>सम्पादकीय CMS & AI Verifier</span>
                <span className="text-blue-400 font-bold">Admin CMS</span>
              </button>
            </div>
          </div>

          {/* Col 4: Contact Details */}
          <div className="space-y-3 text-xs text-slate-400">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-emerald-500 pl-2">
              सम्पर्क र ठेगाना
            </h4>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>कागेश्वरी मनोहरा नगरपालिका, वडा नं. ९, काठमाडौँ, नेपाल</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>फोन: +977 9763695666 (९७६३६९५६६६)</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>इमेल: info@yatharthakhabar.com</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© २०८३ यथार्थ खबर (Yathartha Khabar). सर्वाधिकार सुरक्षित।</p>
          <p className="flex items-center gap-1">
            <span>सत्य र निष्पक्ष समाचारको विश्वसनीय स्रोत</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </p>
        </div>

      </div>
    </footer>
  );
};
