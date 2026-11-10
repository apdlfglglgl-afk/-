export type TermCategory = 
  | '소재' 
  | '제품' 
  | '소재가공' 
  | '에칭및세정' 
  | '검사및포장';

export interface DiagramAnnotation {
  x: number;
  y: number;
  label: string;
  sub?: string;
  color?: string;
}

export interface TermItem {
  no: number;
  category: TermCategory;
  process: string;
  termKo: string;
  termEn: string;
  slang: string; // 현장 호칭/은어
  definition: string; // 신입사원 눈높이 핵심 정의
  caution: string; // 현장 Red-Line 주의사항
  dialogue: string; // 선임 작업자 실전 한마디
  diagramKey: string; // 1:1 도해 식별키
  diagramTitle: string; // 1:1 도해 명칭
  keyPoints: string[]; // 핵심 기술 포인트 2~3개
  specs?: string; // 일반적인 규격/공차 예시
}
