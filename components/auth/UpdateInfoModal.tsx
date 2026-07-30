import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

interface UpdateInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UpdateInfoModal({ isOpen, onClose }: UpdateInfoModalProps) {
  const { language } = useLanguage();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="relative w-full max-w-2xl max-h-[85vh] flex flex-col p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-white/60 dark:border-slate-800 shadow-2xl space-y-4 overflow-hidden backdrop-blur-xl"
          >
            {/* Top Right Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-2">
              {language === 'bn' ? 'আয় করুন' : 'EARN MONEY'}
            </h2>

            <div className="overflow-y-auto flex-1 pr-2 space-y-6 text-sm text-slate-700 dark:text-slate-300 custom-scrollbar">
              {language === 'bn' ? (
                <>
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">প্রতিদিন একাধিক উপায়ে আয়ের সুযোগ</h3>
                    <p>আমাদের প্ল্যাটফর্মে প্রতিটি সক্রিয় সদস্যের জন্য একাধিক আয়ের সুযোগ রয়েছে। আপনার নেটওয়ার্ক তৈরি করুন, প্রয়োজনীয় কার্যক্রম সম্পন্ন করুন এবং দৈনিক, সাপ্তাহিক, মাসিক ও ট্রেডিং রিওয়ার্ড উপভোগ করুন।</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-slate-900 dark:text-white">আয়ের মাধ্যমসমূহ</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>দৈনিক স্যালারি</li>
                      <li>সাপ্তাহিক স্যালারি</li>
                      <li>মাসিক স্যালারি</li>
                      <li>দৈনিক ১% জেনারেশন বোনাস</li>
                      <li>প্রফেশনাল ট্রেডিং ইনকাম</li>
                    </ul>
                  </div>

                  <hr className="border-slate-200 dark:border-slate-700" />

                  <div className="space-y-4">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white uppercase">দৈনিক স্যালারি</h3>
                    <p>আপনার ১ম থেকে ৫ম জেনারেশনের মধ্যে ২৪ ঘণ্টার ভিতরে যতজন যোগ্য সক্রিয় সদস্য (Qualified Active Member) হবে, তার ভিত্তিতে আপনি প্রতিদিন স্যালারি পাবেন।</p>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-300 dark:border-slate-600">
                            <th className="py-2">স্যালারি লেভেল</th>
                            <th className="py-2">যোগ্য সদস্য</th>
                            <th className="py-2">দৈনিক স্যালারি</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-slate-200 dark:border-slate-700"><td className="py-1">Salary 1</td><td>৫ জন</td><td>৳২০০</td></tr>
                          <tr className="border-b border-slate-200 dark:border-slate-700"><td className="py-1">Salary 2</td><td>১০ জন</td><td>৳৪৫০</td></tr>
                          <tr className="border-b border-slate-200 dark:border-slate-700"><td className="py-1">Salary 3</td><td>২০ জন</td><td>৳১,১৫০</td></tr>
                          <tr className="border-b border-slate-200 dark:border-slate-700"><td className="py-1">Salary 4</td><td>৪০ জন</td><td>৳২,৫৫০</td></tr>
                          <tr className="border-b border-slate-200 dark:border-slate-700"><td className="py-1">Salary 5</td><td>৯০ জন</td><td>৳৭,৫০০</td></tr>
                          <tr className="border-b border-slate-200 dark:border-slate-700"><td className="py-1">Salary 6</td><td>১৫০ জন</td><td>৳১৫,৫০০</td></tr>
                          <tr className="border-b border-slate-200 dark:border-slate-700"><td className="py-1">Salary 7</td><td>৩০০ জন</td><td>৳৩৫,০০০</td></tr>
                          <tr className="border-b border-slate-200 dark:border-slate-700"><td className="py-1">Salary 8</td><td>৬০০ জন</td><td>৳৭৫,০০০</td></tr>
                        </tbody>
                      </table>
                    </div>

                    <h4 className="font-semibold text-slate-900 dark:text-white">যোগ্যতার শর্তাবলী</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>শুধুমাত্র ১ম থেকে ৫ম জেনারেশন গণনা করা হবে।</li>
                      <li>মোট যোগ্য সদস্যের কমপক্ষে ৩০% অবশ্যই ১ম জেনারেশন থেকে হতে হবে।</li>
                      <li>বাকি ৭০% সদস্য ২য় থেকে ৫ম জেনারেশন থেকে হতে পারবে।</li>
                      <li>প্রতিটি যোগ্য সদস্যকে ন্যূনতম ৳২৫০ ডিপোজিট করতে হবে।</li>
                      <li>প্রতিটি যোগ্য সদস্যকে ন্যূনতম ৳৭০০ ট্রেডিং টার্নওভার সম্পন্ন করতে হবে।</li>
                      <li>শুধুমাত্র সক্রিয় সদস্যদের গণনা করা হবে।</li>
                      <li>একাধিক স্যালারির শর্ত পূরণ হলেও শুধুমাত্র সর্বোচ্চ স্যালারি প্রদান করা হবে।</li>
                    </ul>

                    <h4 className="font-semibold text-slate-900 dark:text-white">উদাহরণ</h4>
                    <p>Salary 2 (১০ জন সদস্য) অর্জনের জন্য—</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>৩ জন সদস্য অবশ্যই ১ম জেনারেশন থেকে হতে হবে।</li>
                      <li>৭ জন সদস্য ২য় থেকে ৫ম জেনারেশন থেকে হতে পারবে।</li>
                    </ul>
                    <p className="text-xs text-slate-500">সকল সদস্যকে একই ২৪ ঘণ্টার মধ্যে নির্ধারিত ডিপোজিট ও ট্রেডিং টার্নওভার সম্পন্ন করতে হবে।</p>
                  </div>

                  <hr className="border-slate-200 dark:border-slate-700" />

                  <div className="space-y-4">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white uppercase">সাপ্তাহিক স্যালারি</h3>
                    <p>৭ দিনের মধ্যে আপনার ১ম জেনারেশনের মোট ডিপোজিটের ভিত্তিতে অতিরিক্ত সাপ্তাহিক স্যালারি অর্জন করুন।</p>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-300 dark:border-slate-600">
                            <th className="py-2">লেভেল</th>
                            <th className="py-2">৭ দিনের ১ম জেনারেশনের ডিপোজিট</th>
                            <th className="py-2">পুরস্কার</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-slate-200 dark:border-slate-700"><td className="py-1">Weekly Salary 1</td><td>৳১০,০০০</td><td>৳৫০০</td></tr>
                          <tr className="border-b border-slate-200 dark:border-slate-700"><td className="py-1">Weekly Salary 2</td><td>৳৩০,০০০</td><td>৳১,৫০০</td></tr>
                          <tr className="border-b border-slate-200 dark:border-slate-700"><td className="py-1">Weekly Salary 3</td><td>৳১,০০,০০০</td><td>৳৫,০০০</td></tr>
                          <tr className="border-b border-slate-200 dark:border-slate-700"><td className="py-1">Weekly Salary 4</td><td>৳৫,০০,০০০</td><td>৳২৫,০০০</td></tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="text-sm">সাপ্তাহিক স্যালারি দৈনিক স্যালারির অতিরিক্ত প্রদান করা হবে।</p>
                  </div>

                  <hr className="border-slate-200 dark:border-slate-700" />
                  
                  <div className="space-y-4">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white uppercase">মাসিক স্যালারি</h3>
                    <p>৩০ দিনের মধ্যে আপনার ১ম জেনারেশনের মোট ডিপোজিটের ভিত্তিতে অতিরিক্ত মাসিক স্যালারি অর্জন করুন।</p>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-300 dark:border-slate-600">
                            <th className="py-2">লেভেল</th>
                            <th className="py-2">৩০ দিনের ১ম জেনারেশনের ডিপোজিট</th>
                            <th className="py-2">পুরস্কার</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-slate-200 dark:border-slate-700"><td className="py-1">Monthly Salary 1</td><td>৳১,০০,০০০</td><td>৳৫০০</td></tr>
                          <tr className="border-b border-slate-200 dark:border-slate-700"><td className="py-1">Monthly Salary 2</td><td>৳৫,০০,০০০</td><td>৳২,৫০০</td></tr>
                          <tr className="border-b border-slate-200 dark:border-slate-700"><td className="py-1">Monthly Salary 3</td><td>৳১০,০০,০০০</td><td>৳৫,০০০</td></tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="text-sm">যোগ্য হলে মাসিক স্যালারি দৈনিক ও সাপ্তাহিক স্যালারির অতিরিক্ত প্রদান করা হবে।</p>
                  </div>

                  <hr className="border-slate-200 dark:border-slate-700" />

                  <div className="space-y-4">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white uppercase">দৈনিক ১% জেনারেশন বোনাস</h3>
                    <p>আপনার ১ম থেকে ৫ম জেনারেশনের সদস্যরা ২৪ ঘণ্টায় যত নতুন ডিপোজিট করবে, তার মোট পরিমাণের ১% আপনি প্রতিদিন বোনাস হিসেবে পাবেন।</p>
                    
                    <h4 className="font-semibold text-slate-900 dark:text-white">বোনাসের নিয়ম</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>প্রতি ২৪ ঘণ্টায় বোনাস গণনা করা হবে।</li>
                      <li>শুধুমাত্র নতুন ডিপোজিট গণনা করা হবে।</li>
                      <li>ট্রেডিং টার্নওভার এই বোনাসের অন্তর্ভুক্ত নয়।</li>
                      <li>বোনাস স্বয়ংক্রিয়ভাবে অ্যাকাউন্টে যোগ হবে।</li>
                    </ul>
                  </div>

                  <hr className="border-slate-200 dark:border-slate-700" />

                  <div className="space-y-4">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white uppercase">প্রফেশনাল ট্রেডিং প্রোফাইল</h3>
                    <p>আপনার ট্রেডিং দক্ষতাকে আয়ের নতুন সুযোগে পরিণত করুন।</p>
                    <p>নিজের একটি পাবলিক ট্রেডিং প্রোফাইল তৈরি করুন, যেখানে অন্য ব্যবহারকারীরা আপনার ট্রেডিং পারফরম্যান্স দেখে ব্যালেন্স স্ট্রাইক করতে পারবেন।</p>
                    
                    <h4 className="font-semibold text-slate-900 dark:text-white">আপনার প্রোফাইলে দেখা যাবে</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>প্রফিট রেট</li>
                      <li>লস রেট</li>
                      <li>ট্রেডিং ইতিহাস</li>
                      <li>ট্রেডিং সক্ষমতা</li>
                      <li>সর্বোচ্চ প্রফিট সীমা</li>
                      <li>সর্বোচ্চ লস সীমা</li>
                      <li>কমিশন রেট</li>
                    </ul>
                  </div>

                  <hr className="border-slate-200 dark:border-slate-700" />

                  <div className="space-y-4">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white uppercase">ব্যালেন্স স্ট্রাইক</h3>
                    <p>ব্যবহারকারীরা একজন ট্রেডারের প্রোফাইলে তাদের ব্যালেন্স স্ট্রাইক করতে পারবেন।</p>
                    
                    <h4 className="font-semibold text-slate-900 dark:text-white">প্রতিটি ট্রেডার নির্ধারণ করবেন—</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>সর্বোচ্চ প্রফিট শতাংশ</li>
                      <li>সর্বোচ্চ লস শতাংশ</li>
                      <li>কমিশন রেট (৩%–৫%)</li>
                    </ul>

                    <h4 className="font-semibold text-slate-900 dark:text-white">উদাহরণ</h4>
                    <p>একজন ব্যবহারকারী ৳১০০ স্ট্রাইক করলেন।</p>
                    <p>যদি ট্রেডে ৩০% প্রফিট হয়—</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>ব্যবহারকারী পাবেন ৳১৩০।</li>
                      <li>ট্রেডার অর্জিত প্রফিটের উপর ৩%–৫% কমিশন পাবেন।</li>
                    </ul>
                    <p>যদি ট্রেডে ২০% লস হয়—</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>ব্যবহারকারী পাবেন ৳৮০।</li>
                      <li>ট্রেডার কোনো কমিশন পাবেন না।</li>
                    </ul>
                  </div>

                  <hr className="border-slate-200 dark:border-slate-700" />

                  <div className="space-y-4">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white uppercase">গুরুত্বপূর্ণ নির্দেশনা</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>সকল রিওয়ার্ড স্বয়ংক্রিয়ভাবে সিস্টেম দ্বারা গণনা করা হবে।</li>
                      <li>শুধুমাত্র যোগ্য ও সক্রিয় সদস্যদের গণনা করা হবে।</li>
                      <li>দৈনিক স্যালারি একাধিক লেভেল যোগ করে প্রদান করা হবে না।</li>
                      <li>শুধুমাত্র সর্বোচ্চ যোগ্য স্যালারি প্রদান করা হবে।</li>
                      <li>সাপ্তাহিক ও মাসিক স্যালারি দৈনিক স্যালারির অতিরিক্ত প্রদান করা হবে।</li>
                      <li>সন্দেহজনক বা প্রতারণামূলক কার্যকলাপ শনাক্ত হলে প্ল্যাটফর্ম প্রয়োজনীয় ব্যবস্থা নেওয়ার অধিকার সংরক্ষণ করে।</li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">Multiple Ways to Earn Every Day</h3>
                    <p>Our platform offers multiple earning opportunities for every active member. Build your network, complete the required activities, and unlock daily, weekly, monthly, and trading rewards.</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-slate-900 dark:text-white">Available Earning Methods</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Daily Salary</li>
                      <li>Weekly Salary</li>
                      <li>Monthly Salary</li>
                      <li>1% Daily Generation Bonus</li>
                      <li>Professional Trading Income</li>
                    </ul>
                  </div>

                  <hr className="border-slate-200 dark:border-slate-700" />

                  <div className="space-y-4">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white uppercase">DAILY SALARY</h3>
                    <p>Earn a Daily Salary based on the number of Qualified Active Members in your Generation 1–5 network within 24 hours.</p>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-300 dark:border-slate-600">
                            <th className="py-2">Salary Level</th>
                            <th className="py-2">Qualified Members</th>
                            <th className="py-2">Daily Reward</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-slate-200 dark:border-slate-700"><td className="py-1">Salary 1</td><td>5 Members</td><td>৳200</td></tr>
                          <tr className="border-b border-slate-200 dark:border-slate-700"><td className="py-1">Salary 2</td><td>10 Members</td><td>৳450</td></tr>
                          <tr className="border-b border-slate-200 dark:border-slate-700"><td className="py-1">Salary 3</td><td>20 Members</td><td>৳1,150</td></tr>
                          <tr className="border-b border-slate-200 dark:border-slate-700"><td className="py-1">Salary 4</td><td>40 Members</td><td>৳2,550</td></tr>
                          <tr className="border-b border-slate-200 dark:border-slate-700"><td className="py-1">Salary 5</td><td>90 Members</td><td>৳7,500</td></tr>
                          <tr className="border-b border-slate-200 dark:border-slate-700"><td className="py-1">Salary 6</td><td>150 Members</td><td>৳15,500</td></tr>
                          <tr className="border-b border-slate-200 dark:border-slate-700"><td className="py-1">Salary 7</td><td>300 Members</td><td>৳35,000</td></tr>
                          <tr className="border-b border-slate-200 dark:border-slate-700"><td className="py-1">Salary 8</td><td>600 Members</td><td>৳75,000</td></tr>
                        </tbody>
                      </table>
                    </div>

                    <h4 className="font-semibold text-slate-900 dark:text-white">Qualification Rules</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Only Generation 1–5 members are counted.</li>
                      <li>At least 30% of Qualified Members must come from Generation 1.</li>
                      <li>The remaining 70% may come from Generation 2–5.</li>
                      <li>Each Qualified Member must deposit at least ৳250.</li>
                      <li>Each Qualified Member must complete at least ৳700 Trading Turnover.</li>
                      <li>Only Active Members are counted.</li>
                      <li>If multiple salary levels are achieved, only the highest salary level will be rewarded.</li>
                    </ul>

                    <h4 className="font-semibold text-slate-900 dark:text-white">Example</h4>
                    <p>To qualify for Salary 2 (10 Qualified Members):</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>3 members must come from Generation 1.</li>
                      <li>7 members may come from Generation 2–5.</li>
                    </ul>
                    <p className="text-xs text-slate-500">All members must complete the required Deposit and Trading Turnover within the same 24-hour period.</p>
                  </div>

                  <hr className="border-slate-200 dark:border-slate-700" />

                  <div className="space-y-4">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white uppercase">WEEKLY SALARY</h3>
                    <p>Earn additional rewards based on your First Generation Deposit Volume within 7 days.</p>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-300 dark:border-slate-600">
                            <th className="py-2">Level</th>
                            <th className="py-2">7-Day First Generation Deposit</th>
                            <th className="py-2">Reward</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-slate-200 dark:border-slate-700"><td className="py-1">Weekly Salary 1</td><td>৳10,000</td><td>৳500</td></tr>
                          <tr className="border-b border-slate-200 dark:border-slate-700"><td className="py-1">Weekly Salary 2</td><td>৳30,000</td><td>৳1,500</td></tr>
                          <tr className="border-b border-slate-200 dark:border-slate-700"><td className="py-1">Weekly Salary 3</td><td>৳100,000</td><td>৳5,000</td></tr>
                          <tr className="border-b border-slate-200 dark:border-slate-700"><td className="py-1">Weekly Salary 4</td><td>৳500,000</td><td>৳25,000</td></tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="text-sm">Weekly Salary is paid in addition to your Daily Salary.</p>
                  </div>

                  <hr className="border-slate-200 dark:border-slate-700" />
                  
                  <div className="space-y-4">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white uppercase">MONTHLY SALARY</h3>
                    <p>Receive extra rewards based on your First Generation Deposit Volume within 30 days.</p>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-300 dark:border-slate-600">
                            <th className="py-2">Level</th>
                            <th className="py-2">30-Day First Generation Deposit</th>
                            <th className="py-2">Reward</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-slate-200 dark:border-slate-700"><td className="py-1">Monthly Salary 1</td><td>৳100,000</td><td>৳500</td></tr>
                          <tr className="border-b border-slate-200 dark:border-slate-700"><td className="py-1">Monthly Salary 2</td><td>৳500,000</td><td>৳2,500</td></tr>
                          <tr className="border-b border-slate-200 dark:border-slate-700"><td className="py-1">Monthly Salary 3</td><td>৳1,000,000</td><td>৳5,000</td></tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="text-sm">Monthly Salary is paid in addition to your Daily and Weekly Salary (if eligible).</p>
                  </div>

                  <hr className="border-slate-200 dark:border-slate-700" />

                  <div className="space-y-4">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white uppercase">1% DAILY GENERATION BONUS</h3>
                    <p>Receive 1% of the total new deposits made by your Generation 1–5 network every 24 hours.</p>
                    
                    <h4 className="font-semibold text-slate-900 dark:text-white">Bonus Rules</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Calculated every 24 hours.</li>
                      <li>Based only on new deposits.</li>
                      <li>Trading Turnover is not included.</li>
                      <li>Bonus is credited automatically.</li>
                    </ul>
                  </div>

                  <hr className="border-slate-200 dark:border-slate-700" />

                  <div className="space-y-4">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white uppercase">PROFESSIONAL TRADING PROFILE</h3>
                    <p>Turn your trading skills into a new source of income.</p>
                    <p>Create your public trading profile and allow other users to allocate their balance based on your trading performance.</p>
                    
                    <h4 className="font-semibold text-slate-900 dark:text-white">Your Trading Profile Includes</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Profit Rate</li>
                      <li>Loss Rate</li>
                      <li>Trading History</li>
                      <li>Trading Capacity</li>
                      <li>Maximum Profit Limit</li>
                      <li>Maximum Loss Limit</li>
                      <li>Commission Rate</li>
                    </ul>
                  </div>

                  <hr className="border-slate-200 dark:border-slate-700" />

                  <div className="space-y-4">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white uppercase">BALANCE STRIKE</h3>
                    <p>Users can allocate their balance to a trader's profile.</p>
                    
                    <h4 className="font-semibold text-slate-900 dark:text-white">Each trader sets:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Maximum Profit Percentage</li>
                      <li>Maximum Loss Percentage</li>
                      <li>Commission Rate (3%–5%)</li>
                    </ul>

                    <h4 className="font-semibold text-slate-900 dark:text-white">Example</h4>
                    <p>A user allocates ৳100.</p>
                    <p>If the trade earns 30% profit:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>User receives ৳130.</li>
                      <li>Trader receives a 3%–5% commission from the profit amount only.</li>
                    </ul>
                    <p>If the trade reaches a 20% loss:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>User receives ৳80.</li>
                      <li>Trader receives no commission.</li>
                    </ul>
                  </div>

                  <hr className="border-slate-200 dark:border-slate-700" />

                  <div className="space-y-4">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white uppercase">IMPORTANT NOTES</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Rewards are calculated automatically.</li>
                      <li>Only Qualified Active Members are counted.</li>
                      <li>Daily Salary is not cumulative.</li>
                      <li>Only the highest qualified salary level will be paid.</li>
                      <li>Weekly and Monthly Salary are additional rewards.</li>
                      <li>The platform reserves the right to review suspicious or fraudulent activities.</li>
                    </ul>
                  </div>
                </>
              )}
            </div>

            <div className="pt-2">
              <button
                onClick={onClose}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-md transition-all"
              >
                {language === 'bn' ? 'ঠিক আছে' : 'Got it!'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
