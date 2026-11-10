/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GLOSSARY_DATA } from '../data/glossaryData';
import { TermItem } from '../types/glossary';
import { Search, X, Check, Clipboard, Image as ImageIcon } from 'lucide-react';

interface ClipboardAssignModalProps {
  isOpen: boolean;
  imageDataUrl: string | null;
  onClose: () => void;
  onAssign: (termNo: number, dataUrl: string) => void;
}

export const ClipboardAssignModal: React.FC<ClipboardAssignModalProps> = ({
  isOpen,
  imageDataUrl,
  onClose,
  onAssign,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNo, setSelectedNo] = useState<number | null>(null);

  if (!isOpen || !imageDataUrl) return null;

  const filtered = GLOSSARY_DATA.filter((item) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      item.termKo.toLowerCase().includes(q) ||
      item.termEn.toLowerCase().includes(q) ||
      item.slang.toLowerCase().includes(q) ||
      String(item.no) === q ||
      item.category.includes(q)
    );
  });

  const handleConfirm = () => {
    if (selectedNo && imageDataUrl) {
      onAssign(selectedNo, imageDataUrl);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[88vh]">
        {/* 헤더 */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20">
              <Clipboard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                클립보드 이미지 적용 대상 카드 선택
              </h3>
              <p className="text-xs text-slate-500">
                복사하신 이미지를 1~66번 중 어느 용어의 실사 사진으로 등록할까요?
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 바디: 좌측 미리보기 / 우측 용어 리스트 */}
        <div className="p-5 flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-5 gap-5">
          {/* 이미지 미리보기 */}
          <div className="md:col-span-2 flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-[11px] font-bold text-slate-400 mb-2 flex items-center gap-1">
              <ImageIcon className="w-3.5 h-3.5 text-emerald-400" /> 복사된 이미지 미리보기
            </span>
            <div className="w-full flex-1 min-h-[160px] max-h-[220px] rounded-xl overflow-hidden flex items-center justify-center bg-black/40">
              <img
                src={imageDataUrl}
                alt="클립보드 이미지"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>

          {/* 용어 선택 검색 및 리스트 */}
          <div className="md:col-span-3 flex flex-col min-h-0">
            <div className="relative mb-3">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="용어 검색 (이름, 번호, 은어)"
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-100 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 text-slate-900 font-medium"
                autoFocus
              />
            </div>

            <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 max-h-[260px] scrollbar-thin">
              {filtered.map((item) => {
                const isSelected = selectedNo === item.no;
                return (
                  <button
                    key={item.no}
                    type="button"
                    onClick={() => setSelectedNo(item.no)}
                    className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between text-xs transition ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate mr-2">
                      <span className="px-1.5 py-0.5 rounded bg-slate-900 text-white font-black text-[10px] shrink-0">
                        {String(item.no).padStart(2, '0')}
                      </span>
                      <span className="font-extrabold text-slate-900 truncate">
                        {item.termKo}
                      </span>
                      <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200 truncate">
                        {item.slang}
                      </span>
                    </div>

                    <div className="shrink-0 flex items-center gap-1">
                      <span className="text-[10px] text-slate-400 font-bold">
                        {item.category}
                      </span>
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 푸터 */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-600">
            {selectedNo ? (
              <span className="text-blue-700">
                선택됨: No.{String(selectedNo).padStart(2, '0')} [
                {GLOSSARY_DATA.find((d) => d.no === selectedNo)?.termKo}]
              </span>
            ) : (
              '목록에서 적용할 카드를 선택하세요.'
            )}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition"
            >
              취소
            </button>
            <button
              disabled={!selectedNo}
              onClick={handleConfirm}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white text-xs font-black shadow-md transition flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>사진 교체 적용</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
