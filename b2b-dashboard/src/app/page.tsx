'use client';

import React, { useState } from 'react';
import { Key, ShieldCheck, Activity, CreditCard, Copy, Check, Plus } from 'lucide-react';

export default function Dashboard() {
  const [apiKey, setApiKey] = useState('zk_live_98a7f6b5c4d3e2w1_midnight');
  const [copied, setCopied] = useState(false);
  const [verificationsCount, setVerificationsCount] = useState(12480);

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateNewKey = () => {
    const randomHex = Math.random().toString(36).substring(2, 15);
    setApiKey(`zk_live_${randomHex}_midnight`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Sidebar Navigation */}
      <div className="flex">
        <aside className="w-64 bg-slate-900 border-r border-slate-800 min-h-screen p-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2 bg-indigo-600 rounded-lg">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl tracking-wide bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              ZK-Identity B2B
            </span>
          </div>

          <nav className="space-y-2">
            <a href="#" className="flex items-center gap-3 px-4 py-3 bg-indigo-600/20 text-indigo-400 rounded-xl font-medium border border-indigo-500/30">
              <Activity className="w-5 h-5" /> Tổng Quan Overview
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800/60 rounded-xl font-medium transition">
              <Key className="w-5 h-5" /> Quản Lý API Key
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800/60 rounded-xl font-medium transition">
              <CreditCard className="w-5 h-5" /> Gói Dịch Vụ & Billing
            </a>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-10">
          <header className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">B2B Developer Console</h1>
              <p className="text-slate-400">Quản lý kết nối API & Xác thực Zero-Knowledge qua Midnight Network</p>
            </div>
            <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-full border border-slate-800">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-sm font-medium text-slate-300">Midnight Testnet Connected</span>
            </div>
          </header>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
              <p className="text-slate-400 text-sm mb-1">Lượt Xác Thực ZK Tháng Này</p>
              <h3 className="text-3xl font-extrabold text-white">{verificationsCount.toLocaleString()}</h3>
              <p className="text-xs text-emerald-400 mt-2">↑ +14% so với tháng trước</p>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
              <p className="text-slate-400 text-sm mb-1">Tỷ Lệ ZK Proof Hợp Lệ</p>
              <h3 className="text-3xl font-extrabold text-white">99.8%</h3>
              <p className="text-xs text-slate-500 mt-2">Không rò rỉ dữ liệu cá nhân</p>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
              <p className="text-slate-400 text-sm mb-1">Số Dư Tín Dụng API (Credits)</p>
              <h3 className="text-3xl font-extrabold text-indigo-400">$2,450.00</h3>
              <p className="text-xs text-slate-400 mt-2">Gói Doanh Nghiệp (Enterprise Tier)</p>
            </div>
          </div>

          {/* API Key Management Box */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Key className="w-5 h-5 text-indigo-400" /> API Secret Key
                </h2>
                <p className="text-sm text-slate-400">Sử dụng API Key này trong header <code className="text-indigo-300">x-api-key</code> khi gọi API Gateway</p>
              </div>
              <button
                onClick={handleGenerateNewKey}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2 rounded-xl transition text-sm"
              >
                <Plus className="w-4 h-4" /> Tạo Key Mới
              </button>
            </div>

            <div className="flex items-center gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <input
                type="text"
                readOnly
                value={apiKey}
                className="bg-transparent font-mono text-slate-200 flex-1 outline-none text-sm"
              />
              <button
                onClick={handleCopy}
                className="p-2 text-slate-400 hover:text-white bg-slate-900 rounded-lg border border-slate-800 transition"
              >
                {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Quick Integration Example */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3">Hướng Dẫn Tích Hợp Nhanh (Client SDK)</h2>
            <pre className="bg-slate-950 p-4 rounded-xl font-mono text-xs text-cyan-300 overflow-x-auto">
{`import { ZkKycClientSDK } from '@zk-kyc/client-sdk';

const sdk = new ZkKycClientSDK('${apiKey}');
const result = await sdk.verifyUserIdentity({ birthYear: 2000, countryCode: 100 });
console.log(result.isVerified); // true`}
            </pre>
          </div>
        </main>
      </div>
    </div>
  );
}