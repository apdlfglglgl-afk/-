import React, { useState, useRef } from 'react';
import { GLOSSARY_DATA } from '../data/glossaryData';
import { UploadCloud, CheckCircle2, AlertCircle, X, Trash2, FolderPlus, HelpCircle } from 'lucide-react';

interface BatchImageUploaderProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveBatch: (imagesMap: Record<number, string>) => void;
  existingCount: number;
}

interface MatchCandidate {
  file: File;
  previewUrl: string;
  matchedNo: number | null;
  matchedTerm?: string;
  matchReason?: string;
}

export const BatchImageUploader: React.FC<BatchImageUploaderProps> = ({
  isOpen,
  onClose,
  onSaveBatch,
  existingCount,
}) => {
  const [candidates, setCandidates] = useState<MatchCandidate[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // 파일명 분석하여 66개 용어와 1:1 자동 매칭
  const matchFileToTerm = (fileName: string): { no: number | null; term?: string; reason?: string } => {
    const cleanName = fileName.toLowerCase().replace(/[\-_]/g, ' ');

    // 1. 파일명 앞부분 또는 전체에 번호가 적힌 경우 (예: "1.jpg", "01.png", "item_7.jpg", "no.12_ESC.png")
    const numMatch = cleanName.match(/(?:^|\b|no|item|img)?\s*([0-9]{1,2})\b/);
    if (numMatch && numMatch[1]) {
      const num = parseInt(numMatch[1], 10);
      if (num >= 1 && num <= GLOSSARY_DATA.length) {
        const item = GLOSSARY_DATA.find((d) => d.no === num);
        if (item) {
          return { no: num, term: item.termKo, reason: `번호 No.${num} 감지` };
        }
      }
    }

    // 2. 파일명에 용어 한글명이나 은어가 포함된 경우 (예: "단결정.png", "포커스링_실물.jpg")
    for (const item of GLOSSARY_DATA) {
      const termClean = item.termKo.toLowerCase().replace(/[\/\(\)\s]/g, '');
      const pureFileName = cleanName.replace(/[\/\(\)\s]/g, '');
      if (pureFileName.includes(termClean) || termClean.includes(pureFileName)) {
        return { no: item.no, term: item.termKo, reason: `용어명 "${item.termKo}" 일치` };
      }

      // 은어 키워드 매칭
      const slangs = item.slang.split(',').map((s) => s.trim().toLowerCase().replace(/[\/\(\)\s]/g, ''));
      for (const slang of slangs) {
        if (slang && pureFileName.includes(slang)) {
          return { no: item.no, term: item.termKo, reason: `현장 호칭 "${slang}" 일치` };
        }
      }
    }

    return { no: null };
  };

  const handleFilesSelected = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setIsProcessing(true);
    const newCandidates: MatchCandidate[] = [];

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) return;

      const previewUrl = URL.createObjectURL(file);
      const match = matchFileToTerm(file.name);

      newCandidates.push({
        file,
        previewUrl,
        matchedNo: match.no,
        matchedTerm: match.term,
        matchReason: match.reason,
      });
    });

    setCandidates((prev) => [...prev, ...newCandidates]);
    setIsProcessing(false);
  };

  const handleManualSelect = (index: number, no: number) => {
    const item = GLOSSARY_DATA.find((d) => d.no === no);
    setCandidates((prev) => {
      const next = [...prev];
      next[index] = {
        ...next[index],
        matchedNo: no,
        matchedTerm: item ? item.termKo : undefined,
        matchReason: '사용자 수동 지정',
      };
      return next;
    });
  };

  const handleRemoveCandidate = (index: number) => {
    setCandidates((prev) => {
      URL.revokeObjectURL(prev[index].previewUrl);
      return prev.filter((_, idx) => idx !== index);
    });
  };

  // 일괄 저장 실행
  const handleApplyAll = async () => {
    const validMatches = candidates.filter((c) => c.matchedNo !== null);
    if (validMatches.length === 0) {
      alert('매칭된 이미지가 없습니다. 번호를 지정해주세요.');
      return;
    }

    setIsProcessing(true);
    const resultMap: Record<number, string> = {};

    for (const item of validMatches) {
      if (item.matchedNo !== null) {
        // DataURL 변환
        const dataUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(item.file);
        });
        resultMap[item.matchedNo] = dataUrl;
      }
    }

    onSaveBatch(resultMap);
    setIsProcessing(false);
    onClose();
  };

  const matchedCount = candidates.filter((c) => c.matchedNo !== null).length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto">
        {/* 모달 상단 헤더 */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-black text-slate-900">시트 이미지 일괄 등록 &amp; 자동 매핑</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-black">
                66선 1:1 매칭
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              엑셀/문서의 그림 파일들을 한꺼번에 선택하면 번호 및 용어명으로 66개 항목에 자동 매핑됩니다.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 안내 배너 */}
        <div className="px-6 py-3 bg-amber-50/80 border-b border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-900">
          <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-extrabold text-amber-800">💡 왜 CSV에는 그림이 없나요?</span> CSV는 텍스트 전용 형식이라 엑셀 시트에 삽입되어 있던 그림은 텍스트 변환 시 포함되지 않습니다. 
            시트에서 그림을 복사/저장하시거나 준비된 사진들을 아래에 드래그하시면 즉시 66개 용어에 1:1로 적용됩니다.
          </div>
        </div>

        {/* 본문 영역 */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* 파일 업로드 드롭존 */}
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              handleFilesSelected(e.dataTransfer.files);
            }}
            className="border-2 border-dashed border-blue-300 hover:border-blue-500 bg-blue-50/30 hover:bg-blue-50/60 rounded-3xl p-8 text-center cursor-pointer transition flex flex-col items-center justify-center space-y-3"
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFilesSelected(e.target.files)}
              className="hidden"
            />
            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
              <UploadCloud className="w-7 h-7" />
            </div>
            <div>
              <p className="text-base font-black text-slate-800">
                여러 이미지 파일을 클릭하여 선택하거나 여기로 끌어다 놓으세요
              </p>
              <p className="text-xs text-slate-400 font-medium mt-1">
                (예: 1.png, 02_석영.jpg, 포커스링.png 등 - 번호나 용어명이 파일명에 있으면 자동 매핑)
              </p>
            </div>
          </div>

          {/* 등록된 후보 리스트 */}
          {candidates.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-black">
                <span className="text-slate-700">
                  선택된 파일: {candidates.length}개 (자동 매칭 완료: {matchedCount}개)
                </span>
                <button
                  onClick={() => setCandidates([])}
                  className="text-red-500 hover:underline flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> 목록 비우기
                </button>
              </div>

              <div className="border border-slate-200 rounded-2xl overflow-hidden max-h-72 overflow-y-auto divide-y divide-slate-100">
                {candidates.map((cand, idx) => (
                  <div key={idx} className="p-3 flex items-center justify-between gap-3 bg-white hover:bg-slate-50 transition">
                    <div className="flex items-center gap-3">
                      <img
                        src={cand.previewUrl}
                        alt="preview"
                        className="w-12 h-12 object-cover rounded-xl border border-slate-200 bg-slate-100"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-800 truncate max-w-[220px]">
                          {cand.file.name}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {(cand.file.size / 1024).toFixed(1)} KB
                        </div>
                      </div>
                    </div>

                    {/* 매칭 대상 드롭다운 */}
                    <div className="flex items-center gap-2">
                      {cand.matchedNo ? (
                        <div className="text-right">
                          <div className="text-xs font-extrabold text-blue-700 flex items-center justify-end gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                            No.{cand.matchedNo}. {cand.matchedTerm}
                          </div>
                          <span className="text-[10px] text-slate-400">{cand.matchReason}</span>
                        </div>
                      ) : (
                        <div className="text-xs text-amber-600 font-bold flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          번호 미정
                        </div>
                      )}

                      <select
                        value={cand.matchedNo || ''}
                        onChange={(e) => handleManualSelect(idx, parseInt(e.target.value, 10))}
                        className="text-xs py-1 px-2 rounded-xl border border-slate-200 bg-white font-bold text-slate-700"
                      >
                        <option value="">수동 번호 선택...</option>
                        {GLOSSARY_DATA.map((term) => (
                          <option key={term.no} value={term.no}>
                            No.{term.no} {term.termKo}
                          </option>
                        ))}
                      </select>

                      <button
                        onClick={() => handleRemoveCandidate(idx)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
                        title="제거"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 모달 하단 액션 바 */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500 font-semibold">
            현재 로컬 DB에 등록된 시트 이미지: <strong>{existingCount}개</strong>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-xs font-bold text-slate-700 transition"
            >
              취소
            </button>
            <button
              disabled={matchedCount === 0 || isProcessing}
              onClick={handleApplyAll}
              className={`px-6 py-2.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 shadow-md ${
                matchedCount > 0
                  ? 'bg-blue-600 hover:bg-blue-500 text-white'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isProcessing ? '저장 중...' : `${matchedCount}개 이미지 일괄 적용 저장`}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
