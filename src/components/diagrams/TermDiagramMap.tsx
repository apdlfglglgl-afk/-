import React from 'react';
import { TermItem } from '../../types/glossary';

/**
 * 1:1 맞춤형 기술 도해(SVG) 렌더러 맵
 * 교육교안_현장용어시트 기준 66개 공식 용어에 대해
 * 1번부터 66번까지 1:1 완벽 매칭된 전용 기술 도해를 제공합니다.
 */

const SvgDefs = () => (
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#38bdf8" />
    </marker>
    <marker id="arrow-warn" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#ef4444" />
    </marker>
    <marker id="arrow-green" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10b981" />
    </marker>
    <linearGradient id="quartzGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
      <stop offset="50%" stopColor="#93c5fd" stopOpacity="0.15" />
      <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.5" />
    </linearGradient>
    <linearGradient id="siGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#1e293b" />
      <stop offset="50%" stopColor="#475569" />
      <stop offset="100%" stopColor="#1e293b" />
    </linearGradient>
    <linearGradient id="plasmaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#a855f7" stopOpacity="0.7" />
      <stop offset="50%" stopColor="#c084fc" stopOpacity="0.3" />
      <stop offset="100%" stopColor="#818cf8" stopOpacity="0.1" />
    </linearGradient>
    <linearGradient id="fireGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#ef4444" />
      <stop offset="50%" stopColor="#f59e0b" />
      <stop offset="100%" stopColor="#38bdf8" />
    </linearGradient>
  </defs>
);

