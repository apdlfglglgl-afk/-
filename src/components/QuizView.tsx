import React, { useState, useMemo } from 'react';
import { TermItem } from '../types/glossary';
import { getVisualDiagram } from './diagrams/TermDiagramMap';
import { CheckCircle2, XCircle, RotateCcw, Award, ChevronRight, HelpCircle } from 'lucide-react';

interface QuizQuestion {
  item: TermItem;
  questionType: 'diagram' | 'slang' | 'caution' | 'definition';
  questionText: string;
  options: string[];
  correctAnswer: string;
}

interface QuizViewProps {
  items: TermItem[];
  onSelectTerm: (item: TermItem) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ items, onSelectTerm }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Array<{ q: QuizQuestion; chosen: string; isCorrect: boolean }>>([]);

  // 10문제 무작위 퀴즈 생성
  const questions: QuizQuestion[] = useMemo(() => {
    if (items.length < 4) return [];
    const shuffledItems = [...items].sort(() => Math.random() - 0.5).slice(0, 10);

    return shuffledItems.map((targetItem, idx) => {
      // 오답 3개 무작위 선택
      const otherItems = items.filter((d) => d.no !== targetItem.no);
      const distractors = otherItems.sort(() => Math.random() - 0.5).slice(0, 3).map((d) => d.termKo);
      const options = [targetItem.termKo, ...distractors].sort(() => Math.random() - 0.5);

      const types: Array<'diagram' | 'slang' | 'caution' | 'definition'> = ['diagram', 'slang', 'caution', 'definition'];
      const questionType = types[idx % types.length];

      let questionText = '';
      if (questionType === 'diagram') {
        questionText = '아래 1:1 기술 도해에서 설명하고 있는 핵심 반도체 부품/공정은 무엇일까요?';
      } else if (questionType === 'slang') {
        questionText = `현장 선임들이 "${targetItem.slang}"(으)로 부르는 기술의 정식 명칭은?`;
      } else if (questionType === 'caution') {
        questionText = `다음 절대 주의사항 [ "${targetItem.caution.slice(0, 60)}..." ] 에 해당하는 용어는?`;
      } else {
        questionText = `다음 설명 [ "${targetItem.definition.slice(0, 65)}..." ] 에 부합하는 부품/소재는?`;
      }

      return {
        item: targetItem,
        questionType,
        questionText,
        options,
        correctAnswer: targetItem.termKo,
      };
    });
  }, [items]);

  const handleSelectOption = (option: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(option);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption || isAnswerSubmitted) return;
    const currentQ = questions[currentQIndex];
    const isCorrect = selectedOption === currentQ.correctAnswer;
    if (isCorrect) setScore((prev) => prev + 1);

    setUserAnswers((prev) => [
      ...prev,
      { q: currentQ, chosen: selectedOption, isCorrect },
    ]);
    setIsAnswerSubmitted(true);
  };

  const handleNext = () => {
    if (currentQIndex + 1 < questions.length) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsQuizCompleted(false);
    setUserAnswers([]);
  };

  if (questions.length === 0) return null;

  if (isQuizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    let feedback = '';
    let badgeColor = '';
    if (percentage >= 90) {
      feedback = '🏆 마스터 엔지니어! 반도체 팹 라인 즉시 투입 가능한 완벽한 숙련도입니다.';
      badgeColor = 'bg-emerald-500 text-white';
    } else if (percentage >= 70) {
      feedback = '⭐ 우수 실무자! 주요 은어와 주의사항을 잘 숙지하고 있습니다.';
      badgeColor = 'bg-blue-500 text-white';
    } else {
      feedback = '💡 복습 권장! 취성 소재 충격 주의 및 Red-Line 항목을 사전에서 다시 확인해보세요.';
      badgeColor = 'bg-amber-500 text-white';
    }

    return (
      <div className="max-w-2xl mx-auto p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xl space-y-6 text-center animate-in zoom-in-95 duration-200">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-inner">
          <Award className="w-10 h-10" />
        </div>

        <div>
          <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${badgeColor}`}>
            최종 점수: {score * 10}점 / 100점
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3">
            총 {questions.length}문제 중 {score}개 정답 ({percentage}%)
          </h3>
          <p className="text-slate-600 text-sm mt-2 font-medium max-w-md mx-auto">{feedback}</p>
        </div>

        {/* 오답 및 복습 리스트 */}
        <div className="text-left space-y-3 pt-4 border-t border-slate-100 max-h-72 overflow-y-auto">
          <h4 className="text-xs font-extrabold text-slate-400 uppercase">풀이 결과 요약</h4>
          {userAnswers.map((ans, idx) => (
            <div
              key={idx}
              onClick={() => onSelectTerm(ans.q.item)}
              className={`p-3.5 rounded-2xl border text-xs cursor-pointer hover:bg-slate-50 transition flex items-center justify-between ${
                ans.isCorrect ? 'border-emerald-200 bg-emerald-50/30' : 'border-rose-200 bg-rose-50/30'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {ans.isCorrect ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                )}
                <div>
                  <span className="font-extrabold text-slate-900">
                    Q{idx + 1}. {ans.q.item.termKo}
                  </span>
                  <span className="text-slate-500 ml-2">({ans.q.item.slang})</span>
                </div>
              </div>
              <span className="text-[11px] font-bold text-blue-600">상세 보기 →</span>
            </div>
          ))}
        </div>

        <button
          onClick={handleRestart}
          className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 transition shadow-md"
        >
          <RotateCcw className="w-4 h-4" />
          새로운 10문제 퀴즈 다시 풀기
        </button>
      </div>
    );
  }

  const currentQ = questions[currentQIndex];

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {/* 퀴즈 상단 진행률 */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl bg-slate-900 text-white text-xs font-black">
            문제 {currentQIndex + 1} / {questions.length}
          </span>
          <span className="text-xs font-extrabold text-blue-600">현재 점수: {score * 10}점</span>
        </div>
        <div className="text-xs font-bold text-slate-400 flex items-center gap-1">
          <HelpCircle className="w-3.5 h-3.5" /> 객관식 4지선다
        </div>
      </div>

      {/* 퀴즈 카드 본체 */}
      <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xl space-y-5">
        <div>
          <span className="text-[11px] font-black text-blue-600 uppercase">
            카테고리: {currentQ.item.category} | {currentQ.item.process}
          </span>
          <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1 leading-snug">
            {currentQ.questionText}
          </h3>
        </div>

        {/* 도해 표시 (도해 문제이거나 도해 힌트 제공) */}
        <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-inner">
          {getVisualDiagram(currentQ.item)}
        </div>

        {/* 4지선다 보기 버튼들 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedOption === option;
            const isCorrect = option === currentQ.correctAnswer;
            let btnClass = 'border-slate-200 bg-white text-slate-700 hover:border-blue-400 hover:bg-blue-50/30';

            if (isAnswerSubmitted) {
              if (isCorrect) {
                btnClass = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-black shadow-sm';
              } else if (isSelected && !isCorrect) {
                btnClass = 'border-rose-400 bg-rose-50 text-rose-900 font-bold';
              } else {
                btnClass = 'border-slate-100 bg-slate-50 text-slate-400 opacity-60';
              }
            } else if (isSelected) {
              btnClass = 'border-blue-600 bg-blue-50 text-blue-900 font-black ring-2 ring-blue-600/20';
            }

            return (
              <button
                key={idx}
                disabled={isAnswerSubmitted}
                onClick={() => handleSelectOption(option)}
                className={`p-3.5 rounded-2xl border text-sm text-left transition flex items-center justify-between ${btnClass}`}
              >
                <span>
                  <strong className="mr-2 text-slate-400">{idx + 1}.</strong> {option}
                </span>
                {isAnswerSubmitted && isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
                {isAnswerSubmitted && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* 정답 제출 후 실전 해설 및 Red-Line 노출 */}
        {isAnswerSubmitted && (
          <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2 animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-xs font-black">
              <span className="text-amber-400">💡 실전 기술 해설 (현장 호칭: {currentQ.item.slang})</span>
              <button
                onClick={() => onSelectTerm(currentQ.item)}
                className="text-blue-400 hover:underline flex items-center gap-1"
              >
                상세 모달 열기 →
              </button>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-normal">
              {currentQ.item.definition}
            </p>
            <div className="text-[11px] font-bold text-red-300 bg-red-950/60 p-2 rounded-xl border border-red-800">
              🚨 절대 주의: {currentQ.item.caution}
            </div>
          </div>
        )}

        {/* 액션 버튼 */}
        <div className="pt-2 flex justify-end">
          {!isAnswerSubmitted ? (
            <button
              disabled={!selectedOption}
              onClick={handleSubmitAnswer}
              className={`px-6 py-3 rounded-2xl text-xs font-black transition ${
                selectedOption
                  ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              정답 확인
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black flex items-center gap-2 transition shadow-md"
            >
              <span>{currentQIndex + 1 < questions.length ? '다음 문제' : '결과 보기'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
