# 01. Project Strategy & Environment

리트젠 글로벌 시장 대응 웹사이트 구축 (Ver 2.0) 프로젝트의 핵심 전략과 기술 환경을 정의합니다.

## 1. 프로젝트 개요
- **프로젝트명**: 리트젠 글로벌 시장 대응 웹사이트 리뉴얼 (Ver 2.0)
- **타깃 고객**: 국내외 반도체, 디스플레이, IT 기기 제조사 엔지니어 및 구매 담당자
- **목표**: 공급자 중심 구조에서 사용자(바이어/엔지니어) 중심의 기술 및 산업별 솔루션 구조로 전면 개편

## 2. 디자인 컨셉: "The Precision of Light"
정밀함과 빛의 조화를 상징하며, 첨단 기술력을 시각적으로 전달합니다.

### 2.1 메인 컬러 팔레트
- **Deep Navy (`#001A33`)**: 메인 배경색. 신뢰와 첨단 기술력을 상징.
- **Electric Blue (`#007BFF`)**: 포인트 컬러. 활성 상태 및 기술적 하이라이트.
- **Violet (`#8A2BE2`)**: 포인트 컬러. UV 광원의 역동성과 에너지를 상징.

## 3. 기술 스택 (Tech Stack)
에이전트 기반의 현대적인 개발 환경을 구축합니다.

- **프론트엔드**:
  - Framework: **React / Next.js** (App Router 권장)
  - Styling: **Tailwind CSS** (Utility-first 디자인)
  - Animation: **Framer Motion** (마이크로 인터랙션 구현)
- **백엔드 및 데이터**:
  - Database: **Firebase Firestore** / Google Sheets (통합 관리)
  - Storage: Firebase Storage (제품 이미지 및 기술 자료 보관)
- **AI 활용**:
  - UI Design: **Stichi** (고해상도 컴포넌트 생성)
  - Content & Localization: **Google AI Studio (Gemini)** (기술 마케팅 문구 및 3개 국어 번역 최적화)

## 4. 인프라 및 배포
- **플랫폼**: Firebase Hosting
- **CI/CD**: GitHub Actions를 통한 자동화 배포
