# 04. Backend & Database Schema Design

리트젠 글로벌 플랫폼의 동적 콘텐츠와 고객 데이터를 관리하는 데이터 구조를 정의합니다.

## 1. 제품 상세 데이터 스키마 (Product Data Schema)
Firestore 또는 Google Sheets에 저장될 제품별 속성 항목입니다.

### 1.1 기본 정보 (Basic Information)
- **Product_ID**: 고유 식별자 (Document ID)
- **Product_Name**: 제품명 (예: Linear Type, UV SYSTEM, FAR-UVC LAMP 등)
- **Category_New**: LED UV, Lamp UV, IR, 살균, 부품 (5대 분류)
- **Category_Old**: 장비사업부, LED사업부, LAMP사업부, OTHER
- **Short_Description**: 핵심 마케팅 문구 (다국어 필드)

### 1.2 핵심 기술 사양 (Core Technical Specifications)
- **Light_Source_Type**: UV LED, UV, MIR, NIR, FAR-UVC 등 파장 정보
- **Form_Factor**: Spot (점), Linear (선형), Area (면), 컨베이어
- **Primary_Function**: 경화, 건조, 살균 등 작동 목적
- **Target_Material**: 접착제, 잉크, 코팅 등 대상 소재

### 1.3 마케팅 및 다국어 지원
- **Target_Applications**: 반도체, 디스플레이, 모바일, 바이오 (다중 선택 리스트)
- **System_Compatibility**: 시스템 연동 호합성 여부 및 관련 제품 태그
- **Lang_Support**: KOR, ENG, CHN (지원 언어 플래그)

## 2. 고객 문의 (Inquiry) 데이터 스키마
해외 바이어로부터 수집되는 CRM 데이터 항목입니다.

- **Customer_Name**: 고객 성함
- **Company_Name**: 소속 회사명
- **Country**: 접속 국가 정보
- **Business_Email**: 비즈니스 이메일 주소
- **Industry**: 산업군 (반도체/디스플레이/모바일/바이오/기타)
- **Interest_Category**: 관심 제품군 (LED UV/Lamp UV/IR 등)
- **Inquiry_Type**: 문의 유형 (견적/기술지원/기타)
- **Message**: 상세 요구사항 텍스트
- **Privacy_Consent**: 개인정보 동의 여부 (Boolean)
- **Status**: 문의 처리 상태 (New/Assigned/Completed)
- **Assigned_Sales_Rep**: 배정된 영업 담당자 정보

## 3. 다국어 콘텐츠 통합 관리 (Localization Logic)
- **관리 방식**: Google AI Studio (Gemini)에서 생성된 번역 데이터를 각 언어별 필드(`lang_en`, `lang_zh`)에 저장합니다.
- **연동**: 프론트엔드의 `i18next` 또는 이와 유사한 라이브러리를 통해 데이터베이스에서 실시간으로 다국어 문구를 호출합니다.
