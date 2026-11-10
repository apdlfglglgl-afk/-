import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { GLOSSARY_DATA } from './data/glossaryData';
import { TermItem, TermCategory } from './types/glossary';
import { TermCard } from './components/TermCard';
import { TermModal } from './components/TermModal';
import { FlashcardView } from './components/FlashcardView';
import { QuizView } from './components/QuizView';
import { TableView } from './components/TableView';
import { BatchImageUploader } from './components/BatchImageUploader';
import { ClipboardAssignModal } from './components/ClipboardAssignModal';
import { getVisualDiagram } from './components/diagrams/TermDiagramMap';
import { getAllTermImages, saveTermImage, deleteTermImage } from './utils/imageStorage';
import { extractImageFromPasteEvent, readImageFromClipboard } from './utils/clipboardHelper';
import {
  Search,
  Filter,
  Grid,
  List,
  Layers,
  HelpCircle,
  Printer,
  Sparkles,
  Star,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  Volume2,
  BookOpen,
  Image as ImageIcon,
  Upload,
  Clipboard,
} from 'lucide-react';

type ViewMode = 'grid' | 'table' | 'flashcard' | 'quiz' | 'print';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [statusFilter, setStatusFilter] = useState<'all' | 'bookmarked' | 'unlearned' | 'learned' | 'caution'>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // 모달 상태
  const [selectedTerm, setSelectedTerm] = useState<TermItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBatchUploaderOpen, setIsBatchUploaderOpen] = useState(false);

  // 클립보드 붙여넣기 대상 지정 카드 번호 (1~66)
  const [designatedCardNo, setDesignatedCardNo] = useState<number | null>(null);
  // 카드 지정 없이 바로 붙여넣기 했을 때 열리는 빠른 할당 모달
  const [clipboardAssignDataUrl, setClipboardAssignDataUrl] = useState<string | null>(null);

  // 실무 사진/시트 이미지 IndexedDB 연동 상태 (1~66번)
  const [customImages, setCustomImages] = useState<Record<number, string>>({});

  // 초기 IndexedDB 저장 이미지 로드
  useEffect(() => {
    getAllTermImages()
      .then((imgs) => {
        setCustomImages(imgs);
      })
      .catch((err) => {
        console.error('Failed to load images from IndexedDB:', err);
      });
  }, []);

  // 개별 이미지 업로드 핸들러
  const handleUploadImage = useCallback(async (no: number, dataUrl: string) => {
    try {
      await saveTermImage(no, dataUrl);
      setCustomImages((prev) => ({ ...prev, [no]: dataUrl }));
      showToast(`No.${String(no).padStart(2, '0')} 현장 실사 이미지가 등록되었습니다.`);
    } catch (e) {
      console.error(e);
      showToast('이미지 저장 중 오류가 발생했습니다.');
    }
  }, []);

  // 개별 이미지 삭제 핸들러
  const handleDeleteImage = useCallback(async (no: number) => {
    try {
      await deleteTermImage(no);
      setCustomImages((prev) => {
        const next = { ...prev };
        delete next[no];
        return next;
      });
      showToast(`No.${String(no).padStart(2, '0')} 실사 이미지가 삭제되고 1:1 도해로 전환되었습니다.`);
    } catch (e) {
      console.error(e);
      showToast('이미지 삭제 중 오류가 발생했습니다.');
    }
  }, []);

  // 일괄 이미지 업로드 핸들러
  const handleSaveBatchImages = useCallback(async (newImages: Record<number, string>) => {
    try {
      for (const [noStr, url] of Object.entries(newImages)) {
        await saveTermImage(Number(noStr), url);
      }
      setCustomImages((prev) => ({ ...prev, ...newImages }));
      showToast(`총 ${Object.keys(newImages).length}개의 시트 이미지가 일괄 반영되었습니다!`);
    } catch (e) {
      console.error(e);
      showToast('일괄 저장 중 오류가 발생했습니다.');
    }
  }, []);

  // 특정 카드 지정 토글 핸들러
  const handleDesignateCard = useCallback((no: number) => {
    setDesignatedCardNo((prev) => {
      if (prev === no) {
        showToast(`No.${String(no).padStart(2, '0')} 카드 지정이 해제되었습니다.`);
        return null;
      }
      const target = GLOSSARY_DATA.find((d) => d.no === no);
      showToast(`🎯 No.${String(no).padStart(2, '0')} [${target?.termKo}] 카드 지정됨! 엑셀에서 복사 후 [Ctrl + V]를 누르세요.`);
      return no;
    });
  }, []);

  // 카드에서 바로 클립보드 읽기 버튼 클릭 핸들러
  const handleCardPasteFromClipboard = useCallback(async (no: number) => {
    try {
      const dataUrl = await readImageFromClipboard();
      if (dataUrl) {
        await handleUploadImage(no, dataUrl);
        setDesignatedCardNo(null);
        showToast(`🎉 No.${String(no).padStart(2, '0')} 카드에 클립보드 사진이 즉시 반영되었습니다!`);
      } else {
        setDesignatedCardNo(no);
        showToast(`📋 클립보드에 이미지가 없습니다. 엑셀에서 그림 복사(Ctrl+C) 후 [Ctrl + V]를 누르세요.`);
      }
    } catch {
      setDesignatedCardNo(no);
      showToast(`🎯 No.${String(no).padStart(2, '0')} 카드가 지정되었습니다. 키보드 [Ctrl + V] 로 붙여넣으세요!`);
    }
  }, [handleUploadImage]);

  // 전역 클립보드 붙여넣기 (Ctrl+V) 이벤트 감지
  useEffect(() => {
    const handleWindowPaste = async (e: ClipboardEvent) => {
      // 텍스트 입력 중일 때는 가로채지 않음
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      const dataUrl = await extractImageFromPasteEvent(e);
      if (!dataUrl) return;

      e.preventDefault();

      // 1. 상세 모달이 열려있는 경우 -> 모달 대상 용어에 즉시 저장
      if (isModalOpen && selectedTerm) {
        await handleUploadImage(selectedTerm.no, dataUrl);
        showToast(`🎉 No.${String(selectedTerm.no).padStart(2, '0')} [${selectedTerm.termKo}] 카드의 사진이 교체되었습니다!`);
        return;
      }

      // 2. 특정 카드가 지정되어 있는 경우 -> 지정된 카드에 즉시 저장
      if (designatedCardNo !== null) {
        await handleUploadImage(designatedCardNo, dataUrl);
        const item = GLOSSARY_DATA.find((d) => d.no === designatedCardNo);
        showToast(`🎉 No.${String(designatedCardNo).padStart(2, '0')} [${item?.termKo}] 카드의 사진이 교체되었습니다!`);
        setDesignatedCardNo(null);
        return;
      }

      // 3. 지정된 카드가 없는 경우 -> 빠른 카드 선택 팝업 오픈
      setClipboardAssignDataUrl(dataUrl);
    };

    window.addEventListener('paste', handleWindowPaste);
    return () => window.removeEventListener('paste', handleWindowPaste);
  }, [isModalOpen, selectedTerm, designatedCardNo, handleUploadImage]);

  // 로컬 스토리지 연동 학습 및 즐겨찾기 상태
  const [learnedTerms, setLearnedTerms] = useState<Set<number>>(() => {
    try {
      const saved = localStorage.getItem('semi_learned_terms');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const [bookmarkedTerms, setBookmarkedTerms] = useState<Set<number>>(() => {
    try {
      const saved = localStorage.getItem('semi_bookmarked_terms');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 로컬 스토리지 저장
  useEffect(() => {
    try {
      localStorage.setItem('semi_learned_terms', JSON.stringify(Array.from(learnedTerms)));
    } catch (e) {
      console.error(e);
    }
  }, [learnedTerms]);

  useEffect(() => {
    try {
      localStorage.setItem('semi_bookmarked_terms', JSON.stringify(Array.from(bookmarkedTerms)));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarkedTerms]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // TTS 음성 읽기
  const speakTerm = useCallback((item: TermItem) => {
    if (!('speechSynthesis' in window)) {
      showToast('이 브라우저는 음성 읽기(TTS)를 지원하지 않습니다.');
      return;
    }
    window.speechSynthesis.cancel();
    const text = `${item.termKo}. 현장에서는 ${item.slang}으로 부릅니다. 핵심 주의사항: ${item.caution}`;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'ko-KR';
    utter.rate = 0.96;
    window.speechSynthesis.speak(utter);
    showToast(`🔊 "${item.termKo}" 음성을 재생합니다.`);
  }, []);

  const toggleLearned = useCallback((no: number) => {
    setLearnedTerms((prev) => {
      const next = new Set(prev);
      if (next.has(no)) {
        next.delete(no);
      } else {
        next.add(no);
      }
      return next;
    });
  }, []);

  const toggleBookmark = useCallback((no: number) => {
    setBookmarkedTerms((prev) => {
      const next = new Set(prev);
      if (next.has(no)) {
        next.delete(no);
      } else {
        next.add(no);
      }
      return next;
    });
  }, []);

  // 모달 제어
  const openTermModal = useCallback((no: number) => {
    const item = GLOSSARY_DATA.find((d) => d.no === no);
    if (item) {
      setSelectedTerm(item);
      setIsModalOpen(true);
    }
  }, []);

  const closeTermModal = useCallback(() => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setIsModalOpen(false);
  }, []);

  const navigateModalTerm = useCallback((delta: number) => {
    if (!selectedTerm) return;
    let nextNo = selectedTerm.no + delta;
    if (nextNo < 1) nextNo = GLOSSARY_DATA.length;
    if (nextNo > GLOSSARY_DATA.length) nextNo = 1;
    const nextItem = GLOSSARY_DATA.find((d) => d.no === nextNo);
    if (nextItem) setSelectedTerm(nextItem);
  }, [selectedTerm]);

  // 카테고리 목록 (공식 교육교안_현장용어시트 기준 5대 분류)
  const categories: string[] = ['전체', '소재', '제품', '소재가공', '에칭및세정', '검사및포장'];

  // 필터링된 데이터
  const filteredData = useMemo(() => {
    return GLOSSARY_DATA.filter((item) => {
      // 카테고리 필터
      if (selectedCategory !== '전체' && item.category !== selectedCategory) {
        return false;
      }

      // 상태 필터
      if (statusFilter === 'bookmarked' && !bookmarkedTerms.has(item.no)) return false;
      if (statusFilter === 'learned' && !learnedTerms.has(item.no)) return false;
      if (statusFilter === 'unlearned' && learnedTerms.has(item.no)) return false;
      if (statusFilter === 'caution') {
        const isHighCaution = 
          item.caution.includes('금지') || 
          item.caution.includes('폐기') || 
          item.caution.includes('치명') || 
          item.caution.includes('위험') || 
          item.caution.includes('괴사') || 
          item.caution.includes('사고') || 
          item.caution.includes('파손') || 
          item.caution.includes('치핑') || 
          item.caution.includes('크랙');
        if (!isHighCaution) return false;
      }

      // 검색어 필터
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        const matchesKo = item.termKo.toLowerCase().includes(query);
        const matchesEn = item.termEn.toLowerCase().includes(query);
        const matchesSlang = item.slang.toLowerCase().includes(query);
        const matchesDef = item.definition.toLowerCase().includes(query);
        const matchesProcess = item.process.toLowerCase().includes(query);
        const matchesNo = String(item.no) === query || `no.${item.no}`.toLowerCase() === query;
        return matchesKo || matchesEn || matchesSlang || matchesDef || matchesProcess || matchesNo;
      }

      return true;
    });
  }, [selectedCategory, statusFilter, searchTerm, bookmarkedTerms, learnedTerms]);

  const learnedCount = learnedTerms.size;
  const totalCount = GLOSSARY_DATA.length;
  const progressPercent = Math.round((learnedCount / totalCount) * 100);

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 font-sans antialiased pb-20">
      {/* 토스트 알림 */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-2xl bg-slate-900 text-white text-xs font-bold shadow-2xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 헤더 섹션 */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* 로고 및 서비스 타이틀 */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-700 to-sky-500 text-white flex items-center justify-center font-black text-lg shadow-md shadow-blue-500/20">
                <span>66</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg sm:text-xl font-black text-slate-950 tracking-tight">
                    반도체 공정 부품·소재 실무 용어 사전
                  </h1>
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-blue-50 border border-blue-200 text-blue-700 text-[11px] font-extrabold">
                    1:1 맞춤 도해
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  신입 엔지니어 &amp; 작업자 66선 | 현장 은어 · 1:1 기술 도해 매핑 · 안전 Red-Line
                </p>
              </div>
            </div>

            {/* 상단 액션: 시트 사진 일괄 등록 & 뷰 모드 탭 */}
            <div className="flex items-center gap-2 flex-wrap self-start sm:self-auto">
              <button
                onClick={() => setIsBatchUploaderOpen(true)}
                className="px-3.5 py-1.5 rounded-2xl text-xs font-black flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-sm shadow-emerald-600/20 transition active:scale-95"
                title="엑셀/교안 시트에 있던 1~66번 사진을 드래그앤드롭으로 일괄 자동 매칭 등록합니다"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>시트 사진 일괄 등록</span>
                <span className="px-1.5 py-0.5 rounded-full bg-white/20 text-[10px] font-black">
                  {Object.keys(customImages).length}/66
                </span>
              </button>

              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200/60">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition ${
                    viewMode === 'grid'
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="카드 그리드 뷰"
                >
                  <Grid className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">카드</span>
                </button>

                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition ${
                    viewMode === 'table'
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="테이블 스프레드시트 뷰"
                >
                  <List className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">테이블</span>
                </button>

                <button
                  onClick={() => setViewMode('flashcard')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition ${
                    viewMode === 'flashcard'
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="플래시카드 암기 모드"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>암기 카드</span>
                </button>

                <button
                  onClick={() => setViewMode('quiz')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition ${
                    viewMode === 'quiz'
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="10문제 현장 테스트"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>실전 퀴즈</span>
                </button>

                <button
                  onClick={() => setViewMode('print')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition ${
                    viewMode === 'print'
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="전체 66선 인쇄 치트시트"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span className="hidden lg:inline">치트시트</span>
                </button>
              </div>
            </div>
          </div>

          {/* 학습 진척도 바 */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-3 flex-1 max-w-xl">
              <span className="text-xs font-extrabold text-slate-600 shrink-0 flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                학습 진도:
              </span>
              <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden relative">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <span className="text-xs font-black text-slate-800 shrink-0">
                {learnedCount} / {totalCount} ({progressPercent}%)
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 font-bold border border-amber-200/80 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                중요 {bookmarkedTerms.size}개
              </span>
              {learnedCount > 0 && (
                <button
                  onClick={() => {
                    if (confirm('학습 완료 기록을 초기화하시겠습니까?')) {
                      setLearnedTerms(new Set());
                      showToast('학습 진도가 초기화되었습니다.');
                    }
                  }}
                  className="text-slate-400 hover:text-slate-600 text-[11px] underline ml-1"
                >
                  초기화
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 메인 레이아웃 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* 인쇄 모드가 아닐 때 검색 & 필터 바 노출 */}
        {viewMode !== 'print' && (
          <section className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            {/* 검색창 & 상태 칩 */}
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="용어 검색 (한글명, 영문, 현장 호칭/은어, 공정, 번호 등)"
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-sm font-medium transition"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-700"
                  >
                    지우기
                  </button>
                )}
              </div>

              {/* 빠른 상태 필터 */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-3 py-2 rounded-xl text-xs font-extrabold transition ${
                    statusFilter === 'all'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  전체 ({GLOSSARY_DATA.length})
                </button>

                <button
                  onClick={() => setStatusFilter('bookmarked')}
                  className={`px-3 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1 transition ${
                    statusFilter === 'bookmarked'
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-amber-50 text-slate-600'
                  }`}
                >
                  <Star className="w-3.5 h-3.5" />
                  별표 ({bookmarkedTerms.size})
                </button>

                <button
                  onClick={() => setStatusFilter('caution')}
                  className={`px-3 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1 transition ${
                    statusFilter === 'caution'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-rose-50 text-slate-600'
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Red-Line 핵심안전
                </button>

                <button
                  onClick={() => setStatusFilter('unlearned')}
                  className={`px-3 py-2 rounded-xl text-xs font-extrabold transition ${
                    statusFilter === 'unlearned'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-blue-50 text-slate-600'
                  }`}
                >
                  미학습 ({totalCount - learnedCount})
                </button>

                <button
                  onClick={() => setStatusFilter('learned')}
                  className={`px-3 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1 transition ${
                    statusFilter === 'learned'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-emerald-50 text-slate-600'
                  }`}
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  완료 ({learnedCount})
                </button>
              </div>
            </div>

              {/* 6대 카테고리 탭 */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-t border-slate-100 pt-3">
                <span className="text-xs font-extrabold text-slate-400 shrink-0 mr-1 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" /> 분류:
                </span>
                {categories.map((cat) => {
                  const count =
                    cat === '전체'
                      ? GLOSSARY_DATA.length
                      : GLOSSARY_DATA.filter((d) => d.category === cat).length;
                  const isActive = selectedCategory === cat;

                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold shrink-0 transition ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {cat} ({count})
                    </button>
                  );
                })}
              </div>

              {/* 클립보드 사진 붙여넣기 실시간 가이드 바 */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-3.5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-50/80 via-indigo-50/60 to-emerald-50/60 border border-blue-200/60 text-xs">
                <div className="flex items-center gap-2 text-slate-800">
                  <span className="p-1 rounded-lg bg-blue-600 text-white font-bold shrink-0">
                    <Clipboard className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <span className="font-black text-blue-950 mr-1.5">
                      엑셀 사진 클립보드(Ctrl+V) 교체:
                    </span>
                    <span className="text-slate-600 font-medium">
                      엑셀에서 사진 복사(Ctrl+C) 후, 원하는 카드의 <strong className="text-blue-700">[📋]</strong> 아이콘을 누르거나 카드를 지정한 뒤 <strong className="text-blue-700">[Ctrl + V]</strong>를 누르면 실사 사진이 즉시 교체됩니다.
                    </span>
                  </div>
                </div>

                {designatedCardNo ? (
                  <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 font-bold text-blue-700 bg-white px-2.5 py-1 rounded-xl border border-blue-300 shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
                    <span>No.{String(designatedCardNo).padStart(2, '0')} 지정됨</span>
                    <button
                      onClick={() => setDesignatedCardNo(null)}
                      className="text-[10px] text-slate-400 hover:text-slate-700 underline ml-1"
                    >
                      해제
                    </button>
                  </div>
                ) : (
                  <span className="hidden lg:inline-block px-2 py-0.5 rounded bg-white/70 border border-slate-200 text-slate-500 text-[11px] font-bold">
                    지정 없이 Ctrl+V 시 카드 선택창 자동 오픈
                  </span>
                )}
              </div>
            </section>
          )}

          {/* 뷰 모드별 컨텐츠 영역 */}
          {viewMode === 'grid' && (
            <section className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500 font-bold px-1">
                <span>검색 결과: 총 {filteredData.length}개 용어</span>
                <span>카드 클릭 시 1:1 도해 및 상세 실무 지침서 모달 노출</span>
              </div>

              {filteredData.length === 0 ? (
                <div className="p-16 text-center bg-white rounded-3xl border border-slate-200">
                  <p className="text-slate-500 font-bold text-base">검색 조건에 맞는 용어가 없습니다.</p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('전체');
                      setStatusFilter('all');
                    }}
                    className="mt-3 px-4 py-2 rounded-xl bg-blue-50 text-blue-700 text-xs font-extrabold hover:bg-blue-100 transition"
                  >
                    모든 필터 초기화
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredData.map((item) => (
                    <TermCard
                      key={item.no}
                      item={item}
                      isLearned={learnedTerms.has(item.no)}
                      isBookmarked={bookmarkedTerms.has(item.no)}
                      isDesignated={designatedCardNo === item.no}
                      customImage={customImages[item.no]}
                      onSelect={(i) => openTermModal(i.no)}
                      onToggleLearned={toggleLearned}
                      onToggleBookmark={toggleBookmark}
                      onSpeak={speakTerm}
                      onUploadImage={handleUploadImage}
                      onDeleteImage={handleDeleteImage}
                      onDesignate={handleDesignateCard}
                      onPasteFromClipboard={handleCardPasteFromClipboard}
                    />
                  ))}
                </div>
              )}
            </section>
          )}

        {viewMode === 'table' && (
          <section>
            <TableView
              items={filteredData}
              learnedSet={learnedTerms}
              bookmarkedSet={bookmarkedTerms}
              customImages={customImages}
              onSelectTerm={(i) => openTermModal(i.no)}
              onToggleLearned={toggleLearned}
              onToggleBookmark={toggleBookmark}
              onSpeak={speakTerm}
              onPasteFromClipboard={handleCardPasteFromClipboard}
            />
          </section>
        )}

        {viewMode === 'flashcard' && (
          <section className="pt-2">
            <FlashcardView
              items={filteredData}
              learnedSet={learnedTerms}
              bookmarkedSet={bookmarkedTerms}
              customImages={customImages}
              onToggleLearned={toggleLearned}
              onToggleBookmark={toggleBookmark}
              onSpeak={speakTerm}
            />
          </section>
        )}

        {viewMode === 'quiz' && (
          <section className="pt-2">
            <QuizView
              items={GLOSSARY_DATA}
              onSelectTerm={(item) => openTermModal(item.no)}
            />
          </section>
        )}

        {viewMode === 'print' && (
          /* 전체 66선 인쇄 및 치트시트 모아보기 */
          <section className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-2xl font-black text-slate-900">
                  반도체 부품·소재 실무 용어 66선 치트시트 (전수 인쇄용)
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  1~66번 모든 실무 용어의 1:1 도해 및 현장 실사, 은어, 핵심 정의 및 Red-Line 종합 일람표
                </p>
              </div>
              <button
                onClick={() => window.print()}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black flex items-center gap-2 transition"
              >
                <Printer className="w-4 h-4" />
                인쇄 / PDF 저장
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {GLOSSARY_DATA.map((item) => (
                <div
                  key={item.no}
                  onClick={() => openTermModal(item.no)}
                  className="p-4 rounded-2xl border border-slate-200 hover:border-blue-400 cursor-pointer transition space-y-3 bg-slate-50/50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-slate-900 text-white text-xs font-black">
                        No.{String(item.no).padStart(2, '0')}
                      </span>
                      <span className="text-sm font-black text-slate-900">{item.termKo}</span>
                      <span className="text-xs font-medium text-slate-400">({item.termEn})</span>
                    </div>
                    <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                  </div>

                  <div className="px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs font-black">
                    현장 호칭: {item.slang}
                  </div>

                  {/* 1:1 도해 또는 등록된 실사 썸네일 */}
                  <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                    {customImages[item.no] ? (
                      <div className="relative w-full h-36 bg-slate-900">
                        <img
                          src={customImages[item.no]}
                          alt={item.termKo}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded bg-black/70 text-[10px] text-emerald-400 font-bold backdrop-blur-xs">
                          현장 실사 사진
                        </span>
                      </div>
                    ) : (
                      getVisualDiagram(item)
                    )}
                  </div>

                  <p className="text-xs text-slate-700 font-medium leading-relaxed">
                    {item.definition}
                  </p>

                  <div className="text-[11px] font-bold text-red-950 bg-red-50 p-2 rounded-lg border border-red-200">
                    🚨 {item.caution}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* 1:1 기술 도해 및 상세 실무 지침서 모달 */}
      <TermModal
        item={selectedTerm}
        isOpen={isModalOpen}
        onClose={closeTermModal}
        onNavigate={navigateModalTerm}
        isLearned={selectedTerm ? learnedTerms.has(selectedTerm.no) : false}
        isBookmarked={selectedTerm ? bookmarkedTerms.has(selectedTerm.no) : false}
        customImage={selectedTerm ? customImages[selectedTerm.no] : undefined}
        onToggleLearned={toggleLearned}
        onToggleBookmark={toggleBookmark}
        onSpeak={speakTerm}
        onUploadImage={handleUploadImage}
        onDeleteImage={handleDeleteImage}
        totalCount={GLOSSARY_DATA.length}
      />

      {/* 시트 사진 일괄 자동 등록 모달 */}
      <BatchImageUploader
        isOpen={isBatchUploaderOpen}
        onClose={() => setIsBatchUploaderOpen(false)}
        onSaveBatch={handleSaveBatchImages}
        existingCount={Object.keys(customImages).length}
      />

      {/* 카드 지정 없이 전역 Ctrl+V 붙여넣기 시 열리는 빠른 카드 할당 모달 */}
      <ClipboardAssignModal
        isOpen={Boolean(clipboardAssignDataUrl)}
        imageDataUrl={clipboardAssignDataUrl}
        onClose={() => setClipboardAssignDataUrl(null)}
        onAssign={async (termNo, dataUrl) => {
          await handleUploadImage(termNo, dataUrl);
          const item = GLOSSARY_DATA.find((d) => d.no === termNo);
          showToast(`🎉 No.${String(termNo).padStart(2, '0')} [${item?.termKo}] 카드의 사진이 교체되었습니다!`);
          setClipboardAssignDataUrl(null);
        }}
      />

      {/* 특정 카드가 지정되어 있을 때 하단 플로팅 안내 바 */}
      {designatedCardNo && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-lg w-[92%] bg-slate-900/95 backdrop-blur-md text-white px-4 py-3 rounded-2xl shadow-2xl border-2 border-blue-500 flex items-center justify-between gap-3 animate-in slide-in-from-bottom-5">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-ping shrink-0"></span>
            <div className="min-w-0">
              <div className="text-xs font-black truncate">
                🎯 No.{String(designatedCardNo).padStart(2, '0')} [
                {GLOSSARY_DATA.find((d) => d.no === designatedCardNo)?.termKo}
                ] 지정됨
              </div>
              <div className="text-[11px] text-slate-300 truncate">
                엑셀에서 사진 복사(Ctrl+C) 후 키보드 [Ctrl+V]를 누르세요!
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => handleCardPasteFromClipboard(designatedCardNo)}
              className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black transition active:scale-95 flex items-center gap-1 shadow-sm"
              title="클립보드에서 바로 사진 가져오기"
            >
              <Clipboard className="w-3.5 h-3.5" />
              <span>바로 붙여넣기</span>
            </button>
            <button
              onClick={() => setDesignatedCardNo(null)}
              className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs font-bold transition"
            >
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
