import React from 'react';
import { TeamMember } from '../types';
import { Mail, Phone, Award, ShieldCheck } from 'lucide-react';

interface TeamPageProps {
  teamMembers: TeamMember[];
}

export const TeamPage: React.FC<TeamPageProps> = ({ teamMembers }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#1E3A8A] via-[#1D4ED8] to-[#0F172A] text-white p-6 sm:p-10 rounded-2xl shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <span className="bg-[#DC2626] text-white text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">
            सम्पादकीय मण्डल र नेतृत्व
          </span>
          <h1 className="text-3xl sm:text-4xl font-black font-serif">
            हाम्रो टोली (Editorial & Leadership Team)
          </h1>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            यथार्थ खबर (Yathartha Khabar) निष्पक्ष, सत्य र तथ्यपरक पत्रकारिताका लागि प्रतिबद्ध पत्रकार तथा प्राविधिक टोलीको नेतृत्वमा सञ्चालित छ।
          </p>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <div 
            key={member.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all duration-300 p-5 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={member.photoUrl}
                  alt={member.nameNepali}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-[#1E3A8A] shadow-sm shrink-0"
                />
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-serif">
                    {member.nameNepali}
                  </h3>
                  <p className="text-xs font-bold text-[#DC2626]">
                    {member.designation}
                  </p>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                    {member.department}
                  </p>
                </div>
              </div>

              {member.bio && (
                <p className="text-xs text-slate-600 leading-relaxed font-serif bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {member.bio}
                </p>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-500">
              {member.pressCardNo && (
                <div className="flex items-center gap-1.5 text-[#1E3A8A] font-semibold text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span>{member.pressCardNo}</span>
                </div>
              )}
              {member.email && (
                <div className="flex items-center gap-1.5 truncate">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{member.email}</span>
                </div>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
