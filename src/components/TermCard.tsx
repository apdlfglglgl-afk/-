import React from 'react';
import { TermItem } from '../types/glossary';
import { TermVisual } from './TermVisual';
import { getCategoryBadgeStyle } from './TermModal';
import { Volume2, Star, CheckCircle, ExternalLink, AlertTriangle, Image as ImageIcon, Clipboard, Check } from 'lucide-react';

interface TermCardProps {
  item: TermItem;
  isLearned: boolean;
  isBookmarked: boolean;
  isDesignated?: boolean;
  customImage?: string;
  onSelect: (item: TermItem) => void;
  onToggleLearned: (no: number) => void;
  onToggleBookmark: (no: number) => void;
  onSpeak: (item: TermItem) => void;
  onUploadImage?: (no: number, dataUrl: string) => void;
  onDeleteImage?: (no: number) => void;
  onDesignate?: (no: number) => void;
  onPasteFromClipboard?: (no: number) => void;
}

export const TermCard: React.FC<TermCardProps> = ({
  item,
  isLearned,
  isBookmarked,
  isDesignated = false,
  customImage,
  onSelect,
  onToggleLearned,
  onToggleBookmark,
  onSpeak,
  onUploadImage,
  onDeleteImage,
  onDesignate,
  onPasteFromClipboard,
}) => {
  return (
    <div
      onClick={() => onSelect(item)}
      className={`group relative flex flex-col bg-white rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden ${
        isDesignated
          ? 'ring-4 ring-blue-500 shadow-2xl border-blue-500 scale-[1.01] z-10'
          : isLearned
          ? 'border-emerald-300/80 bg-emerald-50/20 shadow-sm hover:shadow-xl hover:-translate-y-1'
          : 'border-slate-200 hover:border-blue-400 shadow-sm hover:shadow-xl hover:-translate-y-1'
      }`}
    >
      {/* 카드 지정 상태 배너 (클립보드 붙여넣기 대기 중) */}
      {isDesignated && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-black px-3 py-1.5 flex items-center justify-between"
        >
          <span className="flex items-center gap-1.5 animate-pulse">
            <Clipboard className="w-3.5 h-3.5 text-amber-300" />
            사진 붙여넣기 지정됨 [Ctrl+V]
          </span>
          <button
            onClick={() => onPasteFromClipboard?.(item.no)}
            className="px-2 py-0.5 rounded bg-white text-blue-700 font-extrabold text-[10px] hover:bg-blue-50 transition active:scale-95"
            title="클립보드에서 바로 사진 가져오기"
          >
            클립보드 바로적용
          </button>
        </div>
      )}

      {/* 카드 상단 배지 바 */}
      <div className="flex items-center justify-between p-4 pb-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="px-2.5 py-0.5 rounded-md bg-slate-900 text-white text-[11px] font-black tracking-wide">
            No.{String(item.no).padStart(2, '0')}
          </span>
          <span className={`px-2.5 py-0.5 rounded-md border text-[11px] font-bold ${getCategoryBadgeStyle(item.category)}`}>
            {item.category}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium truncate max-w-[100px]">
            {item.process}
          </span>
        </div>

        {/* 우측 상단 클립보드 붙여넣기 & 즐겨찾기 & 학습 체크 아이콘 */}
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => {
              if (onPasteFromClipboard) {
                onPasteFromClipboard(item.no);
              } else if (onDesignate) {
                onDesignate(item.no);
              }
            }}
            className={`p-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
              isDesignated
                ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-300'
                : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50'
            }`}
            title={`No.${item.no} 카드에 엑셀/클립보드 사진 붙여넣기 (Ctrl+V)`}
          >
            <Clipboard className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onToggleBookmark(item.no)}
            className={`p-1.5 rounded-lg transition ${
              isBookmarked
                ? 'text-amber-500 bg-amber-50 hover:bg-amber-100'
                : 'text-slate-300 hover:text-amber-500 hover:bg-slate-100'
            }`}
            title="중요 별표"
          >
            <Star className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400 text-amber-500' : ''}`} />
          </button>
          <button
            onClick={() => onToggleLearned(item.no)}
            className={`p-1.5 rounded-lg transition ${
              isLearned
                ? 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100'
                : 'text-slate-300 hover:text-emerald-600 hover:bg-slate-100'
            }`}
            title="학습 완료 체크"
          >
            <CheckCircle className={`w-4 h-4 ${isLearned ? 'fill-emerald-600 text-white' : ''}`} />
          </button>
        </div>
      </div>

      {/* 용어명 및 영문명 */}
      <div className="px-4 pb-2">
        <h4 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            {item.termKo}
            {customImage && (
              <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[9px] font-black">
                사진
              </span>
            )}
          </span>
          <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-blue-500 opacity-0 group-hover:opacity-100 transition" />
        </h4>
        <p className="text-xs text-slate-400 font-semibold truncate">{item.termEn}</p>
      </div>

      {/* 현장 은어 하이라이트 */}
      <div className="mx-4 mb-3 px-3 py-1.5 rounded-xl bg-amber-50/80 border border-amber-200/80 flex items-center gap-2">
        <span className="text-[11px] font-black text-amber-800 shrink-0">현장 호칭:</span>
        <span className="text-xs font-black text-slate-800 truncate">{item.slang}</span>
      </div>

      {/* 1:1 맞춤형 SVG 도해 또는 실제 등록 이미지 */}
      <div className="mx-4 mb-3">
        <TermVisual
          item={item}
          customImage={customImage}
          onUploadImage={onUploadImage}
          onDeleteImage={onDeleteImage}
          allowEdit={true}
        />
      </div>

      {/* 핵심 정의 요약 (2줄 클램프) */}
      <div className="px-4 pb-3 flex-1">
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {item.definition}
        </p>
      </div>

      {/* 하단 Red-Line 경고 맛보기 & TTS 버튼 */}
      <div className="mt-auto px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1 text-[11px] font-bold text-red-600 truncate mr-2">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-red-500" />
          <span className="truncate">{item.caution}</span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onSpeak(item);
          }}
          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition shrink-0"
          title="발음 듣기"
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
