"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  Building2,
  FileText,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  Share2,
  ShieldAlert,
  Heart,
  AlertTriangle,
  Clipboard,
} from "lucide-react";

interface ChecklistItem {
  title: string;
  steps: { step: string; detail: string }[];
}

const emergencyChecklists: ChecklistItem[] = [
  {
    title: "🚀 I want to leave NOW",
    steps: [
      { step: "Register on Svensklistan", detail: "Go to svensklistan.gov.se and register immediately. This lets UD track you and send alerts." },
      { step: "Contact Swedish Embassy", detail: "Call +971 2 415 9700 (Abu Dhabi) or +46 8 405 50 05 (UD emergency 24/7). Tell them your location and travel plans." },
      { step: "Check passport validity", detail: "Ensure your passport is valid for 6+ months. Many countries won't let you in otherwise." },
      { step: "Check airport status", detail: "Go to the Flights tab to see current airport operations. DXB and AUH may have limited service." },
      { step: "Book flexible tickets", detail: "Book refundable/changeable tickets. Consider multiple routes: direct, via Istanbul, via Doha, or overland to Oman then fly from Muscat." },
      { step: "Consider Oman overland route", detail: "If UAE airports are closed, drive to Oman via Hatta or Al Ain/Al Buraimi border. Muscat airport is operating normally." },
      { step: "Prepare emergency kit", detail: "Passport, phone + charger, cash (AED + SEK), screenshots of important documents, medications, water." },
      { step: "Have cash ready", detail: "ATMs may be down. Have AED 2,000+ and some SEK/USD. Card machines may not work during disruptions." },
      { step: "Know your route to airport/border", detail: "Check Google Maps for real-time traffic. Avoid areas near Al Dhafra Air Base. Stay on main highways." },
    ],
  },
  {
    title: "🚨 There's an active alert",
    steps: [
      { step: "Stay indoors", detail: "Move away from windows. Go to an interior room on a lower floor if possible." },
      { step: "Follow NCEMA instructions", detail: "Monitor @ABORTNEWS on Twitter/X and NCEMA official channels. Follow civil defense sirens." },
      { step: "Do NOT go to the roof", detail: "Debris from intercepts can fall anywhere. Stay inside until all-clear is given." },
      { step: "Keep phone charged", detail: "You need your phone for alerts. Plug in now. Enable power-saving mode." },
      { step: "Fill bathtub/containers with water", detail: "Water supply may be disrupted. Fill containers as a precaution." },
      { step: "Contact embassy after all-clear", detail: "Once safe, check in with the embassy. Report your status on Svensklistan." },
      { step: "Document everything", detail: "Take photos of any damage for insurance. Note times and locations." },
    ],
  },
  {
    title: "🏥 I need medical help",
    steps: [
      { step: "Call 998 (ambulance)", detail: "UAE emergency ambulance number. Operators speak English and Arabic." },
      { step: "Call 999 (police)", detail: "For non-medical emergencies or if you need police assistance." },
      { step: "Go to nearest hospital", detail: "Major hospitals: Cleveland Clinic Abu Dhabi, Mediclinic, NMC. ERs are operating." },
      { step: "Contact embassy for support", detail: "The embassy can help coordinate medical care, translation, and insurance claims." },
      { step: "Check insurance coverage", detail: "Swedish travel insurance typically covers crisis situations. Contact your insurer. Save all receipts." },
    ],
  },
];

const emergencyNumbers = [
  { label: "UAE Emergency", number: "112", detail: "General emergency (police, ambulance, fire)" },
  { label: "UAE Police", number: "999", detail: "Police emergencies" },
  { label: "UAE Ambulance", number: "998", detail: "Medical emergencies" },
  { label: "UD Emergency (24/7)", number: "+46 8 405 50 05", detail: "Swedish MFA crisis line — anytime, anywhere" },
  { label: "Swedish Embassy AUH", number: "+971 2 415 9700", detail: "Extended hours: 07:00-22:00 during crisis" },
];

const whatToDoNow = [
  { icon: "1", text: "Register on Svensklistan", link: "https://www.swedenabroad.se/svensklistan" },
  { icon: "2", text: "Contact the embassy" },
  { icon: "3", text: "Check passport validity" },
  { icon: "4", text: "Book flexible tickets" },
  { icon: "5", text: "Keep phone charged" },
  { icon: "6", text: "Screenshot important documents" },
  { icon: "7", text: "Have cash (AED + SEK)" },
  { icon: "8", text: "Know your nearest airport + embassy" },
];

