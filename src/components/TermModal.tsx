import React, { useEffect } from 'react';
import { TermItem } from '../types/glossary';
import { TermVisual } from './TermVisual';
import { Volume2, Star, CheckCircle, ChevronLeft, ChevronRight, X, AlertTriangle, MessageSquare, Info, Clipboard } from 'lucide-react';
import { extractImageFromPasteEvent, readImageFromClipboard } from '../utils/clipboardHelper';

interface TermModalProps {
  item: TermItem | null;
  isOpen: boolean;
  customImage?: string;
  onClose: () => void;
  onNavigate: (delta: number) => void;
  isLearned: boolean;
  isBookmarked: boolean;
  onToggleLearned: (no: number) => void;
  onToggleBookmark: (no: number) => void;
  onSpeak: (item: TermItem) => void;
  onUploadImage?: (no: number, dataUrl: string) => void;
  onDeleteImage?: (no: number) => void;
  totalCount: number;
}

export const getCategoryBadgeStyle = (category: string) => {
  switch (category) {
    case '소재':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case '제품':
      return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    case '소재가공':
      return 'bg-sky-50 text-sky-700 border-sky-200';
    case '에칭및세정':
    case '에칭·세정':
      return 'bg-teal-50 text-teal-700 border-teal-200';
    case '검사및포장':
      return 'bg-purple-50 text-purple-700 border-purple-200';
    case '측정·공차':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case '품질·안전':
      return 'bg-rose-50 text-rose-700 border-rose-200';
    default:
      return 'bg-slate-50 text-slate-700 border-slate-200';
  }
};

