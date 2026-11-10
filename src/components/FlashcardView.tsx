import React, { useState } from 'react';
import { TermItem } from '../types/glossary';
import { getVisualDiagram } from './diagrams/TermDiagramMap';
import { getCategoryBadgeStyle } from './TermModal';
import { ChevronLeft, ChevronRight, RotateCw, Volume2, Star, CheckCircle, Sparkles } from 'lucide-react';

interface FlashcardViewProps {
  items: TermItem[];
  learnedSet: Set<number>;
  bookmarkedSet: Set<number>;
  customImages?: Record<number, string>;
  onToggleLearned: (no: number) => void;
  onToggleBookmark: (no: number) => void;
  onSpeak: (item: TermItem) => void;
}

export const FlashcardView: React.FC<FlashcardViewProps> = ({
  items,
  learnedSet,
  bookmarkedSet,
  customImages = {},
  onToggleLearned,
  onToggleBookmark,
  onSpeak,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (items.length === 0) {
    return (
      <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
        <p className="text-slate-500 font-bold">조건에 맞는 용어가 없습니다.</p>
      </div>
    );
  }

  const currentItem = items[currentIndex % items.length];
  const isLearned = learnedSet.has(currentItem.no);
  const isBookmarked = bookmarkedSet.has(currentItem.no);

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const randomIndex = Math.floor(Math.random() * items.length);
    setCurrentIndex(randomIndex);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* 카드 상단 인디케이터 & 컨트롤 */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl bg-slate-900 text-white text-xs font-black">
            카드 {currentIndex + 1} / {items.length}
          </span>
          <span className={`px-2.5 py-0.5 rounded-lg border text-xs font-bold ${getCategoryBadgeStyle(currentItem.category)}`}>
            {currentItem.category}
          </span>
        </div>

        <button
          onClick={handleShuffle}
          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          랜덤 셔플
        </button>
      </div>

      {/* 3D 회전 플래시카드 컨테이너 */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="relative min-h-[460px] cursor-pointer perspective-1000 select-none group"
      >
        <div
          className={`w-full h-full min-h-[460px] rounded-3xl p-6 sm:p-8 bg-white border-2 transition-all duration-500 shadow-xl flex flex-col justify-between ${
            isFlipped
              ? 'border-blue-400 bg-gradient-to-b from-white to-blue-50/30'
              : 'border-slate-200 group-hover:border-blue-300'
          }`}
        >
          {!isFlipped ? (
            /* 앞면: 1:1 도해 + 현장 은어 + 퀴즈 유도 */
            <div className="space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
                  <span>[앞면] 도해와 현장 은어로 정식 명칭을 유추해보세요</span>
                  <span className="text-blue-600 flex items-center gap-1">
                    <RotateCw className="w-3.5 h-3.5" /> 클릭하여 정답 확인
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 mb-4">
                  <div className="text-[11px] font-extrabold text-amber-700 uppercase">현장 선임 호칭 / 은어</div>
                  <div className="text-xl font-black mt-0.5">{currentItem.slang}</div>
                </div>

                {/* 1:1 도해 또는 등록된 실사 사진 */}
                {customImages[currentItem.no] ? (
                  <div className="relative rounded-2xl overflow-hidden shadow border border-emerald-500/30 bg-slate-900 h-44">
                    <img
                      src={customImages[currentItem.no]}
                      alt={currentItem.termKo}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-emerald-600/90 text-white text-[10px] font-bold">
                      실사 사진
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl overflow-hidden shadow border border-slate-800 bg-slate-950">
                    {getVisualDiagram(currentItem)}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">공정: {currentItem.process}</span>
                <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-xl">
                  카드 클릭 시 해설 회전 ↻
                </span>
              </div>
            </div>
          ) : (
            /* 뒷면: 정식 명칭 + 정의 + Red-Line 안전수칙 + 실전 대화 */
            <div className="space-y-4 flex-1 flex flex-col justify-between animate-in fade-in duration-200">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[11px] font-black text-blue-600 uppercase">정답 및 기술 해설</span>
                    <h3 className="text-2xl font-black text-slate-900">{currentItem.termKo}</h3>
                    <p className="text-xs font-semibold text-slate-400">{currentItem.termEn}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSpeak(currentItem);
                    }}
                    className="p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 transition"
                    title="음성 듣기"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                {/* 정의 */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-black text-blue-700 mb-1">핵심 정의</div>
                  <p className="text-sm text-slate-800 leading-relaxed font-medium">
                    {currentItem.definition}
                  </p>
                </div>

                {/* Red-Line */}
                <div className="p-4 rounded-2xl bg-red-50 border-2 border-red-200">
                  <div className="text-xs font-black text-red-600 mb-1">🚨 현장 Red-Line 주의사항</div>
                  <p className="text-xs sm:text-sm text-red-950 font-bold leading-relaxed">
                    {currentItem.caution}
                  </p>
                </div>

                {/* 반장님 한마디 */}
                <div className="p-3.5 rounded-2xl bg-slate-900 text-white">
                  <div className="text-[11px] font-black text-amber-400 mb-0.5">반장님의 실전 한마디</div>
                  <p className="text-xs text-slate-100 italic">"{currentItem.dialogue}"</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 text-center text-xs text-slate-400">
                카드를 다시 클릭하면 앞면으로 돌아갑니다
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 하단 네비게이션 & 학습 상태 바 */}
      <div className="flex items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <button
          onClick={handlePrev}
          className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-extrabold flex items-center gap-1.5 transition"
        >
          <ChevronLeft className="w-4 h-4" />
          이전 카드
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleBookmark(currentItem.no)}
            className={`p-2.5 rounded-xl border text-xs font-bold transition flex items-center gap-1 ${
              isBookmarked
                ? 'bg-amber-50 border-amber-300 text-amber-700'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Star className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400 text-amber-500' : ''}`} />
          </button>

          <button
            onClick={() => onToggleLearned(currentItem.no)}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
              isLearned
                ? 'bg-emerald-600 text-white'
                : 'bg-blue-600 hover:bg-blue-500 text-white'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            <span>{isLearned ? '암기 완료' : '암기 체크'}</span>
          </button>
        </div>

        <button
          onClick={handleNext}
          className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-extrabold flex items-center gap-1.5 transition"
        >
          다음 카드
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
