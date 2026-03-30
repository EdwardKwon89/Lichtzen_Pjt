# 05. Admin Dashboard Requirements (CMS/CRM)

리트젠 마케팅 및 영업 부서를 위한 통합 관리 환경을 설계합니다.

## 1. 개요 (Overview Dashboard)
전체 프로젝트 운영 현황을 한눈에 파악할 수 있는 요약 화면입니다.

- **KPI**: 실시간 신규 인입 Inquiry 건수 (최근 7일/30일)
- **Stats**: 국가별/산업별 문의 유입 비중 (파이 차트)
- **Trending**: 가장 많이 조회된 제품군 카테고리 순위

## 2. 고객 문의 관리 (CRM Manager)
'Support' 메뉴의 인콰이어리 폼 데이터를 관리하는 전문 기능입니다.

- **Inquiry List**: 접수 일자, 국가, 고객명, 소속 회사, 문의 유형(견적/기술지원 등)
- **Status Control**: 접수 상태 변경 (신규 ➔ 진행 중 ➔ 완료) 및 담당 영업 사원 배정
- **Export**: 정기 보고용 CSV/Excel 다운로드 기능
- **History**: 과거 문의 이력 통합 조회

## 3. 솔루션 콘텐츠 관리 (Product CMS)
제품 기술 정보를 실시간으로 수정 및 배포하는 기능입니다. (Phase 3 데이터 바인딩 연동)

### 3.1 제품 데이터 편집 (Product Editor)
- **Fields**: 제품명, 신규 분류, 기술 사양(Form Factor, 파장 등) 수정
- **Multi-lingual**: 각 언어별(Eng, Chn) 상세 마케팅 포인트 개별 관리

### 3.2 이미지 및 파일 업로드
- **Media**: 고출력 제품의 고해상도 이미지 및 홍보 동영상 업로드 (Firebase Storage 연동)
- **Docs**: 글로벌 수출을 위한 카탈로그 및 기술 규격서(PDF) 업로드

### 3.3 기술 역량 관리 (Technology Manager)
- **Patents**: 핵심 특허 이미지 및 관련 장비 태그 기능
- **Certificates**: 글로벌 인증서 갤러리 업로드 및 노출 여부 관리

## 4. AI 현지화 검수 (Localization Audit)
- **Gemini Console**: Google AI Studio로 번역된 문구를 확인하고 즉각적으로 문맥을 수정하여 반영하는 다국어 최종 검수 툴 포함.
- **Workflow**: 기계 번역 ➔ 관리자 확인 ➔ 실시간 사이트 반영 프로세스 구축
