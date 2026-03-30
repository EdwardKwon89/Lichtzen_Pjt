# 리트젠 글로벌 시장 대응 웹사이트 리뉴얼 기획서 (Ver 2.0)

## 1. 기획 개요
- **프로젝트명**: 리트젠 글로벌 시장 대응 웹사이트 구축 (Ver 2.0)
- **타깃 고객**: 국내외 반도체, 디스플레이, IT 기기 제조사 엔지니어 및 구매 담당자
- **디자인 컨셉**: "The Precision of Light" (정밀함과 빛의 조화)
- **주요 컬러**: Deep Navy (`#001A33` - 신뢰/첨단), Electric Blue (`#007BFF`) / Violet (`#8A2BE2` - 역동성)
- **개발 환경**: 프론트엔드(React/Next.js, Tailwind CSS, Framer Motion), 백엔드(Firestore/Google Sheets)
- **AI 활용**: Stichi (UI Design Agent), Google AI Studio/Gemini (다국어 마케팅 번역 최적화)

## 2. 웹사이트 정보 구조 (IA) 및 메뉴 상세
기존 공급자(사업부) 중심의 메뉴를 타깃 바이어가 직관적으로 탐색할 수 있는 6단계 구조로 전면 개편합니다.

### 2.1 Home (메인)
- **히어로 섹션**: "The Precision of Light" 컨셉 고해상도 메인 배너
- **핵심 솔루션**: UV/LED, UV/IR 시스템 강점 하이라이트
- **최신 뉴스**: 글로벌 레퍼런스 및 최신 기술 자료 (예: UV-C 222nm 소독기)

### 2.2 Products (제품 소개)
기존 파편화된 제품군을 5대 기술 카테고리로 통합하고 직관적인 **기술 사양 비교 그리드**를 제공합니다.
- **LED UV**: 미세 공정용 정밀/에너지 효율 광원 (Linear / Area / SPOT Type)
- **Lamp UV**: 고속 경화 램프 (UV / MIR / NIR / FAR-UVC LAMP)
- **IR**: 소재 내부 균일 가열/건조 솔루션 (IR / MIR SYSTEM)
- **살균 (Sterilization)**: 세균 및 바이러스 살균 (UV 살균기, FAR-UVC)
- **부품 및 시스템**: 통합 라인업 (전원공급장치, 반사갓, 필터, 대형 컨베이어 시스템)

### 2.3 Applications (산업별 솔루션)
산업별 맞춤 장비 매칭을 통해 글로벌 시장 수요에 대응합니다. (3단 그리드: 비주얼 ➔ 공정 설명 ➔ 장비 매칭)
- **반도체**: SPOT UV(LED), IR SYSTEM (미세 공정 정밀 경화 및 균일 열처리)
- **디스플레이**: 컨베이어 시스템, Area Type LED, UV SYSTEM (대형·고속 라인 코팅/경화)
- **모바일/IT 기기**: UV/IR LAMP (초소형 부품 고속 접착)
- **바이오**: UV 살균기, FAR-UVC LAMP (첨단 광학 살균)

### 2.4 Technology (기술 역량)
기업소개 하위 메뉴에서 단독 메뉴로 격상하여 핵심 셀링 포인트로 활용합니다.
- **R&D 역량**: 첨단 광원 및 시스템 개발 인프라 소개
- **핵심 특허**: 주요 기술 특허(정밀 에너지 조사, 균일 가열 등) 안내 및 관련 제품 태그
- **글로벌 인증**: 국제 표준 인증 현황 갤러리 뷰 제공

### 2.5 Support (고객 지원)
- 글로벌 기술 지원 및 영/중 다국어 자료실
- **해외 바이어용 고객 문의(Inquiry) 폼** 전면 배치

### 2.6 Company (기업 소개)
- 인사말, 회사 개요/연혁, 조직도, 채용정보, 본사 위치(영문 주소 포함)

## 3. 핵심 UI/UX 전략

### 3.1 마이크로 인터랙션
- **UV/LED & 시스템**: 빛 조사 시 하단 액체(접착제/잉크)가 단단하게 굳어지는 파티클 효과
- **IR SYSTEM**: 적외선이 다층 소재 표면을 통과해 깊숙이 스며들며 내부가 발광(Glow)하는 효과
- **방열 시스템**: 붉은 열기가 푸른 기류에 의해 외부로 빠르게 배출되는 애니메이션
- **살균 프로세스**: 보라색 파장에 의해 세균/바이러스 입자가 정화되는 마이크로 인터랙션

### 3.2 기술 사양 비교 그리드
- **구성**: 하드코딩 없이 Firestore/Sheets와 연동하여 실시간 업데이트 (Data Binding)
- **UI**: Deep Navy 배경에 하이라이트 스펙 수치(Electric Blue/Violet 포인트)
- **비교 항목**: 조사 형태(Form Factor), 파장(Wavelength), 작동 원리, 적용 라인 규모 등

## 4. 데이터베이스 및 스키마 설계

### 4.1 제품 상세 관리 항목 (Product Data Schema)
- **기본 정보**: `Product_ID`, `Product_Name`, `Category_New`, `Category_Old`, `Short_Description`
- **기술 사양**: `Light_Source_Type`, `Form_Factor`, `Primary_Function`, `Target_Material`
- **마케팅/연관**: `Target_Applications`, `System_Compatibility`, `Lang_Support`(다국어 지원)

### 4.2 고객 문의 (Inquiry) 폼
- **고객 정보**: Name, Company Name, Country, Business Email
- **관심 분야**: Industry (반도체/디스플레이 등), Category (LED UV/Lamp UV 등)
- **문의 상세**: Inquiry Type (견적/기술지원 등), Message
- **법적 동의**: Privacy Policy (GDPR 등 준수)

## 5. 관리자 대시보드 (Admin Dashboard)

- **Overview**: 인입된 글로벌 Inquiry 통계 (국가/산업별 유입 현황 요약)
- **고객 문의 관리 (CRM)**: 실시간 Inquiry 확인, 영업 담당자 배정, 응답 및 자료 발송 이력 관리
- **솔루션 콘텐츠 관리 (Product CMS)**: 제품 데이터(Schema) 직접 수정 시 프론트엔드 그리드 자동 반영, AI 번역 다국어 텍스트 통합 검수
- **기술 역량 관리**: 신규 특허/인증서 업로드 및 연관 솔루션 태그 관리