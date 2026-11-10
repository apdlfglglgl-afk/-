import React, { useRef, useState } from 'react';
import { TermItem } from '../types/glossary';
import { getVisualDiagram } from './diagrams/TermDiagramMap';
import { Camera, Image as ImageIcon, Sparkles, Trash2, ZoomIn, RefreshCw, Clipboard, Check } from 'lucide-react';
import { extractImageFromPasteEvent, readImageFromClipboard } from '../utils/clipboardHelper';

interface TermVisualProps {
  item: TermItem;
  customImage?: string;
  onUploadImage?: (no: number, dataUrl: string) => void;
  onDeleteImage?: (no: number) => void;
  preferredMode?: 'auto' | 'image' | 'svg';
  className?: string;
  allowEdit?: boolean;
}

export const TermVisual: React.FC<TermVisualProps> = ({
  item,
  customImage,
  onUploadImage,
  onDeleteImage,
  preferredMode = 'auto',
  className = '',
  allowEdit = true,
}) => {
  // 사용자가 수동으로 SVG vs 실제 이미지를 전환할 수 있는 내부 토글 상태
  const [showSvg, setShowSvg] = useState<boolean>(() => {
    if (preferredMode === 'svg') return true;
    if (preferredMode === 'image') return false;
    return !customImage; // 이미지가 있으면 이미지 우선, 없으면 SVG
  });

  const [isZoomed, setIsZoomed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [pasteSuccess, setPasteSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('이미지 파일(PNG, JPG, WEBP 등)만 등록할 수 있습니다.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl && onUploadImage) {
        onUploadImage(item.no, dataUrl);
        setShowSvg(false);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handlePasteFromClipboard = async () => {
    try {
      const dataUrl = await readImageFromClipboard();
      if (dataUrl && onUploadImage) {
        onUploadImage(item.no, dataUrl);
        setShowSvg(false);
        setPasteSuccess(true);
        setTimeout(() => setPasteSuccess(false), 2000);
      } else {
        alert('클립보드에 복사된 이미지가 없습니다.\n엑셀에서 그림을 클릭 후 Ctrl+C(복사)한 뒤 다시 눌러주세요.');
      }
    } catch (err) {
      alert('클립보드 접근 권한이 필요하거나 지원되지 않는 브라우저입니다.\n카드를 클릭한 후 키보드 [Ctrl + V] 로 붙여넣어 보세요.');
    }
  };

  const handleContainerPaste = async (e: React.ClipboardEvent) => {
    if (!allowEdit || !onUploadImage) return;
    const dataUrl = await extractImageFromPasteEvent(e.nativeEvent);
    if (dataUrl) {
      e.preventDefault();
      e.stopPropagation();
      onUploadImage(item.no, dataUrl);
      setShowSvg(false);
      setPasteSuccess(true);
      setTimeout(() => setPasteSuccess(false), 2000);
    }
  };

  const hasImage = Boolean(customImage);

  return (
    <div
      tabIndex={allowEdit ? 0 : undefined}
      onPaste={handleContainerPaste}
      className={`relative group/visual overflow-hidden rounded-2xl bg-slate-950 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${className}`}
    >
      {/* 실제 등록된 이미지가 있고 SVG 보기가 아닐 때 */}
      {hasImage && !showSvg ? (
        <div className="relative w-full h-[160px] sm:h-[180px] bg-slate-900 flex items-center justify-center overflow-hidden">
          <img
            src={customImage}
            alt={item.termKo}
            className="w-full h-full object-contain p-2 hover:scale-105 transition-transform duration-300"
          />

          {/* 이미지 확대 버튼 */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsZoomed(true);
            }}
            className="absolute right-3 top-3 p-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white text-xs opacity-0 group-hover/visual:opacity-100 transition shadow-lg"
            title="원본 크게 보기"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
      ) : (
        /* 1:1 맞춤형 SVG 기술 도해 */
        <div className="w-full h-auto">
          {getVisualDiagram(item)}
        </div>
      )}

      {/* 상단/하단 컨트롤 오버레이 바 (마우스 호버 시 또는 모달 내에서 노출) */}
      {allowEdit && (
        <div className="absolute top-2 left-2 flex items-center gap-1.5 z-10">
          {hasImage && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowSvg(!showSvg);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-900/85 hover:bg-slate-900 text-white text-[10px] font-extrabold flex items-center gap-1 border border-slate-700 backdrop-blur shadow-sm transition"
              title="도해 ⇄ 실제 이미지 전환"
            >
              <RefreshCw className="w-3 h-3 text-sky-400" />
              <span>{showSvg ? '실제 사진 보기' : '벡터 도해 보기'}</span>
            </button>
          )}

          {hasImage && !showSvg && (
            <span className="px-2 py-0.5 rounded-md bg-emerald-500/90 text-white text-[10px] font-black shadow-xs">
              시트 이미지 적용됨
            </span>
          )}
        </div>
      )}

      {allowEdit && onUploadImage && (
        <div className="absolute bottom-2 right-2 flex items-center gap-1 z-10 opacity-0 group-hover/visual:opacity-100 transition-opacity">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* 클립보드 붙여넣기 버튼 */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePasteFromClipboard();
            }}
            className="px-2.5 py-1 rounded-lg bg-emerald-600/90 hover:bg-emerald-600 text-white text-[11px] font-bold flex items-center gap-1 backdrop-blur shadow-md transition"
            title="클립보드(복사한 이미지) 붙여넣기 (Ctrl+V)"
          >
            {pasteSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>붙여넣기 완료!</span>
              </>
            ) : (
              <>
                <Clipboard className="w-3.5 h-3.5" />
                <span>붙여넣기 (Ctrl+V)</span>
              </>
            )}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            className="px-2.5 py-1 rounded-lg bg-blue-600/90 hover:bg-blue-600 text-white text-[11px] font-bold flex items-center gap-1 backdrop-blur shadow-md transition"
            title="내 컴퓨터 파일에서 사진 선택"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>{hasImage ? '파일 변경' : '파일 업로드'}</span>
          </button>

          {hasImage && onDeleteImage && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (confirm(`No.${item.no} [${item.termKo}] 등록된 이미지를 삭제하시겠습니까?`)) {
                  onDeleteImage(item.no);
                  setShowSvg(true);
                }
              }}
              className="p-1 rounded-lg bg-red-600/80 hover:bg-red-600 text-white text-xs backdrop-blur shadow-md transition"
              title="이미지 삭제 (기본 도해로 복원)"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* 전체화면 라이트박스 확대 모달 */}
      {isZoomed && customImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-150"
          onClick={(e) => {
            e.stopPropagation();
            setIsZoomed(false);
          }}
        >
          <div className="relative max-w-4xl max-h-[90vh] bg-slate-900 rounded-3xl p-4 border border-slate-700 shadow-2xl overflow-hidden flex flex-col items-center">
            <div className="w-full flex items-center justify-between pb-3 border-b border-slate-800 text-white px-2">
              <span className="font-extrabold text-sm">
                No.{String(item.no).padStart(2, '0')} {item.termKo} - 실제 등록 이미지
              </span>
              <button
                onClick={() => setIsZoomed(false)}
                className="px-3 py-1 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-bold"
              >
                닫기 (ESC)
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4 flex items-center justify-center">
              <img
                src={customImage}
                alt={item.termKo}
                className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
