# Phase 1: Analysis & Infrastructure - Context

**Gathered:** 2026-04-01
**Status:** Ready for planning

<domain>
## Phase Boundary

전통적인 리트젠 웹사이트를 현대적인 기술 스택(Next.js 14+)과 프리미엄 디자인(The Precision of Light)으로 리뉴얼하기 위한 기술적/비즈니스 분석 및 인프라 구축 단계입니다.

</domain>

<decisions>
## Implementation Decisions

### 🛠️ Tech Stack & Infrastructure
- **D-01:** Next.js 14+ (App Router) 및 React 18을 핵심 프레임워크로 사용합니다.
- **D-02:** Styling은 Tailwind CSS v4를 기본으로 하며, 복잡한 커스텀 디자인은 Vanilla CSS로 보완합니다.
- **D-03:** 데이터베이스 및 인증은 Firebase(Firestore, Auth, Storage)를 활용하여 민첩하게 구축합니다.
- **D-04:** Vercel을 통한 배포 및 CI/CD 환경을 구축합니다.

### 🎨 Visual & UX Identity
- **D-05:** "The Precision of Light" 컨셉에 맞춰 Deep Navy(#0A0E1A) 배경과 UV/IR을 상징하는 Violet/Blue 악센트 컬러를 사용합니다.
- **D-06:** Framer Motion 및 Anime.js를 사용하여 빛의 파동, 입자, 침투 효과를 구현합니다.
- **D-07:** 프리미엄 폰트로 Inter(본문)와 Outfit(헤더)을 채택합니다.

### 🍱 Content & IA (Information Architecture)
- **D-08:** 기존 4대 부서 중심에서 5대 기술 분류(LED UV, Lamp UV, IR, Sterilization, Parts)로 제품 카테고리를 재구성합니다.
- **D-09:** 산업군별 솔루션 메뉴(Applications)를 전략적으로 배치하여 바이어의 접근성을 높입니다.

### 🌐 Localization & AI
- **D-10:** KOR, ENG, CHN 다국어 지원을 i18n 기반으로 구축하며, Gemini AI를 활용한 자동 번역 초안 생성 프로세스를 도입합니다.

### 📐 GSD Development Standard
- **D-11:** 모든 대화는 **한국어**로 진행하며, 코드 변경 후에는 반드시 빌드 검증(`mvn test-compile` 또는 `npm run build`)을 수행합니다.
- **D-12:** Git 브랜치 전략 준수 및 Walkthrough Issue 등록 절차를 엄격히 따릅니다.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Foundation
- `.planning/PROJECT.md` — 프로젝트 비전 및 핵심 원칙
- `.planning/REQUIREMENTS.md` — 상세 기능 및 비기능 요구사항
- `.planning/ROADMAP.md` — 전체 개발 일정 및 단계별 목표

### Analysis & Design Archive
- `doc/10_Analysis/01_Project_Strategy.md` — 사업 전략 및 목표
- `doc/10_Analysis/02_Architecture_IA.md` — 메뉴 구조 및 서비스 아키텍처
- `doc/10_Analysis/03_UI_UX_Interactions.md` — 브랜드 경험 및 인터랙션 상세
- `doc/10_Analysis/04_Backend_Database_Schema.md` — 데이터 저장 구조 정의
- `doc/20_Design/*.md` — 각 메뉴별 상세 마케팅 콘텐츠 가이드

</canonical_refs>

<deferred>
## Deferred Ideas (Backlog)
- [ ] 3D 제품 모델링(Spline) 실시간 뷰어 도입 (Phase 4 이후 고도화 고려)
- [ ] 다국어 번역 관리자 컨설팅 기능 연동
</deferred>