export default function HelpPage() {
  const [expandedChecklist, setExpandedChecklist] = useState<number | null>(null);
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  const shareViaWhatsApp = (title: string) => {
    const text = `SafeRoute - UAE Crisis Info: ${title}\n\nCheck the app for details and emergency procedures.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-4 space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Help & Resources</h1>
        <p className="text-xs text-[#8888a0]">Emergency info for Swedish nationals in UAE</p>
      </div>

      {/* Emergency Numbers */}
      <section id="emergency-numbers">
        <h2 className="text-sm font-medium text-[#8888a0] mb-3 uppercase tracking-wider flex items-center gap-2">
          <Phone className="w-4 h-4" />
          Emergency Numbers
        </h2>
        <div className="space-y-2">
          {emergencyNumbers.map((num) => (
            <a
              key={num.number}
              href={`tel:${num.number.replace(/\s/g, "")}`}
              className="flex items-center justify-between bg-[#12121a] border border-white/5 rounded-xl p-3 hover:border-white/10 transition-colors"
            >
              <div>
                <div className="text-sm font-medium">{num.label}</div>
                <div className="text-xs text-[#8888a0]">{num.detail}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-green-400 font-semibold">{num.number}</span>
                <Phone className="w-4 h-4 text-green-400" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Swedish Embassy */}
      <section id="swedish-embassy">
        <h2 className="text-sm font-medium text-[#8888a0] mb-3 uppercase tracking-wider flex items-center gap-2">
          <Building2 className="w-4 h-4" />
          Swedish Embassy & Consulate
        </h2>
        <div className="space-y-2">
          <Card className="bg-[#12121a] border-white/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🇸🇪</div>
                <div>
                  <h3 className="font-semibold text-sm">Embassy of Sweden — Abu Dhabi</h3>
                  <p className="text-xs text-[#8888a0] mt-1">Sheikh Zayed The First Street, Abu Dhabi</p>
                  <p className="text-xs text-[#8888a0]">Phone: +971 2 415 9700</p>
                  <Badge variant="outline" className="mt-2 bg-orange-500/20 text-orange-400 border-orange-500/30 text-[10px]">
                    Extended hours: 07:00-22:00
                  </Badge>
                  <a
                    href="https://www.swedenabroad.se/abu-dhabi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 mt-2 text-xs text-blue-400 hover:text-blue-300"
                  >
                    <ExternalLink className="w-3 h-3" />
                    swedenabroad.se/abu-dhabi
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#12121a] border-white/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🇸🇪</div>
                <div>
                  <h3 className="font-semibold text-sm">Honorary Consulate — Dubai</h3>
                  <p className="text-xs text-[#8888a0] mt-1">Business Bay area, Dubai</p>
                  <p className="text-xs text-[#8888a0]">Limited consular services during crisis</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* UD Travel Advisory */}
      <section>
        <h2 className="text-sm font-medium text-[#8888a0] mb-3 uppercase tracking-wider flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          Travel Advisory
        </h2>
        <Card className="bg-red-500/10 border-red-500/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <ShieldAlert className="w-6 h-6 text-red-400 shrink-0" />
              <div>
                <h3 className="font-semibold text-sm text-red-400">AVRÅDAN — UD advises against all travel to UAE</h3>
                <p className="text-xs text-[#8888a0] mt-1">
                  Utrikesdepartementet (UD) has raised the travel advisory for the UAE to the highest level
                  due to the ongoing military conflict. Swedish nationals in UAE should consider leaving
                  when safe to do so.
                </p>
                <a
                  href="https://www.regeringen.se/uds-reseinformation/ud-avrader/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 mt-2 text-xs text-blue-400 hover:text-blue-300"
                >
                  <ExternalLink className="w-3 h-3" />
                  UD Travel Advisory
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Svensklistan */}
      <section>
        <h2 className="text-sm font-medium text-[#8888a0] mb-3 uppercase tracking-wider flex items-center gap-2">
          <Clipboard className="w-4 h-4" />
          Svensklistan
        </h2>
        <Card className="bg-blue-500/10 border-blue-500/20">
          <CardContent className="p-4">
            <h3 className="font-semibold text-sm text-blue-400 mb-1">Register on Svensklistan NOW</h3>
            <p className="text-xs text-[#8888a0] mb-2">
              Svensklistan is UD&apos;s registry for Swedish nationals abroad. By registering, UD can contact
              you with important information, coordinate evacuation, and know where you are in an emergency.
            </p>
            <a
              href="https://www.swedenabroad.se/svensklistan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-3 py-2 rounded-lg text-xs font-medium transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              Register on Svensklistan
            </a>
          </CardContent>
        </Card>
      </section>

      {/* What to do RIGHT NOW checklist */}
      <section>
        <h2 className="text-sm font-medium text-[#8888a0] mb-3 uppercase tracking-wider flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          What to do RIGHT NOW
        </h2>
        <Card className="bg-[#12121a] border-white/5">
          <CardContent className="p-4 space-y-2">
            {whatToDoNow.map((item) => (
              <div key={item.icon} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-xs font-mono text-[#8888a0] shrink-0">
                  {item.icon}
                </div>
                <span className="text-sm">{item.text}</span>
                {item.link && (
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-3 h-3 text-blue-400" />
                  </a>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* Emergency Checklists */}
      <section>
        <h2 className="text-sm font-medium text-[#8888a0] mb-3 uppercase tracking-wider flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Emergency Procedures
        </h2>
        <div className="space-y-2">
          {emergencyChecklists.map((checklist, idx) => {
            const isOpen = expandedChecklist === idx;
            return (
              <Card key={idx} className="bg-[#12121a] border-white/5">
                <CardContent className="p-0">
                  <button
                    onClick={() => setExpandedChecklist(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 text-left"
                  >
                    <span className="text-sm font-semibold">{checklist.title}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          shareViaWhatsApp(checklist.title);
                        }}
                        className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <Share2 className="w-4 h-4 text-[#555570]" />
                      </button>
                      <ChevronDown className={`w-4 h-4 text-[#555570] transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 space-y-1">
                          {checklist.steps.map((step, stepIdx) => {
                            const stepKey = `${idx}-${stepIdx}`;
                            const stepOpen = expandedStep === stepKey;
                            return (
                              <div key={stepIdx}>
                                <button
                                  onClick={() => setExpandedStep(stepOpen ? null : stepKey)}
                                  className="w-full flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors text-left"
                                >
                                  <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-mono text-[#8888a0] shrink-0 mt-0.5">
                                    {stepIdx + 1}
                                  </div>
                                  <div className="flex-1">
                                    <span className="text-sm">{step.step}</span>
                                    <AnimatePresence>
                                      {stepOpen && (
                                        <motion.p
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: "auto", opacity: 1 }}
                                          exit={{ height: 0, opacity: 0 }}
                                          className="text-xs text-[#8888a0] mt-1"
                                        >
                                          {step.detail}
                                        </motion.p>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                  <ChevronDown className={`w-3 h-3 text-[#555570] transition-transform mt-1 ${stepOpen ? "rotate-180" : ""}`} />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Insurance */}
      <section>
        <h2 className="text-sm font-medium text-[#8888a0] mb-3 uppercase tracking-wider flex items-center gap-2">
          <Heart className="w-4 h-4" />
          Insurance & Medical
        </h2>
        <Card className="bg-[#12121a] border-white/5">
          <CardContent className="p-4 space-y-2">
            <p className="text-sm">
              Swedish travel insurance usually covers crisis/war situations, but verify with your provider.
            </p>
            <ul className="space-y-1 text-xs text-[#8888a0]">
              <li>• EHIC/EU Health Insurance Card does NOT apply in UAE</li>
              <li>• Contact your insurance company&apos;s emergency line before seeking treatment</li>
              <li>• Keep ALL receipts for medical care, transport, and accommodation</li>
              <li>• Document any property damage with photos + timestamps</li>
              <li>• Swedish state may cover emergency evacuation costs — contact UD</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <p className="text-center text-xs text-[#555570] py-4">
        Data from official sources only. Verify critical decisions with your embassy.
      </p>
    </div>
  );
}
