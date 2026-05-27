'use client';

import { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import * as api from '@/lib/api';

export default function SettingsPage() {
  const [gatewayUrl, setGatewayUrl] = useState('');
  const [adminKey, setAdminKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [autoRouting, setAutoRouting] = useState(false);
  const [compression, setCompression] = useState(false);
  const [testStatus, setTestStatus] = useState<
    'idle' | 'loading' | 'success' | 'failed'
  >('idle');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>(
    'idle'
  );

  useEffect(() => {
    // Load from localStorage
    const savedUrl =
      localStorage.getItem('gatewayUrl') || process.env.NEXT_PUBLIC_GATEWAY_URL;
    const savedKey =
      localStorage.getItem('adminKey') || process.env.NEXT_PUBLIC_ADMIN_KEY;
    const savedRouting = localStorage.getItem('autoRouting') === 'true';
    const savedCompression = localStorage.getItem('compression') === 'true';

    setGatewayUrl(savedUrl || '');
    setAdminKey(savedKey || '');
    setAutoRouting(savedRouting);
    setCompression(savedCompression);
  }, []);

  const handleTestConnection = async () => {
    setTestStatus('loading');
    try {
      const response = await fetch(`${gatewayUrl}/analytics/stats`, {
        headers: {
          'x-openrelio-admin-key': adminKey,
        },
      });
      if (response.ok) {
        setTestStatus('success');
        setTimeout(() => setTestStatus('idle'), 3000);
      } else {
        setTestStatus('failed');
        setTimeout(() => setTestStatus('idle'), 3000);
      }
    } catch (err) {
      setTestStatus('failed');
      setTimeout(() => setTestStatus('idle'), 3000);
    }
  };

  const handleSave = () => {
    setSaveStatus('saving');
    localStorage.setItem('gatewayUrl', gatewayUrl);
    localStorage.setItem('adminKey', adminKey);
    localStorage.setItem('autoRouting', String(autoRouting));
    localStorage.setItem('compression', String(compression));
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 500);
  };

  return (
    <div className="max-w-2xl space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-4xl font-semibold text-white mb-3">
          OpenRelio Settings
        </h1>
        <p className="max-w-2xl text-zinc-400 text-sm leading-7">
          Manage gateway access, admin controls, and optimization preferences
          for your OpenRelio pipeline.
        </p>
      </div>

      {/* API Configuration */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 space-y-6">
        <h2 className="text-lg font-semibold text-white">API Configuration</h2>

        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Gateway URL
          </label>
          <input
            type="text"
            value={gatewayUrl}
            onChange={(e) => setGatewayUrl(e.target.value)}
            placeholder="http://localhost:8787"
            className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-600"
          />
          <p className="text-xs text-zinc-500 mt-1">
            The base URL of your OpenRelio gateway
          </p>
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Admin Key
          </label>
          <div className="relative">
            <input
              type={showKey ? 'text' : 'password'}
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              placeholder="••••••••••••••••"
              className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-600 pr-12"
            />
            <button
              onClick={() => setShowKey(!showKey)}
              className="absolute right-3 top-2.5 text-zinc-400 hover:text-white text-sm"
            >
              {showKey ? 'Hide' : 'Show'}
            </button>
          </div>
          <p className="text-xs text-zinc-500 mt-1">
            Your OpenRelio admin authentication key
          </p>
        </div>

        <div className="flex items-center gap-4 pt-4">
          <button
            onClick={handleTestConnection}
            disabled={testStatus === 'loading'}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded font-medium transition-colors disabled:opacity-50"
          >
            {testStatus === 'loading' ? 'Testing...' : 'Test Connection'}
          </button>
          {testStatus === 'success' && (
            <div className="flex items-center gap-2 text-green-400 text-sm">
              <Check size={16} />
              Connected
            </div>
          )}
          {testStatus === 'failed' && (
            <div className="flex items-center gap-2 text-red-400 text-sm">
              <X size={16} />
              Failed
            </div>
          )}
        </div>
      </div>

      {/* Intelligence Layer */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 space-y-6">
        <h2 className="text-lg font-semibold text-white">Intelligence Layer</h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Auto Routing</p>
              <p className="text-zinc-400 text-sm">
                Automatically select the cheapest model for each task
              </p>
            </div>
            <button
              onClick={() => setAutoRouting(!autoRouting)}
              className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out ${
                autoRouting ? 'bg-indigo-600' : 'bg-zinc-700'
              }`}
            >
              <span
                className={`absolute left-0.5 top-0.5 h-6 w-6 rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out ${
                  autoRouting ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
            <div>
              <p className="text-white font-medium">Context Compression</p>
              <p className="text-zinc-400 text-sm">
                Summarize long conversations to reduce tokens
              </p>
            </div>
            <button
              onClick={() => setCompression(!compression)}
              className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out ${
                compression ? 'bg-indigo-600' : 'bg-zinc-700'
              }`}
            >
              <span
                className={`absolute left-0.5 top-0.5 h-6 w-6 rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out ${
                  compression ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Model Preferences */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 space-y-6">
        <h2 className="text-lg font-semibold text-white">Model Preferences</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              SIMPLE tasks
            </label>
            <select className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2 text-white focus:outline-none focus:border-indigo-600">
              <option>gpt-4o-mini</option>
              <option>gpt-4o</option>
              <option>gpt-4</option>
            </select>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              MEDIUM tasks
            </label>
            <select className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2 text-white focus:outline-none focus:border-indigo-600">
              <option>gpt-4o</option>
              <option>gpt-4o-mini</option>
              <option>gpt-4</option>
            </select>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              COMPLEX tasks
            </label>
            <select className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2 text-white focus:outline-none focus:border-indigo-600">
              <option>gpt-4o</option>
              <option>gpt-4</option>
              <option>gpt-4o-mini</option>
            </select>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saveStatus === 'saving'}
          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded font-medium transition-colors disabled:opacity-50"
        >
          {saveStatus === 'saving' ? 'Saving...' : 'Save Settings'}
        </button>
        {saveStatus === 'saved' && (
          <p className="text-green-400 text-sm">Settings saved locally</p>
        )}
      </div>

      <p className="text-xs text-zinc-500">
        Settings are saved locally in your browser. For persistent storage,
        you'll need to connect to your OpenRelio account.
      </p>
    </div>
  );
}
