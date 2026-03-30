# Requirements: Lichtzen Home Ver 2.0

리트젠 글로벌 웹사이트 리뉴얼의 상세 요구사항 정의입니다.

## 1. Functional Requirements (기능 요구사항)

### 1.1 Product Catalog (제품 카탈로그)
- 5대 카테고리(LED UV, Lamp UV, IR, 살균, 부품)별 상품 등록 및 상세 조회.
- 기술 사양별 동적 비교 그리드 제공.
- 고화질 모션 이미지 및 3D 모델(Spline) 연동.

### 1.2 Inquiry System (인콰이어리 시스템)
- 멀티스탭(3단계) 고객 문의 양식 구현.
- 산업군 및 관심 분야 필터링을 통한 영업 리드(Lead) 확보.
- 관리자 패널(CRM) 대시보드에서 조회 및 상태 처리.

### 1.3 Localization (다국어 지원)
- 국문(KOR), 영문(ENG), 중문(CHN) 무중단 언어 전환.
- AI(Gemini)를 이용한 자동 번역 초안 생성 및 관리자 최종 승인 프로세스.

## 2. Non-Functional Requirements (비기능 요구사항)

### 2.1 Aesthetic Excellence (시각적 수월성)
- "The Precision of Light" 컨셉을 반영한 다이나믹 브랜드 애니메이션.
- 반응형 웹 디자인 (Mobile, Tablet, Desktop 최적화).
- 다크 모드(Dark Mode)를 기본 테마로 한 프리미엄 UI 디자인.

### 2.2 Performance (성능 정체성)
- Google Lighthouse 점수 90점 이상 달성 (SEO 최적화).
- 이미지 최적화(Next.js Image)를 통한 빠른 대용량 미디어 로딩.

## 3. Implementation Constraints (구현 제약 사항)
- **로컬 보안**: 모든 기밀 문서 및 로드맵은 로컬(`.agent/`, `.planning/`)에서 관리하며, 원격 저장소 노출을 방지함.
- **Vercel 배포**: Next.js 14 이상의 최신 피처 활용 및 서버리스 환경 연동.
