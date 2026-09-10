import React from 'react';
import { PageView } from '../types';
import { 
  Leaf, 
  ShieldCheck, 
  Droplets, 
  Sprout, 
  CheckCircle2, 
  XCircle, 
  Users, 
  Award, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface AboutUsProps {
  setCurrentPage: (page: PageView) => void;
}

export const AboutUsView: React.FC<AboutUsProps> = ({ setCurrentPage }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* 1. COMPANY INFORMATION */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 bg-[#E9EDC9] text-[#5D6D31] px-3.5 py-1 rounded text-xs font-bold border border-[#5D6D31]/30">
            <Leaf className="w-3.5 h-3.5 text-[#5D6D31]" />
            <span className="uppercase tracking-wider">Our Story & Roots</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#2D3518] leading-tight">
            Company Information
          </h1>

          <p className="text-base text-[#3D3D3D] leading-relaxed">
            <strong className="text-[#C16A3D] font-bold">Eco Ganesh</strong> was founded with a sacred purpose: to restore the purity and sanctity of Lord Ganesha’s celebration by returning to ancient, nature-aligned Vedic traditions. Based in Maharashtra, we bridge authentic artisan sculptor families from Pen and Konkan directly with conscious devotees worldwide.
          </p>

          <p className="text-sm text-[#6B705C] leading-relaxed">
            For decades, mass-market Plaster of Paris (PoP) idols coated with carcinogenic chemical paints have caused severe damage to our rivers, lakes, and marine ecosystems. We believe Bappa’s arrival should bring only life, peace, and blessings to Mother Earth. Every idol we sculpt is 100% natural, biodegradable, and water-soluble.
          </p>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#E5E1D8]">
            <div>
              <span className="text-2xl sm:text-3xl font-bold text-[#C16A3D] font-serif">15,000+</span>
              <p className="text-xs text-[#6B705C] font-medium mt-0.5">Green Celebrations</p>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-bold text-[#5D6D31] font-serif">45 Mins</span>
              <p className="text-xs text-[#6B705C] font-medium mt-0.5">Visarjan at Home</p>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-bold text-[#2D3518] font-serif">60+ Artisans</span>
              <p className="text-xs text-[#6B705C] font-medium mt-0.5">Pen & Konkan Masters</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-white bg-[#F5F1E8]">
            <img
              src="/images/ganpati-artisan.jpg"
              alt="Pen Maharashtra master artisan sculpting eco-friendly Shadu Mati Ganpati Bappa"
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-[#E5E1D8] flex items-center gap-3">
            <div className="w-12 h-12 rounded bg-[#E9EDC9] text-[#5D6D31] flex items-center justify-center font-bold text-xl">
              🕉️
            </div>
            <div>
              <p className="text-xs font-bold text-[#2D3518]">Authentic Shadu Clay</p>
              <p className="text-[11px] text-[#6B705C]">Certified Eco-Friendly Process</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MISSION */}
      <section className="bg-[#2D3518] text-white rounded-2xl p-8 sm:p-12 shadow-sm border border-[#3D4722]">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E9EDC9]">
            Our Divine Purpose
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
            Our Mission
          </h2>
          <p className="text-base sm:text-lg text-[#E5E1D8] leading-relaxed font-normal">
            “To eradicate harmful synthetic Plaster of Paris and toxic chemical paints from Ganesh Utsav celebrations across India, ensuring that our devotion cleanses our hearts without polluting our sacred rivers, oceans, and marine lives.”
          </p>
          <div className="pt-4 flex flex-wrap gap-4 text-xs font-semibold text-[#E9EDC9]">
            <span className="flex items-center gap-1.5 bg-[#39441F] px-3 py-1.5 rounded border border-[#485429]">
              <CheckCircle2 className="w-4 h-4 text-[#5D6D31]" /> Protecting Mumbai, Pune & Indian Waterways
            </span>
            <span className="flex items-center gap-1.5 bg-[#39441F] px-3 py-1.5 rounded border border-[#485429]">
              <CheckCircle2 className="w-4 h-4 text-[#5D6D31]" /> Empowering Traditional Rural Clay Sculptors
            </span>
            <span className="flex items-center gap-1.5 bg-[#39441F] px-3 py-1.5 rounded border border-[#485429]">
              <CheckCircle2 className="w-4 h-4 text-[#5D6D31]" /> 100% Natural Seed-to-Plant Circle of Life
            </span>
          </div>
        </div>
      </section>

      {/* 3. ECO-FRIENDLY PROCESS */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-[#C16A3D]">
            Step-by-Step Sustainability
          </span>
          <h2 className="text-3xl font-serif font-bold text-[#2D3518]">
            Our 5-Step Eco-Friendly Process
          </h2>
          <p className="text-xs sm:text-sm text-[#6B705C]">
            How a pinch of fertile river mud transforms into a divine idol and returns peacefully to nature.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-white p-5 rounded-xl border border-[#E5E1D8] shadow-[0_4px_15px_rgba(0,0,0,0.03)] space-y-2 flex flex-col justify-between">
            <div>
              <span className="w-8 h-8 rounded bg-[#5D6D31] text-white font-bold flex items-center justify-center text-xs mb-2 font-serif">
                01
              </span>
              <h3 className="font-bold text-sm text-[#2D3518] font-serif">Riverbed Shadu Sourcing</h3>
              <p className="text-xs text-[#6B705C] leading-relaxed mt-1">
                Naturally deposited alluvial clay silt is ethically excavated from seasonal river floodplains.
              </p>
            </div>
            <div className="text-[10px] text-[#5D6D31] font-bold pt-2 border-t border-[#E5E1D8]">
              100% Organic Soil
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E5E1D8] shadow-[0_4px_15px_rgba(0,0,0,0.03)] space-y-2 flex flex-col justify-between">
            <div>
              <span className="w-8 h-8 rounded bg-[#5D6D31] text-white font-bold flex items-center justify-center text-xs mb-2 font-serif">
                02
              </span>
              <h3 className="font-bold text-sm text-[#2D3518] font-serif">Artisan Hand-Molding</h3>
              <p className="text-xs text-[#6B705C] leading-relaxed mt-1">
                Generational sculptors in Pen mold each idol with intricate Vedic details and devotion.
              </p>
            </div>
            <div className="text-[10px] text-[#5D6D31] font-bold pt-2 border-t border-[#E5E1D8]">
              Zero Machine Presses
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E5E1D8] shadow-[0_4px_15px_rgba(0,0,0,0.03)] space-y-2 flex flex-col justify-between">
            <div>
              <span className="w-8 h-8 rounded bg-[#5D6D31] text-white font-bold flex items-center justify-center text-xs mb-2 font-serif">
                03
              </span>
              <h3 className="font-bold text-sm text-[#2D3518] font-serif">Herbal & Plant Colors</h3>
              <p className="text-xs text-[#6B705C] leading-relaxed mt-1">
                Painted solely with turmeric, geru ochre, multani mitti, and food-grade mineral colors.
              </p>
            </div>
            <div className="text-[10px] text-[#5D6D31] font-bold pt-2 border-t border-[#E5E1D8]">
              Zero Lead or Mercury
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E5E1D8] shadow-[0_4px_15px_rgba(0,0,0,0.03)] space-y-2 flex flex-col justify-between">
            <div>
              <span className="w-8 h-8 rounded bg-[#5D6D31] text-white font-bold flex items-center justify-center text-xs mb-2 font-serif">
                04
              </span>
              <h3 className="font-bold text-sm text-[#2D3518] font-serif">Embedded Seeds</h3>
              <p className="text-xs text-[#6B705C] leading-relaxed mt-1">
                Certified Holy Tulsi and Marigold seeds are safely embedded in the heart and base of the idol.
              </p>
            </div>
            <div className="text-[10px] text-[#5D6D31] font-bold pt-2 border-t border-[#E5E1D8]">
              Living Botanical Legacy
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E5E1D8] shadow-[0_4px_15px_rgba(0,0,0,0.03)] space-y-2 flex flex-col justify-between">
            <div>
              <span className="w-8 h-8 rounded bg-[#C16A3D] text-white font-bold flex items-center justify-center text-xs mb-2 font-serif">
                05
              </span>
              <h3 className="font-bold text-sm text-[#2D3518] font-serif">Home Visarjan</h3>
              <p className="text-xs text-[#6B705C] leading-relaxed mt-1">
                Immerse in a bucket or pot at home. In 45 mins it dissolves into fertile plant nutrition.
              </p>
            </div>
            <div className="text-[10px] text-[#5D6D31] font-bold pt-2 border-t border-[#E5E1D8]">
              No River Crowding
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-[#C16A3D]">
            The Clear Difference
          </span>
          <h2 className="text-3xl font-serif font-bold text-[#2D3518]">
            Why Choose Eco Ganesh?
          </h2>
          <p className="text-xs sm:text-sm text-[#6B705C]">
            See how our authentic Shadu clay idols compare to conventional plaster idols.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto bg-white rounded-xl border border-[#E5E1D8] shadow-[0_4px_15px_rgba(0,0,0,0.03)]">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-[#F5F1E8] border-b border-[#E5E1D8]">
                <th className="p-4 sm:p-5 font-bold text-[#2D3518]">Key Feature</th>
                <th className="p-4 sm:p-5 font-bold text-[#5D6D31] bg-[#E9EDC9]/40">
                  🌿 Eco Ganesh (Shadu Clay / Seed)
                </th>
                <th className="p-4 sm:p-5 font-bold text-[#6B705C]">
                  Conventional POP Idols
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E1D8]">
              <tr>
                <td className="p-4 sm:p-5 font-semibold text-[#3D3D3D]">Composition</td>
                <td className="p-4 sm:p-5 text-[#5D6D31] font-medium bg-[#E9EDC9]/20 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5D6D31] shrink-0" />
                  100% Riverbed Shadu Clay & Natural Soil
                </td>
                <td className="p-4 sm:p-5 text-[#6B705C]">
                  Gypsum plaster, synthetic resin, silica
                </td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-semibold text-[#3D3D3D]">Water Dissolution Time</td>
                <td className="p-4 sm:p-5 text-[#5D6D31] font-medium bg-[#E9EDC9]/20">
                  45 to 60 minutes in home bucket
                </td>
                <td className="p-4 sm:p-5 text-[#6B705C]">
                  Takes months or years; floats on beach shores
                </td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-semibold text-[#3D3D3D]">Paints & Coatings</td>
                <td className="p-4 sm:p-5 text-[#5D6D31] font-medium bg-[#E9EDC9]/20 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5D6D31] shrink-0" />
                  Turmeric, Geru, Multani Mitti, Non-toxic Mica
                </td>
                <td className="p-4 sm:p-5 text-[#6B705C]">
                  Heavy metal enamels with lead, cadmium, arsenic
                </td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-semibold text-[#3D3D3D]">Impact on Marine Life</td>
                <td className="p-4 sm:p-5 text-[#5D6D31] font-medium bg-[#E9EDC9]/20">
                  Safe & nourishing; releases pure silt
                </td>
                <td className="p-4 sm:p-5 text-[#6B705C]">
                  Chokes fish, depletes oxygen, leaches poison
                </td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-semibold text-[#3D3D3D]">Packaging & Transit</td>
                <td className="p-4 sm:p-5 text-[#5D6D31] font-medium bg-[#E9EDC9]/20 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5D6D31] shrink-0" />
                  Reinforced wooden crate with replacement guarantee
                </td>
                <td className="p-4 sm:p-5 text-[#6B705C]">
                  Brittle, easily chips in transport
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* CTA to Products */}
        <div className="text-center pt-4">
          <button
            onClick={() => setCurrentPage('products')}
            className="inline-flex items-center gap-2 bg-[#C16A3D] hover:bg-[#AC5C32] text-white px-8 py-3.5 rounded font-bold text-sm shadow-sm transition-colors"
          >
            <span>Browse Our Eco Idols</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