export const DIAGRAM_MAP: Record<number, (item: TermItem) => React.ReactNode> = {
  // 1. 단결정 / 다결정 실리콘 (Single / Poly-Si)
  1: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800 shadow-inner">
      <SvgDefs />
      {/* 단결정 실리콘 잉곳 (CZ 성장) */}
      <rect x="25" y="30" width="95" height="95" rx="8" fill="url(#siGrad)" stroke="#94a3b8" strokeWidth="2" />
      <ellipse cx="72" cy="30" rx="47" ry="12" fill="#64748b" />
      <text x="72" y="75" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="bold">단결정 Si</text>
      <text x="72" y="93" textAnchor="middle" fill="#38bdf8" fontSize="9">균일 결정격자 / 균일식각</text>

      {/* 다결정 폴리 실리콘 (결정립계) */}
      <rect x="135" y="30" width="95" height="95" rx="8" fill="#1e293b" stroke="#60a5fa" strokeWidth="1.5" />
      <path d="M 140,55 L 175,70 L 160,110 M 175,70 L 220,60 M 175,70 L 195,120" stroke="#93c5fd" strokeWidth="1.5" strokeDasharray="3 2" />
      <text x="182" y="50" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">다결정(Poly)</text>
      <text x="182" y="100" textAnchor="middle" fill="#93c5fd" fontSize="8">결정립(Grain) 경계</text>

      {/* 취성 및 치핑 경고 */}
      <rect x="245" y="25" width="200" height="105" rx="8" fill="#450a0a" stroke="#f87171" strokeWidth="1.5" />
      <text x="345" y="52" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="extrabold">🚨 취성(Brittleness) 파괴 주의</text>
      <text x="345" y="74" textAnchor="middle" fill="#ffffff" fontSize="9">금속보다 단단하나 충격에 순간 깨짐</text>
      <text x="345" y="94" textAnchor="middle" fill="#fecaca" fontSize="9">작업대 위 끌기 / 부딪힘 절대 금지</text>
      <text x="345" y="112" textAnchor="middle" fill="#f87171" fontSize="8">모서리 칩핑(Chipping) 방지 패드 필수</text>
    </svg>
  ),

  // 2. 석영 유리 (Quartz Glass)
  2: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      {/* 투명 쿼츠 vs 불투명 오파크 쿼츠 */}
      <rect x="25" y="30" width="100" height="95" rx="8" fill="url(#quartzGrad)" stroke="#38bdf8" strokeWidth="2" />
      <text x="75" y="72" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">투명 쿼츠</text>
      <text x="75" y="90" textAnchor="middle" fill="#7dd3fc" fontSize="8">SiO₂ 광투과율 99.9%</text>

      <rect x="140" y="30" width="100" height="95" rx="8" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" />
      <circle cx="165" cy="55" r="4" fill="#94a3b8" />
      <circle cx="190" cy="70" r="5" fill="#94a3b8" />
      <circle cx="210" cy="50" r="3" fill="#94a3b8" />
      <text x="190" y="95" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="bold">오파크(불투명)</text>
      <text x="190" y="110" textAnchor="middle" fill="#475569" fontSize="8">미세 기포 단열 쿼츠</text>

      {/* 지문 유분 백화 경고 */}
      <rect x="255" y="25" width="190" height="105" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="350" y="52" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">맨손 지문 접촉 절대 금지</text>
      <text x="350" y="74" textAnchor="middle" fill="#f8fafc" fontSize="9">손 유분이 화염 시 백화(하얗게 탐) 유발</text>
      <text x="350" y="94" textAnchor="middle" fill="#f87171" fontSize="9">내부 기포·스크래치 육안 즉시 노출</text>
      <text x="350" y="112" textAnchor="middle" fill="#38bdf8" fontSize="8">반드시 클린룸 장갑 착용 후 취급</text>
    </svg>
  ),

  // 3. 질화알루미늄 (Aluminum Nitride, AlN)
  3: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      {/* AlN 세라믹 기판 및 열전도 화살표 */}
      <rect x="25" y="30" width="115" height="95" rx="8" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
      <text x="82" y="65" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">AlN 파인세라믹</text>
      <text x="82" y="85" textAnchor="middle" fill="#38bdf8" fontSize="9">열전도 180 W/m·K</text>
      <text x="82" y="103" textAnchor="middle" fill="#cbd5e1" fontSize="8">정전척(ESC)/히터 베이스</text>

      <path d="M 155,75 L 205,75" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrow-warn)" />
      <text x="180" y="65" textAnchor="middle" fill="#fca5a5" fontSize="8">초고속 방열</text>

      {/* 수분 반응 가수분해 경고 */}
      <rect x="220" y="25" width="225" height="105" rx="8" fill="#3b0764" stroke="#c084fc" strokeWidth="1.5" />
      <text x="332" y="52" textAnchor="middle" fill="#e9d5ff" fontSize="11" fontWeight="bold">💧 수분·물세정 라인 투입 금지</text>
      <text x="332" y="74" textAnchor="middle" fill="#ffffff" fontSize="9">물과 반응 시 가수분해 → 암모니아(NH₃) 가스</text>
      <text x="332" y="94" textAnchor="middle" fill="#d8b4fe" fontSize="9">표면 산화 부식 및 절연파괴 발생</text>
      <text x="332" y="112" textAnchor="middle" fill="#a855f7" fontSize="8">가공 후 방치 금지, 밀봉 건조 보관</text>
    </svg>
  ),

  // 4. 알루미나 / 파인세라믹 (Alumina / Fine Ceramics, Al2O3)
  4: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      {/* 순알루미나 블록과 전용 휠 가공 */}
      <rect x="25" y="30" width="110" height="95" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      <text x="80" y="65" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="bold">순알루미나 Al₂O₃</text>
      <text x="80" y="85" textAnchor="middle" fill="#2563eb" fontSize="9">전기 절연 · 내마모 · 내열</text>
      <text x="80" y="103" textAnchor="middle" fill="#475569" fontSize="8">튜브·지그·웨이퍼 암</text>

      {/* 다이아몬드 공구 & 쿨런트 */}
      <circle cx="185" cy="75" r="28" fill="#1e293b" stroke="#f59e0b" strokeWidth="2.5" />
      <text x="185" y="78" textAnchor="middle" fill="#fde047" fontSize="8">다이아 휠</text>
      <path d="M 155,40 L 180,60" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)" />

      {/* 취성 및 절삭유 필수 */}
      <rect x="235" y="25" width="210" height="105" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
      <text x="340" y="52" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">충격 취약 취성 세라믹</text>
      <text x="340" y="74" textAnchor="middle" fill="#f8fafc" fontSize="9">가공 시 치핑·미세 크랙 빈발</text>
      <text x="340" y="94" textAnchor="middle" fill="#f59e0b" fontSize="9">다이아몬드 전용 공구 필수</text>
      <text x="340" y="112" textAnchor="middle" fill="#cbd5e1" fontSize="8">충분한 절삭유 쿨런트 공급 원칙</text>
    </svg>
  ),

  // 5. 화학 기상 증착 탄화규소 (CVD-SiC)
  5: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      {/* CVD-SiC 초치밀질 결정 증착층 */}
      <rect x="25" y="30" width="130" height="95" rx="8" fill="#090d16" stroke="#38bdf8" strokeWidth="2.5" />
      <rect x="35" y="45" width="110" height="30" fill="#1e3a8a" stroke="#60a5fa" rx="4" />
      <text x="90" y="64" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">CVD-SiC 증착층</text>
      <text x="90" y="93" textAnchor="middle" fill="#38bdf8" fontSize="9">초고순도 · 기공율 0%</text>
      <text x="90" y="109" textAnchor="middle" fill="#94a3b8" fontSize="8">Free-Si 없음 (균일 플라즈마)</text>

      {/* 고가 소재 & 치핑 주의 */}
      <rect x="175" y="25" width="270" height="105" rx="8" fill="#450a0a" stroke="#f87171" strokeWidth="1.5" />
      <text x="310" y="52" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="bold">💎 초고가 소재 엣지 치핑 극도 주의</text>
      <text x="310" y="74" textAnchor="middle" fill="#ffffff" fontSize="9">플라즈마 내식성 극상이나 소재 가격 매우 비쌈</text>
      <text x="310" y="94" textAnchor="middle" fill="#fecaca" fontSize="9">고경도·취성으로 가공 시 미세 크랙 발생 위험</text>
      <text x="310" y="112" textAnchor="middle" fill="#f87171" fontSize="8">포커스링·엣지링 가공 시 피드 감속 필수</text>
    </svg>
  ),

  // 6. 반응소결 탄화규소 (RB-SiC)
  6: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      {/* RB-SiC 내부 잔류 실리콘 (Free-Si 10~20%) 모식도 */}
      <rect x="25" y="30" width="130" height="95" rx="8" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
      <circle cx="50" cy="55" r="7" fill="#38bdf8" />
      <circle cx="85" cy="65" r="9" fill="#38bdf8" />
      <circle cx="120" cy="55" r="6" fill="#38bdf8" />
      <circle cx="65" cy="95" r="8" fill="#38bdf8" />
      <circle cx="105" cy="95" r="7" fill="#38bdf8" />
      <text x="90" y="45" textAnchor="middle" fill="#facc15" fontSize="8" fontWeight="bold">잔류 실리콘 (Free Si 10~20%)</text>
      <text x="90" y="118" textAnchor="middle" fill="#93c5fd" fontSize="8">탄소체 용융 Si 침투</text>

      {/* 산 세정조 투입 시 전량 폐기 경고 */}
      <rect x="175" y="25" width="270" height="105" rx="8" fill="#7f1d1d" stroke="#f87171" strokeWidth="2" />
      <text x="310" y="52" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="extrabold">🚨 Si 에칭조 투입 시 전량 폐기 사고</text>
      <text x="310" y="74" textAnchor="middle" fill="#fecaca" fontSize="9">강산(불산+질산 혼산)에 Free Si가 녹아 빠져나감</text>
      <text x="310" y="94" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">스펀지처럼 구멍(Pore) 뚫려 즉시 불량 폐기</text>
      <text x="310" y="112" textAnchor="middle" fill="#fca5a5" fontSize="8">다이아몬드 휠 외 가공 불가 (초경 공구 파손)</text>
    </svg>
  ),

  // 7. 샤워헤드 / 상부 전극 (Shower Head / Upper Electrode)
  7: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      {/* 샤워헤드 본체 + 수천 개 미세홀 */}
      <rect x="25" y="25" width="190" height="40" rx="4" fill="#1d4ed8" stroke="#60a5fa" strokeWidth="2" />
      <text x="120" y="48" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">샤워헤드 / 상부 전극</text>

      {/* 가스 분사 홀 */}
      {[45, 75, 105, 135, 165, 195].map((x) => (
        <line key={x} x1={x} y1="67" x2={x} y2="105" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 2" markerEnd="url(#arrow)" />
      ))}
      <text x="120" y="125" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">반응 가스 균일 분사 (웨이퍼 상단)</text>

      {/* 암실 검사 & 홀 막힘 관리 */}
      <rect x="235" y="25" width="210" height="105" rx="8" fill="#450a0a" stroke="#f87171" strokeWidth="1.5" />
      <text x="340" y="52" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="bold">🚨 홀 내부 파티클·막힘 전수 검사</text>
      <text x="340" y="74" textAnchor="middle" fill="#ffffff" fontSize="9">단 1개 홀 미관통 시 챔버 유량 불균일</text>
      <text x="340" y="94" textAnchor="middle" fill="#fecaca" fontSize="9">홀 사상/세정 후 암실 검사 필수</text>
      <text x="340" y="112" textAnchor="middle" fill="#f87171" fontSize="8">홀 내벽 미세 크랙 방지</text>
    </svg>
  ),

  // 8. 곡면 전극 (Curved Electrode / Concave/Convex)
  8: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      {/* 3차원 볼록(Convex) 및 오목(Concave) 곡면 전극 */}
      <path d="M 25,75 Q 85,35 145,75 L 145,115 L 25,115 Z" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="2" />
      <text x="85" y="95" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">볼록/오목 R 곡면</text>

      {/* 플라즈마 밀도 제어 */}
      <path d="M 85,30 L 85,50" stroke="#c084fc" strokeWidth="3" markerEnd="url(#arrow)" />
      <text x="85" y="24" textAnchor="middle" fill="#e9d5ff" fontSize="9">플라즈마 방전 밀도 제어</text>

      {/* 정밀 블렌딩 주의 */}
      <rect x="175" y="25" width="270" height="105" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="310" y="52" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">곡률 반경(Radius) &amp; 정밀 블렌딩</text>
      <text x="310" y="74" textAnchor="middle" fill="#f8fafc" fontSize="9">곡면 R값 오차 발생 시 플라즈마 아크 왜곡</text>
      <text x="310" y="94" textAnchor="middle" fill="#f87171" fontSize="9">3차원 가공 툴 자국(Tool Mark) 단차 제거</text>
      <text x="310" y="112" textAnchor="middle" fill="#cbd5e1" fontSize="8">Si 및 CVD-SiC 정밀 3차원 MCT/폴리싱</text>
    </svg>
  ),

  // 9. 포커스링 (Focus Ring)
  9: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      {/* 웨이퍼 안착 단차(Step) 단면 */}
      <rect x="25" y="75" width="100" height="10" rx="2" fill="#38bdf8" />
      <text x="75" y="83" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="bold">웨이퍼(Wafer)</text>

      {/* 포커스링 스텝 단면 */}
      <path d="M 125,70 L 125,60 L 180,60 L 180,115 L 115,115 L 115,75 L 125,75 Z" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="2" />
      <text x="150" y="92" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">Focus Ring</text>

      {/* 플라즈마 시스 수평 유지선 */}
      <line x1="20" y1="40" x2="190" y2="40" stroke="#c084fc" strokeWidth="2.5" strokeDasharray="4 2" />
      <text x="105" y="32" textAnchor="middle" fill="#e9d5ff" fontSize="9">플라즈마 시스(Sheath) 수평 집중</text>

      <rect x="205" y="25" width="240" height="105" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
      <text x="325" y="52" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">단차(Step) 마이크로미터 엄격 공차</text>
      <text x="325" y="74" textAnchor="middle" fill="#f8fafc" fontSize="9">웨이퍼 안착 포켓 평탄도 ±0.01mm</text>
      <text x="325" y="94" textAnchor="middle" fill="#f59e0b" fontSize="9">단차 코너 R값 및 칩핑 집중 관리</text>
      <text x="325" y="112" textAnchor="middle" fill="#cbd5e1" fontSize="8">Si / Quartz / SiC 소모성 링</text>
    </svg>
  ),

  // 10. 커버링 / 에지링 (Cover Ring / Edge Ring)
  10: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      {/* 대구경 박판 커버링 */}
      <ellipse cx="105" cy="75" rx="80" ry="38" fill="none" stroke="#60a5fa" strokeWidth="4" />
      <ellipse cx="105" cy="75" rx="55" ry="24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" />
      <text x="105" y="78" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">Cover Ring</text>
      <text x="105" y="95" textAnchor="middle" fill="#93c5fd" fontSize="8">하부 정전척 차폐</text>

      <rect x="215" y="25" width="230" height="105" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="330" y="52" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">대구경 박판 탄성 변형(휨) 주의</text>
      <text x="330" y="74" textAnchor="middle" fill="#f8fafc" fontSize="9">두께 얇아 가공 중 파손 위험 극대</text>
      <text x="330" y="94" textAnchor="middle" fill="#f87171" fontSize="9">진공척/왁스 마운팅 밀착 불량 확인</text>
      <text x="330" y="112" textAnchor="middle" fill="#cbd5e1" fontSize="8">포커스링 외곽/하부 보호 소모품</text>
    </svg>
  ),

  // 11. 챔버 라이너 (Chamber Liner)
  11: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      {/* 실린더 원통형 쿼츠 라이너 */}
      <rect x="35" y="30" width="12" height="95" rx="3" fill="#38bdf8" stroke="#7dd3fc" />
      <rect x="145" y="30" width="12" height="95" rx="3" fill="#38bdf8" stroke="#7dd3fc" />
      <ellipse cx="96" cy="30" rx="55" ry="12" fill="none" stroke="#38bdf8" strokeWidth="2" />
      <ellipse cx="96" cy="125" rx="55" ry="12" fill="none" stroke="#38bdf8" strokeWidth="2" />
      <text x="96" y="78" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">원통 실린더 라이너</text>

      <rect x="195" y="25" width="250" height="105" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="320" y="52" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">동심도 &amp; 슬롯 가공 크랙 방지</text>
      <text x="320" y="74" textAnchor="middle" fill="#f8fafc" fontSize="9">원통 높이 높고 벽 두께 얇음</text>
      <text x="320" y="94" textAnchor="middle" fill="#f87171" fontSize="9">슬롯 부위 절삭 부하 제어(크랙 전파)</text>
      <text x="320" y="112" textAnchor="middle" fill="#cbd5e1" fontSize="8">챔버 내벽 플라즈마 부식 방지</text>
    </svg>
  ),

  // 12. 정전척 / 히터 베이스 (ESC / Ceramic Heater)
  12: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      {/* ESC 상면 세라믹 플레이트 + 핀 홀 */}
      <rect x="25" y="40" width="170" height="45" rx="4" fill="#0f766e" stroke="#2dd4bf" strokeWidth="2" />
      <line x1="60" y1="40" x2="60" y2="85" stroke="#facc15" strokeWidth="2" strokeDasharray="3 2" />
      <line x1="110" y1="40" x2="110" y2="85" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 2" />
      <line x1="160" y1="40" x2="160" y2="85" stroke="#facc15" strokeWidth="2" strokeDasharray="3 2" />
      <text x="110" y="105" textAnchor="middle" fill="#2dd4bf" fontSize="9" fontWeight="bold">리프트 핀 홀 &amp; He 가스 홀</text>

      {/* 최고가 부품 셋업 주의 */}
      <rect x="215" y="25" width="230" height="105" rx="8" fill="#450a0a" stroke="#f87171" strokeWidth="1.5" />
      <text x="330" y="52" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="bold">💎 극초정밀 평탄도 &amp; 셋업 검증</text>
      <text x="330" y="74" textAnchor="middle" fill="#ffffff" fontSize="9">AlN 소재 단가 극고가 부품</text>
      <text x="330" y="94" textAnchor="middle" fill="#fecaca" fontSize="9">셋업 미스로 인한 폐기 시 막대한 손실</text>
      <text x="330" y="112" textAnchor="middle" fill="#f87171" fontSize="8">상면 초정밀 평면연삭 공차 사수</text>
    </svg>
  ),

  // 13. 배플 / 인젝터 (Baffle / Gas Injector)
  13: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      {/* 배플 다공판 + 인젝터 노즐 */}
      <rect x="25" y="45" width="160" height="18" rx="3" fill="#0284c7" />
      {[35, 55, 75, 95, 115, 135, 155].map((x) => (
        <rect key={x} x={x} y="47" width="8" height="14" fill="#090d16" rx="1" />
      ))}
      <path d="M 105,75 L 105,115" stroke="#facc15" strokeWidth="5" strokeLinecap="round" />
      <text x="105" y="132" textAnchor="middle" fill="#fde047" fontSize="8">인젝터 노즐</text>

      <rect x="210" y="25" width="235" height="105" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="327" y="52" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">얇은 격벽 수압·에어건 파손 주의</text>
      <text x="327" y="74" textAnchor="middle" fill="#f8fafc" fontSize="9">슬롯 및 경사홀 미세 살두께 취약</text>
      <text x="327" y="94" textAnchor="middle" fill="#f87171" fontSize="9">고압 에어 분사 시 격벽 부러짐 발생</text>
      <text x="327" y="112" textAnchor="middle" fill="#cbd5e1" fontSize="8">MCT 및 초음파 홀 가공</text>
    </svg>
  ),

  // 14. 잉곳 / 블랭크 블록 (Ingot / Blank Block)
  14: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      {/* 대형 잉곳 블록 & 오리엔테이션 플랫 홈 */}
      <rect x="30" y="35" width="140" height="80" rx="8" fill="url(#siGrad)" stroke="#94a3b8" strokeWidth="2" />
      <path d="M 140,35 L 170,65 L 170,115 L 140,115 Z" fill="#334155" />
      <line x1="30" y1="50" x2="60" y2="50" stroke="#facc15" strokeWidth="3" />
      <text x="45" y="42" textAnchor="middle" fill="#fef08a" fontSize="8">오리엔테이션 플랫</text>
      <text x="100" y="80" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">원소재 블랭크</text>

      <rect x="200" y="25" width="245" height="105" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
      <text x="322" y="52" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">결정 방향 플랫 &amp; 크레인 결속</text>
      <text x="322" y="74" textAnchor="middle" fill="#f8fafc" fontSize="9">절단 전 오리엔테이션 플랫 방향 확인</text>
      <text x="322" y="94" textAnchor="middle" fill="#f59e0b" fontSize="9">로트 번호 수입 검사 대조 철저</text>
      <text x="322" y="112" textAnchor="middle" fill="#cbd5e1" fontSize="8">고가 원소재 이동 대차 결속 확인</text>
    </svg>
  ),

  // 15. 와이어 쏘잉 (Multi-Wire Sawing)
  15: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      {/* 잉곳 하강 및 다이아몬드 와이어 다발 */}
      <rect x="35" y="25" width="140" height="40" rx="4" fill="url(#quartzGrad)" stroke="#38bdf8" strokeWidth="1.5" />
      <text x="105" y="48" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">잉곳 하강 절단</text>
      {[70, 80, 90].map((y) => (
        <line key={y} x1="20" y1={y} x2="190" y2={y} stroke="#facc15" strokeWidth="2" />
      ))}
      <text x="105" y="110" textAnchor="middle" fill="#fef08a" fontSize="8">고속 주행 다이아 와이어</text>

      <rect x="210" y="25" width="235" height="105" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="327" y="52" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">쏘 마크(Saw Mark) &amp; 휨(Bow) 방지</text>
      <text x="327" y="74" textAnchor="middle" fill="#f8fafc" fontSize="9">와이어 장력 및 절삭유 공급 안정화</text>
      <text x="327" y="94" textAnchor="middle" fill="#f87171" fontSize="9">절단면 물결무늬 발생 시 후공정 부담</text>
      <text x="327" y="112" textAnchor="middle" fill="#cbd5e1" fontSize="8">Si / Quartz / RB-SiC 판재 슬라이싱</text>
    </svg>
  ),

  // 16. 코어링 (Coring / Trepanning)
  16: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      {/* 코어 드릴 및 하단 관통 치핑 방지 */}
      <rect x="50" y="20" width="80" height="35" fill="#475569" stroke="#94a3b8" />
      <rect x="65" y="55" width="50" height="55" fill="#f59e0b" fillOpacity="0.3" stroke="#f59e0b" strokeWidth="2" />
      <text x="90" y="85" textAnchor="middle" fill="#facc15" fontSize="9" fontWeight="bold">코어 비트</text>
      <line x1="40" y1="110" x2="140" y2="110" stroke="#ef4444" strokeWidth="3" />

      <rect x="195" y="25" width="250" height="105" rx="8" fill="#450a0a" stroke="#f87171" strokeWidth="1.5" />
      <text x="320" y="52" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="bold">🚨 관통 치핑(Exit Chipping) 주의</text>
      <text x="320" y="74" textAnchor="middle" fill="#ffffff" fontSize="9">바닥 관통 직전 이송 속도 급감속</text>
      <text x="320" y="94" textAnchor="middle" fill="#fecaca" fontSize="9">하단 모서리 떨어져 나감 원천 방지</text>
      <text x="320" y="112" textAnchor="middle" fill="#f87171" fontSize="8">적출된 코어 알맹이 재사용 모재 보존</text>
    </svg>
  ),

  // 17. 황삭 / 정삭 (Rough / Finish Grinding)
  17: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      <rect x="25" y="30" width="75" height="90" fill="#334155" stroke="#94a3b8" />
      <text x="62" y="70" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">황삭</text>
      <text x="62" y="88" textAnchor="middle" fill="#cbd5e1" fontSize="8">+1.0mm 여유</text>

      <path d="M 105,75 L 125,75" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#arrow)" />

      <rect x="130" y="45" width="60" height="60" fill="#1e3a8a" stroke="#38bdf8" />
      <text x="160" y="75" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">정삭</text>
      <text x="160" y="90" textAnchor="middle" fill="#93c5fd" fontSize="8">±0.005mm</text>

      <rect x="210" y="25" width="235" height="105" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="327" y="52" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">데미지층 방지 및 가공 여유량</text>
      <text x="327" y="74" textAnchor="middle" fill="#f8fafc" fontSize="9">황삭 과절입 시 눈에 안 보이는 크랙 잔류</text>
      <text x="327" y="94" textAnchor="middle" fill="#f87171" fontSize="9">정삭·에칭 후에도 불량으로 표출</text>
      <text x="327" y="112" textAnchor="middle" fill="#cbd5e1" fontSize="8">공정별 정해진 가공 여유량 필수 준수</text>
    </svg>
  ),

  // 18. MCT / CNC 정밀 연삭 (CNC Grinding / Milling)
  18: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      <rect x="50" y="20" width="35" height="30" fill="#475569" stroke="#94a3b8" />
      <rect x="62" y="50" width="10" height="25" fill="#f59e0b" />
      <path d="M 30,75 L 105,75 L 105,115 L 30,115 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
      <text x="67" y="100" textAnchor="middle" fill="#38bdf8" fontSize="8">정밀 단차/포켓</text>

      <rect x="180" y="25" width="265" height="105" rx="8" fill="#450a0a" stroke="#f87171" strokeWidth="1.5" />
      <text x="312" y="52" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="bold">🚨 영점 셋업 &amp; 스핀들 충돌 방지</text>
      <text x="312" y="74" textAnchor="middle" fill="#ffffff" fontSize="9">공구 길이 보정 오차 시 스핀들 충돌(Crash)</text>
      <text x="312" y="94" textAnchor="middle" fill="#fecaca" fontSize="9">가공 시작 전 Dry Run(공회전) 검증</text>
      <text x="312" y="112" textAnchor="middle" fill="#f87171" fontSize="8">절삭유 분사 각도 정확 조준 필수</text>
    </svg>
  ),

  // 19. 초음파 가공 (Ultrasonic Machining)
  19: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      <polygon points="65,20 105,20 90,55 80,55" fill="#6366f1" stroke="#a5b4fc" />
      <line x1="85" y1="55" x2="85" y2="90" stroke="#f59e0b" strokeWidth="2.5" />
      <path d="M 65,70 Q 75,60 85,70 T 105,70" fill="none" stroke="#e0e7ff" strokeWidth="1.5" />
      <text x="85" y="115" textAnchor="middle" fill="#38bdf8" fontSize="8">초당 수만 회 종진동</text>

      <rect x="180" y="25" width="265" height="105" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
      <text x="312" y="52" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">저발열·저절삭저항 미세 심공 가공</text>
      <text x="312" y="74" textAnchor="middle" fill="#f8fafc" fontSize="9">깨지기 쉬운 부위 미세 타격 삭마</text>
      <text x="312" y="94" textAnchor="middle" fill="#f59e0b" fontSize="9">초음파 공진점(주파수) 틀어지면 툴 파손</text>
      <text x="312" y="112" textAnchor="middle" fill="#cbd5e1" fontSize="8">Si / Quartz / AlN 심공 단차 타공</text>
    </svg>
  ),

  // 20. 레이저 드릴링 (Laser Drilling)
  20: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      {/* 레이저 헤드 및 고에너지 빔 타공 */}
      <rect x="55" y="20" width="50" height="25" fill="#334155" stroke="#94a3b8" />
      <polygon points="75,45 85,45 81,85 79,85" fill="#ef4444" />
      <rect x="30" y="85" width="100" height="30" fill="#1e293b" stroke="#38bdf8" />
      <circle cx="80" cy="85" r="5" fill="#f59e0b" />
      <text x="80" y="130" textAnchor="middle" fill="#fca5a5" fontSize="8">리캐스트층 발생</text>

      <rect x="175" y="25" width="270" height="105" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="310" y="52" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">리캐스트층(Recast Layer) 제거</text>
      <text x="310" y="74" textAnchor="middle" fill="#f8fafc" fontSize="9">고출력 레이저 열에 의한 열변형층·스패터</text>
      <text x="310" y="94" textAnchor="middle" fill="#f87171" fontSize="9">후공정(호닝/사상/화공 에칭) 완전 제거 필수</text>
      <text x="310" y="112" textAnchor="middle" fill="#cbd5e1" fontSize="8">Si 샤워헤드 비접촉 고속 관통홀 가공</text>
    </svg>
  ),

  // 21. PCD 드릴링 (PCD Micro-Drilling)
  21: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      <rect x="65" y="20" width="20" height="40" fill="#64748b" />
      <polygon points="65,60 85,60 75,85" fill="#f59e0b" stroke="#fef08a" />
      <text x="75" y="105" textAnchor="middle" fill="#fff" fontSize="8">PCD 소결 다이아 팁</text>

      <rect x="175" y="25" width="270" height="105" rx="8" fill="#450a0a" stroke="#f87171" strokeWidth="1.5" />
      <text x="310" y="52" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="bold">🚨 공구 마모 카운트(Tool Life) 관리</text>
      <text x="310" y="74" textAnchor="middle" fill="#ffffff" fontSize="9">드릴 마모 시 홀 입·출구 치핑 급증</text>
      <text x="310" y="94" textAnchor="middle" fill="#fecaca" fontSize="9">드릴 파손 홀 박힘 시 파츠 전체 폐기</text>
      <text x="310" y="112" textAnchor="middle" fill="#f87171" fontSize="8">수백~수천 개 미세홀 가공 스펙 관리</text>
    </svg>
  ),

  // 22. 스텝 홀 / 카운터보어 (Step Hole / Counterbore)
  22: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      {/* 2단 단차 홀 구조 */}
      <path d="M 30,30 L 60,30 L 60,65 L 75,65 L 75,120 L 85,120 L 85,65 L 100,65 L 100,30 L 130,30 L 130,120 L 30,120 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
      <circle cx="80" cy="65" r="3" fill="#ef4444" />
      <text x="80" y="55" textAnchor="middle" fill="#f87171" fontSize="8">단차 목 부위</text>

      <rect x="175" y="25" width="270" height="105" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="310" y="52" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">단차 코너 응력 집중 &amp; 동심도</text>
      <text x="310" y="74" textAnchor="middle" fill="#f8fafc" fontSize="9">대경과 소경 만나는 목 부위 크랙 1순위</text>
      <text x="310" y="94" textAnchor="middle" fill="#f87171" fontSize="9">상하 홀 중심축 어긋남(동심도 불량) 관리</text>
      <text x="310" y="112" textAnchor="middle" fill="#cbd5e1" fontSize="8">가스 확산 단차홀 / 볼트 자리파기</text>
    </svg>
  ),

  // 23. 드레싱 / 트루잉 (Dressing / Truing)
  23: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      <circle cx="85" cy="75" r="40" fill="#1e293b" stroke="#64748b" strokeWidth="3" />
      <rect x="135" y="45" width="45" height="20" fill="#0284c7" rx="2" />
      <text x="157" y="58" textAnchor="middle" fill="#fff" fontSize="7">1.트루잉</text>
      <rect x="135" y="80" width="45" height="20" fill="#d97706" rx="2" />
      <text x="157" y="93" textAnchor="middle" fill="#fff" fontSize="7">2.드레싱</text>

      <rect x="210" y="25" width="235" height="105" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="327" y="52" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">눈메움 제거 &amp; 휠 진원 보정</text>
      <text x="327" y="74" textAnchor="middle" fill="#f8fafc" fontSize="9">드레싱 미실시 시 마찰열 폭발 → 버닝</text>
      <text x="327" y="94" textAnchor="middle" fill="#f87171" fontSize="9">GC 스틱 드레싱 후 휠 치수 재보정 필수</text>
      <text x="327" y="112" textAnchor="middle" fill="#cbd5e1" fontSize="8">절단·연삭·MCT 전공정 주기적 실시</text>
    </svg>
  ),

  // 24. 왁스 본딩 / 마운팅 (Wax Bonding / Mounting)
  24: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      <rect x="25" y="35" width="130" height="15" fill="url(#quartzGrad)" stroke="#38bdf8" />
      <rect x="25" y="53" width="130" height="8" fill="#f59e0b" />
      <rect x="25" y="64" width="130" height="30" fill="#334155" stroke="#94a3b8" />
      <text x="90" y="82" textAnchor="middle" fill="#fff" fontSize="8">정반 베이스</text>

      <rect x="180" y="25" width="265" height="105" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="312" y="52" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">기포(Void) 제거 &amp; 평행도 보장</text>
      <text x="312" y="74" textAnchor="middle" fill="#f8fafc" fontSize="9">기포 유입 시 가공 중 들뜸 파손·두께 불량</text>
      <text x="312" y="94" textAnchor="middle" fill="#f87171" fontSize="9">탈착 시 급냉/급열 열충격 파손 주의</text>
      <text x="312" y="112" textAnchor="middle" fill="#cbd5e1" fontSize="8">박판 파츠 핫멜트 왁스 고정</text>
    </svg>
  ),

  // 25. 진공척 / 전용 지그 (Vacuum Chuck / Jig)
  25: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      <rect x="25" y="40" width="135" height="15" fill="url(#quartzGrad)" stroke="#38bdf8" />
      <rect x="25" y="58" width="135" height="40" rx="3" fill="#0f766e" stroke="#2dd4bf" strokeWidth="2" />
      <line x1="92" y1="98" x2="92" y2="120" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow)" />
      <text x="92" y="80" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">진공 음압 흡착</text>

      <rect x="185" y="25" width="260" height="105" rx="8" fill="#450a0a" stroke="#f87171" strokeWidth="1.5" />
      <text x="315" y="52" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="bold">🚨 안착면 슬러지 이물 제로 청소</text>
      <text x="315" y="74" textAnchor="middle" fill="#ffffff" fontSize="9">슬러지 1알 끼면 진공 누설 및 파츠 두 동강</text>
      <text x="315" y="94" textAnchor="middle" fill="#fecaca" fontSize="9">안착 전 에어건 + 무진 와이퍼 청소 필수</text>
      <text x="315" y="112" textAnchor="middle" fill="#f87171" fontSize="8">베이클라이트/아세탈 전용 지그 관리</text>
    </svg>
  ),

  // 26. 래핑 (Lapping)
  26: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      <rect x="25" y="30" width="145" height="20" fill="#475569" />
      <rect x="45" y="55" width="45" height="18" fill="url(#quartzGrad)" stroke="#38bdf8" />
      <rect x="105" y="55" width="45" height="18" fill="url(#quartzGrad)" stroke="#38bdf8" />
      <rect x="25" y="80" width="145" height="20" fill="#475569" />
      <text x="97" y="118" textAnchor="middle" fill="#38bdf8" fontSize="8">주철 정반 슬러리 유동</text>

      <rect x="195" y="25" width="250" height="105" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
      <text x="320" y="52" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">에지 처짐(Roll-off) &amp; 슬러리 즉시 세척</text>
      <text x="320" y="74" textAnchor="middle" fill="#f8fafc" fontSize="9">슬러리 마르면 굳어 영구 스크래치 유발</text>
      <text x="320" y="94" textAnchor="middle" fill="#f59e0b" fontSize="9">작업 직후 즉시 세척(DIW) 공정 투입</text>
      <text x="320" y="112" textAnchor="middle" fill="#cbd5e1" fontSize="8">두께 공차·평탄도·평행도 정밀 무광 연마</text>
    </svg>
  ),

  // 27. 폴리싱 (Polishing)
  27: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      <rect x="25" y="35" width="140" height="25" rx="3" fill="#1e3a8a" stroke="#60a5fa" />
      <rect x="25" y="65" width="140" height="12" fill="#f59e0b" />
      <line x1="25" y1="85" x2="165" y2="85" stroke="#38bdf8" strokeWidth="3" />
      <text x="95" y="105" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">경면 조도 (Ra &lt; 0.005μm)</text>

      <rect x="190" y="25" width="255" height="105" rx="8" fill="#450a0a" stroke="#f87171" strokeWidth="1.5" />
      <text x="317" y="52" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="bold">🚨 혜성 스크래치(Comet Scratch) 방지</text>
      <text x="317" y="74" textAnchor="middle" fill="#ffffff" fontSize="9">굵은 입자 단 1알 유입 시 경면 전체 폐기</text>
      <text x="317" y="94" textAnchor="middle" fill="#fecaca" fontSize="9">폴리싱 패드 청정 및 오염 관리 철저</text>
      <text x="317" y="112" textAnchor="middle" fill="#f87171" fontSize="8">콜로이달 실리카 슬러리 정밀 여과</text>
    </svg>
  ),

  // 28. 샌드블라스트 (Sandblasting)
  28: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      <polygon points="30,45 60,60 60,75 30,90" fill="#334155" />
      <circle cx="80" cy="62" r="2.5" fill="#facc15" />
      <circle cx="105" cy="70" r="2.5" fill="#38bdf8" />
      <rect x="125" y="45" width="45" height="50" fill="#0284c7" stroke="#7dd3fc" />
      <text x="147" y="73" textAnchor="middle" fill="#fff" fontSize="8">무광면</text>

      <rect x="195" y="25" width="250" height="105" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="320" y="52" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">마스킹 들뜸 &amp; 노즐 거리 유지</text>
      <text x="320" y="74" textAnchor="middle" fill="#f8fafc" fontSize="9">마스킹 테이프 틈새 샌딩 불량 주의</text>
      <text x="320" y="94" textAnchor="middle" fill="#f87171" fontSize="9">노즐 집중 분사 시 국부 파임 및 얼룩</text>
      <text x="320" y="112" textAnchor="middle" fill="#cbd5e1" fontSize="8">균일한 표면 조도(텍스처) 형성</text>
    </svg>
  ),

  // 29. 화염연마 (Fire / Flame Polishing)
  29: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      <rect x="25" y="55" width="45" height="20" fill="#475569" rx="2" />
      <polygon points="70,55 125,65 70,75" fill="url(#fireGrad)" />
      <rect x="130" y="35" width="45" height="60" rx="3" fill="url(#quartzGrad)" stroke="#38bdf8" />
      <text x="152" y="70" textAnchor="middle" fill="#fff" fontSize="8">투명화</text>

      <rect x="200" y="25" width="245" height="105" rx="8" fill="#3b0764" stroke="#c084fc" strokeWidth="1.5" />
      <text x="322" y="52" textAnchor="middle" fill="#e9d5ff" fontSize="11" fontWeight="bold">열충격 파손 방지 및 편광 응력 검사</text>
      <text x="322" y="74" textAnchor="middle" fill="#ffffff" fontSize="9">Quartz 전용 (Si, AlN, SiC 절대 불가)</text>
      <text x="322" y="94" textAnchor="middle" fill="#d8b4fe" fontSize="9">과열 후 급냉 시 쩍 갈라짐 → 예열/서냉</text>
      <text x="322" y="112" textAnchor="middle" fill="#a855f7" fontSize="8">수소-산소 토치 미세 크랙 봉합</text>
    </svg>
  ),

  // 30. 사상 (Finishing)
  30: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      <path d="M 30,95 L 90,95 L 90,45" fill="none" stroke="#64748b" strokeWidth="5" />
      <rect x="75" y="30" width="10" height="35" transform="rotate(-30 75 30)" fill="#e2e8f0" stroke="#0284c7" />
      <text x="60" y="125" textAnchor="middle" fill="#38bdf8" fontSize="9">정밀 수작업 다듬질</text>

      <rect x="180" y="25" width="265" height="105" rx="8" fill="#450a0a" stroke="#f87171" strokeWidth="1.5" />
      <text x="312" y="52" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="bold">🚨 과사상(치수 마이너스) 엄금</text>
      <text x="312" y="74" textAnchor="middle" fill="#ffffff" fontSize="9">과도하게 갈아내면 도면 공차 미달 폐품</text>
      <text x="312" y="94" textAnchor="middle" fill="#fecaca" fontSize="9">모서리 버 제거 시 평탄도 무너짐 주의</text>
      <text x="312" y="112" textAnchor="middle" fill="#f87171" fontSize="8">사상 여유량 확인하며 섬세 작업</text>
    </svg>
  ),

  // 31. 면취 가공 (Chamfering / Edge Rounding)
  31: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      <path d="M 30,55 L 45,40 L 120,40 L 120,110 L 30,110 Z" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="2" />
      <line x1="30" y1="55" x2="45" y2="40" stroke="#facc15" strokeWidth="3" />
      <text x="75" y="75" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">C면/R면</text>

      <rect x="175" y="25" width="270" height="105" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="310" y="52" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">면취 불균일('뱀 기어간 자국') 방지</text>
      <text x="310" y="74" textAnchor="middle" fill="#f8fafc" fontSize="9">수작업 시 손힘 흔들리면 면취 폭 울퉁불퉁</text>
      <text x="310" y="94" textAnchor="middle" fill="#f87171" fontSize="9">회전 테이블/지그 활용 균일 압력 유지</text>
      <text x="310" y="112" textAnchor="middle" fill="#cbd5e1" fontSize="8">모서리 파손 및 플라즈마 아크 방지</text>
    </svg>
  ),

  // 32. 홀 사상 (Hole Edge Finishing)
  32: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      <rect x="30" y="45" width="120" height="30" fill="#1e3a8a" stroke="#60a5fa" />
      <line x1="60" y1="30" x2="60" y2="90" stroke="#facc15" strokeWidth="3" />
      <line x1="90" y1="30" x2="90" y2="90" stroke="#facc15" strokeWidth="3" />
      <text x="90" y="115" textAnchor="middle" fill="#38bdf8" fontSize="8">전용 핀/브러시 홀 사상</text>

      <rect x="180" y="25" width="265" height="105" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="312" y="52" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">구획별 마킹 &amp; 깔때기 벌어짐 방지</text>
      <text x="312" y="74" textAnchor="middle" fill="#f8fafc" fontSize="9">수천 개 홀 미사상 누락 방지 구획 마킹</text>
      <text x="312" y="94" textAnchor="middle" fill="#f87171" fontSize="9">무리하게 쑤셔 넣으면 홀 입구 깔때기화</text>
      <text x="312" y="112" textAnchor="middle" fill="#cbd5e1" fontSize="8">입출구 치핑 제거 및 내벽 다듬질</text>
    </svg>
  ),

  // 33. 홀 에칭 / 홀 내부 화학 식각 (Hole Etching / Inner Wet Etch)
  33: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      <rect x="30" y="40" width="120" height="40" fill="#be123c" fillOpacity="0.4" stroke="#f43f5e" />
      <circle cx="65" cy="60" r="4" fill="#38bdf8" />
      <circle cx="95" cy="60" r="6" fill="#facc15" />
      <text x="95" y="75" textAnchor="middle" fill="#fff" fontSize="6">기포</text>
      <text x="90" y="110" textAnchor="middle" fill="#fca5a5" fontSize="8">초음파 진동 탈포</text>

      <rect x="180" y="25" width="265" height="105" rx="8" fill="#450a0a" stroke="#f87171" strokeWidth="1.5" />
      <text x="312" y="52" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="bold">🚨 홀 미에칭(기포 갇힘) 방지</text>
      <text x="312" y="74" textAnchor="middle" fill="#ffffff" fontSize="9">미세 기포 차면 약액 미도달로 홀 막힘</text>
      <text x="312" y="94" textAnchor="middle" fill="#fecaca" fontSize="9">침지 시 초음파 진동/교반으로 기포 배출</text>
      <text x="312" y="112" textAnchor="middle" fill="#f87171" fontSize="8">홀 내부 열변형층/미세크랙 화학 제거</text>
    </svg>
  ),

  // 34. 핸드피스 / 루터 (Micro Handpiece / Air Grinder)
  34: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      <rect x="30" y="60" width="70" height="15" rx="3" fill="#64748b" />
      <polygon points="100,62 120,67 100,72" fill="#f59e0b" />
      <text x="75" y="95" textAnchor="middle" fill="#38bdf8" fontSize="8">두 손 지지 원칙</text>

      <rect x="165" y="25" width="280" height="105" rx="8" fill="#450a0a" stroke="#f87171" strokeWidth="1.5" />
      <text x="305" y="52" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="bold">🚨 사상 스침(오사상 스크래치) 방지</text>
      <text x="305" y="74" textAnchor="middle" fill="#ffffff" fontSize="9">회전 툴 접촉 시 튕겨 나가며 정상면 긁힘</text>
      <text x="305" y="94" textAnchor="middle" fill="#fecaca" fontSize="9">반드시 두 손 파지 및 저속 회전 접촉</text>
      <text x="305" y="112" textAnchor="middle" fill="#f87171" fontSize="8">국부 결함 및 모서리 초정밀 다듬질</text>
    </svg>
  ),

  // 35. 다이아몬드 패드 / 페이스트 (Diamond Pad / Paste)
  35: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      <rect x="30" y="35" width="50" height="40" rx="3" fill="#b45309" stroke="#fde047" />
      <text x="55" y="58" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">#200 거침</text>
      <rect x="95" y="35" width="50" height="40" rx="3" fill="#0284c7" stroke="#38bdf8" />
      <text x="120" y="58" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">#3000 고움</text>

      <rect x="175" y="25" width="270" height="105" rx="8" fill="#450a0a" stroke="#f87171" strokeWidth="1.5" />
      <text x="310" y="52" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="bold">🚨 방수별 패드·장갑 교차오염 방지</text>
      <text x="310" y="74" textAnchor="middle" fill="#ffffff" fontSize="9">거친 방수 쓰던 장갑으로 고운 면 문지름 금지</text>
      <text x="310" y="94" textAnchor="middle" fill="#fecaca" fontSize="9">방수별(#) 작업대·패드·용기 엄격 분리</text>
      <text x="310" y="112" textAnchor="middle" fill="#f87171" fontSize="8">치명적 굵은 스크래치 원천 차단</text>
    </svg>
  ),

  // 36. 툴 마크 / 단차 (Tool Mark / Step Mark)
  36: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      <rect x="25" y="45" width="130" height="40" fill="#1e293b" stroke="#64748b" />
      <path d="M 35,65 Q 45,55 55,65 T 75,65 T 95,65 T 115,65" fill="none" stroke="#f59e0b" strokeWidth="2" />
      <text x="90" y="110" textAnchor="middle" fill="#fbbf24" fontSize="8">휠 자국 / 단차 결</text>

      <rect x="180" y="25" width="265" height="105" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="312" y="52" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">에칭 전 사상/폴리싱 완전 제거</text>
      <text x="312" y="74" textAnchor="middle" fill="#f8fafc" fontSize="9">깊은 툴 마크는 화공 에칭 시 골이 더 깊어짐</text>
      <text x="312" y="94" textAnchor="middle" fill="#f87171" fontSize="9">외관 불량 및 응력 집중 원인</text>
      <text x="312" y="112" textAnchor="middle" fill="#cbd5e1" fontSize="8">공구 교체부 단차 마이크론 관리</text>
    </svg>
  ),

  // 37. 핀 마크 / 지그 자국 제거 (Pin / Jig Mark Removal)
  37: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      <circle cx="85" cy="75" r="35" fill="#1e3a8a" stroke="#60a5fa" />
      <circle cx="85" cy="75" r="8" fill="#f59e0b" />
      <text x="85" y="125" textAnchor="middle" fill="#fde047" fontSize="8">지그 턱 자국 블렌딩</text>

      <rect x="175" y="25" width="270" height="105" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
      <text x="310" y="52" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">음영 불량(Dimple) 방지 블렌딩</text>
      <text x="310" y="74" textAnchor="middle" fill="#f8fafc" fontSize="9">자국만 파내면 움푹 꺼져 진원도 파괴</text>
      <text x="310" y="94" textAnchor="middle" fill="#f59e0b" fontSize="9">주변 영역까지 넓게 펴서 완만하게 다듬질</text>
      <text x="310" y="112" textAnchor="middle" fill="#cbd5e1" fontSize="8">공구 진입/이탈 흔적 완벽 연결</text>
    </svg>
  ),

  // 38. 습식 화학 에칭 (Wet Chemical Etching)
  38: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      <rect x="25" y="35" width="130" height="85" rx="6" fill="#be123c" fillOpacity="0.4" stroke="#f43f5e" strokeWidth="2" />
      <text x="90" y="65" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">화학 에칭조</text>
      <text x="90" y="85" textAnchor="middle" fill="#fecdd3" fontSize="8">전용 조(Bath) 분리</text>

      <rect x="180" y="25" width="265" height="105" rx="8" fill="#7f1d1d" stroke="#f87171" strokeWidth="2" />
      <text x="312" y="52" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="extrabold">🚨 소재별 전용 조(Bath) 분리</text>
      <text x="312" y="74" textAnchor="middle" fill="#fecaca" fontSize="9">실리콘 산조에 RB-SiC 오투입 시 부식 폐기</text>
      <text x="312" y="94" textAnchor="middle" fill="#ffffff" fontSize="9">알칼리 조에 AlN 투입 절대 금지</text>
      <text x="312" y="112" textAnchor="middle" fill="#fca5a5" fontSize="8">내산 가운·고글·이중장갑 필수</text>
    </svg>
  ),

  // 39. 가공변질층 / 데미지층 (Subsurface Damage, SSD)
  39: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      <rect x="25" y="35" width="130" height="25" fill="#f87171" />
      <text x="90" y="52" textAnchor="middle" fill="#000" fontSize="8" fontWeight="bold">변질층 (SSD 15μm)</text>
      <rect x="25" y="60" width="130" height="55" fill="#1e3a8a" stroke="#60a5fa" />
      <text x="90" y="90" textAnchor="middle" fill="#fff" fontSize="10">정상 모재 격자</text>

      <rect x="180" y="25" width="265" height="105" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="312" y="52" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">변질층 미제거 시 조기 파손</text>
      <text x="312" y="74" textAnchor="middle" fill="#f8fafc" fontSize="9">다이아 휠 충격으로 생성된 미세 크랙층</text>
      <text x="312" y="94" textAnchor="middle" fill="#f87171" fontSize="9">에칭 미흡 시 챔버 내에서 열파손/파티클 폭탄</text>
      <text x="312" y="112" textAnchor="middle" fill="#cbd5e1" fontSize="8">화학 에칭으로 완전 제거 필수</text>
    </svg>
  ),

  // 40. 에칭량 / 살빼기 타겟 (Etch Rate / Stock Removal)
  40: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      <circle cx="85" cy="75" r="35" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
      <text x="85" y="70" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">타이머</text>
      <text x="85" y="88" textAnchor="middle" fill="#facc15" fontSize="8">2.5μm/min</text>

      <rect x="175" y="25" width="270" height="105" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
      <text x="310" y="52" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">침지 시간 &amp; 온도 초정밀 통제</text>
      <text x="310" y="74" textAnchor="middle" fill="#f8fafc" fontSize="9">시간 오버 시 치수 규격 미달(마이너스)</text>
      <text x="310" y="94" textAnchor="middle" fill="#f59e0b" fontSize="9">시간 부족 시 데미지층 잔류로 불량</text>
      <text x="310" y="112" textAnchor="middle" fill="#cbd5e1" fontSize="8">에칭 레이트 사전 정밀 계산</text>
    </svg>
  ),

  // 41. 과에칭 / 미에칭 (Over / Under Etching)
  41: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      <rect x="25" y="35" width="55" height="80" fill="#450a0a" stroke="#f87171" />
      <text x="52" y="70" textAnchor="middle" fill="#fca5a5" fontSize="8" fontWeight="bold">과에칭</text>
      <text x="52" y="85" textAnchor="middle" fill="#fff" fontSize="6">(폐품)</text>
      <rect x="95" y="35" width="55" height="80" fill="#1e3a8a" stroke="#60a5fa" />
      <text x="122" y="70" textAnchor="middle" fill="#93c5fd" fontSize="8" fontWeight="bold">미에칭</text>
      <text x="122" y="85" textAnchor="middle" fill="#fff" fontSize="6">(재에칭)</text>

      <rect x="175" y="25" width="270" height="105" rx="8" fill="#450a0a" stroke="#f87171" strokeWidth="1.5" />
      <text x="310" y="52" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="bold">🚨 과에칭 복구 불가 / 테스트 쿠폰 선행</text>
      <text x="310" y="74" textAnchor="middle" fill="#ffffff" fontSize="9">과에칭 품은 치수 미달로 즉시 폐기</text>
      <text x="310" y="94" textAnchor="middle" fill="#fecaca" fontSize="9">본품 투입 전 속도 테스트(Coupon) 필수</text>
      <text x="310" y="112" textAnchor="middle" fill="#f87171" fontSize="8">소재별 에칭 조건 이중 체크</text>
    </svg>
  ),

  // 42. 혼산 (Mixed Acid / HNA Solution)
  42: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      <rect x="25" y="30" width="130" height="95" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
      <text x="90" y="60" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="bold">HF + HNO₃ + HAc</text>
      <text x="90" y="80" textAnchor="middle" fill="#fff" fontSize="9">격렬 발열 화학반응</text>
      <text x="90" y="98" textAnchor="middle" fill="#facc15" fontSize="8">맹독성 NOx 가스 발생</text>

      <rect x="175" y="25" width="270" height="105" rx="8" fill="#7f1d1d" stroke="#f87171" strokeWidth="2" />
      <text x="310" y="52" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="extrabold">🚨 국소 배기(Draft Hood) 상시 감시</text>
      <text x="310" y="74" textAnchor="middle" fill="#fecaca" fontSize="9">급격한 온도 상승 및 유독 가스 분출</text>
      <text x="310" y="94" textAnchor="middle" fill="#ffffff" fontSize="9">약액 주입·배출 시 배기 차압 확인</text>
      <text x="310" y="112" textAnchor="middle" fill="#fca5a5" fontSize="8">Si 전용 고속 표면 용해 에칭액</text>
    </svg>
  ),

  // 43. 불산 (Hydrofluoric Acid, HF)
  43: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      <rect x="25" y="30" width="130" height="95" rx="8" fill="#7f1d1d" stroke="#f87171" strokeWidth="2.5" />
      <text x="90" y="60" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="extrabold">불산 (HF)</text>
      <text x="90" y="80" textAnchor="middle" fill="#fecaca" fontSize="9">SiO₂ 석영 전용 에칭</text>
      <text x="90" y="100" textAnchor="middle" fill="#facc15" fontSize="8">유리 비커 사용 절대 금지</text>

      <rect x="175" y="25" width="270" height="105" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
      <text x="310" y="52" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="extrabold">☠️ 뼈 칼슘 괴사 맹독 Red-Line</text>
      <text x="310" y="74" textAnchor="middle" fill="#fecaca" fontSize="9">피부 침투 시 뼈까지 녹여 신경 괴사</text>
      <text x="310" y="94" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">미세 튐 즉시 글루콘산칼슘 연고 처치</text>
      <text x="310" y="112" textAnchor="middle" fill="#fca5a5" fontSize="8">이중 내산장갑 공기 핀홀 검사 필수</text>
    </svg>
  ),

  // 44. 알칼리 에칭액 (Alkaline Etchant / KOH)
  44: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      <rect x="25" y="30" width="130" height="95" rx="8" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="2" />
      <text x="90" y="65" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">KOH 알칼리 조</text>
      <text x="90" y="85" textAnchor="middle" fill="#93c5fd" fontSize="9">실리콘 결정방위 이방성 식각</text>

      <rect x="175" y="25" width="270" height="105" rx="8" fill="#7f1d1d" stroke="#f87171" strokeWidth="2" />
      <text x="310" y="52" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="extrabold">🚨 실명 위험 &amp; AlN 오투입 방지</text>
      <text x="310" y="74" textAnchor="middle" fill="#fecaca" fontSize="9">알칼리 비산 시 눈·호흡기 치명상 (보호면 필수)</text>
      <text x="310" y="94" textAnchor="middle" fill="#ffffff" fontSize="9">AlN 소재 닿으면 즉시 심각 부식</text>
      <text x="310" y="112" textAnchor="middle" fill="#fca5a5" fontSize="8">오투입 방지 작업 구역 격리</text>
    </svg>
  ),

  // 45. 웨트 스테이션 / 드래프트 챔버 (Wet Station / Chemical Hood)
  45: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      <rect x="25" y="25" width="130" height="105" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
      <rect x="35" y="35" width="110" height="20" fill="#334155" />
      <text x="90" y="49" textAnchor="middle" fill="#38bdf8" fontSize="8">국소 배기 후드 (&gt;0.5m/s)</text>
      <rect x="35" y="65" width="110" height="55" fill="#0f172a" />
      <text x="90" y="95" textAnchor="middle" fill="#fff" fontSize="9">테프론 조 일체형</text>

      <rect x="175" y="25" width="270" height="105" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="310" y="52" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">배기 차압 게이지 &amp; 누수 점검</text>
      <text x="310" y="74" textAnchor="middle" fill="#f8fafc" fontSize="9">작업 전 배기 압력(Draught) 정상 확인</text>
      <text x="310" y="94" textAnchor="middle" fill="#f87171" fontSize="9">배관 누수·드레인 잠김 확인 안 하면 넘침 사고</text>
      <text x="310" y="112" textAnchor="middle" fill="#cbd5e1" fontSize="8">화공 에칭·세정 메인 설비 관리</text>
    </svg>
  ),

  // 46. 테프론 카세트 / 지그 (PTFE / PFA Carrier & Jig)
  46: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      <rect x="35" y="30" width="110" height="95" rx="6" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" />
      <line x1="55" y1="50" x2="125" y2="50" stroke="#0284c7" strokeWidth="3" />
      <line x1="55" y1="75" x2="125" y2="75" stroke="#0284c7" strokeWidth="3" />
      <text x="90" y="105" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="bold">PTFE 불소수지 바스켓</text>

      <rect x="165" y="25" width="280" height="105" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="305" y="52" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">에칭 멈춤(Touch Mark) 불량 방지</text>
      <text x="305" y="74" textAnchor="middle" fill="#f8fafc" fontSize="9">카세트 바닥 이물 끼면 약액 미도달 얼룩</text>
      <text x="305" y="94" textAnchor="middle" fill="#f87171" fontSize="9">파츠 안착 핀 세척 상태 상시 점검</text>
      <text x="305" y="112" textAnchor="middle" fill="#cbd5e1" fontSize="8">강산/강알칼리 무부식 전용 캐리어</text>
    </svg>
  ),

  // 47. 중화 및 폐액 처리 (Neutralization & Wastewater Treatment)
  47: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      <rect x="25" y="40" width="60" height="70" fill="#be123c" rx="4" />
      <text x="55" y="80" textAnchor="middle" fill="#fff" fontSize="9">산성 폐액</text>
      <path d="M 90,75 L 115,75" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)" />
      <rect x="120" y="40" width="60" height="70" fill="#1e3a8a" rx="4" />
      <text x="150" y="80" textAnchor="middle" fill="#fff" fontSize="9">알칼리 중화</text>

      <rect x="200" y="25" width="245" height="105" rx="8" fill="#450a0a" stroke="#f87171" strokeWidth="1.5" />
      <text x="322" y="52" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="bold">급투입 발열·튀김 폭발 방지</text>
      <text x="322" y="74" textAnchor="middle" fill="#ffffff" fontSize="9">산성액을 알칼리 조에 급격히 붓기 금지</text>
      <text x="322" y="94" textAnchor="middle" fill="#fecaca" fontSize="9">정해진 유속과 순서 준수 배출</text>
      <text x="322" y="112" textAnchor="middle" fill="#f87171" fontSize="8">공장 폐수 처리 설비 안전 이송</text>
    </svg>
  ),

  // 48. 정밀 세정 (Final Clean / Precision Cleaning)
  48: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      <rect x="25" y="35" width="130" height="85" rx="6" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
      <text x="90" y="70" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">파이널 세정</text>
      <text x="90" y="90" textAnchor="middle" fill="#bae6fd" fontSize="8">유분·슬러리·파티클 제로화</text>

      <rect x="175" y="25" width="270" height="105" rx="8" fill="#450a0a" stroke="#f87171" strokeWidth="1.5" />
      <text x="310" y="52" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="bold">🚨 맨손 접촉 엄금 / 클린룸 장갑 필수</text>
      <text x="310" y="74" textAnchor="middle" fill="#ffffff" fontSize="9">세정 직후 지문 접촉 시 아웃개싱 뿜음</text>
      <text x="310" y="94" textAnchor="middle" fill="#fecaca" fontSize="9">파우더프리 니트릴 장갑 &amp; 전용 핀셋 사용</text>
      <text x="310" y="112" textAnchor="middle" fill="#f87171" fontSize="8">반도체 팹 챔버 투입 최종 클린 상태</text>
    </svg>
  ),

  // 49. 초순수 및 비저항 (DI Water & Resistivity)
  49: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      <circle cx="85" cy="75" r="40" fill="#0369a1" stroke="#38bdf8" strokeWidth="2.5" />
      <text x="85" y="72" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">18.2 MΩ</text>
      <text x="85" y="90" textAnchor="middle" fill="#bae6fd" fontSize="8">극초순수 (DIW)</text>

      <rect x="175" y="25" width="270" height="105" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
      <text x="310" y="52" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">비저항 모니터링 &amp; 물얼룩 방지</text>
      <text x="310" y="74" textAnchor="middle" fill="#f8fafc" fontSize="9">비저항 저하(이온 잔류) 시 표면 워터마크 발생</text>
      <text x="310" y="94" textAnchor="middle" fill="#f59e0b" fontSize="9">18.2 MΩ·cm 복귀 전 린스 완료 금지</text>
      <text x="310" y="112" textAnchor="middle" fill="#cbd5e1" fontSize="8">초순수 헹굼 수질 상시 검증</text>
    </svg>
  ),

  // 50. 초음파 / 메가소닉 세정 (Ultrasonic & Megasonic Cleaning)
  50: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      <rect x="25" y="85" width="130" height="25" fill="#4338ca" stroke="#818cf8" />
      <text x="90" y="100" textAnchor="middle" fill="#fff" fontSize="8">초음파 / 메가소닉 1MHz</text>
      {[45, 75, 105, 135].map((x) => (
        <line key={x} x1={x} y1="80" x2={x} y2="45" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />
      ))}

      <rect x="175" y="25" width="270" height="105" rx="8" fill="#450a0a" stroke="#f87171" strokeWidth="1.5" />
      <text x="310" y="52" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="bold">과출력 시 얇은 링 공진 깨짐 주의</text>
      <text x="310" y="74" textAnchor="middle" fill="#ffffff" fontSize="9">출력 과다 시 쿼츠 링·홀 격벽 크랙 발생</text>
      <text x="310" y="94" textAnchor="middle" fill="#fecaca" fontSize="9">소재별 최적 주파수(28k~1M) 파워 세팅</text>
      <text x="310" y="112" textAnchor="middle" fill="#f87171" fontSize="8">미세기포 캐비테이션 파티클 탈착</text>
    </svg>
  ),

  // 51. SC-1 / 오존수 세정 (SC-1 / Ozone Cleaning)
  51: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      <rect x="25" y="35" width="130" height="85" rx="6" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="2" />
      <text x="90" y="65" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">SC-1 (NH₄OH+H₂O₂)</text>
      <text x="90" y="85" textAnchor="middle" fill="#facc15" fontSize="8">고순도 오존수 유기물 산화</text>

      <rect x="175" y="25" width="270" height="105" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="310" y="52" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">온도 &amp; 혼합 비율 엄격 준수</text>
      <text x="310" y="74" textAnchor="middle" fill="#f8fafc" fontSize="9">비율 틀어지면 표면 산화막 불균일</text>
      <text x="310" y="94" textAnchor="middle" fill="#f87171" fontSize="9">금속 불순물 재부착 방지</text>
      <text x="310" y="112" textAnchor="middle" fill="#cbd5e1" fontSize="8">약품 투입 타이밍 및 75℃ 유지</text>
    </svg>
  ),

  // 52. 스핀 드라이어 / IPA 건조 (Spin Dryer / IPA Vapor Drying)
  52: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      <circle cx="85" cy="75" r="35" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
      <path d="M 85,45 Q 115,75 85,105 Q 55,75 85,45" fill="none" stroke="#facc15" strokeWidth="2" />
      <text x="85" y="78" textAnchor="middle" fill="#fff" fontSize="8">고속 스핀 탈수</text>

      <rect x="175" y="25" width="270" height="105" rx="8" fill="#450a0a" stroke="#f87171" strokeWidth="1.5" />
      <text x="310" y="52" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="bold">🚨 파츠 원심력 이탈 파손 방지</text>
      <text x="310" y="74" textAnchor="middle" fill="#ffffff" fontSize="9">스핀 회전 시 지그 미고정 시 파츠 날아감</text>
      <text x="310" y="94" textAnchor="middle" fill="#fecaca" fontSize="9">회전수(RPM) 인터록 &amp; 고정 락 확인</text>
      <text x="310" y="112" textAnchor="middle" fill="#f87171" fontSize="8">IPA 증기 마란고니 무물얼룩 건조</text>
    </svg>
  ),

  // 53. 베이크 아웃 (Bake-out / Thermal Drying)
  53: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      <rect x="25" y="35" width="130" height="85" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
      <text x="90" y="65" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">클린 베이킹 오븐</text>
      <text x="90" y="85" textAnchor="middle" fill="#f87171" fontSize="8">기공 속 잔류 수분 탈가스</text>

      <rect x="175" y="25" width="270" height="105" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
      <text x="310" y="52" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">승온·냉각 속도 &amp; 열충격 파손 방지</text>
      <text x="310" y="74" textAnchor="middle" fill="#f8fafc" fontSize="9">급격한 승온/냉각 시 열충격 파손</text>
      <text x="310" y="94" textAnchor="middle" fill="#f59e0b" fontSize="9">오븐 설정 온도 및 유지 시간(Hold Time) 준수</text>
      <text x="310" y="112" textAnchor="middle" fill="#cbd5e1" fontSize="8">Quartz / AlN / RB-SiC 고온 탈수분</text>
    </svg>
  ),

  // 54. 클린룸 규정 (Cleanroom Protocol)
  54: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      <rect x="25" y="25" width="130" height="105" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
      <text x="90" y="55" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">Class 100 클린룸</text>
      <text x="90" y="75" textAnchor="middle" fill="#38bdf8" fontSize="8">방진복·후드·마스크·방진화</text>
      <text x="90" y="95" textAnchor="middle" fill="#facc15" fontSize="8">에어샤워 필수 통과</text>

      <rect x="175" y="25" width="270" height="105" rx="8" fill="#450a0a" stroke="#f87171" strokeWidth="1.5" />
      <text x="310" y="52" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="bold">머리카락·각질 노출 절대 금지</text>
      <text x="310" y="74" textAnchor="middle" fill="#ffffff" fontSize="9">방진복 지퍼 목 끝까지 채결</text>
      <text x="310" y="94" textAnchor="middle" fill="#fecaca" fontSize="9">작업자 각질 1개가 챔버 파티클 오염원</text>
      <text x="310" y="112" textAnchor="middle" fill="#f87171" fontSize="8">복장 규정 위반 시 즉시 라인 퇴출</text>
    </svg>
  ),

  // 55. 암실 검사 / 그린라이트 (Darkroom Inspection / Green Light)
  55: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      <rect x="25" y="25" width="130" height="105" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
      <line x1="45" y1="45" x2="135" y2="105" stroke="#4ade80" strokeWidth="3" />
      <text x="90" y="55" textAnchor="middle" fill="#a7f3d0" fontSize="9" fontWeight="bold">530nm 그린라이트</text>
      <text x="90" y="90" textAnchor="middle" fill="#fff" fontSize="8">암실 집광등 검사</text>

      <rect x="175" y="25" width="270" height="105" rx="8" fill="#1e293b" stroke="#34d399" strokeWidth="1.5" />
      <text x="310" y="52" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">360도 회전 스캔 육안 검사</text>
      <text x="310" y="74" textAnchor="middle" fill="#f8fafc" fontSize="9">조명 각도 회전하며 미세 스크래치 스캔</text>
      <text x="310" y="94" textAnchor="middle" fill="#facc15" fontSize="9">지문 자국·홀 내부 이물·막힘 완벽 검출</text>
      <text x="310" y="112" textAnchor="middle" fill="#cbd5e1" fontSize="8">최종 출하 전 전수 암실 검사</text>
    </svg>
  ),

  // 56. N2 퍼지 및 진공 포장 (N2 Purge & Vacuum Packaging)
  56: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      <rect x="25" y="30" width="130" height="95" rx="6" fill="#1e1e38" stroke="#818cf8" strokeWidth="2" />
      <rect x="40" y="45" width="100" height="65" rx="4" fill="#0284c7" />
      <text x="90" y="70" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">질소(N₂) 치환 퍼지</text>
      <text x="90" y="88" textAnchor="middle" fill="#c7d2fe" fontSize="8">2중 진공 열밀봉</text>

      <rect x="175" y="25" width="270" height="105" rx="8" fill="#450a0a" stroke="#f87171" strokeWidth="1.5" />
      <text x="310" y="52" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="bold">🚨 실링 핀홀 &amp; 표면 백화 방지</text>
      <text x="310" y="74" textAnchor="middle" fill="#ffffff" fontSize="9">진공 백 핀홀 시 수분·유분 유입 표면 백화</text>
      <text x="310" y="94" textAnchor="middle" fill="#fecaca" fontSize="9">실링 상태 시각/촉각 전수 검사</text>
      <text x="310" y="112" textAnchor="middle" fill="#f87171" fontSize="8">ESD 대전방지 클린백 밀봉</text>
    </svg>
  ),

  // 57. 파우더 / 이물 전이 오염 (Particle / Cross-Contamination)
  57: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      <rect x="25" y="40" width="130" height="60" fill="#334155" stroke="#94a3b8" />
      <circle cx="50" cy="55" r="3" fill="#facc15" />
      <circle cx="75" cy="80" r="3" fill="#facc15" />
      <circle cx="110" cy="60" r="4" fill="#facc15" />
      <text x="90" y="125" textAnchor="middle" fill="#facc15" fontSize="8">부자재 미세 가루 전이</text>

      <rect x="175" y="25" width="270" height="105" rx="8" fill="#450a0a" stroke="#f87171" strokeWidth="1.5" />
      <text x="310" y="52" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="bold">🚨 에어캡(뾱뾱이)·스펀지 사용 절대 금지</text>
      <text x="310" y="74" textAnchor="middle" fill="#ffffff" fontSize="9">일반 포장재 화학 이물 및 미세 가루 전이</text>
      <text x="310" y="94" textAnchor="middle" fill="#fecaca" fontSize="9">반도체 전용 무진 클린백만 사용</text>
      <text x="310" y="112" textAnchor="middle" fill="#f87171" fontSize="8">실리콘 프리 완충재 철저 규제</text>
    </svg>
  ),

  // 58. 치핑 (Chipping)
  58: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      <path d="M 30,110 L 110,110 L 110,55 L 85,55 L 65,70 L 30,70 Z" fill="#1e293b" stroke="#60a5fa" strokeWidth="2" />
      <polygon points="85,55 110,55 85,80" fill="#ef4444" stroke="#f87171" strokeWidth="2" />
      <text x="97" y="45" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">치핑 결함</text>

      <rect x="175" y="25" width="270" height="105" rx="8" fill="#450a0a" stroke="#f87171" strokeWidth="2" />
      <text x="310" y="52" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="extrabold">🚨 허용 규격(0.2mm) 초과 시 폐기</text>
      <text x="310" y="74" textAnchor="middle" fill="#fecaca" fontSize="9">모서리·홀 테두리 깨짐 챔버 아크 방전 유발</text>
      <text x="310" y="94" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">발생 즉시 부적합(불량) 처리 및 원인 분석</text>
      <text x="310" y="112" textAnchor="middle" fill="#fca5a5" fontSize="8">핸들링 테프론 지그 사용 원칙</text>
    </svg>
  ),

  // 59. 크랙 / 마이크로 크랙 (Crack / Micro-Crack)
  59: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      <rect x="25" y="30" width="130" height="95" rx="6" fill="#1e293b" stroke="#64748b" />
      <path d="M 60,45 L 75,70 L 65,95 L 85,115" fill="none" stroke="#ef4444" strokeWidth="2.5" />
      <text x="105" y="65" fill="#fca5a5" fontSize="8">실금(Micro-Crack)</text>

      <rect x="175" y="25" width="270" height="105" rx="8" fill="#7f1d1d" stroke="#f87171" strokeWidth="2" />
      <text x="310" y="52" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="extrabold">🚨 반도체 파츠 1급 치명 불량</text>
      <text x="310" y="74" textAnchor="middle" fill="#fecaca" fontSize="9">챔버 열 환경에서 순식간에 제품 전체 파손</text>
      <text x="310" y="94" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">타격음(둔탁한 소리) 및 편광 검사 확인</text>
      <text x="310" y="112" textAnchor="middle" fill="#fca5a5" fontSize="8">가공 부하 제어로 크랙 원천 방지</text>
    </svg>
  ),

  // 60. 스크래치 / 덴트 (Scratch & Dent)
  60: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      <rect x="25" y="45" width="130" height="40" fill="#1e3a8a" stroke="#60a5fa" />
      <line x1="35" y1="65" x2="145" y2="65" stroke="#ef4444" strokeWidth="3" />
      <circle cx="90" cy="65" r="4" fill="#f59e0b" />
      <text x="90" y="110" textAnchor="middle" fill="#f87171" fontSize="8">스크래치 &amp; 덴트(찍힘)</text>

      <rect x="175" y="25" width="270" height="105" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="310" y="52" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">진공 흡착 불량 &amp; 가스 유동 방해</text>
      <text x="310" y="74" textAnchor="middle" fill="#f8fafc" fontSize="9">폴리싱면·웨이퍼 안착면 긁힘 발생 주의</text>
      <text x="310" y="94" textAnchor="middle" fill="#f87171" fontSize="9">제품 이동 시 보호 패드 &amp; 전용 트레이 사용</text>
      <text x="310" y="112" textAnchor="middle" fill="#cbd5e1" fontSize="8">외관 전수 검사 관리</text>
    </svg>
  ),

  // 61. 스테인 / 워터마크 (Stain / Water Mark)
  61: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      <rect x="25" y="30" width="130" height="95" rx="8" fill="#1e293b" stroke="#38bdf8" />
      <circle cx="90" cy="77" r="22" fill="none" stroke="#93c5fd" strokeWidth="3" strokeDasharray="4 2" />
      <text x="90" y="115" textAnchor="middle" fill="#bae6fd" fontSize="8">무지개빛 얼룩 자국</text>

      <rect x="175" y="25" width="270" height="105" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="310" y="52" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">챔버 내 파티클 핵 형성 / 즉시 재세정</text>
      <text x="310" y="74" textAnchor="middle" fill="#f8fafc" fontSize="9">건조 불완전 또는 초순수 수질 불량 원인</text>
      <text x="310" y="94" textAnchor="middle" fill="#f87171" fontSize="9">스테인 발견 시 Re-cleaning 조치 필수</text>
      <text x="310" y="112" textAnchor="middle" fill="#cbd5e1" fontSize="8">마란고니 건조로 무잔사 표면 확보</text>
    </svg>
  ),

  // 62. 미관통 / 홀 막힘 (Blind / Clogged Hole)
  62: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      <rect x="30" y="45" width="120" height="30" fill="#1e3a8a" stroke="#60a5fa" />
      <line x1="55" y1="35" x2="55" y2="85" stroke="#38bdf8" strokeWidth="2" />
      <line x1="85" y1="35" x2="85" y2="60" stroke="#ef4444" strokeWidth="3" />
      <circle cx="85" cy="60" r="3" fill="#ef4444" />
      <line x1="115" y1="35" x2="115" y2="85" stroke="#38bdf8" strokeWidth="2" />
      <text x="85" y="105" textAnchor="middle" fill="#f87171" fontSize="8">미관통 막힘 홀</text>

      <rect x="175" y="25" width="270" height="105" rx="8" fill="#450a0a" stroke="#f87171" strokeWidth="1.5" />
      <text x="310" y="52" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="bold">🚨 핀 게이지 &amp; 백라이트 전수 검사</text>
      <text x="310" y="74" textAnchor="middle" fill="#ffffff" fontSize="9">미관통 홀 1개만 있어도 챔버 가스 불균일</text>
      <text x="310" y="94" textAnchor="middle" fill="#fecaca" fontSize="9">빛 투과(백라이트) 검사로 전 홀 완벽 관통 확인</text>
      <text x="310" y="112" textAnchor="middle" fill="#f87171" fontSize="8">샤워헤드 / 배플 등 핵심 검사항목</text>
    </svg>
  ),

  // 63. 기하공차 (Geometric Dimensioning, GD&T)
  63: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      <line x1="30" y1="105" x2="150" y2="105" stroke="#94a3b8" strokeWidth="3" />
      <line x1="30" y1="50" x2="150" y2="50" stroke="#4ade80" strokeWidth="2.5" />
      <text x="90" y="42" textAnchor="middle" fill="#4ade80" fontSize="9">// 평행도 / ⏥ 평탄도</text>
      <circle cx="90" cy="78" r="18" fill="none" stroke="#38bdf8" strokeWidth="2" />
      <text x="90" y="82" textAnchor="middle" fill="#38bdf8" fontSize="8">◎ 동심</text>

      <rect x="175" y="25" width="270" height="105" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
      <text x="310" y="52" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">클램핑 디스토션(휨) 방지 상시 측정</text>
      <text x="310" y="74" textAnchor="middle" fill="#f8fafc" fontSize="9">치수 맞아도 기하공차 무너지면 조립 불가</text>
      <text x="310" y="94" textAnchor="middle" fill="#f59e0b" fontSize="9">진공척 고정 시 제품 휨 변형 감시</text>
      <text x="310" y="112" textAnchor="middle" fill="#cbd5e1" fontSize="8">평탄도·평행도·동심도·진원도 보증</text>
    </svg>
  ),

  // 64. 표면 조도 (Surface Roughness, Ra / Rmax)
  64: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      <path d="M 30,85 Q 45,65 60,85 T 90,85 T 120,85 T 150,85" fill="none" stroke="#38bdf8" strokeWidth="2" />
      <line x1="30" y1="85" x2="150" y2="85" stroke="#facc15" strokeWidth="1.5" strokeDasharray="3 2" />
      <text x="90" y="115" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">Ra 0.2μm / Rmax 프로파일</text>

      <rect x="175" y="25" width="270" height="105" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="310" y="52" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">파티클 부착 &amp; 웨이퍼 슬립 방지</text>
      <text x="310" y="74" textAnchor="middle" fill="#f8fafc" fontSize="9">너무 거칠면 파티클 트랩, 너무 매끄러우면 슬립</text>
      <text x="310" y="94" textAnchor="middle" fill="#f87171" fontSize="9">도면 스펙에 맞는 조도측정기 검사 필수</text>
      <text x="310" y="112" textAnchor="middle" fill="#cbd5e1" fontSize="8">연마·폴리싱·블라스트 공정 품질</text>
    </svg>
  ),

  // 65. CMM / 비전 측정기 (Coordinate Measuring Machine)
  65: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      <rect x="40" y="25" width="10" height="75" fill="#64748b" />
      <rect x="120" y="25" width="10" height="75" fill="#64748b" />
      <rect x="40" y="25" width="90" height="12" fill="#475569" />
      <circle cx="85" cy="70" r="5" fill="#ef4444" />
      <text x="85" y="95" textAnchor="middle" fill="#fca5a5" fontSize="7">루비 볼</text>

      <rect x="165" y="25" width="280" height="105" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
      <text x="305" y="52" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">20℃ 항온실 기준 &amp; 데이텀(Datum) 설정</text>
      <text x="305" y="74" textAnchor="middle" fill="#f8fafc" fontSize="9">온도 차이 시 열팽창에 의한 치수 오차 발생</text>
      <text x="305" y="94" textAnchor="middle" fill="#f59e0b" fontSize="9">측정물 안착 시 기준면(Datum) 정확도 확인</text>
      <text x="305" y="112" textAnchor="middle" fill="#cbd5e1" fontSize="8">3차원 좌표, 홀 위치, 단차, 직경 초정밀 측정</text>
    </svg>
  ),

  // 66. 도면 공차 및 스펙 (Drawing Tolerance & Spec)
  66: (item) => (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <SvgDefs />
      {/* 상한/하한 스펙 게이지 */}
      <rect x="25" y="45" width="130" height="40" rx="4" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="2" />
      <text x="90" y="62" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">기준 치수 100.00</text>
      <text x="90" y="78" textAnchor="middle" fill="#facc15" fontSize="8">상한 +0.005 / 하한 -0.005</text>

      <rect x="175" y="25" width="270" height="105" rx="8" fill="#7f1d1d" stroke="#f87171" strokeWidth="2" />
      <text x="310" y="52" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="extrabold">🚨 "설마 넘어가겠지" 임의 판단 절대 금물</text>
      <text x="310" y="74" textAnchor="middle" fill="#fecaca" fontSize="9">스펙 범위 벗어나면 즉시 부적합(불량) 처리</text>
      <text x="310" y="94" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">모든 작업과 검사는 SOP 기록지 수치 입증</text>
      <text x="310" y="112" textAnchor="middle" fill="#fca5a5" fontSize="8">전 공정 품질 보증 절대 기준</text>
    </svg>
  )
};

/**
 * 66개 용어별 1:1 맞춤형 SVG 도해 렌더링 함수
 */
export function getVisualDiagram(item: TermItem): React.ReactNode {
  const renderFn = DIAGRAM_MAP[item.no];
  if (renderFn) {
    return renderFn(item);
  }

  // 기본 폴백
  return (
    <svg viewBox="0 0 460 160" className="w-full h-auto bg-slate-950 rounded-2xl p-3 border border-slate-800">
      <rect x="20" y="20" width="420" height="120" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
      <text x="230" y="70" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">
        {item.termKo} ({item.termEn})
      </text>
      <text x="230" y="95" textAnchor="middle" fill="#38bdf8" fontSize="11">
        공정: {item.process} | 호칭: {item.slang}
      </text>
    </svg>
  );
}