export const TermModal: React.FC<TermModalProps> = ({
  item,
  isOpen,
  customImage,
  onClose,
  onNavigate,
  isLearned,
  isBookmarked,
  onToggleLearned,
  onToggleBookmark,
  onSpeak,
  onUploadImage,
  onDeleteImage,
  totalCount,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate(-1);
      if (e.key === 'ArrowRight') onNavigate(1);
    };

    const handlePaste = async (e: ClipboardEvent) => {
      if (!isOpen || !item || !onUploadImage) return;
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;

      const dataUrl = await extractImageFromPasteEvent(e);
      if (dataUrl) {
        e.preventDefault();
        onUploadImage(item.no, dataUrl);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('paste', handlePaste);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('paste', handlePaste);
    };
  }, [isOpen, onNavigate, onClose, item, onUploadImage]);

  const handlePasteClick = async () => {
    if (!item || !onUploadImage) return;
    try {
      const dataUrl = await readImageFromClipboard();
      if (dataUrl) {
        onUploadImage(item.no, dataUrl);
      } else {
        alert('클립보드에 복사된 이미지가 없습니다.\n엑셀에서 그림을 클릭 후 Ctrl+C(복사)한 뒤 다시 눌러주세요.');
      }
    } catch {
      alert('클립보드 읽기 권한이 허용되지 않았습니다.\n모달이 열린 상태에서 키보드 [Ctrl + V] 로 붙여넣으셔도 바로 적용됩니다.');
    }
  };

  if (!isOpen || !item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-3xl max-h-[92vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto">
        {/* 모달 상단 고정 헤더 */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-5 sm:px-6 py-4 bg-white/95 backdrop-blur border-b border-slate-100">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-lg bg-slate-900 text-white text-xs font-black tracking-wide">
              No. {String(item.no).padStart(2, '0')} / {totalCount}
            </span>
            <span className={`px-3 py-1 rounded-lg border text-xs font-bold ${getCategoryBadgeStyle(item.category)}`}>
              {item.category}
            </span>
            <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
              {item.process}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
            title="닫기 (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 스크롤 가능한 본문 영역 */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {/* 타이틀 및 음성 버튼 */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {item.termKo}
              </h3>
              <p className="text-sm font-semibold text-slate-500 mt-0.5">{item.termEn}</p>
            </div>
            <button
              onClick={() => onSpeak(item)}
              className="self-start sm:self-center px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-extrabold flex items-center gap-2 transition active:scale-95 shadow-sm"
            >
              <Volume2 className="w-4 h-4 text-blue-600" />
              <span>용어·은어 음성 듣기 (TTS)</span>
            </button>
          </div>

          {/* 현장 호칭 하이라이트 (은어) */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
              <span className="text-base font-black">🗣️</span>
            </div>
            <div>
              <div className="text-xs font-extrabold text-amber-800 uppercase tracking-wide">
                현장 작업자 호칭 / 은어 (이렇게 부릅니다)
              </div>
              <div className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                {item.slang}
              </div>
            </div>
          </div>

          {/* 1:1 전용 맞춤형 기술 도해 SVG 및 실제 등록 이미지 */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-extrabold text-slate-500 uppercase px-1">
              <span className="flex items-center gap-1.5 text-blue-700">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                {customImage ? '실제 시트 등록 이미지 (도해 전환 가능)' : `신규 입사자용 1:1 맞춤형 기술 도해 (${item.diagramKey})`}
              </span>
              
              <button
                onClick={handlePasteClick}
                className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-[11px] font-black flex items-center gap-1.5 transition active:scale-95 shadow-2xs"
                title="엑셀에서 복사(Ctrl+C)한 사진을 바로 붙여넣기 (또는 키보드 Ctrl+V)"
              >
                <Clipboard className="w-3.5 h-3.5 text-emerald-600" />
                <span>클립보드 사진 붙여넣기 (Ctrl+V)</span>
              </button>
            </div>
            <TermVisual
              item={item}
              customImage={customImage}
              onUploadImage={onUploadImage}
              onDeleteImage={onDeleteImage}
              allowEdit={true}
            />
          </div>

          {/* 초심자 눈높이 핵심 정의 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="text-xs font-extrabold text-blue-700 flex items-center gap-1.5">
              <Info className="w-4 h-4" />
              기초 지식이 없어도 바로 이해하는 핵심 정의
            </div>
            <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
              {item.definition}
            </p>
            {item.specs && (
              <div className="pt-2 mt-2 border-t border-slate-200/80 flex items-center gap-2 text-xs font-bold text-slate-600">
                <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 text-[11px]">일반 규격/공차</span>
                <span>{item.specs}</span>
              </div>
            )}
          </div>

          {/* 현장 작업 시 절대 주의사항 (Red-Line Box) */}
          <div className="p-4 rounded-2xl bg-red-50 border-2 border-red-200 space-y-1.5">
            <div className="text-xs font-black text-red-600 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
              현장 작업 시 절대 주의사항 (불량·안전 Red-Line)
            </div>
            <p className="text-sm sm:text-base text-red-950 leading-relaxed font-bold">
              {item.caution}
            </p>
          </div>

          {/* 선임 작업자의 실전 한마디 */}
          <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-1.5 shadow-md">
            <div className="text-xs font-black text-amber-400 flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4" />
              현장 선임 작업자(반장님)의 실전 대화 예시
            </div>
            <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-normal italic">
              {item.dialogue}
            </p>
          </div>
        </div>

        {/* 모달 하단 네비게이션 & 학습 액션 바 */}
        <div className="sticky bottom-0 z-20 flex flex-wrap items-center justify-between gap-2 px-5 sm:px-6 py-3.5 bg-slate-50 border-t border-slate-200">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate(-1)}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-300 flex items-center gap-1 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              이전 용어
            </button>
            <button
              onClick={() => onNavigate(1)}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-300 flex items-center gap-1 transition"
            >
              다음 용어
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(item.no)}
              className={`px-3.5 py-2 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 ${
                isBookmarked
                  ? 'bg-amber-50 border-amber-300 text-amber-800'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Star className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400 text-amber-500' : 'text-slate-400'}`} />
              <span>{isBookmarked ? '중요 별표됨' : '중요 별표'}</span>
            </button>

            <button
              onClick={() => onToggleLearned(item.no)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 shadow-sm ${
                isLearned
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-500 text-white'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>{isLearned ? '학습 완료됨' : '학습 완료 체크'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
