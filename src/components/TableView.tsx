import React from 'react';
import { TermItem } from '../types/glossary';
import { getCategoryBadgeStyle } from './TermModal';
import { getVisualDiagram } from './diagrams/TermDiagramMap';
import { Volume2, Star, CheckCircle, ExternalLink, AlertTriangle, Clipboard } from 'lucide-react';

interface TableViewProps {
  items: TermItem[];
  learnedSet: Set<number>;
  bookmarkedSet: Set<number>;
  customImages?: Record<number, string>;
  onSelectTerm: (item: TermItem) => void;
  onToggleLearned: (no: number) => void;
  onToggleBookmark: (no: number) => void;
  onSpeak: (item: TermItem) => void;
  onPasteFromClipboard?: (no: number) => void;
}

export const TableView: React.FC<TableViewProps> = ({
  items,
  learnedSet,
  bookmarkedSet,
  customImages = {},
  onSelectTerm,
  onToggleLearned,
  onToggleBookmark,
  onSpeak,
  onPasteFromClipboard,
}) => {
  if (items.length === 0) {
    return (
      <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
        <p className="text-slate-500 font-bold">검색 결과가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-black text-slate-500 uppercase tracking-wider">
              <th className="py-3.5 px-4 w-14 text-center">No.</th>
              <th className="py-3.5 px-4 w-28">분류</th>
              <th className="py-3.5 px-4 w-52">용어 명칭 (한글/영문)</th>
              <th className="py-3.5 px-4 w-44">현장 호칭 (은어)</th>
              <th className="py-3.5 px-4 w-60">1:1 도해 미리보기</th>
              <th className="py-3.5 px-4 min-w-[260px]">절대 주의사항 (Red-Line)</th>
              <th className="py-3.5 px-4 w-28 text-center">액션</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {items.map((item) => {
              const isLearned = learnedSet.has(item.no);
              const isBookmarked = bookmarkedSet.has(item.no);

              return (
                <tr
                  key={item.no}
                  onClick={() => onSelectTerm(item)}
                  className={`hover:bg-blue-50/40 cursor-pointer transition ${
                    isLearned ? 'bg-emerald-50/20' : ''
                  }`}
                >
                  {/* 번호 */}
                  <td className="py-3 px-4 text-center font-black text-slate-800">
                    <span className="px-2 py-0.5 rounded bg-slate-900 text-white text-[11px]">
                      {String(item.no).padStart(2, '0')}
                    </span>
                  </td>

                  {/* 분류 */}
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2.5 py-0.5 rounded-lg border font-bold text-[11px] ${getCategoryBadgeStyle(item.category)}`}>
                      {item.category}
                    </span>
                    <div className="text-[10px] text-slate-400 mt-0.5">{item.process}</div>
                  </td>

                  {/* 용어명 */}
                  <td className="py-3 px-4">
                    <div className="font-black text-slate-900 text-sm hover:text-blue-600 transition flex items-center gap-1.5">
                      <span>{item.termKo}</span>
                      <ExternalLink className="w-3 h-3 text-slate-300" />
                    </div>
                    <div className="text-slate-400 font-medium text-[11px] truncate max-w-[190px]">
                      {item.termEn}
                    </div>
                  </td>

                  {/* 현장 은어 */}
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-extrabold text-[11px] inline-block">
                      {item.slang}
                    </span>
                  </td>

                  {/* 1:1 도해 / 실사 썸네일 */}
                  <td className="py-3 px-4">
                    {customImages[item.no] ? (
                      <div className="relative w-48 h-20 rounded-xl overflow-hidden border border-emerald-500/30 bg-slate-900 shadow-sm group/thumb">
                        <img
                          src={customImages[item.no]}
                          alt={item.termKo}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-1 right-1 px-1.5 py-0.5 rounded bg-emerald-600/90 text-[9px] font-black text-white">
                          실사 등록됨
                        </div>
                      </div>
                    ) : (
                      <div className="w-52 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-sm pointer-events-none scale-95 origin-left">
                        {getVisualDiagram(item)}
                      </div>
                    )}
                  </td>

                  {/* 주의사항 */}
                  <td className="py-3 px-4">
                    <div className="flex items-start gap-1.5 text-red-950 bg-red-50/70 p-2 rounded-xl border border-red-200/60 leading-relaxed font-semibold">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{item.caution}</span>
                    </div>
                  </td>

                  {/* 액션 */}
                  <td className="py-3 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-center gap-1">
                      {onPasteFromClipboard && (
                        <button
                          onClick={() => onPasteFromClipboard(item.no)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition"
                          title="클립보드 사진 붙여넣기 (Ctrl+V)"
                        >
                          <Clipboard className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => onSpeak(item)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition"
                        title="발음 듣기"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onToggleBookmark(item.no)}
                        className={`p-1.5 rounded-lg transition ${
                          isBookmarked
                            ? 'text-amber-500 bg-amber-50'
                            : 'text-slate-300 hover:text-amber-500 hover:bg-slate-100'
                        }`}
                        title="별표"
                      >
                        <Star className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
                      </button>
                      <button
                        onClick={() => onToggleLearned(item.no)}
                        className={`p-1.5 rounded-lg transition ${
                          isLearned
                            ? 'text-emerald-600 bg-emerald-50'
                            : 'text-slate-300 hover:text-emerald-600 hover:bg-slate-100'
                        }`}
                        title="완료 체크"
                      >
                        <CheckCircle className={`w-4 h-4 ${isLearned ? 'fill-emerald-600 text-white' : ''}`} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
