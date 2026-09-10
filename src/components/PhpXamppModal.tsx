import React, { useState } from 'react';
import { PHP_PROJECT_FILES, PhpFile } from '../data/phpCodeTemplates';
import { X, Copy, Check, Terminal, Database, Server, FileCode, Download } from 'lucide-react';

interface PhpXamppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhpXamppModal: React.FC<PhpXamppModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const currentFile = PHP_PROJECT_FILES[selectedFileIndex];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDownload = () => {
    const blob = new Blob([currentFile.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = currentFile.filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-5xl bg-stone-900 text-stone-100 rounded-3xl shadow-2xl border border-stone-800 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-sm">
              🐘
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-base text-white">
                  PHP 8, MySQL & XAMPP Server Source Files
                </h3>
                <span className="bg-emerald-950 text-emerald-300 text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-800">
                  Ready to Run
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Setup guide and clean modular scripts configured for your local <code className="text-amber-300 font-mono">htdocs/ecoganesh/</code> folder.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* XAMPP Setup Instructions Banner */}
        <div className="p-4 bg-amber-950/40 border-b border-amber-900/40 text-xs text-amber-200/90 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>XAMPP Deployment:</strong> 1. Start Apache & MySQL in XAMPP &rarr; 2. Open <code className="bg-black/40 px-1 py-0.5 rounded font-mono text-amber-300">http://localhost/phpmyadmin</code> & import <code className="text-emerald-300 font-mono">database.sql</code> &rarr; 3. Place code in <code className="bg-black/40 px-1 py-0.5 rounded font-mono text-amber-300">C:/xampp/htdocs/ecoganesh/</code>.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy File'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File</span>
            </button>
          </div>
        </div>

        {/* Main Body: File Selector and Code Viewer */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
          {/* File sidebar */}
          <div className="md:col-span-4 bg-stone-950/70 border-r border-stone-800 p-3 overflow-y-auto space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 px-2 block mb-1">
              Project Architecture Files
            </span>
            {PHP_PROJECT_FILES.map((file, idx) => (
              <button
                key={file.filename}
                onClick={() => setSelectedFileIndex(idx)}
                className={`w-full text-left p-2.5 rounded-xl text-xs transition-colors flex items-start gap-2.5 ${
                  selectedFileIndex === idx
                    ? 'bg-stone-800 text-white border border-stone-700'
                    : 'text-stone-400 hover:bg-stone-900 hover:text-stone-200'
                }`}
              >
                {file.filename.endsWith('.sql') ? (
                  <Database className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                ) : (
                  <FileCode className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="font-mono font-semibold text-white">{file.filename}</div>
                  <div className="text-[10px] text-stone-500 line-clamp-1">{file.description}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Code Viewer */}
          <div className="md:col-span-8 flex flex-col bg-stone-900 overflow-hidden">
            <div className="p-3 bg-stone-950/40 border-b border-stone-800 flex items-center justify-between text-xs text-stone-400 font-mono">
              <span>{currentFile.path}</span>
              <span className="text-[11px] text-stone-500">{currentFile.code.split('\n').length} lines</span>
            </div>
            <div className="p-4 overflow-y-auto flex-1 font-mono text-xs text-stone-300 leading-relaxed bg-[#0F1117]">
              <pre className="whitespace-pre overflow-x-auto">
                {currentFile.code}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
